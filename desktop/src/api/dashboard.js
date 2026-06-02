// Capa de datos del dashboard — SOLO con relaciones reales que expone el back.
// El back NO da el link museo->sensor, así que el dashboard se organiza por
// UBICACIÓN, que sí tiene links reales:
//   - ubicacion.sensores[].referencia  <->  sensor.referencia   (lo da /api/ubicaciones)
//   - medicion.sensor_id               <->  sensor.id           (lo da /api/mediciones)
import { ubicaciones, sensores, mediciones } from './index.js'

const aLista = (r) => (Array.isArray(r) ? r : r?.data ?? [])
const aNum = (v) => (v == null || v === '' ? null : Number(v))
const idDe = (o) => o?.id ?? o?._id

// Clasificación de pH para mostrar (rango objetivo 6,5 – 7,5). Es presentación
// del valor real, no un dato inventado.
export function estadoPorPh(ph) {
  if (ph == null) return 'SIN DATOS'
  if (ph < 6.5) return 'ACÍDICO'
  if (ph > 7.5) return 'BÁSICO'
  return 'ÓPTIMO'
}

const horaDe = (fecha) => {
  if (!fecha) return '—'
  const f = new Date(String(fecha).replace(' ', 'T'))
  if (isNaN(f)) return String(fecha).slice(0, 10)
  return f.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })
}

// Devuelve { lista: [{id, nombre}], datos: { [id]: ubicacionFormateada } } o null.
export async function cargarDashboard() {
  const [us, ss, meds] = await Promise.all([
    ubicaciones.listar(),
    sensores.listar(),
    mediciones.listar(),
  ])
  const ubic = aLista(us)
  const sens = aLista(ss)
  const medsL = aLista(meds)
  if (!ubic.length) return null

  // sensor por referencia (datos SQL: id, estado, notas)
  const sensorPorRef = {}
  for (const s of sens) if (s.referencia) sensorPorRef[s.referencia] = s

  // última medición por sensor_id
  const ultima = {}
  for (const m of medsL) {
    const sid = m.sensor_id
    if (!ultima[sid] || new Date(m.fecha) > new Date(ultima[sid].fecha)) ultima[sid] = m
  }

  const datos = {}
  const lista = []

  for (const u of ubic) {
    const uid = idDe(u)
    const nombre = u.notas || u.descripcion || 'Ubicación'
    const refs = (u.sensores ?? []).map((s) => s.referencia).filter(Boolean)

    const sensoresUbic = refs.map((ref) => {
      const s = sensorPorRef[ref]
      const med = s ? ultima[s.id] : null
      const ph = aNum(med?.valor_ph)
      return {
        id: s?.id ?? ref,
        nombre: ref,
        sala: s?.notas || nombre,
        ph: ph ?? 0,
        estado: estadoPorPh(ph),
        ultimaLectura: horaDe(med?.fecha),
      }
    })

    const medsUbic = refs
      .map((ref) => sensorPorRef[ref])
      .filter(Boolean)
      .map((s) => ultima[s.id])
      .filter(Boolean)

    const prom = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null)
    const phs = sensoresUbic.map((se) => se.ph).filter((n) => n > 0)
    const temp = prom(medsUbic.map((m) => aNum(m.temperatura)).filter((n) => n != null))
    const hum = prom(medsUbic.map((m) => aNum(m.humedad_relativa)).filter((n) => n != null))

    datos[uid] = {
      nombre,
      humedad: hum != null ? `${hum.toFixed(1).replace('.', ',')} %` : '—',
      temperatura: temp != null ? `${temp.toFixed(1).replace('.', ',')}° C` : '—',
      phPromedio: phs.length ? phs.reduce((a, b) => a + b, 0) / phs.length : 0,
      ultimaActualizacion: medsUbic.length
        ? horaDe(medsUbic.map((m) => m.fecha).sort().pop())
        : '—',
      sensores: sensoresUbic,
      notas: [],
    }
    lista.push({ id: uid, nombre })
  }

  return { lista, datos }
}

// Serie para la gráfica de pH a partir de /api/mediciones.
export async function cargarSeriePh() {
  const meds = aLista(await mediciones.listar())
  return meds
    .filter((m) => m.valor_ph != null)
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
    .map((m) => ({ hora: horaDe(m.fecha), ph: aNum(m.valor_ph) }))
}
