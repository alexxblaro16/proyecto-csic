// Vista independiente: sensores. Pendiente de enganchar a GET /api/sensores.
import ViewLayout from '../components/ViewLayout.jsx'

export default function SensoresView() {
  return (
    <ViewLayout titulo="Sensores" subtitulo="Listado global">
      <div className="rounded-2xl border border-white/10 bg-slate-900 p-8 text-center">
        <p className="text-slate-300 font-medium">Vista de sensores en construcción</p>
        <p className="text-sm text-slate-500 mt-2">
          Pendiente de conectar con <span className="text-cyan-400">GET /api/sensores</span> (back de Iván).
        </p>
      </div>
    </ViewLayout>
  )
}
