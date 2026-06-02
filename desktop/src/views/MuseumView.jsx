// Vista de Monitorización (dashboard por ubicación). Datos SOLO reales del back.
// Componentes de render basados en la rama andrea.

import { useState, useEffect, useRef } from 'react'
import { cargarDashboard } from '../api/dashboard.js'

const ESTADO_CLASES = {
  ÓPTIMO:  { badge: 'bg-green-400/10 text-green-300 border-green-400/20',   punto: 'bg-green-400'  },
  ACÍDICO: { badge: 'bg-orange-400/10 text-orange-300 border-orange-400/20', punto: 'bg-orange-400' },
  BÁSICO:  { badge: 'bg-blue-400/10 text-blue-300 border-blue-400/20',       punto: 'bg-blue-400'   },
}

const TIPO_NOTA = {
  urgente: { label: 'Urgente', fondo: 'bg-orange-500/5 border-orange-500/30', bordeSide: 'border-l-orange-400', badge: 'bg-orange-400/10 text-orange-300' },
  normal:  { label: 'Normal',  fondo: 'bg-white/3 border-white/10',           bordeSide: 'border-l-slate-500',   badge: 'bg-white/10 text-slate-300'      },
  info:    { label: 'Info',    fondo: 'bg-cyan-400/5 border-cyan-400/20',      bordeSide: 'border-l-cyan-400',    badge: 'bg-cyan-400/10 text-cyan-300'    },
}

function claseEstado(estado) {
  return ESTADO_CLASES[estado] ?? { badge: 'bg-slate-400/10 text-slate-300 border-slate-400/20', punto: 'bg-slate-400' }
}

// ── Raíz ──────────────────────────────────────────────────────────────────────

// Vista de Museos (dashboard). Se renderiza dentro del AppLayout (que ya aporta
// la sidebar global), por eso aquí solo va Header + selector de museo + contenido.
export default function MuseumView() {
  const [datos, setDatos] = useState(null)
  const [lista, setLista] = useState([])
  const [museoActivoId, setMuseoActivoId] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let activo = true
    cargarDashboard()
      .then((res) => {
        if (!activo) return
        if (res && res.lista.length) {
          setDatos(res.datos)
          setLista(res.lista)
          setMuseoActivoId(res.lista[0].id)
        }
      })
      .catch(() => {
        if (activo) setError(true)
      })
      .finally(() => {
        if (activo) setCargando(false)
      })
    return () => {
      activo = false
    }
  }, [])

  if (cargando) return <DashboardCargando />
  // Solo datos reales: si el back no responde o no hay ubicaciones, estado vacío (sin demo).
  if (error || !datos || !lista.length) return <DashboardVacio error={error} />

  const museo = datos[museoActivoId] ?? Object.values(datos)[0]

  return (
    <>
      <Header museo={museo} />
      <div className="flex-1 overflow-y-auto bg-[#0f1117]">
        <div className="px-6 pt-6">
          <SelectorMuseos lista={lista} datos={datos} activoId={museoActivoId} onSelect={setMuseoActivoId} />
        </div>
        <ContenidoPrincipal museo={museo} key={museoActivoId} />
      </div>
    </>
  )
}

// ── Estado vacío / error ────────────────────────────────────────────────────

function DashboardVacio({ error }) {
  return (
    <>
      <header className="h-14 border-b border-white/5 flex items-center px-6 bg-slate-950 flex-shrink-0">
        <span className="text-sm font-semibold text-white">Monitorización</span>
      </header>
      <div className="flex-1 flex items-center justify-center bg-[#0f1117]">
        <div className="text-center max-w-sm">
          <p className="text-slate-300 font-medium">
            {error ? 'No se pudo conectar con el back' : 'No hay ubicaciones con datos'}
          </p>
          <p className="text-sm text-slate-500 mt-2">
            {error
              ? 'Comprueba que la API esté levantada en localhost:8180 (docker compose up).'
              : 'Cuando el back tenga ubicaciones y sensores, aparecerán aquí.'}
          </p>
        </div>
      </div>
    </>
  )
}

// ── Estado de carga ───────────────────────────────────────────────────────────

function DashboardCargando() {
  return (
    <>
      <header className="h-14 border-b border-white/5 flex items-center px-6 bg-slate-950 flex-shrink-0">
        <span className="text-sm font-semibold text-white">Monitorización</span>
      </header>
      <div className="flex-1 flex items-center justify-center bg-[#0f1117]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
          <p className="text-slate-400 text-sm">Cargando ubicaciones…</p>
        </div>
      </div>
    </>
  )
}

