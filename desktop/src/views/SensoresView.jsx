// Vista de Sensores — datos REALES del back: GET /api/sensores + GET /api/ubicaciones.
// La columna "Ubicación" muestra el NOMBRE real de la sala (no el id), resolviendo
// el cruce sensor<->ubicación por la 'referencia' (las ubicaciones Mongo listan sus
// sensores por referencia y su nombre está en el campo 'notas').
import { useEffect, useState } from 'react'
import ViewLayout from '../components/ViewLayout.jsx'
import { sensores as apiSensores, ubicaciones as apiUbicaciones } from '../api/index.js'

const aLista = (r) => (Array.isArray(r) ? r : r?.data ?? [])

export default function SensoresView() {
  const [sensores, setSensores] = useState([])
  const [ubicacionPorRef, setUbicacionPorRef] = useState({})
  const [estado, setEstado] = useState('cargando') // cargando | ok | error
  const [error, setError] = useState('')

  const cargar = async () => {
    setEstado('cargando')
    setError('')
    try {
      const [sensData, ubicData] = await Promise.all([
        apiSensores.listar(),
        apiUbicaciones.listar(),
      ])
      const sens = aLista(sensData)
      const ubic = aLista(ubicData)

      // Mapa: referencia de sensor -> nombre real de su ubicación
      const mapa = {}
      for (const u of ubic) {
        const nombre = u.notas || u.descripcion || u.nombre || '—'
        for (const s of u.sensores ?? []) {
          if (s.referencia) mapa[s.referencia] = nombre
        }
      }

      setSensores(sens)
      setUbicacionPorRef(mapa)
      setEstado('ok')
    } catch (e) {
      setError(e.message)
      setEstado('error')
    }
  }

  useEffect(() => {
    cargar()
  }, [])

  const nombreUbicacion = (s) =>
    ubicacionPorRef[s.referencia] ?? (s.ubicacion_id != null ? `Ubicación ${s.ubicacion_id}` : '—')

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
                  <td className="px-5 py-4 text-sm text-slate-300">{nombreUbicacion(s)}</td>
                  <td className="px-5 py-4 text-sm text-slate-400">{s.notas ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </ViewLayout>
  )
}
