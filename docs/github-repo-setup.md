# Configuracion del repositorio en GitHub

Esta guia resume la configuracion recomendada para trabajar con:

- repositorio `public`
- leads como colaboradores
- resto del equipo contribuyendo desde forks

## Visibilidad y acceso

1. Mantener el repositorio como `Public` si el proyecto puede ser visible.
2. Anadir como colaboradores solo a los leads del proyecto.
3. Dar permisos de `Write` o `Maintain` a los leads segun necesidad.
4. No anadir como colaboradores al resto del equipo si solo necesitan abrir PRs.

## Regla recomendada para `main`

En GitHub web, dentro de branch protection o rulesets:

- requerir Pull Request antes de merge
- bloquear pushes directos a `main`
- requerir al menos una aprobacion
- requerir status checks en verde
- incluir `Frontend build`
- incluir `Backend tests`
- activar review desde `CODEOWNERS` si quereis asignacion automatica

## Flujo esperado

- Leads
  - pueden crear ramas en el repositorio principal
  - revisan y fusionan Pull Requests
  - pueden empujar a ramas de trabajo no protegidas
- Resto del equipo
  - hace fork del repositorio
  - trabaja en ramas dentro de su fork
  - abre Pull Requests contra `main` del repositorio principal

## Seguridad basica

- no subir secretos al repositorio
- mantener `backend/.env` fuera de git
- usar GitHub Secrets para credenciales de CI o despliegue
- revisar cambios antes de cada commit y antes de cada merge
