# Roles y flujo entre equipos

## Objetivo

Coordinar el trabajo entre equipos para que cada area tenga una responsabilidad clara y los handoffs sean simples.

## Equipos

### Leads del repositorio

- Mantienen permisos de colaborador en GitHub
- Revisan Pull Requests y coordinan el merge a `main`
- Mantienen actualizados `CODEOWNERS`, plantillas y reglas de trabajo
- Pueden ayudar con ramas compartidas o cambios urgentes fuera de forks, sin hacer push directo a `main`

### UI/UX

- Define experiencia, jerarquia visual y criterios de accesibilidad
- Entrega wireframes, estados y comportamiento esperado
- Coordina con Front End y 3D/360 cuando haya experiencias inmersivas

### Front End

- Implementa interfaces y navegacion en `desktop/src`
- Consume la API y adapta estados de carga, error y exito
- Integra especificaciones de UI/UX

### Back End

- Implementa logica de negocio y endpoints en `backend/`
- Mantiene contratos de datos claros para Front End
- Documenta cambios que afecten a la UI o a QA

### 3D / 360Photo

- Desarrolla visores, escenas, interaccion y optimizacion visual
- Trabaja dentro del cliente de escritorio en coordinacion con Front End
- Define requisitos de assets con UI/UX

### QA

- Valida flujos funcionales y regresiones
- Comprueba criterios de aceptacion antes del merge
- Registra incidencias con pasos de reproduccion

### Deployment

- Mantiene Docker y CI
- Define la futura estrategia de despliegue
- Revisa cambios que afecten a configuracion, puertos o workflows

## Flujo recomendado por tarea

1. Se crea una incidencia o tarea tecnica.
2. El equipo responsable crea rama desde `main`.
3. Se implementa el cambio con commits pequenos.
4. Se validan build y tests.
5. Se abre Pull Request.
6. Revisan los equipos implicados.
7. QA valida si aplica.
8. Se hace merge a `main`.

## Handoffs clave

### UI/UX -> Front End

- componentes
- estados
- responsive
- comportamiento esperado

### Front End -> Back End

- necesidades de datos
- contratos de request/response
- manejo de errores y estados

### Back End -> QA

- endpoints afectados
- datos minimos para prueba
- escenarios criticos

### Front End / 3D -> QA

- flujos interactivos
- casos visuales
- compatibilidad basica

### Cualquier equipo -> Deployment

- cambios de entorno
- nuevas dependencias
- cambios en Docker o CI

## Reglas para evitar bloqueos

- No cambiar contratos API sin avisar en el PR
- No mezclar grandes refactors con features de negocio
- Documentar puertos, comandos y variables cuando cambien
- Mantener el foco de cada PR lo mas pequeno posible
- Mantener el repositorio principal abierto solo a los leads y usar forks para el resto del equipo
