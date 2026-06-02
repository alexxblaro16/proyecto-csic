// Vista de Analítica: gráfica de evolución del pH con datos REALES (/api/mediciones).
import { useEffect, useState } from 'react'
import ViewLayout from '../components/ViewLayout.jsx'
import GraficaPH from '../components/GraficaPH.jsx'
import { cargarSeriePh } from '../api/dashboard.js'

export default function AnaliticaView() {
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

  const subtitulo =
    estado === 'ok' && serie.length
      ? `${serie.length} mediciones reales del back`
      : estado === 'error'
        ? 'No se pudo conectar al back — mostrando datos de prueba'
        : 'Cargando datos del back…'

  return (
    <ViewLayout titulo="Analítica" subtitulo="Evolución del pH">
      <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
        {/* Si serie está vacía, GraficaPH cae a su mock automáticamente */}
        <GraficaPH datos={serie} subtitulo={subtitulo} />
      </div>
    </ViewLayout>
  )
}
