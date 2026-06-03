// App shell: sidebar fija + barra superior con el selector global de museo +
// zona de contenido donde se renderiza cada vista.
//
// El MuseoProvider envuelve todo el shell, así el museo activo se comparte entre
// la barra superior y todas las vistas hijas (<Outlet/>). Como el AppLayout no
// se desmonta al cambiar de ruta, el museo seleccionado se mantiene al navegar.
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import { MuseoProvider } from '../context/MuseoContext.jsx'
import SelectorMuseoGlobal from '../components/SelectorMuseoGlobal.jsx'

export default function AppLayout() {
  return (
    <MuseoProvider>
      <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Barra superior global: selector de museo a la izquierda */}
          <header className="h-14 flex-shrink-0 border-b border-white/5 bg-slate-950 flex items-center px-6">
            <SelectorMuseoGlobal />
          </header>

          {/* Contenido de cada vista */}
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </MuseoProvider>
  )
}
