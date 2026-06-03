# Proyecto CSIC

Base de trabajo para una aplicación de escritorio con `Electron + React + Vite` en el cliente y `Laravel` como API, con entorno backend apoyado en Docker.

Este repositorio está preparado para que varios equipos trabajen en paralelo con el menor número de bloqueos posible: Documentación en español, flujo de ramas, plantillas de incidencias y PRs, y comprobaciones automáticas básicas en GitHub Actions.

## Stack del proyecto

- Frontend de escritorio: Electron, React, Vite, Tailwind CSS, Three.js
- Backend: Laravel 12
- Infraestructura local: Docker, Nginx, MySQL, Redis, MongoDB
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

## Modelo de colaboración en GitHub

Este repositorio está preparado para trabajar así:

- El repositorio puede mantenerse `public`.
- Sólo los leads del proyecto se añaden como colaboradores con permisos de escritura.
- El resto del equipo trabaja desde forks y abre Pull Requests contra este repositorio.
- `main` debe mantenerse protegida y no recibir pushes directos.

### Reparto de responsabilidades

- Leads
  - Crean ramas en el repositorio principal cuando hace falta
  - Revisan y hacen merge de Pull Requests
  - Pueden empujar cambios a ramas de trabajo no protegidas
- Resto del equipo
  - Hace fork del repositorio principal
  - Crea ramas en su fork
  - Abre Pull Requests hacia `main` en este repositorio

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
- MongoDB Compass si alguien quiere inspeccionar los recursos visuales almacenados en MongoDB
- Editor con soporte para JS, JSX, PHP, Markdown y YAML

## Puesta en marcha rápida

> 💡 Guía detallada para arrancar el **front + back** paso a paso (con login de prueba y solución de problemas comunes): [`desktop/README.md`](./desktop/README.md).

### Primer día

1. Clonar el repositorio con .
2. Abrir la carpeta del proyecto.
3. Levantar el backend:
   - `docker compose up -d --build`
4. Instalar dependencias del backend:
   - `cd backend && composer install && composer require mongodb/laravel-mongodb`
5. Ejecutar migraciones:
   - `docker compose exec app php artisan migrate --force`
6. Verificar MongoDB desde Laravel:
   - `docker compose exec app php artisan mongo:check`
7. Copiar `backend/.env.example` y crear `backend/.env`.
8. Crear la key en Docker:
   - `docker exec csic_app php artisan key:generate`
9. Entrar en `desktop/` e instalar dependencias:
   - `npm install`
10. Arrancar la app de escritorio:
   - `npm run electron:dev`
11. Verificar que la API responde en:
   - `http://localhost:8180/api/health`

### Comandos de referencia

- Backend Docker:
  - `docker compose up -d --build`
  - `docker compose down`
  - `docker compose exec app php artisan migrate --force`
  - `docker compose exec app php artisan mongo:check`
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
- MongoDB: `27018` desde tu equipo, `27017` dentro de Docker
- Redis: `6179`
- Vite dev server: `5173`

## MongoDB local

MongoDB queda dedicado a los recursos visuales 3D o fotografias de sensores. MySQL sigue siendo la base principal para datos estructurados.

### Variables de entorno del backend

En `backend/.env` y `backend/.env.example` quedan disponibles estas variables:

- `MONGO_HOST=mongo`
- `MONGO_PORT=27017`
- `MONGO_DATABASE=csic_database`
- `MONGO_URI=` como override opcional si alguna vez necesitas una URI completa

Desde Laravel, la conexion usa el host `mongo` porque el backend corre dentro de la red de Docker. Desde tu equipo host, MongoDB se expone por `localhost:27018`.

### Verificacion rapida

1. Levanta el stack:
   - `docker compose up -d --build`
2. Comprueba que Mongo esta levantado:
   - `docker compose ps`
3. Ejecuta la comprobacion desde Laravel:
   - `docker compose exec app php artisan mongo:check`

Si el comando termina bien, Laravel puede conectarse, hacer ping a MongoDB y completar una escritura/lectura tecnica de prueba.

### Uso con MongoDB Compass

Usa esta conexion desde MongoDB Compass en tu equipo:

```text
mongodb://localhost:27018
```

Datos importantes:

- Base esperada: `csic_database`
- Acceso desde host: `localhost:27018`
- Acceso desde Docker: `mongo:27017`
- Si Compass no conecta, revisa antes `docker compose ps` y confirma que `csic_mongo` aparece levantado o healthy

Cuando entres con Compass, deberias ver la base `csic_database`. La coleccion `visual_resources` queda reservada para los recursos visuales del proyecto. El comando `mongo:check` usa una coleccion tecnica temporal llamada `__smoke_tests`.

