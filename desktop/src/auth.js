// Capa de autenticación mínima del front.
// De momento es un mock local (guarda un flag en localStorage) porque el back
// todavía no expone /api/login. Cuando Iván tenga el endpoint de Sanctum,
// se sustituye loginRequest() por la llamada real y se guarda el token.

const CLAVE = 'virtualph_auth'

export function estaAutenticado() {
  return localStorage.getItem(CLAVE) === 'true'
}

// TODO (integración back): reemplazar por
//   POST {API}/login -> { token }  y guardar el token (Sanctum).
export async function loginRequest(email, password) {
  // Validación mínima en cliente mientras no hay back de auth.
  if (!email || !password) {
    throw new Error('Introduce email y contraseña.')
  }
  localStorage.setItem(CLAVE, 'true')
  return { ok: true }
}

export function logout() {
  localStorage.removeItem(CLAVE)
}
