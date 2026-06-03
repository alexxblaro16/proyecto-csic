// Modal de detalle de un sensor: info completa + historial de mediciones reales
// (GET /api/mediciones filtradas por sensor_id) + registro y edición manual del
// valor de pH (POST/PUT /api/mediciones). Datos solo del back.
//
// Al crear o editar una medición se recargan los datos y se avisa al padre
// (onMutar) para que el resumen, las analíticas y las alertas se recalculen.
import { useEffect, useState } from 'react'
import { mediciones as apiMediciones, campanias as apiCampanias } from '../api/index.js'
import { estadoPorPh } from '../api/dashboard.js'

const aLista = (r) => (Array.isArray(r) ? r : r?.data ?? [])
const num = (v) => (v == null || v === '' ? null : Number(v))
const fmtFecha = (f) => (f ? String(f).slice(0, 10) : '—')
const coma = (v, suf = '') => (v == null ? '—' : `${Number(v).toFixed(2).replace('.', ',')}${suf}`)
// Fecha de hoy en formato YYYY-MM-DD para el input date.
const hoyISO = () => new Date().toISOString().slice(0, 10)

const badgePh = (e) =>
  e === 'ACÍDICO'
    ? 'bg-orange-400/10 text-orange-300 border-orange-400/20'
    : e === 'BÁSICO'
      ? 'bg-blue-400/10 text-blue-300 border-blue-400/20'
      : e === 'ÓPTIMO'
        ? 'bg-green-400/10 text-green-300 border-green-400/20'
        : 'bg-slate-400/10 text-slate-300 border-slate-400/20'

