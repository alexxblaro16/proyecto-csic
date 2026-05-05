// Vista Museo — pH Precision Analysis
// Layout completo: métricas, alertas, tabla filtrable, barra pH, panel de notas
// Rama: andrea · Sprint 1

import { useState, useMemo } from 'react'

// ── Datos mock por museo ──────────────────────────────────────────────────────

const MUSEOS_DATOS = {
  1: {
    nombre: 'Materioteca UDIT',
    humedad: '43,9 %',
    temperatura: '21,5° C',
    phPromedio: 6.94,
    ultimaActualizacion: '05/02/2026 · 14:32',
    sensores: [
      { id: 1, nombre: 'Vitrina 1', sala: 'Sala Antigua',    ph: 7.02, estado: 'ÓPTIMO',  ultimaLectura: '14:32' },
      { id: 2, nombre: 'Vitrina 2', sala: 'Sala Antigua',    ph: 6.95, estado: 'ÓPTIMO',  ultimaLectura: '14:31' },
      { id: 3, nombre: 'Vitrina 3', sala: 'Sala Central',    ph: 7.18, estado: 'ÓPTIMO',  ultimaLectura: '14:32' },
      { id: 4, nombre: 'Vitrina 4', sala: 'Sala Central',    ph: 6.88, estado: 'ÓPTIMO',  ultimaLectura: '14:30' },
      { id: 5, nombre: 'Vitrina 5', sala: 'Archivo Técnico', ph: 7.31, estado: 'ÓPTIMO',  ultimaLectura: '14:32' },
      { id: 6, nombre: 'Vitrina 6', sala: 'Archivo Técnico', ph: 7.07, estado: 'ÓPTIMO',  ultimaLectura: '14:31' },
      { id: 7, nombre: 'Vitrina 7', sala: 'Depósito',        ph: 6.76, estado: 'ÓPTIMO',  ultimaLectura: '14:32' },
      { id: 8, nombre: 'Vitrina 8', sala: 'Depósito',        ph: 6.48, estado: 'ACÍDICO', ultimaLectura: '14:29' },
      { id: 9, nombre: 'Vitrina 9', sala: 'Almacén B',       ph: 6.39, estado: 'ACÍDICO', ultimaLectura: '14:28' },
    ],
    notasIniciales: [
      { id: 1, texto: 'Vitrina 8 y 9 fuera de rango — pH por debajo de 6,5. Revisar sellado con urgencia.', tipo: 'urgente', fecha: '05/02/2026' },
      { id: 2, texto: 'Próxima medición programada: 15/03/2026. Coordinar con técnico de planta.', tipo: 'info', fecha: '05/02/2026' },
      { id: 3, texto: 'Humedad estable en todos los materiales durante la última semana.', tipo: 'normal', fecha: '04/02/2026' },
    ],
  },
  2: {
    nombre: 'Inst. Historia CSIC',
    humedad: '47,2 %',
    temperatura: '20,1° C',
    phPromedio: 7.22,
    ultimaActualizacion: '05/02/2026 · 13:55',
    sensores: [
      { id: 1, nombre: 'Vitrina 1', sala: 'Sala Medieval',   ph: 7.05, estado: 'ÓPTIMO', ultimaLectura: '13:55' },
      { id: 2, nombre: 'Vitrina 2', sala: 'Sala Medieval',   ph: 6.92, estado: 'ÓPTIMO', ultimaLectura: '13:54' },
      { id: 3, nombre: 'Vitrina 3', sala: 'Sala Moderna',    ph: 7.44, estado: 'ÓPTIMO', ultimaLectura: '13:55' },
      { id: 4, nombre: 'Vitrina 4', sala: 'Sala Moderna',    ph: 7.82, estado: 'BÁSICO', ultimaLectura: '13:52' },
      { id: 5, nombre: 'Vitrina 5', sala: 'Archivo Central', ph: 6.98, estado: 'ÓPTIMO', ultimaLectura: '13:55' },
      { id: 6, nombre: 'Vitrina 6', sala: 'Depósito Norte',  ph: 7.12, estado: 'ÓPTIMO', ultimaLectura: '13:53' },
    ],
    notasIniciales: [
      { id: 1, texto: 'Vitrina 4 (Sala Moderna) con pH elevado: 7,82. Posible contaminación alcalina.', tipo: 'urgente', fecha: '05/02/2026' },
      { id: 2, texto: 'Revisión programada sala medieval: 12/02/2026.', tipo: 'info', fecha: '04/02/2026' },
    ],
  },
  3: {
    nombre: 'Museo Arqueológico',
    humedad: '52,0 %',
    temperatura: '19,8° C',
    phPromedio: 6.67,
    ultimaActualizacion: '05/02/2026 · 12:10',
    sensores: [
      { id: 1, nombre: 'Vitrina 1', sala: 'Sala Ibérica', ph: 7.08, estado: 'ÓPTIMO',  ultimaLectura: '12:10' },
      { id: 2, nombre: 'Vitrina 2', sala: 'Sala Romana',  ph: 6.74, estado: 'ÓPTIMO',  ultimaLectura: '12:09' },
      { id: 3, nombre: 'Vitrina 3', sala: 'Sala Romana',  ph: 6.51, estado: 'ÓPTIMO',  ultimaLectura: '12:10' },
      { id: 4, nombre: 'Vitrina 4', sala: 'Almacén',      ph: 6.35, estado: 'ACÍDICO', ultimaLectura: '12:05' },
    ],
    notasIniciales: [
      { id: 1, texto: 'Vitrina 4 (Almacén) fuera de rango — pH: 6,35. Revisar con urgencia.', tipo: 'urgente', fecha: '05/02/2026' },
      { id: 2, texto: 'Alta humedad (52 %). Supervisar condensación en vitrinas de sala romana.', tipo: 'normal', fecha: '04/02/2026' },
    ],
  },
  4: {
    nombre: 'Fondo Documental',
    humedad: '41,5 %',
    temperatura: '22,0° C',
    phPromedio: 7.02,
    ultimaActualizacion: '05/02/2026 · 11:45',
    sensores: [
      { id: 1, nombre: 'Sensor 1', sala: 'Sala A', ph: 7.15, estado: 'ÓPTIMO', ultimaLectura: '11:45' },
      { id: 2, nombre: 'Sensor 2', sala: 'Sala A', ph: 7.03, estado: 'ÓPTIMO', ultimaLectura: '11:44' },
      { id: 3, nombre: 'Sensor 3', sala: 'Sala B', ph: 6.88, estado: 'ÓPTIMO', ultimaLectura: '11:45' },
    ],
    notasIniciales: [
      { id: 1, texto: 'Todos los sensores en rango. Revisión trimestral: 20/05/2026.', tipo: 'info', fecha: '05/02/2026' },
    ],
  },
}

