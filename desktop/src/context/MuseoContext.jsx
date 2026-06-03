// Estado GLOBAL del museo activo.
//
// Vive en el AppLayout (que no se desmonta al cambiar de pestaña), por eso el
// museo seleccionado se mantiene al navegar entre Sensores, Analítica, Alertas,
// etc. sin necesidad de localStorage.
//
// Carga los datos por museo una sola vez con cargarDashboard() y los expone a
// todas las vistas: cada una filtra por museoActivoId en lugar de mostrar todo.
import { createContext, useContext, useEffect, useState } from 'react'
import { cargarDashboard } from '../api/dashboard.js'

const MuseoContext = createContext(null)

export function MuseoProvider({ children }) {
  const [lista, setLista] = useState([]) // [{ id, nombre }]
  const [datos, setDatos] = useState({}) // { [id]: museoFormateado }
  const [museoActivoId, setMuseoActivoId] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)

  // Recarga los datos del dashboard. Mantiene el museo activo si sigue existiendo;
  // si no había ninguno seleccionado, escoge el primero de la lista.
  const recargar = () => {
    setCargando(true)
    setError(false)
    return cargarDashboard()
      .then((res) => {
        if (res && res.lista.length) {
          setDatos(res.datos)
          setLista(res.lista)
          setMuseoActivoId((prev) =>
            prev != null && res.datos[prev] ? prev : res.lista[0].id
          )
        } else {
          setDatos({})
          setLista([])
          setMuseoActivoId(null)
        }
      })
      .catch(() => setError(true))
      .finally(() => setCargando(false))
  }

  useEffect(() => {
    recargar()
  }, [])

  const museoActivo = museoActivoId != null ? datos[museoActivoId] ?? null : null

  return (
    <MuseoContext.Provider
      value={{
        lista,
        datos,
        museoActivoId,
        setMuseoActivoId,
        museoActivo,
        cargando,
        error,
        recargar,
      }}
    >
      {children}
    </MuseoContext.Provider>
  )
}

// Hook de acceso al museo activo desde cualquier vista.
export function useMuseo() {
  const ctx = useContext(MuseoContext)
  if (!ctx) {
    throw new Error('useMuseo debe usarse dentro de <MuseoProvider>')
  }
  return ctx
}