export default function SensorDetalleModal({ sensor, ubicacion, onClose, onMutar }) {
  const [meds, setMeds] = useState([])
  const [cargando, setCargando] = useState(true)
  const [campanias, setCampanias] = useState([])

  // Formulario de nueva medición
  const [phNuevo, setPhNuevo] = useState('')
  const [tempNueva, setTempNueva] = useState('')
  const [humNueva, setHumNueva] = useState('')
  const [fechaNueva, setFechaNueva] = useState(hoyISO())
  const [obsNueva, setObsNueva] = useState('')
  const [campaniaId, setCampaniaId] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [errMed, setErrMed] = useState('')

  // Edición inline del pH de una medición existente
  const [editId, setEditId] = useState(null)
  const [editPh, setEditPh] = useState('')

  // Carga las mediciones de este sensor (orden descendente por fecha).
  const recargarMeds = () => {
    if (!sensor) return Promise.resolve()
    setCargando(true)
    return apiMediciones
      .listar()
      .then((d) => {
        const propias = aLista(d)
          .filter((m) => String(m.sensor_id) === String(sensor.id))
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        setMeds(propias)
      })
      .catch(() => setMeds([]))
      .finally(() => setCargando(false))
  }

  useEffect(() => {
    recargarMeds()
  }, [sensor])

  // Campañas: necesarias porque campania_id es obligatorio al crear medición.
  useEffect(() => {
    apiCampanias
      .listar()
      .then((d) => {
        const lista = aLista(d)
        setCampanias(lista)
        if (lista.length) setCampaniaId(String(lista[0].id))
      })
      .catch(() => setCampanias([]))
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!sensor) return null

  const ultima = meds[0]
  const phUlt = num(ultima?.valor_ph)
  const tieneCoords = sensor.eje_x != null || sensor.eje_y != null || sensor.eje_z != null

  // Crea una nueva medición de pH para este sensor.
  const crearMedicion = async (e) => {
    e.preventDefault()
    setErrMed('')
    if (phNuevo === '') return setErrMed('Introduce un valor de pH.')
    if (!campaniaId) return setErrMed('No hay campañas: crea una campaña antes de registrar mediciones.')
    setGuardando(true)
    try {
      await apiMediciones.crear({
        sensor_id: sensor.id,
        campania_id: Number(campaniaId),
        fecha: fechaNueva || hoyISO(),
        valor_ph: num(phNuevo),
        temperatura: num(tempNueva),
        humedad_relativa: num(humNueva),
        observaciones: obsNueva.trim() || null,
      })
      // Limpiar el formulario y refrescar
      setPhNuevo('')
      setTempNueva('')
      setHumNueva('')
      setObsNueva('')
      setFechaNueva(hoyISO())
      await recargarMeds()
      onMutar?.()
    } catch (err) {
      setErrMed(err.message || 'No se pudo registrar la medición.')
    } finally {
      setGuardando(false)
    }
  }

  // Guarda el nuevo valor de pH de una medición existente.
  const guardarEdicion = async (id) => {
    if (editPh === '') return
    try {
      await apiMediciones.actualizar(id, { valor_ph: num(editPh) })
      setEditId(null)
      setEditPh('')
      await recargarMeds()
      onMutar?.()
    } catch {
      // Si falla, simplemente salimos del modo edición sin romper la vista.
      setEditId(null)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-slate-950/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 sticky top-0 bg-slate-900 z-10">
          <div>
            <h2 className="text-lg font-semibold text-white">{sensor.referencia}</h2>
            <p className="text-sm text-slate-400">{ubicacion || '—'}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="w-9 h-9 rounded-full border border-white/10 bg-slate-950 text-slate-400 hover:text-white hover:bg-white/5 transition flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Ficha del sensor */}
          <div className="grid grid-cols-2 gap-4">
            <Dato etiqueta="Estado" valor={sensor.estado ?? '—'} />
            <Dato etiqueta="ID" valor={sensor.id ?? '—'} />
            <Dato etiqueta="Ubicación" valor={ubicacion || (sensor.ubicacion_id != null ? `Ubicación ${sensor.ubicacion_id}` : '—')} />
            <Dato etiqueta="Notas" valor={sensor.notas ?? '—'} />
            {tieneCoords && (
              <Dato
                etiqueta="Coordenadas (x, y, z)"
                valor={`${sensor.eje_x ?? '—'}, ${sensor.eje_y ?? '—'}, ${sensor.eje_z ?? '—'}`}
                ancho="col-span-2"
              />
            )}
          </div>

          {/* Última medición */}
          {ultima && (
            <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-slate-300">Última medición</p>
                <span className="text-xs text-slate-500">{fmtFecha(ultima.fecha)}</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-2xl font-bold text-white">{coma(phUlt)}</p>
                  <span className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full border ${badgePh(estadoPorPh(phUlt))}`}>
                    pH · {estadoPorPh(phUlt)}
                  </span>
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{coma(num(ultima.temperatura), '°')}</p>
                  <p className="text-sm text-slate-400 mt-1">Temperatura</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{coma(num(ultima.humedad_relativa), ' %')}</p>
                  <p className="text-sm text-slate-400 mt-1">Humedad</p>
                </div>
              </div>
            </div>
          )}

          {/* Registrar nueva medición */}
          <form onSubmit={crearMedicion} className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4 space-y-3">
            <p className="text-sm font-medium text-cyan-200">Registrar medición de pH</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <CampoMini etiqueta="pH *">
                <input type="number" step="any" value={phNuevo} onChange={(e) => setPhNuevo(e.target.value)}
                  placeholder="7.0"
                  className="w-full rounded-lg bg-slate-950 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50" />
              </CampoMini>
              <CampoMini etiqueta="Temp. (°)">
                <input type="number" step="any" value={tempNueva} onChange={(e) => setTempNueva(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50" />
              </CampoMini>
              <CampoMini etiqueta="Humedad (%)">
                <input type="number" step="any" value={humNueva} onChange={(e) => setHumNueva(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50" />
              </CampoMini>
              <CampoMini etiqueta="Fecha">
                <input type="date" value={fechaNueva} onChange={(e) => setFechaNueva(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50" />
              </CampoMini>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <CampoMini etiqueta="Observaciones">
                  <input value={obsNueva} onChange={(e) => setObsNueva(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50" />
                </CampoMini>
              </div>
              <CampoMini etiqueta="Campaña">
                <select value={campaniaId} onChange={(e) => setCampaniaId(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50">
                  {campanias.length === 0 && <option value="">Sin campañas</option>}
                  {campanias.map((c) => (
                    <option key={c.id} value={c.id}>{c.nombre || `Campaña ${c.id}`}</option>
                  ))}
                </select>
              </CampoMini>
            </div>
            {errMed && <p className="text-sm text-orange-300">{errMed}</p>}
            <div className="flex justify-end">
              <button type="submit" disabled={guardando}
                className="rounded-full bg-cyan-400 px-4 py-1.5 text-sm font-semibold text-slate-950 hover:bg-cyan-300 transition disabled:opacity-50">
                {guardando ? 'Guardando…' : 'Registrar'}
              </button>
            </div>
          </form>

          {/* Historial de mediciones */}
          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-2">
              Historial de mediciones {meds.length > 0 && <span className="text-slate-500">({meds.length})</span>}
            </h3>
            {cargando ? (
              <p className="text-sm text-slate-500">Cargando mediciones…</p>
            ) : meds.length === 0 ? (
              <p className="text-sm text-slate-500">Este sensor no tiene mediciones registradas.</p>
            ) : (
              <div className="rounded-2xl border border-white/10 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5 bg-slate-950/50">
                      <th className="text-left px-4 py-2.5 text-xs text-slate-400 font-medium">Fecha</th>
                      <th className="text-left px-4 py-2.5 text-xs text-slate-400 font-medium">pH</th>
                      <th className="text-left px-4 py-2.5 text-xs text-slate-400 font-medium">Temp.</th>
                      <th className="text-left px-4 py-2.5 text-xs text-slate-400 font-medium">Humedad</th>
                      <th className="text-right px-4 py-2.5 text-xs text-slate-400 font-medium">Editar pH</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meds.map((m) => {
                      const ph = num(m.valor_ph)
                      const est = estadoPorPh(ph)
                      const editando = editId === m.id
                      return (
                        <tr key={m.id} className="border-b border-white/5 last:border-0">
                          <td className="px-4 py-2.5 text-sm text-slate-300">{fmtFecha(m.fecha)}</td>
                          <td className="px-4 py-2.5">
                            {editando ? (
                              <input
                                type="number"
                                step="any"
                                value={editPh}
                                onChange={(e) => setEditPh(e.target.value)}
                                className="w-20 rounded-md bg-slate-950 border border-cyan-400/40 px-2 py-1 text-sm text-white outline-none"
                                autoFocus
                              />
                            ) : (
                              <span className={`text-sm font-semibold tabular-nums px-2 py-0.5 rounded-full border ${badgePh(est)}`}>
                                {coma(ph)}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-2.5 text-sm text-slate-300">{coma(num(m.temperatura), '°')}</td>
                          <td className="px-4 py-2.5 text-sm text-slate-300">{coma(num(m.humedad_relativa), ' %')}</td>
                          <td className="px-4 py-2.5 text-right">
                            {editando ? (
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => guardarEdicion(m.id)}
                                  className="text-xs rounded-md bg-cyan-400 px-2 py-1 font-semibold text-slate-950 hover:bg-cyan-300 transition"
                                >
                                  Guardar
                                </button>
                                <button
                                  onClick={() => { setEditId(null); setEditPh('') }}
                                  className="text-xs rounded-md border border-white/10 px-2 py-1 text-slate-300 hover:bg-white/5 transition"
                                >
                                  Cancelar
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => { setEditId(m.id); setEditPh(ph != null ? String(ph) : '') }}
                                className="text-xs rounded-md border border-white/10 px-2 py-1 text-slate-300 hover:bg-white/5 transition"
                              >
                                ✎ Editar
                              </button>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Dato({ etiqueta, valor, ancho = '' }) {
  return (
    <div className={ancho}>
      <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">{etiqueta}</p>
      <p className="text-sm text-slate-200 break-words">{valor}</p>
    </div>
  )
}

function CampoMini({ etiqueta, children }) {
  return (
    <label className="block">
      <span className="text-xs text-slate-500">{etiqueta}</span>
      <div className="mt-1">{children}</div>
    </label>
  )
}