const museosMock = [
  { id: 1, nombre: 'Materioteca UDIT' },
  { id: 2, nombre: 'Inst. Historia CSIC' },
  { id: 3, nombre: 'Museo Arqueológico' },
  { id: 4, nombre: 'Fondo Documental' },
]

// ── Utilidades ────────────────────────────────────────────────────────────────

const ESTADO_CLASES = {
  ÓPTIMO:  { texto: 'text-green-400',  punto: 'bg-green-400',  badge: 'bg-green-400/10 text-green-400 border-green-400/20',   borde: 'border-l-green-400/40' },
  ACÍDICO: { texto: 'text-orange-400', punto: 'bg-orange-400', badge: 'bg-orange-400/10 text-orange-400 border-orange-400/20', borde: 'border-l-orange-400/60' },
  BÁSICO:  { texto: 'text-blue-400',   punto: 'bg-blue-400',   badge: 'bg-blue-400/10 text-blue-400 border-blue-400/20',      borde: 'border-l-blue-400/60' },
}

const TIPO_NOTA = {
  urgente: { label: 'Urgente', fondo: 'bg-orange-500/5 border-orange-500/30', bordeSide: 'border-l-orange-400', badge: 'bg-orange-400/10 text-orange-300' },
  normal:  { label: 'Normal',  fondo: 'bg-white/3 border-white/10',           bordeSide: 'border-l-slate-500',   badge: 'bg-white/10 text-slate-400' },
  info:    { label: 'Info',    fondo: 'bg-cyan-400/5 border-cyan-400/20',      bordeSide: 'border-l-cyan-400',    badge: 'bg-cyan-400/10 text-cyan-300' },
}

function claseEstado(estado) {
  return ESTADO_CLASES[estado] ?? { texto: 'text-slate-400', punto: 'bg-slate-400', badge: 'bg-slate-400/10 text-slate-400 border-slate-400/20', borde: 'border-l-slate-600' }
}

// ── Raíz ──────────────────────────────────────────────────────────────────────

export default function MuseumView() {
  const [museoActivoId, setMuseoActivoId] = useState(1)
  const museo = MUSEOS_DATOS[museoActivoId]

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      <Sidebar museoActivoId={museoActivoId} onSelectMuseo={setMuseoActivoId} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header museo={museo} />
        <ContenidoPrincipal museo={museo} key={museoActivoId} />
      </div>
    </div>
  )
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

