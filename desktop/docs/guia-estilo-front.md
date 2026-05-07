# Guía de estilo Front End — VirtualpH

Reglas comunes del equipo Front (Alejandro, Andrea, Gabriel, Kevin) para
mantener un patrón visual y técnico coherente en todo el frontend del
proyecto VirtualpH.

Esta guía no inventa nada nuevo: documenta los patrones que ya están
en el código que hemos integrado en `main` (vista Museo de Andrea +
formulario Crear Museo de Gabriel). Si surge un caso que no está aquí,
se discute en grupo y se actualiza este documento.

---

## 1. Estructura de archivos

| Carpeta | Qué va | Ejemplo |
|---|---|---|
| `desktop/src/views/` | Vistas completas (pantallas) | `MuseumView.jsx` |
| `desktop/src/components/` | Componentes reutilizables | `CreateMuseumForm.jsx` |
| `desktop/docs/` | Documentación general del Front End | `guia-estilo-front.md` |
| `desktop/docs/vistas/` | Documentación específica por vista | `museo.md` |
| `desktop/src/assets/` | NO TOCAR — equipo 3D |
| `desktop/src/components/ThreeScene.jsx` | NO TOCAR — equipo 3D |
| `backend/` y `docs/` (raíz del repo) | NO TOCAR — Back End / Pablo |

---

## 2. Convenciones de nombres

| Elemento | Convención | Ejemplo |
|---|---|---|
| Componentes (archivos y JSX) | PascalCase | `MuseumView`, `CreateMuseumForm` |
| Funciones / handlers | camelCase | `handleSubmit`, `checkApi` |
| Sub-componentes internos | PascalCase | `BarraPH`, `PanelNotas` |
| Datos mock / constantes | SCREAMING_SNAKE_CASE | `MUSEOS_DATOS`, `TIPO_NOTA` |
| IDs de inputs | kebab-case con prefijo del dominio | `museo-nombre`, `museo-ciudad` |

---

## 3. Cabeceras y comentarios

- Cabecera siempre en español, formato:

  ```js
  // Nombre del componente — qué es y en qué Sprint estamos
  ```

  Ejemplo real:

  ```js
  // Vista Museo — Sprint 1: layout y estructura, sin funcionalidad
  ```

- Comentarios JSX entre `{/* */}`, en español.
- No escribir `import React from 'react'`. El proyecto usa React 19,
  no hace falta y ensucia el archivo.

---

## 4. Paleta y reglas Tailwind

| Uso | Clase recomendada |
|---|---|
| Fondo de página | `bg-slate-950` |
| Fondo de contenedor / card | `bg-slate-900/80` o `bg-slate-900` |
| Fondo de input | `bg-slate-950` |
| Borde sutil | `border border-white/10` |
| Texto principal de títulos | `text-white` |
| Texto principal de cuerpo | `text-slate-300` |
| Texto secundario / labels | `text-slate-400` |
| Texto desactivado | `text-slate-500` o `text-slate-600` |
| Acento principal (focus, botones, indicadores activos) | `cyan-400` |
| Estado óptimo / OK | `green-400` |
| Estado acídico / alerta media | `orange-400` |
| Estado básico / aviso azul | `blue-400` |
| Estado urgente / error | tonos rojo (`red-400`) |

---

## 5. Patrón de contenedor (card)

```jsx
<section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl">
  <div className="mb-6">
    <h2 className="text-2xl font-semibold text-white">Título</h2>
    <p className="text-sm text-slate-400">Subtítulo descriptivo.</p>
  </div>
  {/* contenido del card */}
</section>
```

Variantes válidas:

- `rounded-3xl` para cards grandes (vistas, formularios principales).
- `rounded-xl` para cards pequeñas dentro de otra card.
- Sombra opcional `shadow-xl` solo en cards principales.

---

## 6. Patrón de input + label (CON ACCESIBILIDAD)

```jsx
<div>
  <label
    htmlFor="campo-x"
    className="block text-sm font-medium text-slate-300 mb-1.5"
  >
    Etiqueta
  </label>
  <input
    id="campo-x"
    type="text"
    placeholder="Ej: ..."
    className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-slate-100 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 transition-all"
  />
</div>
```

Reglas obligatorias:

