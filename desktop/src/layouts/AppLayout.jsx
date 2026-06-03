// App shell: sidebar fija + zona de contenido donde se renderiza cada vista.
// Las vistas hijas se pintan en <Outlet/>, así cada ruta es independiente.
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}