function Sidebar({ museoActivoId, onSelectMuseo }) {
  return (
    <aside className="w-64 flex-shrink-0 flex flex-col border-r border-white/5 bg-slate-950">
      <div className="p-5 border-b border-white/5">
        <LogoApp />
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <ElementoNav label="Museos" activo />
        <ElementoNav label="Sensores" />
        <ElementoNav label="Analítica" />
        <ElementoNav label="Alertas" />

        <div className="pt-5">
          <p className="text-xs text-slate-600 uppercase tracking-widest px-3 mb-1">Inventario</p>
          {museosMock.map(m => {
            const datos      = MUSEOS_DATOS[m.id]
            const alertCount = datos.sensores.filter(s => s.estado !== 'ÓPTIMO').length
            return (
              <button
                key={m.id}
                onClick={() => onSelectMuseo(m.id)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition flex items-center justify-between ${
                  museoActivoId === m.id
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="truncate">{m.nombre}</span>
                {alertCount > 0 && (
                  <span className="ml-2 flex-shrink-0 text-xs bg-orange-400/15 text-orange-400 rounded-full px-1.5 py-0.5 font-medium">
                    {alertCount}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </nav>

      <div className="p-3 border-t border-white/5 space-y-0.5">
        <button className="w-full bg-cyan-400 text-slate-950 text-sm font-semibold py-2 rounded-lg hover:bg-cyan-300 transition mb-2">
          + Añadir museo
        </button>
        <ElementoNav label="Configuración" />
        <ElementoNav label="Soporte" />
      </div>
    </aside>
  )
}

function LogoApp() {
  // TODO: cuando tengas el logo → import logo from '../assets/logo.png'
  // y sustituye el contenido por: <img src={logo} alt="VirtualpH" className="h-8" />
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center flex-shrink-0">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7.5" stroke="#22d3ee" strokeWidth="1.2" />
          <text x="9" y="13" textAnchor="middle" fontSize="7" fontWeight="700" fill="#22d3ee" fontFamily="monospace">pH</text>
        </svg>
      </div>
      <div>
        <p className="text-sm font-bold text-white leading-tight">VirtualpH</p>
        <p className="text-xs text-slate-500 leading-tight">CSIC Monitor</p>
      </div>
    </div>
  )
}

function ElementoNav({ label, activo }) {
  return (
    <button
      className={`w-full text-left px-3 py-2 text-sm rounded-lg transition ${
        activo ? 'bg-white/10 text-white font-medium' : 'text-slate-400 hover:text-white hover:bg-white/5'
      }`}
    >
      {label}
    </button>
  )
}

// ── Header ────────────────────────────────────────────────────────────────────

function Header({ museo }) {
  const alertas = museo.sensores.filter(s => s.estado !== 'ÓPTIMO').length
  return (
    <header className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-slate-950 flex-shrink-0">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-500 hover:text-white cursor-pointer transition">Museos</span>
        <span className="text-slate-700">/</span>
        <span className="font-semibold">{museo.nombre}</span>
        {alertas > 0 && (
          <span className="ml-1 text-xs bg-orange-400/10 text-orange-400 border border-orange-400/20 rounded-full px-2 py-0.5">
            {alertas} alerta{alertas > 1 ? 's' : ''}
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-600 hidden lg:block">
          Actualizado: {museo.ultimaActualizacion}
        </span>
        <input
          placeholder="Buscar sensor..."
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-400/50 w-44"
        />
        <div className="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center text-slate-950 font-bold text-sm select-none">
          A
        </div>
      </div>
    </header>
  )
}

// ── Contenido principal ───────────────────────────────────────────────────────

function ContenidoPrincipal({ museo }) {
  const [sensor360, setSensor360]       = useState(null)
  const [filtro, setFiltro]             = useState('todos')
  const [agruparPorSala, setAgrupar]    = useState(false)

  const alertas  = museo.sensores.filter(s => s.estado !== 'ÓPTIMO')
  const optimos  = museo.sensores.filter(s => s.estado === 'ÓPTIMO')
  const nominal  = museo.sensores.length > 0
    ? ((optimos.length / museo.sensores.length) * 100).toFixed(1)
    : '100,0'

  const sensoresFiltrados = filtro === 'alertas'
    ? museo.sensores.filter(s => s.estado !== 'ÓPTIMO')
    : museo.sensores

  const salasSensores = useMemo(() => {
    const map = {}
    sensoresFiltrados.forEach(s => {
      if (!map[s.sala]) map[s.sala] = []
      map[s.sala].push(s)
    })
    return map
  }, [sensoresFiltrados])

  return (
    <div className="flex-1 overflow-y-auto bg-[#0f1117]">
      <div className="p-6 space-y-5">

        {/* Encabezado de sección */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold">pH Precision Analysis</h1>
            <p className="text-slate-400 text-sm mt-1">
              Monitorización química en tiempo real · Rango objetivo: 6,5 — 7,5 pH
            </p>
          </div>
          <p className="text-sm font-semibold text-cyan-400">{nominal} % Nominal</p>
        </div>

        {/* Banner de alertas */}
        {alertas.length > 0 && <BannerAlertas alertas={alertas} />}

        {/* Tarjetas de métricas */}
        <div className="grid grid-cols-4 gap-4">
          <TarjetaMetrica
            etiqueta="pH Promedio"
            valor={museo.phPromedio.toFixed(2).replace('.', ',')}
            sub="Rango aceptable: 6,5 – 7,5"
            colorSub="text-slate-500"
          />
          <TarjetaMetrica
            etiqueta="Sensores activos"
            valor={museo.sensores.length}
            sub="100 % conectados"
            colorSub="text-green-400"
          />
          <TarjetaMetrica
            etiqueta="Alertas activas"
            valor={alertas.length}
            sub={alertas.length === 0 ? 'Sin incidencias' : 'Requieren revisión'}
            colorSub={alertas.length === 0 ? 'text-green-400' : 'text-orange-400'}
            bordeAlerta={alertas.length > 0}
          />
          <div className="rounded-xl border border-white/10 bg-slate-900 p-5">
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Atmosférico</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xl font-bold">{museo.humedad}</p>
                <p className="text-xs text-slate-500 mt-0.5">Humedad</p>
              </div>
              <div>
                <p className="text-xl font-bold">{museo.temperatura}</p>
                <p className="text-xs text-slate-500 mt-0.5">Temperatura</p>
              </div>
            </div>
          </div>
        </div>

        {/* Grid principal: tabla (3 cols) + notas (2 cols) */}
        <div className="grid grid-cols-5 gap-5 items-start">

          {/* Tabla de sensores */}
          <div className="col-span-3 flex flex-col gap-4">
            {/* Controles de la tabla */}
            <div className="flex items-center justify-between">
              <div className="flex gap-1 bg-white/5 rounded-lg p-1">
                {[
                  ['todos',   'Todos'],
                  ['alertas', 'Solo alertas'],
                ].map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setFiltro(val)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${
                      filtro === val ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'
                    }`}
                  >
                    {label}
                    {val === 'alertas' && alertas.length > 0 && (
                      <span className="bg-orange-400/20 text-orange-400 rounded-full px-1.5 text-xs leading-4">
                        {alertas.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setAgrupar(v => !v)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition ${
                  agruparPorSala
                    ? 'border-cyan-400/40 text-cyan-400 bg-cyan-400/5'
                    : 'border-white/10 text-slate-500 hover:text-white'
                }`}
              >
                Agrupar por sala
              </button>
            </div>

            {/* Tabla */}
            <div className="rounded-xl border border-white/10 bg-slate-900 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                <h2 className="font-semibold">Sensor Matrix</h2>
                <span className="text-xs text-slate-500">
                  {sensoresFiltrados.length} / {museo.sensores.length} sensores
                </span>
              </div>

              {sensoresFiltrados.length === 0 ? (
                <EstadoVacio museo={museo.nombre} />
              ) : agruparPorSala ? (
                <TablaPorSalas salas={salasSensores} onVer360={setSensor360} />
              ) : (
                <TablaPlana sensores={sensoresFiltrados} onVer360={setSensor360} />
              )}

              <div className="px-6 py-3 border-t border-white/5 flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  {sensoresFiltrados.length} de {museo.sensores.length} activos — {museo.nombre}
                </p>
                <div className="flex gap-1">
                  <button className="border border-white/10 rounded px-2.5 py-1 text-slate-400 hover:text-white text-sm transition">‹</button>
                  <button className="border border-white/10 rounded px-2.5 py-1 text-slate-400 hover:text-white text-sm transition">›</button>
                </div>
              </div>
            </div>

            {/* Leyenda */}
            <div className="rounded-xl border border-white/10 bg-slate-900 px-5 py-3.5">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400">
                <span className="text-slate-500 uppercase tracking-widest text-xs">Referencia pH</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                  Ácido &lt; 6,5
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  Óptimo 6,5 – 7,5
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  Básico &gt; 7,5
                </div>
                <div className="ml-auto flex items-center gap-1.5 text-slate-600">
                  <span className="inline-block w-6 h-1.5 rounded bg-green-400/20 border border-dashed border-green-400/30" />
                  Zona óptima en barra
                </div>
              </div>
            </div>
          </div>

          {/* Panel de notas */}
          <div className="col-span-2">
            <PanelNotas museo={museo} />
          </div>
        </div>

      </div>

      {sensor360 && (
        <Modal360 sensor={sensor360} onCerrar={() => setSensor360(null)} />
      )}
    </div>
  )
}

// ── Banner de alertas ─────────────────────────────────────────────────────────

function BannerAlertas({ alertas }) {
  return (
    <div className="rounded-xl border border-orange-400/20 bg-orange-400/5 p-4 flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-orange-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2L14 13H2L8 2Z" stroke="#fb923c" strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M8 6v3" stroke="#fb923c" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="8" cy="11" r="0.6" fill="#fb923c" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-orange-300">
          {alertas.length} sensor{alertas.length > 1 ? 'es' : ''} fuera de rango
        </p>
        <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
          {alertas.map(a => (
            <span key={a.id} className="mr-3">
              <span className="text-orange-400">{a.nombre}</span>
              {' '}({a.sala}) — pH {a.ph.toFixed(2).replace('.', ',')}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}

// ── Tarjeta de métrica ────────────────────────────────────────────────────────

function TarjetaMetrica({ etiqueta, valor, sub, colorSub, bordeAlerta }) {
  return (
    <div className={`rounded-xl border bg-slate-900 p-5 ${bordeAlerta ? 'border-orange-400/20' : 'border-white/10'}`}>
      <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">{etiqueta}</p>
      <p className="text-3xl font-bold">{valor}</p>
      {sub && <p className={`text-xs mt-2 ${colorSub}`}>{sub}</p>}
    </div>
  )
}

// ── Tabla plana ───────────────────────────────────────────────────────────────

function TablaPlana({ sensores, onVer360 }) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-white/5">
          <th className="text-left px-5 py-3 text-xs text-slate-500 uppercase tracking-widest font-medium">Estado</th>
          <th className="text-left px-5 py-3 text-xs text-slate-500 uppercase tracking-widest font-medium">Sensor / Sala</th>
          <th className="text-left px-5 py-3 text-xs text-slate-500 uppercase tracking-widest font-medium">Valor pH</th>
          <th className="text-left px-5 py-3 text-xs text-slate-500 uppercase tracking-widest font-medium">Última lectura</th>
          <th className="text-right px-5 py-3 text-xs text-slate-500 uppercase tracking-widest font-medium">360°</th>
        </tr>
      </thead>
      <tbody>
        {sensores.map((s, i) => (
          <FilaSensor
            key={s.id}
            sensor={s}
            onVer360={onVer360}
            esBorde={i < sensores.length - 1}
          />
        ))}
      </tbody>
    </table>
  )
}

// ── Tabla agrupada por sala ───────────────────────────────────────────────────

function TablaPorSalas({ salas, onVer360 }) {
  return (
    <div>
      {Object.entries(salas).map(([sala, sensores]) => (
        <div key={sala}>
          <div className="px-5 py-2.5 bg-white/3 border-y border-white/5 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{sala}</p>
            <span className="text-xs text-slate-600">({sensores.length})</span>
          </div>
          <table className="w-full">
            <tbody>
              {sensores.map((s, i) => (
                <FilaSensor
                  key={s.id}
                  sensor={s}
                  onVer360={onVer360}
                  esBorde={i < sensores.length - 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

// ── Fila de sensor ────────────────────────────────────────────────────────────

function FilaSensor({ sensor, onVer360, esBorde }) {
  const cls = claseEstado(sensor.estado)
  return (
    <tr className={`hover:bg-white/5 transition ${esBorde ? 'border-b border-white/5' : ''}`}>
      <td className="px-5 py-3.5">
        <div className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full border ${cls.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cls.punto}`} />
          {sensor.estado}
        </div>
      </td>
      <td className="px-5 py-3.5">
        <p className="text-sm text-slate-200 font-medium">{sensor.nombre}</p>
        <p className="text-xs text-slate-500">{sensor.sala}</p>
      </td>
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          <span className={`text-lg font-bold tabular-nums ${
            sensor.estado === 'ACÍDICO' ? 'text-orange-400' :
            sensor.estado === 'BÁSICO'  ? 'text-blue-400'   : 'text-white'
          }`}>
            {sensor.ph.toFixed(2).replace('.', ',')}
          </span>
          <BaraPH ph={sensor.ph} estado={sensor.estado} />
        </div>
      </td>
      <td className="px-5 py-3.5 text-xs text-slate-500">
        Hoy {sensor.ultimaLectura}
      </td>
      <td className="px-5 py-3.5 text-right">
        <button
          onClick={() => onVer360(sensor)}
          className="border border-white/20 rounded-lg px-3 py-1.5 text-xs text-slate-300 hover:border-cyan-400/50 hover:text-cyan-400 transition"
        >
          360 VIEW
        </button>
      </td>
    </tr>
  )
}

// ── Barra de pH ───────────────────────────────────────────────────────────────

function BaraPH({ ph, estado, ancho = 'w-24' }) {
  const MIN = 5, MAX = 9
  const pct      = Math.max(0, Math.min(100, ((ph - MIN) / (MAX - MIN)) * 100))
  const optStart = ((6.5 - MIN) / (MAX - MIN)) * 100
  const optWidth = ((7.5 - 6.5) / (MAX - MIN)) * 100

  return (
    <div className={`relative h-1.5 ${ancho} bg-white/10 rounded-full flex-shrink-0`}>
      <div
        className="absolute top-0 h-full bg-green-400/20 rounded-full"
        style={{ left: `${optStart}%`, width: `${optWidth}%` }}
      />
      <div
        className={`absolute top-1/2 w-3 h-3 rounded-full border-2 border-[#0f1117] ${
          estado === 'ACÍDICO' ? 'bg-orange-400' :
          estado === 'BÁSICO'  ? 'bg-blue-400'   : 'bg-green-400'
        }`}
        style={{ left: `${pct}%`, transform: 'translate(-50%, -50%)' }}
      />
    </div>
  )
}

// ── Estado vacío ──────────────────────────────────────────────────────────────

function EstadoVacio({ museo }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-600">
          <circle cx="12" cy="12" r="9" />
          <path d="M9 10h.01M15 10h.01" strokeLinecap="round" />
          <path d="M9.5 15s.8-1.5 2.5-1.5 2.5 1.5 2.5 1.5" strokeLinecap="round" />
        </svg>
      </div>
      <p className="text-sm font-medium text-slate-400">Sin sensores registrados</p>
      <p className="text-xs text-slate-600 mt-1 max-w-xs">
        No hay sensores activos en {museo}. Contacta con el equipo técnico para vincular dispositivos.
      </p>
    </div>
  )
}

// ── Modal 360° ────────────────────────────────────────────────────────────────

function generarHistorial(sensor) {
  const base = sensor.ph
  return Array.from({ length: 8 }, (_, i) => {
    const variacion =
      sensor.estado === 'ACÍDICO' ?  i * 0.055 + (Math.random() * 0.03) :
      sensor.estado === 'BÁSICO'  ? -i * 0.055 + (Math.random() * 0.03) :
                                     (Math.random() * 0.1 - 0.05)
    const ph    = parseFloat(Math.max(5.5, Math.min(8.5, base + variacion)).toFixed(2))
    const estado = ph < 6.5 ? 'ACÍDICO' : ph > 7.5 ? 'BÁSICO' : 'ÓPTIMO'
    const horas  = i * 6
    const d      = new Date(2026, 1, 5, 14 - horas)
    return {
      fecha: `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}`,
      hora:  `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`,
      ph,
      estado,
    }
  })
}

function Modal360({ sensor, onCerrar }) {
  const [vistaActiva, setVistaActiva] = useState('360')
  const historial = generarHistorial(sensor)
  const cls = claseEstado(sensor.estado)

  const colorPh =
    sensor.estado === 'ACÍDICO' ? 'text-orange-400' :
    sensor.estado === 'BÁSICO'  ? 'text-blue-400'   : 'text-green-400'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-6"
      onClick={onCerrar}
    >
      <div
        className="bg-slate-900 border border-white/10 rounded-2xl w-full flex flex-col overflow-hidden"
        style={{ maxWidth: '1000px', height: '88vh' }}
        onClick={e => e.stopPropagation()}
      >

        {/* ── Header del modal ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#22d3ee" strokeWidth="1.3">
                <circle cx="9" cy="9" r="7" />
                <ellipse cx="9" cy="9" rx="3.5" ry="7" />
                <path d="M2 9h14" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest">Recurso visual · {sensor.sala}</p>
              <p className="font-semibold text-white">{sensor.nombre}</p>
            </div>
            <div className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${cls.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${cls.punto}`} />
              {sensor.estado}
            </div>
          </div>
          <button
            onClick={onCerrar}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition"
          >
            ✕
          </button>
        </div>

        {/* ── Cuerpo: dos columnas ── */}
        <div className="flex flex-1 overflow-hidden">

          {/* Columna izquierda — vista 3D/360 */}
          <div className="flex-1 flex flex-col p-5 gap-4 border-r border-white/5 overflow-hidden">

            {/* Tabs de vista */}
            <div className="flex gap-1 bg-black/30 rounded-lg p-1 self-start">
              {[['360', 'Vista 360°'], ['3d', 'Modelo 3D'], ['foto', 'Foto']].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setVistaActiva(val)}
                  className={`px-4 py-1.5 rounded-md text-xs font-medium transition ${
                    vistaActiva === val ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Área de previsualización grande */}
            <div className="flex-1 rounded-xl bg-black/40 border border-white/10 relative flex items-center justify-center overflow-hidden">
              {/* Fondo con patrón de cuadrícula */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Contenido central */}
              <div className="text-center relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                  {vistaActiva === '360' && (
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#22d3ee" strokeWidth="1.2" strokeOpacity="0.5">
                      <circle cx="18" cy="18" r="14" />
                      <ellipse cx="18" cy="18" rx="7" ry="14" />
                      <path d="M4 18h28" />
                    </svg>
                  )}
                  {vistaActiva === '3d' && (
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#22d3ee" strokeWidth="1.2" strokeOpacity="0.5">
                      <path d="M18 4l14 8v12L18 32 4 24V12L18 4z" />
                      <path d="M18 4v28M4 12l14 8 14-8" />
                    </svg>
                  )}
                  {vistaActiva === 'foto' && (
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#22d3ee" strokeWidth="1.2" strokeOpacity="0.5">
                      <rect x="4" y="8" width="28" height="20" rx="3" />
                      <circle cx="18" cy="18" r="6" />
                      <path d="M13 8l2-4h6l2 4" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
                <p className="text-slate-400 font-medium">Recurso no disponible</p>
                <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
                  El equipo 3D/360 aún no ha capturado este sensor.<br />Disponible en la próxima fase.
                </p>
              </div>

              {/* Badge de coordenadas esquina */}
              <div className="absolute top-4 left-4 bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-400 backdrop-blur-sm">
                {sensor.sala} · {sensor.nombre}
              </div>

              {/* Controles de vista esquina superior derecha */}
              <div className="absolute top-4 right-4 flex flex-col gap-1.5">
                {[
                  { label: '↻', title: 'Rotar' },
                  { label: '+', title: 'Zoom in' },
                  { label: '−', title: 'Zoom out' },
                  { label: '⛶', title: 'Pantalla completa' },
                ].map(({ label, title }) => (
                  <button
                    key={title}
                    title={title}
                    className="w-8 h-8 rounded-lg bg-black/50 border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition text-sm backdrop-blur-sm flex items-center justify-center"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Minimapa de sala */}
            <div className="h-28 rounded-xl bg-black/30 border border-white/10 relative overflow-hidden flex-shrink-0">
              <p className="absolute top-2.5 left-3 text-xs text-slate-500 uppercase tracking-widest z-10">
                Plano de sala
              </p>
              <MinimapSala sala={sensor.sala} sensor={sensor.nombre} />
            </div>
          </div>

          {/* Columna derecha — datos y acciones */}
          <div className="w-80 flex-shrink-0 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-5 space-y-5">

              {/* pH actual grande */}
              <div className="rounded-xl bg-slate-800/60 border border-white/10 p-5 text-center">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">pH actual</p>
                <p className={`text-6xl font-bold tabular-nums ${colorPh}`}>
                  {sensor.ph.toFixed(2).replace('.', ',')}
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  Rango seguro: 6,50 – 7,50 · Última: hoy {sensor.ultimaLectura}
                </p>
                <div className="mt-4">
                  <BaraPH ph={sensor.ph} estado={sensor.estado} ancho="w-full" />
                  <div className="flex justify-between text-xs text-slate-600 mt-1.5 px-0.5">
                    <span>5,0</span>
                    <span className="text-green-600">6,5 – 7,5</span>
                    <span>9,0</span>
                  </div>
                </div>
              </div>

              {/* Lecturas recientes */}
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Lecturas recientes</p>
                <div className="rounded-xl border border-white/10 overflow-hidden">
                  <div className="grid grid-cols-3 px-4 py-2 border-b border-white/5 text-xs text-slate-600 uppercase tracking-widest">
                    <span>Fecha</span>
                    <span className="text-center">pH</span>
                    <span className="text-right">Estado</span>
                  </div>
                  {historial.map((h, i) => {
                    const hcls = claseEstado(h.estado)
                    return (
                      <div
                        key={i}
                        className={`grid grid-cols-3 items-center px-4 py-2.5 text-xs ${
                          i < historial.length - 1 ? 'border-b border-white/5' : ''
                        } ${i === 0 ? 'bg-white/3' : ''}`}
                      >
                        <span className="text-slate-500">{h.fecha} {h.hora}</span>
                        <span className={`text-center font-bold tabular-nums ${
                          h.estado === 'ACÍDICO' ? 'text-orange-400' :
                          h.estado === 'BÁSICO'  ? 'text-blue-400'   : 'text-white'
                        }`}>
                          {h.ph.toFixed(2).replace('.', ',')}
                        </span>
                        <div className="flex justify-end">
                          <span className={`text-xs px-1.5 py-0.5 rounded-full border ${hcls.badge}`}>
                            {h.estado}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Mini gráfico de tendencia */}
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Tendencia pH (48 h)</p>
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <MiniGrafico historial={historial} />
                </div>
              </div>

              {/* Info atmosférica */}
              <div className="rounded-xl border border-white/10 bg-slate-800/40 p-4">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Condiciones ambientales</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Humedad', valor: '43,9 %' },
                    { label: 'Temperatura', valor: '21,5° C' },
                    { label: 'Sensor ID', valor: `SNS-00${sensor.id}` },
                    { label: 'Protocolo', valor: 'pH-ISO-10' },
                  ].map(({ label, valor }) => (
                    <div key={label}>
                      <p className="text-xs text-slate-600">{label}</p>
                      <p className="text-sm font-medium text-slate-300 mt-0.5">{valor}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Acciones fijas abajo */}
            <div className="p-4 border-t border-white/5 space-y-2 flex-shrink-0">
              {sensor.estado !== 'ÓPTIMO' && (
                <button className="w-full bg-orange-400/10 border border-orange-400/30 text-orange-300 text-sm font-semibold py-2.5 rounded-xl hover:bg-orange-400/20 transition">
                  Reportar incidencia
                </button>
              )}
              <button className="w-full bg-white/5 border border-white/10 text-slate-300 text-sm font-medium py-2.5 rounded-xl hover:bg-white/10 hover:text-white transition">
                Ver historial completo
              </button>
              <button className="w-full bg-white/5 border border-white/10 text-slate-300 text-sm font-medium py-2.5 rounded-xl hover:bg-white/10 hover:text-white transition">
                Descargar datos CSV
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// ── Minimapa de sala ──────────────────────────────────────────────────────────

function MinimapSala({ sala, sensor }) {
  const salas = [
    { nombre: 'Sala Antigua',    x: 10,  y: 10,  w: 70,  h: 50 },
    { nombre: 'Sala Central',    x: 90,  y: 10,  w: 80,  h: 50 },
    { nombre: 'Archivo Técnico', x: 180, y: 10,  w: 60,  h: 50 },
    { nombre: 'Depósito',        x: 10,  y: 70,  w: 70,  h: 40 },
    { nombre: 'Almacén B',       x: 90,  y: 70,  w: 80,  h: 40 },
    { nombre: 'Sala Medieval',   x: 10,  y: 10,  w: 75,  h: 50 },
    { nombre: 'Sala Moderna',    x: 95,  y: 10,  w: 75,  h: 50 },
    { nombre: 'Archivo Central', x: 180, y: 10,  w: 60,  h: 50 },
    { nombre: 'Depósito Norte',  x: 10,  y: 70,  w: 75,  h: 40 },
    { nombre: 'Sala Ibérica',    x: 10,  y: 10,  w: 90,  h: 55 },
    { nombre: 'Sala Romana',     x: 110, y: 10,  w: 90,  h: 55 },
    { nombre: 'Almacén',         x: 10,  y: 75,  w: 90,  h: 35 },
    { nombre: 'Sala A',          x: 10,  y: 10,  w: 100, h: 55 },
    { nombre: 'Sala B',          x: 120, y: 10,  w: 100, h: 55 },
  ]

  const visibles = salas.filter((_, i, arr) => {
    const nombres = arr.map(s => s.nombre)
    return nombres.indexOf(sala) !== -1
      ? true
      : i < 3
  }).slice(0, 5)

  return (
    <svg width="100%" height="100%" viewBox="0 0 260 120" className="opacity-70">
      {salas.map(s => {
        const esActual = s.nombre === sala
        return (
          <g key={s.nombre}>
            <rect
              x={s.x} y={s.y} width={s.w} height={s.h}
              rx="3"
              fill={esActual ? 'rgba(34,211,238,0.12)' : 'rgba(255,255,255,0.03)'}
              stroke={esActual ? 'rgba(34,211,238,0.5)' : 'rgba(255,255,255,0.08)'}
              strokeWidth="1"
            />
            {esActual && (
              <>
                <circle cx={s.x + s.w / 2} cy={s.y + s.h / 2} r="4" fill="#22d3ee" opacity="0.9" />
                <circle cx={s.x + s.w / 2} cy={s.y + s.h / 2} r="8" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />
                <text x={s.x + s.w / 2} y={s.y + s.h + 9} textAnchor="middle" fontSize="6" fill="#22d3ee" opacity="0.7">
                  {sensor}
                </text>
              </>
            )}
            {!esActual && (
              <text x={s.x + s.w / 2} y={s.y + s.h / 2 + 2} textAnchor="middle" fontSize="5.5" fill="rgba(148,163,184,0.5)">
                {s.nombre.split(' ')[0]}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

// ── Mini gráfico de tendencia ─────────────────────────────────────────────────

function MiniGrafico({ historial }) {
  const invertido = [...historial].reverse()
  const valores   = invertido.map(h => h.ph)
  const minV      = Math.min(...valores) - 0.1
  const maxV      = Math.max(...valores) + 0.1
  const rango     = maxV - minV || 1
  const W = 220, H = 60

  const puntos = valores.map((v, i) => {
    const x = (i / (valores.length - 1)) * W
    const y = H - ((v - minV) / rango) * H
    return `${x},${y}`
  })

  const areaPoints = `0,${H} ${puntos.join(' ')} ${W},${H}`

  return (
    <div className="relative">
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
        {/* Zona óptima */}
        <rect
          x={0}
          y={H - ((7.5 - minV) / rango) * H}
          width={W}
          height={((7.5 - 6.5) / rango) * H}
          fill="rgba(74,222,128,0.06)"
        />
        {/* Línea 6.5 */}
        <line
          x1={0} y1={H - ((6.5 - minV) / rango) * H}
          x2={W} y2={H - ((6.5 - minV) / rango) * H}
          stroke="rgba(74,222,128,0.2)" strokeWidth="0.5" strokeDasharray="3,3"
        />
        {/* Línea 7.5 */}
        <line
          x1={0} y1={H - ((7.5 - minV) / rango) * H}
          x2={W} y2={H - ((7.5 - minV) / rango) * H}
          stroke="rgba(74,222,128,0.2)" strokeWidth="0.5" strokeDasharray="3,3"
        />
        {/* Área rellena */}
        <polygon points={areaPoints} fill="rgba(34,211,238,0.06)" />
        {/* Línea principal */}
        <polyline
          points={puntos.join(' ')}
          fill="none"
          stroke="#22d3ee"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
        {/* Puntos */}
        {puntos.map((p, i) => {
          const [x, y] = p.split(',').map(Number)
          const h = invertido[i]
          const col = h.estado === 'ACÍDICO' ? '#fb923c' : h.estado === 'BÁSICO' ? '#60a5fa' : '#4ade80'
          return <circle key={i} cx={x} cy={y} r="2.5" fill={col} />
        })}
      </svg>
      <div className="flex justify-between text-xs text-slate-600 mt-1">
        <span>{invertido[0]?.fecha} {invertido[0]?.hora}</span>
        <span>{invertido[invertido.length - 1]?.fecha} {invertido[invertido.length - 1]?.hora}</span>
      </div>
    </div>
  )
}

// ── Panel de notas ────────────────────────────────────────────────────────────

function PanelNotas({ museo }) {
  const [notas, setNotas]           = useState(museo.notasIniciales)
  const [texto, setTexto]           = useState('')
  const [tipoNueva, setTipoNueva]   = useState('normal')
  const [filtroNotas, setFiltro]    = useState('todas')

  function añadirNota() {
    const limpio = texto.trim()
    if (!limpio) return
    setNotas(prev => [{
      id: Date.now(),
      texto: limpio,
      tipo: tipoNueva,
      fecha: new Date().toLocaleDateString('es-ES'),
    }, ...prev])
    setTexto('')
  }

  const notasFiltradas = filtroNotas === 'todas'
    ? notas
    : notas.filter(n => n.tipo === filtroNotas)

  const conteo = {
    urgente: notas.filter(n => n.tipo === 'urgente').length,
    normal:  notas.filter(n => n.tipo === 'normal').length,
    info:    notas.filter(n => n.tipo === 'info').length,
  }

  return (
    <div className="rounded-xl border border-white/10 bg-slate-900 flex flex-col" style={{ minHeight: '600px' }}>

      {/* Cabecera */}
      <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-white">Notas rápidas</h2>
          <p className="text-xs text-slate-500 mt-0.5">{museo.nombre}</p>
        </div>
        <span className="text-xs bg-white/5 text-slate-500 rounded-full px-2.5 py-0.5 border border-white/10">
          {notas.length} nota{notas.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Nueva nota */}
      <div className="p-4 border-b border-white/5 space-y-3">
        <textarea
          value={texto}
          onChange={e => setTexto(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) añadirNota() }}
          placeholder="Escribe una observación o incidencia..."
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400/50 resize-none"
        />

        {/* Selector de tipo */}
        <div className="flex gap-1.5">
          {Object.entries(TIPO_NOTA).map(([tipo, cfg]) => (
            <button
              key={tipo}
              onClick={() => setTipoNueva(tipo)}
              className={`flex-1 text-xs py-1.5 rounded-lg border transition font-medium ${
                tipoNueva === tipo
                  ? cfg.fondo + ' text-white border-white/20'
                  : 'border-white/10 text-slate-500 hover:text-slate-300'
              }`}
            >
              {cfg.label}
            </button>
          ))}
        </div>

        <button
          onClick={añadirNota}
          disabled={!texto.trim()}
          className="w-full bg-cyan-400 text-slate-950 text-sm font-semibold py-2 rounded-lg hover:bg-cyan-300 transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Añadir nota
        </button>
        <p className="text-xs text-slate-600 text-center">⌘ + Enter para añadir rápido</p>
      </div>

      {/* Filtros de notas */}
      <div className="px-4 py-2.5 border-b border-white/5 flex gap-0.5">
        {[
          ['todas',   'Todas',    notas.length],
          ['urgente', 'Urgentes', conteo.urgente],
          ['normal',  'Normales', conteo.normal],
          ['info',    'Info',     conteo.info],
        ].map(([val, label, count]) => (
          <button
            key={val}
            onClick={() => setFiltro(val)}
            className={`flex-1 px-1 py-1.5 rounded-md text-xs transition font-medium ${
              filtroNotas === val
                ? 'bg-white/10 text-white'
                : 'text-slate-500 hover:text-white'
            }`}
          >
            {label}
            {count > 0 && (
              <span className={`ml-1 ${filtroNotas === val ? 'text-slate-400' : 'text-slate-600'}`}>
                {count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lista de notas */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {notasFiltradas.length === 0 && (
          <p className="text-xs text-slate-600 text-center pt-8">
            {filtroNotas === 'todas' ? 'Sin notas todavía' : `Sin notas de tipo "${filtroNotas}"`}
          </p>
        )}
        {notasFiltradas.map(nota => {
          const cfg = TIPO_NOTA[nota.tipo] ?? TIPO_NOTA.normal
          return (
            <div
              key={nota.id}
              className={`group relative border-l-2 border rounded-r-lg p-3.5 ${cfg.fondo} ${cfg.bordeSide}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${cfg.badge}`}>
                  {cfg.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600">{nota.fecha}</span>
                  <button
                    onClick={() => setNotas(prev => prev.filter(n => n.id !== nota.id))}
                    className="text-slate-600 hover:text-red-400 transition opacity-0 group-hover:opacity-100 text-xs leading-none"
                    title="Eliminar nota"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{nota.texto}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
