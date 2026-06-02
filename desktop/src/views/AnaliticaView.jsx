// Vista independiente: analítica / gráfica de evolución del pH.
import ViewLayout from '../components/ViewLayout.jsx'
import GraficaPH from '../components/GraficaPH.jsx'

export default function AnaliticaView() {
  return (
    <ViewLayout titulo="Analítica" subtitulo="Evolución del pH">
      <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
        <GraficaPH />
      </div>
    </ViewLayout>
  )
}
