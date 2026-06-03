// Vista de Analítica: gráfica de evolución del pH con datos REALES (/api/mediciones),
// filtrada por el museo seleccionado en el selector global.
import { useEffect, useState } from 'react'
import ViewLayout from '../components/ViewLayout.jsx'
import GraficaPH from '../components/GraficaPH.jsx'
import { cargarSeriePh } from '../api/dashboard.js'
import { useMuseo } from '../context/MuseoContext.jsx'

export default function AnaliticaView() {
  const { museoActivo, sensorIdsActivos } = useMuseo()
  const [serie, setSerie] = useState([])
  const [estado, setEstado] = useState('cargando') // cargando | ok | error

  useEffect(() => {
    cargarSeriePh()
      .then((s) => {
        setSerie(s)
        setEstado('ok')
      })
      .catch(() => setEstado('error'))
  }, [])

  // Solo las mediciones de sensores del museo activo. Se recalcula al cambiar de
  // museo sin volver a pedir datos al back.
  const serieMuseo = serie.filter((p) => sensorIdsActivos.has(String(p.sensorId)))

  const subtitulo =
    estado === 'ok'
      ? `${serieMuseo.length} mediciones · ${museoActivo?.nombre ?? 'museo'}`
      : estado === 'error'
        ? 'No se pudo conectar al back'
        : 'Cargando datos del back…'

  return (
    <ViewLayout
      titulo="Analítica"
      subtitulo={`Evolución del pH${museoActivo ? ` · ${museoActivo.nombre}` : ''}`}
    >
      <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
        {estado === 'ok' && serieMuseo.length === 0 ? (
          <p className="px-6 py-10 text-center text-slate-400 text-sm">
            No hay mediciones de pH para {museoActivo?.nombre ?? 'este museo'}.
          </p>
        ) : (
          <GraficaPH datos={serieMuseo} subtitulo={subtitulo} />
        )}
      </div>
    </ViewLayout>
  )
}
