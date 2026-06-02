// Mapa de la API: una función por cada endpoint real del back.
// Los recursos del back son apiResource de Laravel (CRUD estándar):
//   GET /x  ·  GET /x/{id}  ·  POST /x  ·  PUT /x/{id}  ·  DELETE /x/{id}
import { api } from './client.js'

// Helper: genera el CRUD estándar de un apiResource.
function recurso(nombre) {
  return {
    listar: () => api.get(`/${nombre}`),
    ver: (id) => api.get(`/${nombre}/${id}`),
    crear: (datos) => api.post(`/${nombre}`, datos),
    actualizar: (id, datos) => api.put(`/${nombre}/${id}`, datos),
    eliminar: (id) => api.del(`/${nombre}/${id}`),
  }
}

// Recursos (coinciden 1:1 con routes/api.php del back)
export const museos = recurso('museos')
export const ubicaciones = recurso('ubicaciones')
export const sensores = recurso('sensores')
export const mediciones = recurso('mediciones') // ojo: "mediciones", no "medidas"
export const campanias = recurso('campanias')
export const usuarios = recurso('usuarios')

// Imágenes: rutas especiales (no son apiResource completo)
export const imagenes = {
  porSensor: (referencia) => api.get(`/imagenes/sensor/${referencia}`),
  porUbicacion: (ubicacionId) => api.get(`/imagenes/ubicacion/${ubicacionId}`),
}
