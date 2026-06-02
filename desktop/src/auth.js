// Capa de autenticación del front — CONECTADA al back real (Sanctum).
// POST /api/login devuelve un token; se guarda en localStorage y el cliente
// (src/api/client.js) lo envía como Bearer en cada petición.
import { api } from './api/client.js'

const TOKEN = 'virtualph_token'
const USER = 'virtualph_user'

export function getToken() {
  return localStorage.getItem(TOKEN)
}

export function estaAutenticado() {
  return !!localStorage.getItem(TOKEN)
}

export function usuarioActual() {
  try {
    return JSON.parse(localStorage.getItem(USER))
  } catch {
    return null
  }
}

export async function loginRequest(email, password) {
  if (!email || !password) {
    throw new Error('Introduce email y contraseña.')
  }
  const res = await api.post('/login', { email, password })
  if (!res?.token) {
    throw new Error('Respuesta de login inesperada.')
  }
  localStorage.setItem(TOKEN, res.token)
  if (res.user) localStorage.setItem(USER, JSON.stringify(res.user))
  return res
}

export async function logout() {
  const token = localStorage.getItem(TOKEN)
  // Limpia local primero para que la UI reaccione al instante.
  localStorage.removeItem(TOKEN)
  localStorage.removeItem(USER)
  // Revoca el token en el back (best-effort).
  if (token) {
    try {
      await api.post('/logout')
    } catch {
      /* da igual si falla: el token local ya está borrado */
    }
  }
}
