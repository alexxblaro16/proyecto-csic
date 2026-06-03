// Capa de datos del dashboard, organizada por MUSEO.
//
// NOTA: el back NO expone el link museo->sensor (sensores son SQL con
// ubicacion_id; /api/ubicaciones es Mongo sin museo_id). Mientras Ivan no lo
// exponga, se asocia cada sensor a su museo por el patrón de la referencia
// (SENSOR-<MUSEO>-NNN -> token del nombre del museo). Provisional hasta que el
// back devuelva la relación real. Links 100% reales: medicion.sensor_id <-> sensor.id.
import { museos, sensores, mediciones } from './index.js'

const aLista = (r) => (Array.isArray(r) ? r : r?.data ?? [])
const aNum = (v) => (v == null || v === '' ? null : Number(v))

// Clasificación de pH para mostrar (rango objetivo 6,5 – 7,5).
export function estadoPorPh(ph) {
  if (ph == null) return 'SIN DATOS'
  if (ph < 6.5) return 'ACÍDICO'
  if (ph > 7.5) return 'BÁSICO'
  return 'ÓPTIMO'
}

// "Museo Thyssen-Bornemisza" -> ['THYSSEN','BORNEMISZA'] (palabras significativas,
// sin tildes). Un sensor pertenece al museo si su referencia contiene alguna.
function tokensMuseo(nombre = '') {
  const limpio = nombre.toUpperCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  const stop = new Set(['MUSEO', 'DEL', 'DE', 'LA', 'EL', 'LOS', 'NACIONAL', 'CENTRO', 'ARTE', 'Y', 'CONTEMPORANEO'])
  return limpio.split(/[^A-Z]+/).filter((p) => p.length >= 4 && !stop.has(p))
}

const horaDe = (fecha) => {
  if (!fecha) return '—'
  const f = new Date(String(fecha).replace(' ', 'T'))
  if (isNaN(f)) return String(fecha).slice(0, 10)
  return f.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })
}

// Devuelve { lista: [{id, nombre}], datos: { [id]: museoFormateado } } o null.
export async function cargarDashboard() {
  const [ms, ss, meds] = await Promise.all([
    museos.listar(),
    sensores.listar(),
    mediciones.listar(),
  ])
  const museosL = aLista(ms)
  const sens = aLista(ss)
  const medsL = aLista(meds)
  if (!museosL.length) return null

  // última medición por sensor_id (link real)
  const ultima = {}
  for (const m of medsL) {
    const sid = m.sensor_id
    if (!ultima[sid] || new Date(m.fecha) > new Date(ultima[sid].fecha)) ultima[sid] = m
  }

  const datos = {}
  const lista = []

  for (const mu of museosL) {
    const tokens = tokensMuseo(mu.nombre)
    const propios = sens.filter((s) => {
      const ref = (s.referencia || '').toUpperCase()
      return tokens.some((t) => ref.includes(t))
    })

    const sensoresMuseo = propios.map((s) => {
      const med = ultima[s.id]
      const ph = aNum(med?.valor_ph)
      return {
        id: s.id,
        nombre: s.referencia,
        sala: s.notas || mu.ciudad || '—',
        ph: ph ?? 0,
        estado: estadoPorPh(ph),
        ultimaLectura: horaDe(med?.fecha),
      }
    })

    const medsMuseo = propios.map((s) => ultima[s.id]).filter(Boolean)
    const prom = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null)
    const phs = sensoresMuseo.map((se) => se.ph).filter((n) => n > 0)
    const temp = prom(medsMuseo.map((m) => aNum(m.temperatura)).filter((n) => n != null))
    const hum = prom(medsMuseo.map((m) => aNum(m.humedad_relativa)).filter((n) => n != null))

    datos[mu.id] = {
      nombre: mu.nombre,
      ciudad: mu.ciudad,
      pais: mu.pais,
      categoria: mu.categoria,
      humedad: hum != null ? `${hum.toFixed(1).replace('.', ',')} %` : '—',
      temperatura: temp != null ? `${temp.toFixed(1).replace('.', ',')}° C` : '—',
      phPromedio: phs.length ? phs.reduce((a, b) => a + b, 0) / phs.length : 0,
      ultimaActualizacion: medsMuseo.length ? horaDe(medsMuseo.map((m) => m.fecha).sort().pop()) : '—',
      sensores: sensoresMuseo,
      notas: [],
    }
    lista.push({ id: mu.id, nombre: mu.nombre })
  }

  return { lista, datos }
}

// Serie para la gráfica de pH a partir de /api/mediciones.
export async function cargarSeriePh() {
  const meds = aLista(await mediciones.listar())
  return meds
    .filter((m) => m.valor_ph != null)
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
    .map((m) => ({ hora: horaDe(m.fecha), ph: aNum(m.valor_ph), sensorId: m.sensor_id }))
}
