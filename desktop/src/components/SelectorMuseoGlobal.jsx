// Selector GLOBAL de museo, en la barra superior del AppLayout.
//
// Dropdown estilizado (no <select> nativo, que se ve mal en tema oscuro): lista
// con buscador visual, contador de alertas por museo y cierre al hacer clic
// fuera o pulsar Escape. Lee y escribe el museo activo del MuseoContext, así que
// el cambio se propaga a todas las vistas.
//
// Basado en el SelectorMuseos que vivía dentro de MuseumView, ahora elevado a
// componente global y conectado al contexto.
import { useEffect, useRef, useState } from 'react'
import { useMuseo } from '../context/MuseoContext.jsx'

export default function SelectorMuseoGlobal() {
  const { lista, datos, museoActivoId, setMuseoActivoId, cargando } = useMuseo()
  const [abierto, setAbierto] = useState(false)
  const ref = useRef(null)

  const museo = datos[museoActivoId]
  const alertasDe = (id) =>
    datos[id]?.sensores?.filter((s) => s.estado !== 'ÓPTIMO' && s.estado !== 'SIN DATOS').length ?? 0
  const alertCount = alertasDe(museoActivoId)

  useEffect(() => {
    const fuera = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setAbierto(false)
    }
    const esc = (e) => {
      if (e.key === 'Escape') setAbierto(false)
    }
    document.addEventListener('mousedown', fuera)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', fuera)
      document.removeEventListener('keydown', esc)
    }
  }, [])

  // Mientras carga o si no hay museos, mostramos un estado discreto en la barra.
  if (cargando) {
    return <span className="text-sm text-slate-500">Cargando museos…</span>
  }
  if (!lista.length) {
    return <span className="text-sm text-slate-500">Sin museos</span>
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs text-slate-500 uppercase tracking-widest">Museo</span>

      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setAbierto((o) => !o)}
          className="flex items-center justify-between gap-3 min-w-[220px] rounded-xl border border-white/10 bg-slate-900 pl-4 pr-3 py-2 text-sm text-white hover:bg-white/5 focus:border-cyan-400/50 outline-none transition"
        >
          <span className="truncate">{museo?.nombre ?? 'Selecciona un museo'}</span>
          <span className={`text-slate-400 text-xs transition-transform ${abierto ? 'rotate-180' : ''}`}>▾</span>
        </button>

        {abierto && (
          <div className="absolute left-0 z-30 mt-2 w-72 max-h-80 overflow-y-auto rounded-xl border border-white/10 bg-slate-900 p-1 shadow-2xl shadow-slate-950/60">
            {lista.map((m) => {
              const activo = String(museoActivoId) === String(m.id)
              const alertas = alertasDe(m.id)
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setMuseoActivoId(m.id)
                    setAbierto(false)
                  }}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm text-left transition ${
                    activo
                      ? 'bg-cyan-400/10 text-cyan-200 font-medium'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="truncate">{m.nombre}</span>
                  {alertas > 0 && (
                    <span className="flex-shrink-0 text-xs bg-orange-400/15 text-orange-300 rounded-full px-1.5 py-0.5 font-medium">
                      {alertas}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {museo?.ciudad && (
        <span className="text-sm text-slate-400">
          {museo.ciudad}
          {museo.pais ? `, ${museo.pais}` : ''}
        </span>
      )}

      {alertCount > 0 && (
        <span className="text-xs bg-orange-400/15 text-orange-300 rounded-full px-2 py-0.5 font-medium">
          {alertCount} alerta{alertCount > 1 ? 's' : ''}
        </span>
      )}
    </div>
  )
}
