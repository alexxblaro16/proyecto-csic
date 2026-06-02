// Cabecera + cuerpo scrollable reutilizable para las vistas que no son el
// dashboard de museos. Mantiene el mismo estilo (header de 56px, fondo #0f1117).

export default function ViewLayout({ titulo, subtitulo, children }) {
  return (
    <>
      <header className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-slate-950 flex-shrink-0">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-white">{titulo}</span>
          {subtitulo && (
            <>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400">{subtitulo}</span>
            </>
          )}
        </div>
        <div className="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center text-slate-950 font-bold text-sm select-none">
          A
        </div>
      </header>
      <div className="flex-1 overflow-y-auto bg-[#0f1117]">
        <div className="p-6">{children}</div>
      </div>
    </>
  )
}
