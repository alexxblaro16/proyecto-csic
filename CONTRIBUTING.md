# Guia de contribucion

## Objetivo

Esta guia define como trabajamos en equipo para reducir conflictos, facilitar revisiones y mantener el repositorio estable.

## Flujo oficial

- Rama principal: `main`
- No se hace push directo a `main`
- Todo entra por Pull Request
- Cada tarea debe desarrollarse en una rama propia creada desde `main`

## Permisos y roles

- El repositorio puede ser `public`.
- Solo los leads del proyecto deben tener acceso de colaborador con permisos de escritura.
- Los leads revisan, aprueban y hacen merge de Pull Requests.
- El resto del equipo trabaja desde forks y no necesita acceso de escritura al repositorio principal.
- Aunque un lead tenga acceso de escritura, `main` debe seguir protegida y el merge final debe entrar por Pull Request.

## Flujo segun tu acceso

### Si eres lead

1. Crea tu rama desde `main` en el repositorio principal o desde tu fork si prefieres aislar trabajo.
2. Empuja cambios a ramas de trabajo no protegidas cuando haga falta.
3. Abre Pull Request para integrar en `main`.
4. Revisa PRs del resto del equipo y valida checks antes del merge.

### Si no eres colaborador

1. Haz fork del repositorio principal.
2. Sincroniza tu fork con `main`.
3. Crea tu rama en el fork.
4. Trabaja y sube cambios a tu fork.
5. Abre Pull Request desde tu fork hacia `main` del repositorio principal.

## Convencion de ramas

Usar nombres cortos, claros y en minusculas:

- `feature/frontend-navbar`
- `feature/backend-auth`
- `feature/3d-visita-virtual`
- `fix/login-timeout`
- `docs/setup-equipo`
- `chore/actualizar-ci`

## Commits recomendados

Formato recomendado:

- `feat: anade vista inicial del dashboard`
- `fix: corrige error al cargar la api de health`
- `docs: actualiza guia de setup local`
- `chore: ajusta workflow de ci`

Prefijos recomendados:

- `feat`
- `fix`
- `docs`
- `refactor`
- `test`
- `chore`

## Como abrir un Pull Request

1. Verifica que tu rama parte de `main`.
2. Si trabajas desde fork, sincroniza tu rama con la ultima version del repositorio principal.
3. Actualiza tu rama con los ultimos cambios si hace falta.
4. Comprueba localmente lo minimo:
   - `cd desktop && npm run build`
   - `cd backend && php artisan test`
5. Sube la rama a GitHub.
6. Abre el Pull Request usando la plantilla del repositorio.
7. Anade contexto suficiente:
   - que cambia
   - por que cambia
   - como se valida
8. Solicita revision al equipo adecuado o a los leads si no tienes permisos de colaborador.

## Checklist antes de pedir review

- El cambio hace una sola cosa principal
- No incluye archivos generados ni secretos
- La rama tiene un nombre correcto
- Los commits son legibles
- La documentacion se ha actualizado si el cambio afecta al flujo del equipo
- El frontend compila
- El backend pasa tests

## Revision entre equipos

- UI/UX revisa impacto visual y de experiencia
- Front End revisa UI, arquitectura del cliente y consumo de API
- Back End revisa contratos, logica y datos
- 3D/360 revisa rendering, assets e integracion de escena
- QA revisa reproducibilidad y validacion funcional
- Deployment revisa Docker, CI y cambios operativos

## Buenas practicas

- No mezclar cambios de documentacion, refactor y feature en el mismo PR si no es necesario
- Evitar PRs demasiado grandes
- Explicar decisiones no obvias dentro del PR
- Si cambias un contrato entre frontend y backend, documentarlo en el PR
- Si cambias puertos, variables o scripts, actualizar el README
- Si no eres lead, evita crear ramas en el repositorio principal
- Si eres lead, evita usar el acceso de escritura para saltarte la revision de `main`

## Que hacer si algo falla

- Si falla el build de frontend, revisa dependencias y `npm run build`
- Si falla el backend, revisa `.env`, Docker y tests
- Si el problema afecta al equipo, documenta el bloqueo en la incidencia o PR
