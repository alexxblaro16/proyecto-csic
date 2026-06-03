// Vista independiente: estado del sistema (health check API + escena 3D).
// Recoge el contenido "starter" que antes estaba mezclado en App.jsx.
import { useEffect, useState } from 'react'
import ViewLayout from '../components/ViewLayout.jsx'
import ThreeScene from '../components/ThreeScene.jsx'

const API_BASE = 'http://localhost:8180/api'

export default function SistemaView() {
  const [apiStatus, setApiStatus] = useState('Sin comprobar')
  const [isLoading, setIsLoading] = useState(false)

  const checkApi = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE}/health`)
      const data = await response.json()
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      setApiStatus(data.ok ? 'La API de Laravel responde correctamente.' : 'Laravel respondió, pero el payload no era el esperado.')
    } catch (error) {
      setApiStatus(`Petición fallida: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkApi()
  }, [])

  return (
    <ViewLayout titulo="Sistema" subtitulo="Estado y diagnóstico">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-2xl border border-white/10 bg-slate-900 p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Comprobación de la API</h2>
              <p className="text-sm text-slate-400">GET /api/health</p>
            </div>
            <button
              className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
              onClick={checkApi}
              disabled={isLoading}
            >
              {isLoading ? 'Comprobando…' : 'Comprobar de nuevo'}
            </button>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm leading-6 text-cyan-50">
            {apiStatus}
          </div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300 space-y-1">
            <p>URL base de la API: {API_BASE}</p>
            <p>Renderer (dev): http://localhost:5173</p>
            <p>Electron con contextIsolation activado.</p>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 p-4">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-white">Vista 3D</h2>
            <p className="text-sm text-slate-400">Doble clic para crear, clic para inspeccionar.</p>
          </div>
          <ThreeScene />
        </section>
      </div>
    </ViewLayout>
  )
}
