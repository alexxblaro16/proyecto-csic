# Vista Museo

Sprint 1 — layout y estructura. Sin funcionalidad real (datos mock).

## Componentes

| Componente | Descripción | Props |
|---|---|---|
| `MuseumView` | Raíz. Gestiona qué museo está activo. | — |
| `Sidebar` | Navegación lateral con lista de museos. | `museoActivoId`, `onSelectMuseo` |
| `Header` | Barra superior con nombre del museo y contador de alertas. | `museo` |
| `ContenidoPrincipal` | Layout principal: banner + métricas + grid 3+2. | `museo` |
| `BannerAlertas` | Resumen de sensores fuera de rango. Solo se renderiza si hay alertas. | `alertas[]` |
| `TarjetaMetrica` | Tarjeta de KPI genérica. | `etiqueta`, `valor`, `sub`, `colorSub`, `bordeAlerta` |
| `TarjetaAtmosferica` | Tarjeta de humedad y temperatura del museo activo. | `museo` |
| `TablaSensores` | Tabla de todos los sensores del museo. | `sensores[]`, `nombreMuseo` |
| `FilaSensor` | Fila de la tabla. Incluye badge de estado y `BarraPH`. | `sensor`, `esBorde` |
| `BarraPH` | Barra horizontal con zona óptima marcada (6,5–7,5). | `ph`, `estado`, `ancho?` |
| `PanelNotas` | Lista de notas del museo, solo lectura. | `notas[]`, `nombreMuseo` |

## Pendiente (Sprint 2+)

- Conectar datos reales desde API
- Funcionalidad CRUD en panel de notas
- Modal de vista 360° / detalle de sensor
- Filtros y agrupación en tabla de sensores
- Gráfico de tendencia histórica
- Ajustar estilos al Figma de Gonzalo
