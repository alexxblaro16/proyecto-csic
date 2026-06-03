# VirtualpH — App de escritorio (front)

App Electron + React + Vite que consume la API de Laravel del back.

---

## 🚀 Cómo levantar el proyecto (front + back)

### 1) Back (Laravel + Docker)

Necesitas **Docker Desktop abierto** (que ponga "Engine running"). Desde la **raíz del proyecto**:

```bash
docker compose up -d
docker compose exec app composer install
docker compose exec app php artisan key:generate
docker compose exec app php artisan migrate --seed
```

Con esto el back queda en **http://localhost:8180** con datos de prueba (museos, sensores, mediciones…).

Para comprobar que responde, abre en el navegador:
```
http://localhost:8180/api/sensores
```
Debe salir un JSON con sensores.

### 2) Front (desktop)

Desde la carpeta `desktop/`:

```bash
cd desktop
npm install
npm run electron:dev      # abre la app de escritorio (Electron)
# o bien:
npm run dev               # versión web en http://localhost:5173
```

> La URL del back se configura con `VITE_API_URL` en `desktop/.env`
> (por defecto `http://localhost:8180/api`). Copia `.env.example` a `.env` si no lo tienes.

### 3) Entrar (login)

Usuario de prueba (sembrado por el back):

```
admin@csic.es  /  password
```

Hay más usuarios sembrados, todos con contraseña `password`.

---

## ⚠️ Si algo falla

- Asegúrate de que **Docker Desktop esté arrancado** antes de nada.
- **Puerto ocupado** (6179, 3106, 8180…): tienes otro docker de otro proyecto corriendo. Páralo con `docker stop <nombre_contenedor>`.
- El front carga pero **no salen datos** → el back no está levantado o falta el `migrate --seed`.
- Falta `vendor/` → ejecuta `composer install` dentro del contenedor (`docker compose exec app composer install`).

---

## 🗂️ Estructura del front (`src/`)

```text
src/
├── App.jsx                 # router (HashRouter) + rutas
├── auth.js                 # login/logout real (token Sanctum)
├── api/
│   ├── client.js           # cliente HTTP (URL base + Bearer)
│   ├── index.js            # endpoints (museos, sensores, mediciones…)
│   └── dashboard.js        # datos del dashboard + serie de pH
├── layouts/AppLayout.jsx   # app shell (sidebar + contenido)
├── components/             # Sidebar, ViewLayout, GraficaPH, modales…
└── views/                  # Login, Museos, Sensores, Analítica, Alertas, Crear Museo, Sistema
```

## 📌 Notas

- El front consume **datos reales** del back en todas las vistas (sin mock).
- El **login** usa el endpoint `POST /api/login` (Sanctum) — ese endpoint lo añadió el front al back de forma provisional, está comentado en `backend/app/Http/Controllers/AuthController.php`.
- El **link museo→sensor** no lo expone el back todavía; el front lo asocia por la `referencia` del sensor de forma provisional (comentado en `src/api/dashboard.js`).

---

## React + Vite

Plantilla base con React + Vite (HMR + ESLint). Plugin usado: `@vitejs/plugin-react`.
