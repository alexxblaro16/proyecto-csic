# Proyecto CSIC

Base de trabajo para una aplicacion de escritorio con `Electron + React + Vite` en el cliente y `Laravel` como API, con entorno backend apoyado en Docker.

Este repositorio esta preparado para que varios equipos trabajen en paralelo con el menor numero de bloqueos posible: documentacion en espanol, flujo de ramas, plantillas de incidencias y PRs, y comprobaciones automaticas basicas en GitHub Actions.

## Stack del proyecto

- Frontend de escritorio: Electron, React, Vite, Tailwind CSS, Three.js
- Backend: Laravel 12
- Infraestructura local: Docker, Nginx, MySQL, Redis
- Gestión de código: GitHub
  
## Estructura del repositorio

```text
.
|-- backend/            # API Laravel
|-- desktop/            # App Electron + React + Vite
|-- docker/             # Dockerfiles y configuracion local
|-- docs/               # Documentacion interna del equipo
|-- .github/            # Plantillas, CI y ownership
`-- docker-compose.yml  # Orquestacion local de backend
```

## Modelo de colaboracion en GitHub

Este repositorio esta preparado para trabajar asi:

- El repositorio puede mantenerse `public`.
- Solo los leads del proyecto se anaden como colaboradores con permisos de escritura.
- El resto del equipo trabaja desde forks y abre Pull Requests contra este repositorio.
- `main` debe mantenerse protegida y no recibir pushes directos.

### Reparto de responsabilidades

- Leads
  - crean ramas en el repositorio principal cuando hace falta
  - revisan y hacen merge de Pull Requests
  - pueden empujar cambios a ramas de trabajo no protegidas
- Resto del equipo
  - hace fork del repositorio principal
  - crea ramas en su fork
  - abre Pull Requests hacia `main` en este repositorio

Si cambia el grupo de leads, actualizad tambien [`.github/CODEOWNERS`](./.github/CODEOWNERS).

## Requisitos

Herramientas recomendadas para todo el equipo:

- Git
- Docker Desktop
- Node.js 22 o superior
- PHP 8.2 o superior
- Composer 2

Herramientas por necesidad:

- MySQL client si alguien quiere inspeccionar base de datos fuera de Docker
- Editor con soporte para JS, JSX, PHP, Markdown y YAML

## Puesta en marcha rapida

### Primer dia

1. Clonar el repositorio con .
2. Abrir la carpeta del proyecto.
3. Levantar el backend:
   - `docker compose up -d --build`
4. Ejecutar dependencias en docker app:
   - `composer install`
5. Ejecutar migraciones:
   - `docker compose exec app php artisan migrate --force`
6. Copiar `backend/.env.example` y crear `backend/.env`.
7. Crear la key en Docker:
   - `docker exec csic_app php artisan key:generate`
8. Entrar en `desktop/` e instalar dependencias:
   - `npm install`
9. Arrancar la app de escritorio:
   - `npm run electron:dev`
10. Verificar que la API responde en:
   - `http://localhost:8180/api/health`

### Comandos de referencia

- Backend Docker:
  - `docker compose up -d --build`
  - `docker compose down`
  - `docker compose exec app php artisan migrate --force`
- Desktop:
  - `cd desktop && npm install`
  - `cd desktop && npm run electron:dev`
  - `cd desktop && npm run build`
- Backend local:
  - `cd backend && composer install`
  - `cd backend && php artisan test`

## Puertos y servicios

- Laravel / Nginx: `8180`
- MySQL: `3106`
- Redis: `6179`
- Vite dev server: `5173`

## Que hace cada carpeta

- `backend/`
  - API Laravel
  - logica de negocio
  - acceso a datos
  - tests de backend
- `desktop/`
  - interfaz React
  - shell Electron
  - integracion Three.js y futuras escenas 3D/360
- `docker/`
  - configuracion de entorno local y backend
- `docs/`
  - acuerdos del equipo
  - onboarding
  - arquitectura
  - flujo de trabajo

## Equipos y responsabilidad principal

### UI/UX

- Definir flujos, arquitectura de informacion y diseno visual
- Mantener criterios de accesibilidad y consistencia
- Entregar especificaciones a Front End y 3D/360

### Front End

- Implementar interfaces en `desktop/src`
- Integrar componentes, estados de pantalla y consumo de API
- Coordinarse con UI/UX y Back End

### Back End

- Implementar endpoints, modelos, migraciones y logica de negocio en `backend/`
- Mantener contratos API estables
- Anadir y mantener tests de backend

### 3D / 360Photo

- Trabajar la integracion visual e interactiva en el cliente
- Mantener escenas, visores, assets y logica de rendering
- Coordinarse con UI/UX para que la capa 3D encaje en la experiencia

### QA

- Validar requisitos funcionales
- Revisar flujos criticos antes de merge a `main`
- Documentar bugs con pasos de reproduccion claros

### Deployment

- Mantener Docker, pipelines y configuracion de despliegue
- Evolucionar la carpeta `.github/workflows/`
- Preparar entornos de integracion y produccion mas adelante

## Flujo de trabajo con GitHub 

### Regla principal

No se trabaja directamente sobre `main`.
Los leads pueden empujar a ramas de trabajo propias o compartidas, pero la integracion final en `main` debe pasar por Pull Request.

### Flujo recomendado

1. Actualizar `main` en GitHub .
2. Si no eres lead, sincronizar primero tu fork con el repositorio principal.
3. Crear una rama nueva desde `main`.
4. Trabajar solo en esa rama.
5. Hacer commits pequenos y descriptivos.
6. Publicar la rama.
7. Abrir Pull Request contra este repositorio.
8. Esperar revision y checks automaticos.
9. Hacer merge cuando este aprobado.

### Convencion de ramas

- `feature/frontend-nombre-corto`
- `feature/backend-nombre-corto`
- `feature/3d-nombre-corto`
- `fix/nombre-corto`
- `docs/nombre-corto`
- `chore/nombre-corto`

## Que NO subir al repositorio

No deben subirse:

- `backend/.env`
- `backend/vendor/`
- `desktop/node_modules/`
- `desktop/dist/`
- credenciales
- secretos
- archivos locales de editor o sistema operativo

El repositorio ya incluye reglas para evitar la mayoria de estos casos, pero cada persona debe revisar el panel de cambios antes de hacer commit en GitHub Desktop.

## Validacion minima antes de abrir PR

- La app arranca localmente
- El backend responde
- `cd desktop && npm run build` funciona
- `cd backend && php artisan test` funciona
- La documentacion se actualiza si el cambio afecta al flujo del equipo

## Documentacion adicional

- [Guia de contribucion](./CONTRIBUTING.md)
- [Arquitectura](./docs/arquitectura.md)
- [Setup local](./docs/setup-local.md)
- [Roles y flujo entre equipos](./docs/roles-y-flujo.md)
- [Configuracion del repositorio en GitHub](./docs/github-repo-setup.md)

## Roadmap inmediato por equipo

- UI/UX:
  - cerrar sistema visual, componentes base y estados vacios
- Front End:
  - separar la app en carpetas por features y mover la URL de API a variables de entorno
- Back End:
  - crear primeros endpoints reales y documentar contratos
- 3D/360:
  - definir estructura de escenas, assets y rendimiento objetivo
- QA:
  - preparar checklist de validacion por flujo
- Deployment:
  - extender CI y disenar estrategia de despliegue

## Recomendaciones extra para reducir problemas

- Activar proteccion de rama en `main` desde GitHub web
- Exigir Pull Request para merge
- Exigir que el workflow de CI este en verde
- Configurar reviewers automaticos con `CODEOWNERS`
- Mantener los cambios pequenos y orientados a un solo objetivo
- Mantener como colaboradores solo a los leads del proyecto
- Pedir al resto del equipo que contribuya desde forks

## Configuracion recomendada del repositorio

La parte que se configura en GitHub web esta resumida en [docs/github-repo-setup.md](./docs/github-repo-setup.md).
