# Setup local

## Requisitos

Antes de empezar, instala esto:

- Docker Desktop
- Git
- Node.js 22 o superior
- npm
- PHP 8.2 o superior
- Composer 2

Recomendado:

- GitHub Desktop
- Un editor con soporte para JS, JSX, PHP, Markdown y YAML

## Antes de arrancar

- Docker Desktop debe estar abierto.
- El backend usa Docker para Nginx, MySQL, Redis y MongoDB.
- Antes de arrancar Laravel, crea `backend/.env` a partir de `backend/.env.example`.
- Despues de crear `backend/.env`, ejecuta `php artisan key:generate`.
- Comprueba que los puertos `8180`, `3106`, `27018`, `6179` y `5173` esten libres.
- Si PowerShell bloquea `npm`, usa `npm.cmd`.

## Clonado

1. Clona el repositorio con GitHub Desktop o Git.
2. Abre la carpeta local del proyecto.

## Backend

### Preparar dependencias

```bash
cd backend
composer install
npm install
```

Si no existe `.env`, crea uno a partir de `.env.example`.

Este paso es obligatorio. Sin `.env`, Laravel no tendra la configuracion local correcta.

En PowerShell:

```powershell
Copy-Item .env.example .env
```

Genera la clave de Laravel:

```bash
php artisan key:generate
```

Este paso tambien es obligatorio. Sin `APP_KEY`, Laravel puede fallar en sesiones, cifrado y arranque.

### Levantar servicios

Desde la raiz del repositorio:

```bash
docker compose up -d --build
```

### Migraciones

```bash
docker compose exec app php artisan migrate --force
```

### Verificar MongoDB

```bash
docker compose exec app php artisan mongo:check
```

Este comando comprueba la conexion `mongodb` de Laravel, hace ping al servidor y ejecuta una escritura y lectura tecnica de prueba.

### Verificacion rapida

Abre en el navegador:

```text
http://localhost:8180/api/health
```

Deberias obtener una respuesta JSON.

### Tests y build

```bash
cd backend
php artisan test
npm run build
```

## Desktop

### Instalar dependencias

```bash
cd desktop
npm install
```

### Ejecutar la app

```bash
npm run electron:dev
```

### Build de verificacion

```bash
npm run build
```

## Problemas comunes

### La API no responde

- Verifica que Docker Desktop esta arrancado.
- Ejecuta `docker compose ps`.
- Revisa `docker compose logs app` y `docker compose logs nginx`.
- Revisa `docker compose logs mongo` si el problema afecta a MongoDB o MongoDB Compass.
- Comprueba que existe `backend/.env`.
- Comprueba que `APP_KEY` se genero con `php artisan key:generate`.

### El backend falla al hacer build

- Revisa que `npm install` se haya ejecutado en `backend/`.
- Si falta `laravel-vite-plugin`, vuelve a instalar dependencias de `backend`.

### Electron no abre

- Revisa que `npm install` se ejecuto en `desktop/`.
- Ejecuta antes `npm run build` para ver si hay errores de frontend.

### PowerShell bloquea `npm`

Usa:

```powershell
npm.cmd install
npm.cmd run build
```

### Conflicto con contenedores `csic_*`

Si Docker indica que ya existe algun contenedor `csic_*`, elimina los viejos y vuelve a levantar el stack:

```bash
docker rm -f csic_app csic_nginx csic_mysql csic_mongo csic_redis
docker compose up -d --build
```

### MongoDB Compass no conecta

- Verifica que Docker Desktop esta arrancado.
- Ejecuta `docker compose ps` y comprueba que `csic_mongo` aparece levantado o healthy.
- Usa `mongodb://localhost:27018` en MongoDB Compass.
- Recuerda que `mongo:27017` solo funciona desde otros contenedores en la red de Docker.
- Si Laravel no conecta, ejecuta `docker compose exec app php artisan mongo:check`.

### Archivos no deseados en cambios

- No subas `node_modules`, `vendor`, `dist`, `public/build` ni `.env`.
- Revisa siempre el panel de cambios de GitHub Desktop antes de commit.
