// Vista de Alertas — datos REALES: deriva de GET /api/mediciones.
// Una alerta = medición con pH fuera del rango objetivo (6,5 – 7,5).
import { useEffect, useState } from 'react'
import ViewLayout from '../components/ViewLayout.jsx'
import { mediciones as apiMediciones, sensores as apiSensores } from '../api/index.js'
import { estadoPorPh } from '../api/dashboard.js'

const aLista = (r) => (Array.isArray(r) ? r : r?.data ?? [])

export default function AlertasView() {
  const [alertas, setAlertas] = useState([])
  const [estado, setEstado] = useState('cargando') // cargando | ok | error
  const [error, setError] = useState('')

  const cargar = async () => {
    setEstado('cargando')
    setError('')
    try {
      const [medsData, sensData] = await Promise.all([
        apiMediciones.listar(),
        apiSensores.listar(),
      ])
      const meds = aLista(medsData)
      const refPorId = {}
      for (const s of aLista(sensData)) refPorId[s.id] = s.referencia

      const fueraDeRango = meds
        .map((m) => ({ ...m, ph: m.valor_ph != null ? Number(m.valor_ph) : null }))
        .filter((m) => m.ph != null && (m.ph < 6.5 || m.ph > 7.5))
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        .map((m) => ({
          id: m.id,
          sensor: refPorId[m.sensor_id] ?? `Sensor ${m.sensor_id}`,
          ph: m.ph,
          estado: estadoPorPh(m.ph),
          fecha: m.fecha?.slice(0, 10) ?? '—',
          observaciones: m.observaciones ?? '',
        }))

      setAlertas(fueraDeRango)
      setEstado('ok')
    } catch (e) {
      setError(e.message)
      setEstado('error')
    }
  }

  useEffect(() => {
    cargar()
  }, [])

  const colorEstado = (e) =>
    e === 'ACÍDICO'
      ? 'bg-orange-400/10 text-orange-300 border-orange-400/20'
      : e === 'BÁSICO'
        ? 'bg-blue-400/10 text-blue-300 border-blue-400/20'
        : 'bg-slate-400/10 text-slate-300 border-slate-400/20'

  return (
    <ViewLayout titulo="Alertas" subtitulo="pH fuera de rango (6,5 – 7,5)">
      <div className="rounded-2xl border border-white/10 bg-slate-900 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-white">Alertas activas</h2>
            <p className="text-sm text-slate-400">
              {estado === 'ok'
                ? `${alertas.length} medición${alertas.length !== 1 ? 'es' : ''} fuera de rango`
                : 'Analizando mediciones del back…'}
            </p>
          </div>
          <button
            onClick={cargar}
            className="rounded-full bg-cyan-400 px-3 py-1.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Recargar
          </button>
        </div>

        {estado === 'cargando' && (
          <p className="px-6 py-8 text-center text-slate-400 text-sm">Cargando…</p>
        )}

        {estado === 'error' && (
          <div className="m-4 rounded-2xl border border-orange-400/30 bg-orange-400/10 px-4 py-3 text-sm text-orange-200">
            No se pudo cargar: {error}
            <p className="text-orange-300/70 mt-1">
              ¿Está el back levantado en <span className="font-mono">localhost:8180</span>?
            </p>
          </div>
        )}

        {estado === 'ok' && alertas.length === 0 && (
          <div className="px-6 py-10 text-center">
            <p className="text-green-300 font-medium">✓ Sin alertas</p>
            <p className="text-sm text-slate-500 mt-1">Todas las mediciones están dentro del rango 6,5 – 7,5.</p>
          </div>
        )}

        {estado === 'ok' && alertas.length > 0 && (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 py-3 text-sm text-slate-400 font-medium">Estado</th>
                <th className="text-left px-5 py-3 text-sm text-slate-400 font-medium">Sensor</th>
                <th className="text-left px-5 py-3 text-sm text-slate-400 font-medium">pH</th>
                <th className="text-left px-5 py-3 text-sm text-slate-400 font-medium">Fecha</th>
                <th className="text-left px-5 py-3 text-sm text-slate-400 font-medium">Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {alertas.map((a) => (
                <tr key={a.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition">
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center text-sm font-medium px-2.5 py-0.5 rounded-full border ${colorEstado(a.estado)}`}>
                      {a.estado}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-white font-medium">{a.sensor}</td>
                  <td className="px-5 py-4 text-sm font-bold tabular-nums text-white">
                    {a.ph.toFixed(2).replace('.', ',')}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-400">{a.fecha}</td>
                  <td className="px-5 py-4 text-sm text-slate-400">{a.observaciones || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </ViewLayout>
  )
}
