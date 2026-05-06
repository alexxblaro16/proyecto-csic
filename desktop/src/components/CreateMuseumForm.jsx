import React from 'react';

const CreateMuseumForm = () => {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">Crear Nuevo Museo</h2>
        <p className="text-sm text-slate-400">Introduce los datos básicos para el registro en el sistema.</p>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        {/* Nombre del Museo */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Nombre del Museo
          </label>
          <input 
            type="text" 
            placeholder="Ej: Museo Arqueológico Nacional"
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-slate-100 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 transition-all"
          />
        </div>

        {/* Ubicación y Ciudad */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Ciudad
            </label>
            <input 
              type="text" 
              placeholder="Ej: Madrid"
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-slate-100 outline-none focus:border-cyan-400/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              País
            </label>
            <input 
              type="text" 
              placeholder="Ej: España"
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-slate-100 outline-none focus:border-cyan-400/50 transition-all"
            />
          </div>
        </div>

        {/* Descripción corta */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Descripción breve
          </label>
          <textarea 
            rows="3"
            placeholder="Resumen del museo..."
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-slate-100 outline-none focus:border-cyan-400/50 transition-all resize-none"
          ></textarea>
        </div>

        {/* Categoría (Select simple) */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Categoría
          </label>
          <select className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-slate-100 outline-none focus:border-cyan-400/50 transition-all appearance-none cursor-pointer">
            <option value="">Selecciona una categoría</option>
            <option value="arte">Arte</option>
            <option value="historia">Historia</option>
            <option value="ciencia">Ciencia</option>
            <option value="tecnologia">Tecnología</option>
          </select>
        </div>

        {/* Botón de acción (solo visual) */}
        <div className="pt-4">
          <button 
            type="button"
            className="w-full rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 active:scale-[0.98]"
          >
            Registrar Museo
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateMuseumForm;