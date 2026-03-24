# Documento de desglose del proyecto CSIC

Este documento consolida el alcance, la arquitectura base y las responsabilidades del proyecto para que el equipo tenga una referencia común de trabajo. El tono es operativo y técnico, pero con suficiente contexto para poder compartirse también con el cliente cuando sea necesario.

## 1. Descripción general de la solución

### 1.1 Objetivo del proyecto

El objetivo es desarrollar una aplicación de escritorio que permita a los técnicos del CSIC supervisar de forma clara y rápida el pH medido por sensores distribuidos en distintos museos. La herramienta deberá centralizar la consulta del estado actual, facilitar la detección de incidencias y permitir revisar el histórico y la localización visual de cada sensor dentro del museo.

### 1.2 ¿Cómo funciona el sistema?

La solución se plantea como una plataforma de escritorio de uso interno, orientada exclusivamente a técnicos del CSIC y desplegada en un entorno local y privado. La navegación parte de un dashboard con el conjunto de museos y, a partir de ahí, permite bajar al detalle operativo de cada sensor.

- Mostrar una lista priorizada de museos en función de la existencia de sensores con incidencias activas de pH.
- Entrar en cada museo para consultar sus sensores, agrupados por habitación, vitrina u otra localización operativa equivalente.
- Acceder al detalle de un sensor para revisar la curva histórica de pH y otros datos asociados a la medida.
- Consultar un recurso visual 3D asociado al sensor para entender mejor su ubicación física cuando dicho recurso esté disponible.
- Mantener la información accesible para revisión posterior y posibles ampliaciones futuras del sistema.

### 1.3 Qué muestra la aplicación

A nivel funcional, la primera versión de la aplicación debe contemplar al menos las siguientes vistas y comportamientos:

- Dashboard inicial con la lista de museos y su estado operativo general.
- Vista de detalle de museo con el listado de sensores y su valor de pH más reciente.
- Identificación de la localización del sensor dentro del museo, indicando habitación, vitrina o ubicación equivalente.
- Desplegable o vista de detalle de sensor con la curva temporal de pH y sus datos asociados.
- Desplegable desde el listado de sensores para visualizar la foto o recurso 3D vinculado a la posición del sensor.

El detalle visual definitivo de estas pantallas podrá completarse posteriormente en la fase de definición UI/UX, pero la estructura funcional anterior debe considerarse cerrada como referencia de trabajo.

### 1.4 Beneficios

- Identificación inmediata de incidencias de pH en sensores distribuidos entre múltiples museos.
- Reducción del tiempo de análisis operativo para los técnicos del CSIC.
- Priorización del trabajo diario al resaltar primero los museos con incidencias activas.
- Consulta del histórico de medidas para apoyar revisiones técnicas y auditorías internas.
- Base sólida para futuras ampliaciones, sin comprometer la simplicidad de la primera entrega.

## 2. Descripción técnica

### 2.1 Flujo de datos

El flujo técnico de la primera fase debe entenderse como un proceso de recepción, normalización, almacenamiento y visualización de datos, sin incorporar todavía modelos de inteligencia artificial ni lógica predictiva avanzada.

1. **Recepción de datos desde los sensores.** Cada registro debe incluir, como mínimo, el valor de pH, la fecha y hora de la medida, el identificador del sensor y la referencia de ubicación dentro del museo.
2. **Persistencia de datos estructurados.** Los datos de medida y metadatos operativos se almacenarán en una base de datos SQL, concretamente MySQL, para permitir consulta, filtrado y explotación estructurada.
3. **Persistencia de recursos visuales.** Las fotos o recursos visuales 3D asociados a los sensores se almacenarán en MongoDB, tal y como se ha confirmado para el proyecto.
4. **Normalización y validación.** Los datos deben homogeneizarse para asegurar consistencia en nombres de museos, sensores y localizaciones, así como validar formatos y campos obligatorios.
5. **Evaluación del estado.** Sobre la base de los datos recibidos, el sistema determinará si cada sensor se encuentra dentro o fuera del rango permitido de pH.
6. **Presentación en la aplicación.** La aplicación Electron consumirá esta información en un entorno local y privado, mostrando el dashboard de museos, el detalle por sensor y el recurso visual asociado cuando exista.