## Qué hace cada carpeta

- `backend/`
  - API Laravel
  - Lógica de negocio
  - Acceso a datos
  - Tests de backend
- `desktop/`
  - Interfaz React
  - Shell Electron
  - Integración Three.js y futuras escenas 3D/360
- `docker/`
  - Configuración de entorno local y backend
- `docs/`
  - Acuerdos del equipo
  - Onboarding
  - Arquitectura
  - Flujo de trabajo

## Equipos y responsabilidad principal

### UI/UX

- Definir flujos, arquitectura de información y diseño visual
- Mantener criterios de accesibilidad y consistencia
- Entregar especificaciones a Front End y 3D/360

### Front End

- Implementar interfaces en `desktop/src`
- Integrar componentes, estados de pantalla y consumo de API
- Coordinarse con UI/UX y Back End

### Back End

- Implementar endpoints, modelos, migraciones y lógica de negocio en `backend/`
- Mantener contratos API estables
- Añadir y mantener tests de backend

### 3D / 360Photo

- Trabajar la integración visual e interactiva en el cliente
- Mantener escenas, visores, assets y lógica de rendering
- Coordinarse con UI/UX para que la capa 3D encaje en la experiencia

### QA

- Validar requisitos funcionales
- Revisar flujos críticos antes de merge a `main`
- Documentar bugs con pasos de reproducción claros

### Deployment

- Mantener Docker, pipelines y configuración de despliegue
- Evolucionar la carpeta `.github/workflows/`
- Preparar entornos de integración y producción más adelante

## Flujo de trabajo con GitHub 

### Regla principal

No se trabaja directamente sobre `main`.
Los leads pueden empujar a ramas de trabajo propias o compartidas, pero la integracion final en `main` debe pasar por Pull Request.

### Flujo recomendado

1. Actualizar `main` en GitHub .
2. Si no eres lead, sincronizar primero tu fork con el repositorio principal.
3. Crear una rama nueva desde `main`.
4. Trabajar sólo en esa rama.
5. Hacer commits pequeños y descriptivos.
6. Publicar la rama.
7. Abrir Pull Request contra este repositorio.
8. Esperar revisión y checks automáticos.
9. Hacer merge cuando esté aprobado.

### Convención de ramas

- `feature/frontend-nombre-corto`
- `feature/backend-nombre-corto`
- `feature/3d-nombre-corto`
- `fix/nombre-corto`
- `docs/nombre-corto`
- `chore/nombre-corto`

## Qué NO subir al repositorio

No deben subirse:

- `backend/.env`
- `backend/vendor/`
- `desktop/node_modules/`
- `desktop/dist/`
- Credenciales
- Secretos
- Archivos locales de editor o sistema operativo

El repositorio ya incluye reglas para evitar la mayoría de estos casos, pero cada persona debe revisar el panel de cambios antes de hacer commit en GitHub Desktop.

## Validación mínima antes de abrir PR

- La app arranca localmente
- El backend responde
- `cd desktop && npm run build` funciona
- `cd backend && php artisan test` funciona
- La documentación se actualiza si el cambio afecta al flujo del equipo

## Documentación adicional

- [Guía de arranque del front (desktop)](./desktop/README.md)
- [Guía de contribución](./CONTRIBUTING.md)
- [Arquitectura](./docs/arquitectura.md)
- [Setup local](./docs/setup-local.md)
- [Roles y flujo entre equipos](./docs/roles-y-flujo.md)
- [Configuración del repositorio en GitHub](./docs/github-repo-setup.md)

## Roadmap inmediato por equipo

- UI/UX:
  - Cerrar sistema visual, componentes base y estados vacíos
- Front End:
  - Separar la app en carpetas por features y mover la URL de API a variables de entorno
- Back End:
  - Crear primeros endpoints reales y documentar contratos
- 3D/360:
  - Definir estructura de escenas, assets y rendimiento objetivo
- QA:
  - Preparar checklist de validación por flujo
- Deployment:
  - Extender CI y diseñar estrategia de despliegue

## Recomendaciones extra para reducir problemas

- Activar protección de rama en `main` desde GitHub web
- Exigir Pull Request para merge
- Exigir que el workflow de CI esté en verde
- Configurar reviewers automaticos con `CODEOWNERS`
- Mantener los cambios pequeños y orientados a un solo objetivo
- Mantener como colaboradores sólo a los leads del proyecto
- Pedir al resto del equipo que contribuya desde forks

## Configuración recomendada del repositorio

La parte que se configura en GitHub web esta resumida en [docs/github-repo-setup.md](./docs/github-repo-setup.md).
