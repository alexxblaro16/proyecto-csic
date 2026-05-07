import { useEffect, useState } from 'react'
import ThreeScene from './components/ThreeScene.jsx'
import CreateMuseumForm from './components/CreateMuseumForm.jsx'

function App() {
  const [apiStatus, setApiStatus] = useState('Not checked yet')
  const [isLoading, setIsLoading] = useState(false)

  const checkApi = async () => {
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:8180/api/health')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      setApiStatus(data.ok ? 'Laravel API is responding correctly.' : 'Laravel responded, but the payload was unexpected.')
    } catch (error) {
      setApiStatus(`Request failed: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkApi()
  }, [])

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-6 py-8 lg:px-10">
        <section className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur md:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <p className="inline-flex w-fit rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-200">
                Electron + React + Laravel starter
              </p>
              <div className="space-y-3">
                <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
                  Proyecto CSIC desktop base
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
                  This screen confirms the desktop shell is loading, the Laravel API can be reached, and a basic Three.js scene is ready for your next feature.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-sm text-slate-400">Renderer</p>
                <p className="mt-2 text-lg font-semibold text-white">Vite + React</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-sm text-slate-400">Desktop shell</p>
                <p className="mt-2 text-lg font-semibold text-white">Electron ESM</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-sm text-slate-400">Backend</p>
                <p className="mt-2 text-lg font-semibold text-white">Laravel API</p>
              </article>
            </div>
          </div>

          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">API health check</h2>
                <p className="text-sm text-slate-400">Testing `GET /api/health` on port 8180</p>
              </div>
              <button
                className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
                onClick={checkApi}
                disabled={isLoading}
              >
                {isLoading ? 'Checking...' : 'Check again'}
              </button>
            </div>

            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm leading-6 text-cyan-50">
              {apiStatus}
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
              <p>Dev renderer URL: `http://localhost:5173`</p>
              <p>API base URL: `http://localhost:8180/api`</p>
              <p>Electron preload is enabled with context isolation.</p>
            </div>
          </section>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-4">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-white">Three.js preview</h2>
              <p className="text-sm text-slate-400">A minimal animated scene to prove the rendering pipeline is ready.</p>
            </div>
            <ThreeScene />
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold text-white">Next steps</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              <li>Replace the demo cube with your real scene or model loader.</li>
              <li>Add real Laravel endpoints and swap the health check for app data.</li>
              <li>Move the API base URL into a Vite environment variable when you need multiple environments.</li>
            </ul>
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <CreateMuseumForm />

          <aside className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold text-white">Estado de la Tarea</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                Estructura de campos básicos finalizada.
              </li>
              <li className="flex items-center gap-2 text-slate-500">
                <span className="h-2 w-2 rounded-full bg-slate-600"></span>
                Lógica de validación (Sprint 2).
              </li>
              <li className="flex items-center gap-2 text-slate-500">
                <span className="h-2 w-2 rounded-full bg-slate-600"></span>
                Conexión con endpoint de Laravel (Sprint 2).
              </li>
            </ul>
          </aside>
        </section>
      </div>
    </main>
  )
}

export default App
