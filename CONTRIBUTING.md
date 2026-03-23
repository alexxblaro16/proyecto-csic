# Guía de contribución

## Objetivo

Esta guía define cómo trabajamos en equipo para reducir conflictos, facilitar revisiones y mantener el repositorio estable.

## Flujo oficial

- Rama principal: `main`
- No se hace push directo a `main`
- Todo entra por Pull Request
- Cada tarea debe desarrollarse en una rama propia creada desde `main`

## Convención de ramas

Usar nombres cortos, claros y en minúsculas:

- `feature/frontend-navbar`
- `feature/backend-auth`
- `feature/3d-visita-virtual`
- `fix/login-timeout`
- `docs/setup-equipo`
- `chore/actualizar-ci`

## Commits recomendados

Formato recomendado:

- `feat: añade vista inicial del dashboard`
- `fix: corrige error al cargar la api de health`
- `docs: actualiza guía de setup local`
- `chore: ajusta workflow de ci`

Prefijos recomendados:

- `feat`
- `fix`
- `docs`
- `refactor`
- `test`
- `chore`

## Cómo abrir un Pull Request

1. Verifica que tu rama parte de `main`.
2. Actualiza tu rama con los últimos cambios si hace falta.
3. Comprueba localmente lo mínimo:
   - `cd desktop && npm run build`
   - `cd backend && php artisan test`
4. Sube la rama a GitHub.
5. Abre el Pull Request usando la plantilla del repositorio.
6. Añade contexto suficiente:
   - qué cambia
   - por qué cambia
   - cómo se valida
7. Solicita revisión al equipo adecuado.

## Checklist antes de pedir review

- El cambio hace una sola cosa principal
- No incluye archivos generados ni secretos
- La rama tiene un nombre correcto
- Los commits son legibles
- La documentación se ha actualizado si el cambio afecta al flujo del equipo
- El frontend compila
- El backend pasa tests

## Revisión entre equipos

- UI/UX revisa impacto visual y de experiencia
- Front End revisa UI, arquitectura del cliente y consumo de API
- Back End revisa contratos, lógica y datos
- 3D/360 revisa rendering, assets e integración de escena
- QA revisa reproducibilidad y validación funcional
- Deployment revisa Docker, CI y cambios operativos

## Buenas prácticas

- No mezclar cambios de documentación, refactor y feature en el mismo PR si no es necesario
- Evitar PRs demasiado grandes
- Explicar decisiones no obvias dentro del PR
- Si cambias un contrato entre frontend y backend, documentarlo en el PR
- Si cambias puertos, variables o scripts, actualizar el README

## Qué hacer si algo falla

- Si falla el build de frontend, revisa dependencias y `npm run build`
- Si falla el backend, revisa `.env`, Docker y tests
- Si el problema afecta al equipo, documenta el bloqueo en la incidencia o PR
