// Vista independiente: alertas. Pendiente de derivar de las mediciones reales.
import ViewLayout from '../components/ViewLayout.jsx'

export default function AlertasView() {
  return (
    <ViewLayout titulo="Alertas" subtitulo="Sensores fuera de rango">
      <div className="rounded-2xl border border-white/10 bg-slate-900 p-8 text-center">
        <p className="text-slate-300 font-medium">Vista de alertas en construcción</p>
        <p className="text-sm text-slate-500 mt-2">
          Se calculará a partir de <span className="text-cyan-400">GET /api/mediciones</span> (pH fuera de 6,5–7,5).
        </p>
      </div>
    </ViewLayout>
  )
}
