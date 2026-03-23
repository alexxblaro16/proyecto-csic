# Arquitectura del proyecto

## Visión general

El proyecto se organiza como un repositorio con dos aplicaciones principales:

- `desktop/`: cliente de escritorio basado en Electron, React y Vite
- `backend/`: API Laravel

El backend local se ejecuta con Docker y el cliente de escritorio se ejecuta directamente en la máquina de desarrollo.

## Capas principales

### Electron

- Actúa como shell de escritorio
- Carga la aplicación React
- Gestiona la ventana principal
- Mantiene aislamiento entre renderer y APIs del sistema

### React + Vite

- Renderiza la interfaz
- Consume la API Laravel
- Integra Tailwind para estilos
- Integra Three.js para la capa 3D y futuras experiencias 360

### Laravel API

- Expone endpoints HTTP
- Contiene lógica de negocio
- Gestiona base de datos, colas y caché

### Docker

- Levanta el backend y sus servicios de soporte:
  - PHP
  - Nginx
  - MySQL
  - Redis

## Flujo de datos

1. Electron abre la aplicación renderer.
2. React muestra la interfaz y lanza peticiones HTTP.
3. Laravel responde con datos o estados de negocio.
4. React actualiza la UI.
5. Three.js se integra dentro del flujo visual del cliente cuando haga falta.

## Carpetas y responsabilidad técnica

- `desktop/electron`
  - proceso principal y preload
- `desktop/src`
  - interfaz, componentes y lógica de frontend
- `backend/app`
  - servicios, controladores, modelos y lógica de negocio
- `backend/routes`
  - definición de rutas de API
- `docker`
  - entorno local y soporte operativo

## Decisiones actuales

- El backend vive separado del cliente
- Electron no se ejecuta en Docker
- Docker se usa solo para backend y servicios auxiliares
- El flujo de colaboración será por ramas feature y Pull Requests

## Evolución recomendada

- Definir carpetas por feature en `desktop/src`
- Añadir documentación de contratos API
- Separar la capa 3D en un módulo claro dentro de `desktop/src`
- Añadir variables de entorno para el frontend