#### 2.1.1 Versión inicial sin IA (reglas simples)

La primera entrega no incorpora IA. El cálculo del riesgo se basa únicamente en reglas fijas y trazables, fáciles de validar por el equipo y por el cliente.

- Existe riesgo cuando el valor de pH de un sensor es inferior a 6,5 o superior a 7,5.
- Si el valor de pH se mantiene dentro del intervalo [6,5 - 7,5], el sensor se considera dentro de rango.
- Los museos con sensores fuera de rango deberán aparecer priorizados en el dashboard principal.
- La representación visual exacta del estado, por ejemplo mediante colores o etiquetas, se definirá en la interfaz, pero deberá reflejar de forma inequívoca si existe o no incidencia.

#### 2.1.2 Fase avanzada posible en el futuro

Como línea de evolución, el sistema podrá incorporar en fases posteriores más variables de medida, reglas adicionales o modelos de IA que permitan afinar la detección de anomalías. Esta capacidad no forma parte del alcance comprometido de la primera versión y solo debe entenderse como una posible ampliación futura.

## 3. Requisitos para el desarrollo

### 3.1 Infraestructura y stack tecnológico

- Frontend de escritorio: Electron, React, Vite, Tailwind CSS y Three.js.
- Backend: Laravel 12.
- Infraestructura base: Docker, Nginx, MySQL y Redis.
- Persistencia de recursos visuales 3D: MongoDB.
- Gestión de código y colaboración: GitHub.

### 3.2 Principios de arquitectura y despliegue

- La solución debe funcionar en un entorno local y privado. Este punto es crítico y debe reflejarse en las decisiones de arquitectura y despliegue.
- No se contempla una exposición pública de la plataforma ni un enfoque cloud abierto en la primera fase.
- La opción preferida es desplegar la solución en un servidor interno del CSIC, aunque la infraestructura final todavía no está definida.
- Hasta que dicha infraestructura quede cerrada, el desarrollo debe mantenerse compatible con entornos controlados y fácilmente replicables mediante Docker.

## 4. Equipo

### 4.1 Reparto general de responsabilidades

- **Leads:** crean ramas en el repositorio principal cuando hace falta, revisan y hacen merge de pull requests y pueden empujar cambios a ramas de trabajo no protegidas.
- **Resto del equipo:** trabaja desde su fork o rama asignada, desarrolla su parte funcional y abre pull requests hacia la rama principal siguiendo el flujo acordado.

### 4.2 Equipos y responsabilidad principal

- **UI/UX:** definir flujos, arquitectura de información y diseño visual, manteniendo criterios de accesibilidad y consistencia.
- **Front End:** implementar interfaces en la aplicación de escritorio e integrar estados de pantalla y consumo de API.
- **Back End:** implementar endpoints, modelos, migraciones y lógica de negocio, manteniendo contratos API estables y pruebas de backend.
- **3D / 360 Photo:** integrar visualmente los recursos 3D/360 en el cliente y mantener escenas, visores y assets asociados.
- **QA:** validar requisitos funcionales, revisar flujos críticos y documentar bugs con pasos de reproducción claros.
- **Deployment:** mantener Docker, pipelines y configuración de despliegue, preparando la base para entornos de integración e instalación interna.

### 4.3 Personas por equipo

- **UI/UX**  
  Lead: Gonzalo Pérez  
  Lucía Santamaría  
  Marcos Jiménez González

- **Front End**  
  Lead: Alejandro Blanco  
  Andrea Ávila Rodríguez  
  Gabriel Calvo Ballesteros  
  Kevin Yicheng Zhang

- **Back End**  
  Lead: Iván Herrera  
  Gonzalo Sánchez  
  Hugo Osma Castrosin  
  Lucas Henrique Silva De Carvalho

- **3D / 360 Photo**  
  Lead: Diego Martínez  
  Rodrigo García  
  Miguel Tort Soler  
  Robert Aryan Promes García

