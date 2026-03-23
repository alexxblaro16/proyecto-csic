# Setup local

## Requisitos

- GitHub Desktop
- Docker Desktop
- Node.js 22 o superior
- PHP 8.2 o superior
- Composer 2

## Clonado

1. Clona el repositorio con GitHub Desktop.
2. Abre la carpeta local del proyecto.

## Backend

### Levantar servicios

Desde la raíz del repositorio:

```bash
docker compose up -d --build
```

### Migraciones

```bash
docker compose exec app php artisan migrate --force
```

### Verificación rápida

Abre en el navegador:

```text
http://localhost:8180/api/health
```

Deberías obtener una respuesta JSON.

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

### Build de verificación

```bash
npm run build
```

## Tests backend

```bash
cd backend
php artisan test
```

## Problemas comunes

### La API no responde

- Verifica que Docker está arrancado
- Ejecuta `docker compose ps`
- Revisa `docker compose logs app` y `docker compose logs nginx`

### Electron no abre

- Revisa que `npm install` se ejecutó en `desktop/`
- Ejecuta antes `npm run build` para ver si hay errores de frontend

### Error de base de datos

- Revisa que MySQL esté levantado
- Repite migraciones con:
  - `docker compose exec app php artisan migrate --force`

### Archivos no deseados en cambios

- No subas `node_modules`, `vendor`, `dist` ni `.env`
- Revisa siempre el panel de cambios de GitHub Desktop antes de commit
