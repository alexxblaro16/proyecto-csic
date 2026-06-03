// Modal para crear un sensor manualmente (POST /api/sensores).
// El sensor se asocia a una UBICACIÓN del museo activo (ubicacion_id), y la
// ubicación ya pertenece a un museo, así que queda ligado al museo correcto.
import { useEffect, useState } from 'react'
import { sensores as apiSensores } from '../api/index.js'

export default function CrearSensorModal({ museoNombre, ubicaciones, onClose, onCreado }) {
  const [referencia, setReferencia] = useState('')
  const [ubicacionId, setUbicacionId] = useState('')
  const [estado, setEstado] = useState('activo')
  const [ejeX, setEjeX] = useState('')
  const [ejeY, setEjeY] = useState('')
  const [ejeZ, setEjeZ] = useState('')
  const [notas, setNotas] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')

  // Preseleccionar la primera ubicación del museo si solo hay una.
  useEffect(() => {
    if (ubicaciones.length === 1) setUbicacionId(String(ubicaciones[0].id))
  }, [ubicaciones])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const num = (v) => (v === '' ? null : Number(v))

  const enviar = async (e) => {
    e.preventDefault()
    setError('')
    if (!referencia.trim()) return setError('La referencia es obligatoria.')
    if (!ubicacionId) return setError('Selecciona una ubicación del museo.')
    setEnviando(true)
    try {
      await apiSensores.crear({
        referencia: referencia.trim(),
        ubicacion_id: Number(ubicacionId),
        estado: estado.trim() || null,
        eje_x: num(ejeX),
        eje_y: num(ejeY),
        eje_z: num(ejeZ),
        notas: notas.trim() || null,
      })
      onCreado?.()
      onClose()
    } catch (err) {
      setError(err.message || 'No se pudo crear el sensor.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={enviar}
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-slate-950/50"
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div>
            <h2 className="text-lg font-semibold text-white">Nuevo sensor</h2>
            <p className="text-sm text-slate-400">{museoNombre || 'Museo activo'}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="w-9 h-9 rounded-full border border-white/10 bg-slate-950 text-slate-400 hover:text-white hover:bg-white/5 transition flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">
          <Campo etiqueta="Referencia *">
            <input
              value={referencia}
              onChange={(e) => setReferencia(e.target.value)}
              placeholder="Ej: SENSOR-SALA-001"
              className="w-full rounded-lg bg-slate-950 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
            />
          </Campo>

          <Campo etiqueta="Ubicación *">
            <select
              value={ubicacionId}
              onChange={(e) => setUbicacionId(e.target.value)}
              className="w-full rounded-lg bg-slate-950 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
            >
              <option value="">Selecciona una sala…</option>
              {ubicaciones.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nombre || u.notas || u.posicion || `Ubicación ${u.id}`}
                </option>
              ))}
            </select>
            {ubicaciones.length === 0 && (
              <p className="text-xs text-orange-300 mt-1">
                Este museo no tiene ubicaciones. Crea una ubicación antes de añadir sensores.
              </p>
            )}
          </Campo>

          <Campo etiqueta="Estado">
            <input
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              placeholder="activo / inactivo"
              className="w-full rounded-lg bg-slate-950 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
            />
          </Campo>

          <div className="grid grid-cols-3 gap-3">
            <Campo etiqueta="Eje X">
              <input type="number" step="any" value={ejeX} onChange={(e) => setEjeX(e.target.value)}
                className="w-full rounded-lg bg-slate-950 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50" />
            </Campo>
            <Campo etiqueta="Eje Y">
              <input type="number" step="any" value={ejeY} onChange={(e) => setEjeY(e.target.value)}
                className="w-full rounded-lg bg-slate-950 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50" />
            </Campo>
            <Campo etiqueta="Eje Z">
              <input type="number" step="any" value={ejeZ} onChange={(e) => setEjeZ(e.target.value)}
                className="w-full rounded-lg bg-slate-950 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50" />
            </Campo>
          </div>

          <Campo etiqueta="Notas">
            <textarea
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              rows={2}
              className="w-full rounded-lg bg-slate-950 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50 resize-none"
            />
          </Campo>

          {error && (
            <p className="text-sm text-orange-300 bg-orange-400/10 border border-orange-400/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
        </div>

        {/* Pie */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={enviando}
            className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300 transition disabled:opacity-50"
          >
            {enviando ? 'Creando…' : 'Crear sensor'}
          </button>
        </div>
      </form>
    </div>
  )
}

function Campo({ etiqueta, children }) {
  return (
    <label className="block">
      <span className="text-xs text-slate-500 uppercase tracking-widest">{etiqueta}</span>
      <div className="mt-1">{children}</div>
    </label>
  )
}