- **QA**  
  Lead: Arseniy Lugovoy  
  Miguel Canals Cañete  
  Jorge Tort Soler  
  Laura Gómez Sange

- **Deployment**  
  Lead: Carlos Parra  
  Manuel Bayo  
  Pablo Salazar Cepeda  
  Daniel Cals Antón

## 5. Alcance del proyecto

### 5.1 Alcance incluido en la propuesta inicial

- Desarrollo de una plataforma de escritorio para la supervisión de sensores de pH.
- Funcionamiento en entorno local y privado.
- Recepción, almacenamiento y consulta de datos de sensores.
- Normalización y estructuración de los registros en base de datos.
- Dashboard principal con museos priorizados por incidencias activas.
- Vista de museo con sensores y localización asociada.
- Detalle de sensor con curva histórica de pH.
- Integración de la foto o recurso visual 3D asociado al sensor.
- Sistema de alertas o señalización basado en reglas simples de pH fuera de rango.

### 5.2 Fuera de alcance en la primera fase

- Modelos de inteligencia artificial o analítica predictiva avanzada.
- Ampliación del cálculo de riesgo con nuevas variables no confirmadas.
- Aplicación móvil.
- Exposición pública de la plataforma o despliegue abierto fuera de un entorno controlado.
- Integraciones complejas en tiempo real cuya infraestructura no esté previamente validada.

### 5.3 Dependencias y supuestos relevantes

- La definición final del servidor interno o infraestructura de ejecución corresponde al entorno del CSIC y todavía no está cerrada.
- La calidad de la localización visual dependerá de la disponibilidad real de fotos o recursos 3D asociados a cada sensor.
- La identificación de habitaciones, vitrinas o ubicaciones equivalentes deberá mantenerse consistente desde origen para facilitar la normalización.

## 6. Entregables del proyecto

- Documento de análisis funcional y técnico.
- Definición del flujo de datos y de la lógica inicial de riesgo basada en umbrales de pH.
- Backend en Laravel 12 con carga, acceso y gestión de datos de ejemplo.
- Base de datos estructurada precargada con registros de ejemplo.
- Base de datos MongoDB con los recursos visuales 3D o fotografías asociadas.
- Aplicación de escritorio con dashboard principal, vista de museo y detalle de sensor.
- Mecanismo de señalización o alertas basado en reglas simples.
- Documentación operativa básica y manual de uso para el equipo.

## 7. QA y criterios de aceptación

La validación de la primera entrega debe apoyarse en criterios funcionales y técnicos simples, verificables y alineados con el alcance real del proyecto.

### 7.1 Criterios funcionales

- El sistema permite visualizar el listado de museos desde un dashboard principal.
- Desde cada museo se puede acceder al listado de sensores con su valor de pH y ubicación.
- Cada sensor dispone de una vista o desplegable con su curva histórica de pH.
- Cuando existe recurso visual asociado, este puede abrirse desde el listado o detalle de sensores.
- Los sensores fuera del intervalo 6,5–7,5 quedan correctamente identificados como incidencia.

### 7.2 Criterios técnicos

- Los datos estructurados se almacenan y consultan correctamente desde la base de datos prevista.
- Los recursos visuales asociados se recuperan correctamente desde MongoDB.
- La aplicación funciona en entorno local y privado sin depender de una exposición pública.
- La arquitectura mantiene separadas las responsabilidades de frontend, backend y persistencia de datos.
- La documentación permite al equipo comprender el flujo general del sistema y sus límites de alcance.

### 7.3 Criterios de calidad del trabajo de equipo

- Los cambios se integran mediante pull requests revisadas.
- Los bugs relevantes quedan documentados con pasos de reproducción y contexto suficiente.
- Las decisiones que afecten a arquitectura local/privada o a contratos API deben quedar reflejadas en la documentación del proyecto.

**Nota final:** este documento deja cerradas las decisiones funcionales y técnicas conocidas hasta la fecha. El detalle fino de pantallas, wireframes y comportamiento visual podrá ampliarse posteriormente sin alterar la base de alcance aquí descrita.

