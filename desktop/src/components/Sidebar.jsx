// Sidebar global de la app (app shell). Navegación real con react-router.
// Extraída de la MuseumView original para que TODAS las vistas compartan el
// mismo chrome y cada enlace lleve a una ruta independiente.
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../auth.js'

const NAV = [
  { to: '/museos', label: 'Museos' },
  { to: '/sensores', label: 'Sensores' },
  { to: '/analitica', label: 'Analítica' },
  { to: '/alertas', label: 'Alertas' },
]

const NAV_INFERIOR = [
  { to: '/sistema', label: 'Sistema' },
]

export default function Sidebar() {
  const navigate = useNavigate()

  const cerrarSesion = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col border-r border-white/5 bg-slate-950">
      <div className="p-5 border-b border-white/5">
        <LogoApp />
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV.map((item) => (
          <EnlaceNav key={item.to} to={item.to} label={item.label} />
        ))}

        <div className="pt-5">
          <NavLink
            to="/crear-museo"
            className="block w-full text-center bg-cyan-400 text-slate-950 text-sm font-semibold py-2 rounded-lg hover:bg-cyan-300 transition"
          >
            + Añadir museo
          </NavLink>
        </div>
      </nav>

      <div className="p-3 border-t border-white/5 space-y-0.5">
        {NAV_INFERIOR.map((item) => (
          <EnlaceNav key={item.to} to={item.to} label={item.label} />
        ))}
        <button
          onClick={cerrarSesion}
          className="w-full text-left px-3 py-2.5 text-sm rounded-lg transition text-slate-300 hover:text-white hover:bg-white/5"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}

function EnlaceNav({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block w-full text-left px-3 py-2.5 text-sm rounded-lg transition ${
          isActive
            ? 'bg-white/10 text-white font-medium'
            : 'text-slate-300 hover:text-white hover:bg-white/5'
        }`
      }
    >
      {label}
    </NavLink>
  )
}

export function LogoApp() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center flex-shrink-0">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7.5" stroke="#22d3ee" strokeWidth="1.2" />
          <text x="9" y="13" textAnchor="middle" fontSize="7" fontWeight="700" fill="#22d3ee" fontFamily="monospace">pH</text>
        </svg>
      </div>
      <div>
        <p className="text-sm font-bold text-white leading-tight">VirtualpH</p>
        <p className="text-xs text-slate-400 leading-tight">Monitor CSIC</p>
      </div>
    </div>
  )
}
