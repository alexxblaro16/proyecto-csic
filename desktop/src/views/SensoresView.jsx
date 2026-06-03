// Vista de Sensores — datos REALES del back: GET /api/sensores + GET /api/ubicaciones.
// La columna "Ubicación" muestra el NOMBRE real de la sala (no el id), resolviendo
// el cruce sensor<->ubicación por la 'referencia' (las ubicaciones Mongo listan sus
// sensores por referencia y su nombre está en el campo 'notas').
import { useEffect, useState } from 'react'
import ViewLayout from '../components/ViewLayout.jsx'
import Sensor360Modal from '../components/Sensor360Modal.jsx'
import SensorDetalleModal from '../components/SensorDetalleModal.jsx'
import { sensores as apiSensores, ubicaciones as apiUbicaciones } from '../api/index.js'

const aLista = (r) => (Array.isArray(r) ? r : r?.data ?? [])

function IconoCamara() {
  return (
    <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
      <path d="M2 5.5h2.2l1-1.5h3.6l1 1.5H16v9H2v-9Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="9" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

const badgeEstado = (estado = '') => {
  const v = estado.toLowerCase()
  if (v.includes('activ')) return 'bg-green-400/10 text-green-300 border-green-400/20'
  if (v.includes('inactiv') || v.includes('averi') || v.includes('fuera')) return 'bg-orange-400/10 text-orange-300 border-orange-400/20'
  return 'bg-slate-400/10 text-slate-300 border-slate-400/20'
}

const puntoEstado = (estado = '') => (estado.toLowerCase().includes('activ') ? 'bg-green-400' : 'bg-slate-400')

function PinUbicacion() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="inline-block mr-1.5 -mt-0.5">
      <path d="M8 1.5c-2.5 0-4.5 2-4.5 4.5C3.5 9.5 8 14.5 8 14.5s4.5-5 4.5-8.5C12.5 3.5 10.5 1.5 8 1.5Z" stroke="#22d3ee" strokeWidth="1.1" />
      <circle cx="8" cy="6" r="1.6" stroke="#22d3ee" strokeWidth="1.1" />
    </svg>
  )
}

export default function SensoresView() {
  const [sensores, setSensores] = useState([])
  const [ubicacionPorRef, setUbicacionPorRef] = useState({})
  const [estado, setEstado] = useState('cargando') // cargando | ok | error
  const [error, setError] = useState('')
  const [sensorActivo, setSensorActivo] = useState(null) // sensor del modal 360
  const [sensorDetalle, setSensorDetalle] = useState(null) // sensor del modal detalle

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

  const activos = sensores.filter((s) => (s.estado || '').toLowerCase().includes('activ')).length
  const numUbicaciones = new Set(sensores.map((s) => nombreUbicacion(s))).size

  return (
    <ViewLayout titulo="Sensores" subtitulo="Datos en vivo · GET /api/sensores">
      {/* Tira de métricas */}
      {estado === 'ok' && sensores.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-5">
          <Metrica etiqueta="Sensores" valor={sensores.length} />
          <Metrica etiqueta="Activos" valor={activos} color="text-green-400" />
          <Metrica etiqueta="Ubicaciones" valor={numUbicaciones} />
        </div>
      )}

      <div className="rounded-2xl border border-white/10 bg-slate-900 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-white">Listado de sensores</h2>
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
          <div className="m-4 rounded-2xl border border-orange-400/30 bg-orange-400/10 px-4 py-3 text-sm text-orange-200">
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
                <th className="text-left px-5 py-3 text-sm text-slate-400 font-medium">Estado</th>
                <th className="text-left px-5 py-3 text-sm text-slate-400 font-medium">Referencia</th>
                <th className="text-left px-5 py-3 text-sm text-slate-400 font-medium">Ubicación</th>
                <th className="text-left px-5 py-3 text-sm text-slate-400 font-medium">Notas</th>
                <th className="text-right px-5 py-3 text-sm text-slate-400 font-medium">360</th>
              </tr>
            </thead>
            <tbody>
              {sensores.map((s, i) => (
                <tr
                  key={s.id ?? s._id ?? i}
                  onClick={() => setSensorDetalle(s)}
                  className="border-b border-white/5 last:border-0 hover:bg-white/5 transition cursor-pointer"
                  title="Ver detalle del sensor"
                >
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-2.5 py-0.5 rounded-full border ${badgeEstado(s.estado)}`}>
                      <span className={`w-2 h-2 rounded-full ${puntoEstado(s.estado)}`} />
                      {s.estado ?? '—'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-white font-medium">{s.referencia ?? '—'}</td>
                  <td className="px-5 py-4 text-sm text-slate-300">
                    <PinUbicacion />
                    {nombreUbicacion(s)}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-400">{s.notas ?? '—'}</td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSensorActivo(s)
                      }}
                      title="Ver en 360"
                      aria-label="Ver en 360"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20 transition"
                    >
                      <IconoCamara />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal de detalle del sensor (clic en la fila) */}
      {sensorDetalle && (
        <SensorDetalleModal
          sensor={sensorDetalle}
          ubicacion={nombreUbicacion(sensorDetalle)}
          onClose={() => setSensorDetalle(null)}
        />
      )}

      {/* Modal 360 (botón de cámara) */}
      {sensorActivo && (
        <Sensor360Modal
          sensor={sensorActivo}
          ubicacion={nombreUbicacion(sensorActivo)}
          onClose={() => setSensorActivo(null)}
        />
      )}
    </ViewLayout>
  )
}

function Metrica({ etiqueta, valor, color = 'text-white' }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
      <p className="text-sm text-slate-400 uppercase tracking-widest mb-2">{etiqueta}</p>
      <p className={`text-2xl font-bold ${color}`}>{valor}</p>
    </div>
  )
}
