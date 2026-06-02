// Vista de Sensores — CONECTADA al back real: GET /api/sensores.
// Sirve para que Iván compruebe que sus datos sembrados llegan al front.
import { useEffect, useState } from 'react'
import ViewLayout from '../components/ViewLayout.jsx'
import { sensores as apiSensores } from '../api/index.js'

export default function SensoresView() {
  const [sensores, setSensores] = useState([])
  const [estado, setEstado] = useState('cargando') // cargando | ok | error
  const [error, setError] = useState('')

  const cargar = async () => {
    setEstado('cargando')
    setError('')
    try {
      const data = await apiSensores.listar()
      // Laravel apiResource suele devolver array directo o { data: [...] }
      const lista = Array.isArray(data) ? data : (data?.data ?? [])
      setSensores(lista)
      setEstado('ok')
    } catch (e) {
      setError(e.message)
      setEstado('error')
    }
  }

  useEffect(() => {
    cargar()
  }, [])

  return (
    <ViewLayout titulo="Sensores" subtitulo="Datos en vivo · GET /api/sensores">
      <div className="rounded-2xl border border-white/10 bg-slate-900 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-white">Sensores (API)</h2>
            <p className="text-sm text-slate-400">
              {estado === 'ok' ? `${sensores.length} sensores recibidos del back` : 'Conectando con el back…'}
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
          <p className="px-6 py-8 text-center text-slate-400 text-sm">Cargando sensores…</p>
        )}

        {estado === 'error' && (
          <div className="m-4 rounded-xl border border-orange-400/30 bg-orange-400/10 px-4 py-3 text-sm text-orange-200">
            No se pudo cargar: {error}
            <p className="text-orange-300/70 mt-1">
              ¿Está el back levantado en <span className="font-mono">localhost:8180</span>? (docker compose up)
            </p>
          </div>
        )}

        {estado === 'ok' && sensores.length === 0 && (
          <p className="px-6 py-8 text-center text-slate-400 text-sm">
            Conexión OK, pero no hay sensores. Siembra datos en el back (SensorSeeder).
          </p>
        )}

        {estado === 'ok' && sensores.length > 0 && (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 py-3 text-sm text-slate-400 font-medium">Referencia</th>
                <th className="text-left px-5 py-3 text-sm text-slate-400 font-medium">Estado</th>
                <th className="text-left px-5 py-3 text-sm text-slate-400 font-medium">Ubicación</th>
                <th className="text-left px-5 py-3 text-sm text-slate-400 font-medium">Notas</th>
              </tr>
            </thead>
            <tbody>
              {sensores.map((s, i) => (
                <tr key={s.id ?? s._id ?? i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition">
                  <td className="px-5 py-4 text-sm text-white font-medium">{s.referencia ?? '—'}</td>
                  <td className="px-5 py-4 text-sm text-slate-300">{s.estado ?? '—'}</td>
                  <td className="px-5 py-4 text-sm text-slate-400">{s.ubicacion_id ?? '—'}</td>
                  <td className="px-5 py-4 text-sm text-slate-400">{s.notas ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pista para depurar la respuesta cruda del back (útil para Iván) */}
      {estado === 'ok' && (
        <details className="mt-4 text-sm text-slate-400">
          <summary className="cursor-pointer hover:text-slate-200">Ver respuesta cruda (JSON)</summary>
          <pre className="mt-2 max-h-72 overflow-auto rounded-xl border border-white/10 bg-slate-950 p-4 text-xs text-slate-300">
            {JSON.stringify(sensores, null, 2)}
          </pre>
        </details>
      )}
    </ViewLayout>
  )
}
