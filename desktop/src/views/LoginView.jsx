// Vista de login — mismo estilo que el resto de la app (dark slate + cyan).
// Auth mock por ahora (ver src/auth.js). Al entrar, redirige a /museos.
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginRequest } from '../auth.js'

export default function LoginView() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setCargando(true)
    try {
      await loginRequest(email, password)
      navigate('/museos', { replace: true })
    } catch (err) {
      setError(err.message || 'No se pudo iniciar sesión.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 px-6">
      {/* Resplandor cyan de fondo */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Marca */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7.5" stroke="#22d3ee" strokeWidth="1.2" />
              <text x="9" y="13" textAnchor="middle" fontSize="7" fontWeight="700" fill="#22d3ee" fontFamily="monospace">pH</text>
            </svg>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">VirtualpH</h1>
            <p className="text-sm text-slate-400">Monitor CSIC · Acceso al panel</p>
          </div>
        </div>

        {/* Tarjeta */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">Iniciar sesión</h2>
            <p className="text-sm text-slate-400">Introduce tus credenciales para continuar.</p>
          </div>

          <form className="space-y-5" onSubmit={onSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@csic.es"
                autoComplete="username"
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-slate-100 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 transition-all"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1.5">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-slate-100 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 transition-all"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-orange-400/30 bg-orange-400/10 px-4 py-2.5 text-sm text-orange-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={cargando}
              className="w-full rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
            >
              {cargando ? 'Entrando…' : 'Iniciar sesión'}
            </button>
          </form>

          <div className="mt-5 rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2.5 text-center text-xs text-slate-400">
            Demo: <span className="text-cyan-300 font-medium">admin@csic.es</span> / <span className="text-cyan-300 font-medium">password</span>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Proyecto CSIC · VirtualpH — acceso restringido al equipo
        </p>
      </div>
    </main>
  )
}
