// Envoltorio de rutas privadas: si no hay sesión, redirige al login.
import { Navigate } from 'react-router-dom'
import { estaAutenticado } from '../auth.js'

export default function ProtectedRoute({ children }) {
  if (!estaAutenticado()) {
    return <Navigate to="/login" replace />
  }
  return children
}
