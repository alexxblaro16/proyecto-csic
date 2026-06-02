// Router raíz de la app de escritorio.
// HashRouter (no BrowserRouter): en producción Electron carga con loadFile()
// sobre file://, y BrowserRouter rompería al recargar/navegar.
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'

import AppLayout from './layouts/AppLayout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

import LoginView from './views/LoginView.jsx'
import MuseumView from './views/MuseumView.jsx'
import CrearMuseoView from './views/CrearMuseoView.jsx'
import AnaliticaView from './views/AnaliticaView.jsx'
import SensoresView from './views/SensoresView.jsx'
import AlertasView from './views/AlertasView.jsx'
import SistemaView from './views/SistemaView.jsx'

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Pública */}
        <Route path="/login" element={<LoginView />} />

        {/* Privadas: comparten el app shell (sidebar) y requieren sesión */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/museos" replace />} />
          <Route path="/museos" element={<MuseumView />} />
          <Route path="/crear-museo" element={<CrearMuseoView />} />
          <Route path="/analitica" element={<AnaliticaView />} />
          <Route path="/sensores" element={<SensoresView />} />
          <Route path="/alertas" element={<AlertasView />} />
          <Route path="/sistema" element={<SistemaView />} />
        </Route>

        {/* Cualquier otra ruta -> museos (o login si no hay sesión) */}
        <Route path="*" element={<Navigate to="/museos" replace />} />
      </Routes>
    </HashRouter>
  )
}

export default App
