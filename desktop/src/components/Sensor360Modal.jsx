// Modal 360 de un sensor: se abre encima de la vista de Sensores y muestra la
// vista 3D/360 (ThreeScene) + las imágenes reales del sensor (/api/imagenes/sensor).
import { useEffect, useState } from 'react'
import ThreeScene from './ThreeScene.jsx'
import { imagenes } from '../api/index.js'

const aLista = (r) => (Array.isArray(r) ? r : r?.data ?? [])

export default function Sensor360Modal({ sensor, ubicacion, onClose }) {
  const [imgs, setImgs] = useState([])
  const [cargandoImgs, setCargandoImgs] = useState(true)

  useEffect(() => {
    if (!sensor?.referencia) return
    setCargandoImgs(true)
    imagenes
      .porSensor(sensor.referencia)
      .then((d) => setImgs(aLista(d)))
      .catch(() => setImgs([]))
      .finally(() => setCargandoImgs(false))
  }, [sensor])

  // Cerrar con Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!sensor) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-slate-950/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 sticky top-0 bg-slate-900 z-10">
          <div>
            <h2 className="text-lg font-semibold text-white">Vista 360 · {sensor.referencia}</h2>
            <p className="text-sm text-slate-400">{ubicacion || sensor.notas || 'Sensor'}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="w-9 h-9 rounded-full border border-white/10 bg-slate-950 text-slate-400 hover:text-white hover:bg-white/5 transition flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Visor 360 */}
        <div className="p-4">
          <ThreeScene />
          <p className="text-xs text-slate-500 mt-2 text-center">Arrastra para mirar alrededor · vista 360</p>
        </div>

        {/* Imágenes del sensor */}
        <div className="px-6 pb-6">
          <h3 className="text-sm font-medium text-slate-300 mb-2">Imágenes del sensor</h3>
          {cargandoImgs ? (
            <p className="text-sm text-slate-500">Cargando imágenes…</p>
          ) : imgs.length === 0 ? (
            <p className="text-sm text-slate-500">Sin imágenes registradas para este sensor.</p>
          ) : (
            <div className="space-y-2">
              {imgs.map((im) => (
                <div key={im.id ?? im._id} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-2.5">
                  <p className="text-sm text-slate-200">{im.notas || im.archivo}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {im.fecha_subida?.slice(0, 10) ?? '—'}
                    {im.tipo ? ` · ${im.tipo}` : ''}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
