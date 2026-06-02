// Este archivo muestra una gráfica con los niveles de pH del día.
// Los datos son inventados por ahora, no son reales.
// Cuando tengamos sensores de verdad, se cambian los datos de abajo.

// Esto trae las piezas necesarias para hacer la gráfica
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

// ─────────────────────────────────────────
// DATOS: los niveles de pH hora por hora
// Si quieres cambiar un valor, cambia el número de "ph"
// ─────────────────────────────────────────
const datosMock = [
  { hora: "00:00", ph: 7.10 },
  { hora: "01:00", ph: 7.08 },
  { hora: "02:00", ph: 7.05 },
  { hora: "03:00", ph: 7.03 },
  { hora: "04:00", ph: 7.00 },
  { hora: "05:00", ph: 6.98 },
  { hora: "06:00", ph: 6.95 },
  { hora: "07:00", ph: 6.97 },
  { hora: "08:00", ph: 7.02 },
  { hora: "09:00", ph: 7.15 },
  { hora: "10:00", ph: 7.30 },
  { hora: "11:00", ph: 7.45 },
  { hora: "12:00", ph: 7.60 },
  { hora: "13:00", ph: 7.72 },
  { hora: "14:00", ph: 7.78 },
  { hora: "15:00", ph: 7.75 },
  { hora: "16:00", ph: 7.68 },
  { hora: "17:00", ph: 7.55 },
  { hora: "18:00", ph: 7.40 },
  { hora: "19:00", ph: 7.28 },
  { hora: "20:00", ph: 7.20 },
  { hora: "21:00", ph: 7.15 },
  { hora: "22:00", ph: 7.12 },
  { hora: "23:00", ph: 7.10 },
];

// ─────────────────────────────────────────
// lo que aparece al pasar el ratón
// por encima de un punto de la gráfica
// ─────────────────────────────────────────
function Globito({ active, payload, label }) {
  // Si el ratón no está encima de nada, no mostramos nada
  if (!active || !payload?.length) return null;

  return (
    <div style={{
      background: "#1e293b",
      border: "1px solid #475569",
      borderRadius: "8px",
      padding: "10px 14px",
    }}>
      {/* La hora */}
      <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0 }}>
        {label}
      </p>
      {/* El valor de pH con coma en vez de punto */}
      <p style={{ color: "#2dd4bf", fontSize: "16px", fontWeight: "bold", margin: "4px 0 0" }}>
        pH {payload[0].value.toFixed(2).replace(".", ",")}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────
// LA GRÁFICA
// Esta es la parte que se ve en pantalla
// ─────────────────────────────────────────
export default function GraficaPH({ datos, subtitulo } = {}) {
  // Si llegan datos reales por props se usan; si no, cae al mock de prueba.
  const serie = datos && datos.length ? datos : datosMock

  return (
    <div style={{
      background: "#0f172a",
      borderRadius: "16px",
      padding: "24px",
      width: "100%",
    }}>

      {/* Título arriba */}
      <h2 style={{ color: "white", fontSize: "16px", margin: "0 0 4px 0" }}>
        Evolución del pH
      </h2>

      {/* Subtítulo: real o de prueba */}
      <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 16px 0" }}>
        {subtitulo ?? "Datos de prueba — sensor no conectado"}
      </p>

      {/* Leyenda: qué significa cada línea de color */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "16px" }}>
        <span style={{ color: "#cbd5e1", fontSize: "14px" }}>
          <span style={{ color: "#fb923c" }}>- - -</span> Demasiado ácido (pH 4)
        </span>
        <span style={{ color: "#cbd5e1", fontSize: "14px" }}>
          <span style={{ color: "#c084fc" }}>- - -</span> Demasiado básico (pH 9)
        </span>
      </div>

      {/* La gráfica — se adapta al ancho de la pantalla */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={serie} margin={{ top: 8, right: 20, left: 0, bottom: 8 }}>

          {/* Líneas de fondo */}
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />

          {/* Eje de abajo: las horas */}
          <XAxis
            dataKey="hora"
            tick={{ fill: "#94a3b8", fontSize: 13 }}
            tickLine={false}
            axisLine={{ stroke: "#334155" }}
            interval={3}
          />

          {/* Eje de la izquierda: los valores de pH del 0 al 14 */}
          <YAxis
            domain={[0, 14]}
            tickCount={8}
            tick={{ fill: "#94a3b8", fontSize: 13 }}
            tickLine={false}
            axisLine={false}
            width={36}
            tickFormatter={(n) => n.toFixed(1).replace(".", ",")}
          />

          {/* El globito al pasar el ratón */}
          <Tooltip content={<Globito />} cursor={{ stroke: "#334155" }} />

          {/* Línea naranja: alerta de pH muy ácido */}
          <ReferenceLine y={4} stroke="#fb923c" strokeDasharray="5 4" strokeWidth={1.5} />

          {/* Línea morada: alerta de pH muy básico */}
          <ReferenceLine y={9} stroke="#c084fc" strokeDasharray="5 4" strokeWidth={1.5} />

          {/* La línea principal que dibuja el pH */}
          <Line
            type="monotone"
            dataKey="ph"
            stroke="#2dd4bf"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: "#2dd4bf", stroke: "#0f172a", strokeWidth: 2 }}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}
