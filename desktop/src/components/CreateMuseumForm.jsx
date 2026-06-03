// Formulario Crear Museo — CONECTADO al back: POST /api/museos.
import { useState } from 'react'
import { museos } from '../api/index.js'

const VACIO = { nombre: '', ciudad: '', pais: '', descripcion: '', categoria: '' }

const CreateMuseumForm = () => {
  const [form, setForm] = useState(VACIO)
  const [enviando, setEnviando] = useState(false)
  const [resultado, setResultado] = useState(null) // { ok, msg }

  const set = (campo) => (e) => setForm((f) => ({ ...f, [campo]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setResultado(null)
    setEnviando(true)
    try {
      const creado = await museos.crear({
        nombre: form.nombre,
        ciudad: form.ciudad,
        pais: form.pais,
        descripcion: form.descripcion || null,
        categoria: form.categoria || null,
      })
      setResultado({ ok: true, msg: `Museo "${creado?.nombre ?? form.nombre}" registrado correctamente.` })
      setForm(VACIO)
    } catch (err) {
      setResultado({ ok: false, msg: err.message || 'No se pudo registrar el museo.' })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">Crear Nuevo Museo</h2>
        <p className="text-sm text-slate-400">Introduce los datos básicos para el registro en el sistema.</p>
      </div>

      <form className="space-y-5" onSubmit={onSubmit}>
        {/* Nombre del museo */}
        <div>
          <label htmlFor="museo-nombre" className="block text-sm font-medium text-slate-300 mb-1.5">
            Nombre del Museo
          </label>
          <input
            id="museo-nombre"
            type="text"
            required
            value={form.nombre}
            onChange={set('nombre')}
            placeholder="Ej: Museo Arqueológico Nacional"
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-slate-100 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 transition-all"
          />
        </div>

        {/* Ciudad y país */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="museo-ciudad" className="block text-sm font-medium text-slate-300 mb-1.5">
              Ciudad
            </label>
            <input
              id="museo-ciudad"
              type="text"
              required
              value={form.ciudad}
              onChange={set('ciudad')}
              placeholder="Ej: Madrid"
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-slate-100 outline-none focus:border-cyan-400/50 transition-all"
            />
          </div>
          <div>
            <label htmlFor="museo-pais" className="block text-sm font-medium text-slate-300 mb-1.5">
              País
            </label>
            <input
              id="museo-pais"
              type="text"
              required
              value={form.pais}
              onChange={set('pais')}
              placeholder="Ej: España"
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-slate-100 outline-none focus:border-cyan-400/50 transition-all"
            />
          </div>
        </div>

        {/* Descripción breve */}
        <div>
          <label htmlFor="museo-descripcion" className="block text-sm font-medium text-slate-300 mb-1.5">
            Descripción breve
          </label>
          <textarea
            id="museo-descripcion"
            rows="3"
            value={form.descripcion}
            onChange={set('descripcion')}
            placeholder="Resumen del museo..."
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-slate-100 outline-none focus:border-cyan-400/50 transition-all resize-none"
          ></textarea>
        </div>

        {/* Categoría */}
        <div>
          <label htmlFor="museo-categoria" className="block text-sm font-medium text-slate-300 mb-1.5">
            Categoría
          </label>
          <select
            id="museo-categoria"
            value={form.categoria}
            onChange={set('categoria')}
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-slate-100 outline-none focus:border-cyan-400/50 transition-all appearance-none cursor-pointer"
          >
            <option value="">Selecciona una categoría</option>
            <option value="Arte">Arte</option>
            <option value="Historia">Historia</option>
            <option value="Ciencia">Ciencia</option>
            <option value="Tecnología">Tecnología</option>
          </select>
        </div>

        {/* Resultado */}
        {resultado && (
          <div
            className={`rounded-xl border px-4 py-2.5 text-sm ${
              resultado.ok
                ? 'border-green-400/30 bg-green-400/10 text-green-200'
                : 'border-orange-400/30 bg-orange-400/10 text-orange-200'
            }`}
          >
            {resultado.msg}
          </div>
        )}

        {/* Botón de acción */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={enviando}
            className="w-full rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
          >
            {enviando ? 'Registrando…' : 'Registrar Museo'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreateMuseumForm
