// Cliente HTTP base de la app. Centraliza la URL del back y el manejo de
// errores para que las vistas no repitan fetch a pelo.
// La URL sale de VITE_API_URL (.env); fallback al puerto del docker del back.

export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8180/api'

async function request(path, { method = 'GET', body, headers } = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const texto = await res.text()
  const data = texto ? JSON.parse(texto) : null

  if (!res.ok) {
    const msg = data?.message || `Error HTTP ${res.status}`
    throw new Error(msg)
  }
  return data
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body }),
  put: (path, body) => request(path, { method: 'PUT', body }),
  del: (path) => request(path, { method: 'DELETE' }),
}
