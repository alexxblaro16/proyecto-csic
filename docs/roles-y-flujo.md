# Roles y flujo entre equipos

## Objetivo

Coordinar el trabajo entre equipos para que cada área tenga una responsabilidad clara y los handoffs sean simples.

## Equipos

### UI/UX

- Define experiencia, jerarquía visual y criterios de accesibilidad
- Entrega wireframes, estados y comportamiento esperado
- Coordina con Front End y 3D/360 cuando haya experiencias inmersivas

### Front End

- Implementa interfaces y navegación en `desktop/src`
- Consume la API y adapta estados de carga, error y éxito
- Integra especificaciones de UI/UX

### Back End

- Implementa lógica de negocio y endpoints en `backend/`
- Mantiene contratos de datos claros para Front End
- Documenta cambios que afecten a la UI o a QA

### 3D / 360Photo

- Desarrolla visores, escenas, interacción y optimización visual
- Trabaja dentro del cliente de escritorio en coordinación con Front End
- Define requisitos de assets con UI/UX

### QA

- Valida flujos funcionales y regresiones
- Comprueba criterios de aceptación antes del merge
- Registra incidencias con pasos de reproducción

### Deployment

- Mantiene Docker y CI
- Define la futura estrategia de despliegue
- Revisa cambios que afecten a configuración, puertos o workflows

## Flujo recomendado por tarea

1. Se crea una incidencia o tarea técnica.
2. El equipo responsable crea rama desde `main`.
3. Se implementa el cambio con commits pequeños.
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
- datos mínimos para prueba
- escenarios críticos

### Front End / 3D -> QA

- flujos interactivos
- casos visuales
- compatibilidad básica

### Cualquier equipo -> Deployment

- cambios de entorno
- nuevas dependencias
- cambios en Docker o CI

## Reglas para evitar bloqueos

- No cambiar contratos API sin avisar en el PR
- No mezclar grandes refactors con features de negocio
- Documentar puertos, comandos y variables cuando cambien
- Mantener el foco de cada PR lo más pequeño posible
