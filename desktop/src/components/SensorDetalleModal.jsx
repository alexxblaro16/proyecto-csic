// Modal de detalle de un sensor: info completa + historial de mediciones reales
// (GET /api/mediciones filtradas por sensor_id). Datos solo del back.
import { useEffect, useState } from 'react'
import { mediciones as apiMediciones } from '../api/index.js'
import { estadoPorPh } from '../api/dashboard.js'

const aLista = (r) => (Array.isArray(r) ? r : r?.data ?? [])
const num = (v) => (v == null || v === '' ? null : Number(v))
const fmtFecha = (f) => (f ? String(f).slice(0, 10) : '—')
const coma = (v, suf = '') => (v == null ? '—' : `${Number(v).toFixed(2).replace('.', ',')}${suf}`)

const badgePh = (e) =>
  e === 'ACÍDICO'
    ? 'bg-orange-400/10 text-orange-300 border-orange-400/20'
    : e === 'BÁSICO'
      ? 'bg-blue-400/10 text-blue-300 border-blue-400/20'
      : e === 'ÓPTIMO'
        ? 'bg-green-400/10 text-green-300 border-green-400/20'
        : 'bg-slate-400/10 text-slate-300 border-slate-400/20'

export default function SensorDetalleModal({ sensor, ubicacion, onClose }) {
  const [meds, setMeds] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (!sensor) return
    setCargando(true)
    apiMediciones
      .listar()
      .then((d) => {
        const propias = aLista(d)
          .filter((m) => String(m.sensor_id) === String(sensor.id))
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        setMeds(propias)
      })
      .catch(() => setMeds([]))
      .finally(() => setCargando(false))
  }, [sensor])

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
                      <th className="text-left px-4 py-2.5 text-xs text-slate-400 font-medium">Observaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meds.map((m) => {
                      const ph = num(m.valor_ph)
                      const est = estadoPorPh(ph)
                      return (
                        <tr key={m.id} className="border-b border-white/5 last:border-0">
                          <td className="px-4 py-2.5 text-sm text-slate-300">{fmtFecha(m.fecha)}</td>
                          <td className="px-4 py-2.5">
                            <span className={`text-sm font-semibold tabular-nums px-2 py-0.5 rounded-full border ${badgePh(est)}`}>
                              {coma(ph)}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 text-sm text-slate-300">{coma(num(m.temperatura), '°')}</td>
                          <td className="px-4 py-2.5 text-sm text-slate-300">{coma(num(m.humedad_relativa), ' %')}</td>
                          <td className="px-4 py-2.5 text-sm text-slate-400">{m.observaciones || '—'}</td>
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