// ── Selector de museo (dropdown personalizado) ──────────────────────────────
// Desplegable propio (no <select> nativo, que se ve mal en tema oscuro):
// totalmente estilizado, con buscador-lista, alertas por museo y cierre al
// hacer clic fuera o pulsar Escape.

function SelectorMuseos({ lista, datos, activoId, onSelect }) {
  const [abierto, setAbierto] = useState(false)
  const ref = useRef(null)
  const museo = datos[activoId]
  const alertasDe = (id) =>
    datos[id]?.sensores?.filter((s) => s.estado !== 'ÓPTIMO' && s.estado !== 'SIN DATOS').length ?? 0
  const alertCount = alertasDe(activoId)

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

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs text-slate-500 uppercase tracking-widest">Ubicación</span>

      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setAbierto((o) => !o)}
          className="flex items-center justify-between gap-3 min-w-[220px] rounded-xl border border-white/10 bg-slate-900 pl-4 pr-3 py-2 text-sm text-white hover:bg-white/5 focus:border-cyan-400/50 outline-none transition"
        >
          <span className="truncate">{museo?.nombre ?? 'Selecciona una ubicación'}</span>
          <span className={`text-slate-400 text-xs transition-transform ${abierto ? 'rotate-180' : ''}`}>▾</span>
        </button>

        {abierto && (
          <div className="absolute left-0 z-30 mt-2 w-72 max-h-80 overflow-y-auto rounded-xl border border-white/10 bg-slate-900 p-1 shadow-2xl shadow-slate-950/60">
            {lista.map((m) => {
              const activo = String(activoId) === String(m.id)
              const alertas = alertasDe(m.id)
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    onSelect(m.id)
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

      <span className="ml-auto text-xs rounded-full px-2 py-0.5 border border-green-400/30 bg-green-400/10 text-green-300">
        ● en vivo
      </span>
    </div>
  )
}

// ── Header ────────────────────────────────────────────────────────────────────

function Header({ museo }) {
  const alertas = museo.sensores.filter(s => s.estado !== 'ÓPTIMO').length
  return (
    <header className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-slate-950 flex-shrink-0">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-400 hover:text-white cursor-pointer transition">Ubicación</span>
        <span className="text-slate-600">/</span>
        <span className="font-semibold text-white">{museo.nombre}</span>
        {alertas > 0 && (
          <span className="ml-1 text-xs bg-orange-400/10 text-orange-300 border border-orange-400/20 rounded-full px-2 py-0.5">
            {alertas} alerta{alertas > 1 ? 's' : ''}
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-400 hidden lg:block">
          Actualizado: {museo.ultimaActualizacion}
        </span>
        <div className="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center text-slate-950 font-bold text-sm select-none">
          A
        </div>
      </div>
    </header>
  )
}

// ── Contenido principal ───────────────────────────────────────────────────────

function ContenidoPrincipal({ museo }) {
  const alertas = museo.sensores.filter(s => s.estado !== 'ÓPTIMO')
  const optimos = museo.sensores.filter(s => s.estado === 'ÓPTIMO')
  const pctNominal = museo.sensores.length > 0
    ? ((optimos.length / museo.sensores.length) * 100).toFixed(1)
    : '100,0'

  return (
      <div className="p-6 space-y-5">

        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Análisis de pH</h1>
            <p className="text-slate-400 text-sm mt-1">
              Monitorización química en tiempo real · Rango objetivo: 6,5 — 7,5 pH
            </p>
          </div>
          <p className="text-sm font-semibold text-cyan-400">{pctNominal} % nominal</p>
        </div>

        {alertas.length > 0 && <BannerAlertas alertas={alertas} />}

        <div className="grid grid-cols-4 gap-4">
          <TarjetaMetrica
            etiqueta="pH promedio"
            valor={museo.phPromedio.toFixed(2).replace('.', ',')}
            sub="Rango aceptable: 6,5 – 7,5"
            colorSub="text-slate-400"
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
          <TarjetaAtmosferica museo={museo} />
        </div>

        <div className="grid grid-cols-5 gap-5 items-start">
          <div className="col-span-3">
            <TablaSensores sensores={museo.sensores} nombreMuseo={museo.nombre} />
          </div>
          <div className="col-span-2">
            <PanelNotas notas={museo.notas} nombreMuseo={museo.nombre} />
          </div>
        </div>

      </div>
  )
}

// ── Banner de alertas ─────────────────────────────────────────────────────────

function BannerAlertas({ alertas }) {
  return (
    <div className="rounded-2xl border border-orange-400/20 bg-orange-400/5 p-4 flex items-start gap-3">
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
        <p className="text-sm text-slate-300 mt-0.5 leading-relaxed">
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

// ── Tarjetas de métricas ──────────────────────────────────────────────────────

function TarjetaMetrica({ etiqueta, valor, sub, colorSub, bordeAlerta }) {
  return (
    <div className={`rounded-2xl border bg-slate-900 p-5 ${bordeAlerta ? 'border-orange-400/20' : 'border-white/10'}`}>
      <p className="text-sm text-slate-400 uppercase tracking-widest mb-3">{etiqueta}</p>
      <p className="text-3xl font-bold text-white">{valor}</p>
      {sub && <p className={`text-sm mt-2 ${colorSub}`}>{sub}</p>}
    </div>
  )
}

function TarjetaAtmosferica({ museo }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
      <p className="text-sm text-slate-400 uppercase tracking-widest mb-3">Condiciones</p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xl font-bold text-white">{museo.humedad}</p>
          <p className="text-sm text-slate-400 mt-0.5">Humedad</p>
        </div>
        <div>
          <p className="text-xl font-bold text-white">{museo.temperatura}</p>
          <p className="text-sm text-slate-400 mt-0.5">Temperatura</p>
        </div>
      </div>
    </div>
  )
}

// ── Tabla de sensores ─────────────────────────────────────────────────────────

function TablaSensores({ sensores, nombreMuseo }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 overflow-hidden">
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
        <h2 className="font-semibold text-white">Tabla de sensores</h2>
        <span className="text-sm text-slate-400">{sensores.length} sensores</span>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b border-white/5">
            <th className="text-left px-5 py-3 text-sm text-slate-400 font-medium">Estado</th>
            <th className="text-left px-5 py-3 text-sm text-slate-400 font-medium">Sensor / Sala</th>
            <th className="text-left px-5 py-3 text-sm text-slate-400 font-medium">Valor pH</th>
            <th className="text-left px-5 py-3 text-sm text-slate-400 font-medium">Última lectura</th>
          </tr>
        </thead>
        <tbody>
          {sensores.map((s, i) => (
            <FilaSensor key={s.id} sensor={s} esBorde={i < sensores.length - 1} />
          ))}
        </tbody>
      </table>

      <div className="px-6 py-3 border-t border-white/5">
        <p className="text-sm text-slate-400">
          {sensores.length} sensores activos — {nombreMuseo}
        </p>
      </div>
    </div>
  )
}

function FilaSensor({ sensor, esBorde }) {
  const cls = claseEstado(sensor.estado)
  return (
    <tr className={`hover:bg-white/5 transition ${esBorde ? 'border-b border-white/5' : ''}`}>
      <td className="px-5 py-4">
        <div className={`inline-flex items-center gap-1.5 text-sm font-medium px-2.5 py-0.5 rounded-full border ${cls.badge}`}>
          <span className={`w-2 h-2 rounded-full ${cls.punto}`} />
          {sensor.estado}
        </div>
      </td>
      <td className="px-5 py-4">
        <p className="text-sm text-white font-medium">{sensor.nombre}</p>
        <p className="text-sm text-slate-400">{sensor.sala}</p>
      </td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <span className={`text-lg font-bold tabular-nums ${
            sensor.estado === 'ACÍDICO' ? 'text-orange-400' :
            sensor.estado === 'BÁSICO'  ? 'text-blue-400'   : 'text-white'
          }`}>
            {sensor.ph.toFixed(2).replace('.', ',')}
          </span>
          <BarraPH ph={sensor.ph} estado={sensor.estado} />
        </div>
      </td>
      <td className="px-5 py-4 text-sm text-slate-400">
        Hoy {sensor.ultimaLectura}
      </td>
    </tr>
  )
}

// ── Barra de pH ───────────────────────────────────────────────────────────────

function BarraPH({ ph, estado, ancho = 'w-24' }) {
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

// ── Panel de notas (solo lectura) ─────────────────────────────────────────────

function PanelNotas({ notas, nombreMuseo }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 flex flex-col">
      <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-white">Notas</h2>
          <p className="text-sm text-slate-400 mt-0.5">{nombreMuseo}</p>
        </div>
        <span className="text-sm bg-white/5 text-slate-400 rounded-full px-2.5 py-0.5 border border-white/10">
          {notas.length} nota{notas.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="p-4 space-y-2">
        {notas.map(nota => {
          const cfg = TIPO_NOTA[nota.tipo] ?? TIPO_NOTA.normal
          return (
            <div
              key={nota.id}
              className={`border-l-2 border rounded-r-lg p-3.5 ${cfg.fondo} ${cfg.bordeSide}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm px-1.5 py-0.5 rounded font-medium ${cfg.badge}`}>
                  {cfg.label}
                </span>
                <span className="text-sm text-slate-400">{nota.fecha}</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{nota.texto}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