- **Siempre** `htmlFor` en el label y `id` igual en el input.
  El CSIC pidió accesibilidad explícita (letra accesible, alto
  contraste). Sin la asociación label-input los lectores de
  pantalla no funcionan.
- El placeholder no sustituye al label. Debe haber siempre label visible.

---

## 7. Patrón de botón primario

```jsx
<button
  type="button"
  className="w-full rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 active:scale-[0.98]"
>
  Texto del botón
</button>
```

Variante secundaria (acción menos importante):

```jsx
<button
  type="button"
  className="rounded-full border border-white/10 bg-slate-900 px-6 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
>
  Cancelar
</button>
```

---

## 8. Estados visuales (badges e indicadores)

```jsx
{/* Bullet de estado activo */}
<span className="h-2 w-2 rounded-full bg-cyan-400" />

{/* Bullet de estado pendiente */}
<span className="h-2 w-2 rounded-full bg-slate-600" />
```

Para sensores de pH y similares:

```
estado === 'ÓPTIMO'  → green-400
estado === 'ACÍDICO' → orange-400
estado === 'BÁSICO'  → blue-400
```

Tipos de notas:

```
tipo === 'urgente' → rojo
tipo === 'info'    → azul
tipo === 'normal'  → gris claro
```

---

## 9. React — reglas

- Sin `import React from 'react'` (innecesario en React 19).
- Hooks (`useState`, `useEffect`) se importan del propio React:
  `import { useState, useEffect } from 'react'`.
- Imports relativos con extensión `.jsx`:
  `import CreateMuseumForm from './components/CreateMuseumForm.jsx'`.
- Function components con `function Nombre()` o `const Nombre = () =>`,
  mantener el mismo estilo dentro de un mismo archivo.
- Sin lógica de fetch real en Sprint 1, solo datos mock como en
  `MuseumView.jsx` (constante `MUSEOS_DATOS`).

---

## 10. Git — flujo

| Regla | Detalle / Ejemplo |
|---|---|
| Una rama por feature | `feat/vista-sala`, `feat/grafica-evolucion` |
| Prefijos válidos de rama | `feat/`, `fix/`, `docs/`, `chore/` |
| Commits con prefijo | `feat(desktop): ...`, `fix: ...`, `docs: ...` |
| Una sola cosa principal por PR | No mezclar feature + refactor + docs |
| Antes de PR: `npm run build` | Tiene que compilar limpio |
| NO tocar `backend/` | Es de Iván Herrera (Back End Lead) |
| NO tocar `docs/` raíz del repo | Es de Pablo (project doc) |
| NO tocar `assets/` ni `ThreeScene.jsx` | Avisar a Diego (3D Lead) primero |
| NO abrir PR directo al upstream | Lo hace el Front End Lead (Alejandro) |

---

## 11. PR — plantilla recomendada

```markdown
## Qué cambia
- archivos nuevos / modificados
- breve descripción funcional

## Por qué
- razón / sprint / requisito CSIC al que responde

## Cómo se valida
- `npm run build` OK
- qué se ve al hacer `npm run dev`

## Notas
- autoría / decisiones / pendientes
```

---

## 12. Accesibilidad — mínimos no negociables

- Todo input lleva label asociado por `htmlFor` + `id`.
- Contraste de texto: nunca por debajo de WCAG AA. Las clases
  `text-slate-300` sobre `bg-slate-900/950` cumplen.
- Tamaño base de texto en formularios: `text-sm` o superior. Nunca
  `text-xs` para campos editables.
- Estados de focus visibles. El `focus:ring-1 focus:ring-cyan-400/50`
  del patrón de input cumple.

---

## 13. Referencias en el repo

- Vista Museo (Andrea) — patrón de tabla, panel de notas y barra de pH:
  `desktop/src/views/MuseumView.jsx`
- Formulario Crear Museo (Gabriel) — patrón de form con accesibilidad:
  `desktop/src/components/CreateMuseumForm.jsx`
- Documentación específica de la vista Museo:
  `desktop/docs/vistas/museo.md`

---

## 14. Cambios en esta guía

Cualquier propuesta de cambio o ampliación se discute en el grupo
del equipo Front antes de modificar este archivo. Una vez acordado,
el cambio entra por PR con rama `docs/...`.

Última revisión: Sprint 1, mayo 2026.
