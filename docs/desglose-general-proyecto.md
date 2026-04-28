Este documento consolida el alcance, la arquitectura base y las
responsabilidades del proyecto para que el equipo tenga una referencia
común de trabajo. El tono es operativo y técnico, pero con suficiente
contexto para poder compartirse también con el cliente cuando sea
necesario.

El contenido incorpora las notas funcionales y técnicas recogidas
durante la reunión mantenida con el CSIC, manteniendo la coherencia con
la versión previa del documento y aterrizando mejor el alcance de la
primera fase.

# 1. Descripción general de la solución

## 1.1 Objetivo del proyecto

El objetivo es desarrollar una aplicación de escritorio que permita a
los técnicos del CSIC supervisar de forma clara y rápida el pH medido
por sensores distribuidos en distintos museos. La herramienta deberá
centralizar la consulta del estado actual, facilitar la detección de
incidencias y permitir revisar el histórico, la localización visual y el
contexto ambiental de cada sensor dentro del museo.

## 1.2 ¿Cómo funciona el sistema?

La solución se plantea como una plataforma de escritorio de uso interno,
orientada exclusivamente a técnicos del CSIC y desplegada en un entorno
local y privado. La navegación parte de un dashboard con el conjunto de
museos y, a partir de ahí, permite bajar al detalle operativo por museo,
sala y sensor, con un bloque de análisis gráfico y comparativo como uno
de los núcleos principales de la aplicación.

- Mostrar una lista priorizada de museos en función de la existencia de
  sensores con incidencias activas de pH.

- Entrar en cada museo para consultar salas, sensores, alertas,
  promedios y notas operativas relevantes.

- Acceder a cada sala para revisar su contexto ambiental, sus nodos o
  sensores asociados y posibles observaciones sobre materiales, limpieza
  o microclimas.

- Acceder al detalle de un sensor para revisar la curva histórica de pH,
  la curva de calibrado y otros datos asociados a la medida.

- Consultar un recurso visual 3D o 360 asociado al sensor para entender
  mejor su ubicación física y el entorno inmediato en el que trabaja.

- Mantener la información accesible para revisión posterior, análisis
  comparativo, exportación y posibles ampliaciones futuras del sistema.

## 1.3 Qué muestra la aplicación

A nivel funcional, la primera versión de la aplicación debe contemplar
al menos las siguientes vistas y comportamientos, con especial peso del
análisis mediante gráficas de evolución y comparación:

- Dashboard inicial con la lista de museos, su estado operativo general
  y la priorización de incidencias activas.

- Vista global de museo con salas, promedios por sala, alertas, notas y
  posibilidad de visualizar datos agregados del museo.

- Vista de sala con promedios, alertas, lista de sensores o nodos, notas
  sobre materiales, posibles microclimas, métodos de limpieza y
  observaciones generales.

- Vista de sensor con su valor de pH más reciente, su ubicación, la
  curva temporal de pH, la curva de calibrado y notas del entorno.

- Gráficas de evolución y análisis comparativo con eje de fechas en X,
  pH en Y, banda de valores admisibles, filtro por nodo, sala y museo,
  selección de rango de fechas y comparación entre nodos, salas y
  museos.

- Consulta de variables complementarias asociadas al contexto ambiental,
  como temperatura, humedad, contaminantes y datos meteorológicos cuando
  estén disponibles.

- Opción de exportar la información representada en determinadas vistas
  o gráficas, especialmente en escenarios de revisión técnica o
  elaboración de reportes.

- Visualización de fotos, imágenes adicionales o recurso 3D/360
  vinculado a la posición del sensor desde el listado o el detalle.

El detalle visual definitivo de estas pantallas podrá completarse
posteriormente en la fase de definición UI/UX, pero la estructura
funcional anterior debe considerarse cerrada como referencia de trabajo.

### 1.3.1 Gestión de recursos 3D / 360

La gestión de las fotos o recursos 3D/360 asociados a cada sensor cumple
dos objetivos funcionales principales dentro de la aplicación:

- Conocer el entorno inmediato del sensor para poder monitorizar
  elementos como ventanas, puertas u otros factores del espacio que
  puedan afectar al ambiente o generar microclimas.

- Localizar visualmente la posición exacta del sensor dentro del recurso
  3D mediante un icono, círculo u otro marcador gráfico, pendiente aún
  de definición final.

Además de facilitar la localización, estos recursos podrán
complementarse con imágenes adicionales y notas de microclima para
enriquecer el análisis técnico del punto de medida.

## 1.4 Beneficios

- Identificación inmediata de incidencias de pH en sensores distribuidos
  entre múltiples museos.

- Reducción del tiempo de análisis operativo para los técnicos del CSIC
  gracias a vistas comparativas y gráficas que faciliten la
  interpretación del comportamiento de los sensores.

- Priorización del trabajo diario al resaltar primero los museos con
  incidencias activas.

- Mejor comprensión del contexto físico de medida gracias a la
  integración de recursos 3D/360 y notas ambientales.

- Consulta del histórico de medidas para apoyar revisiones técnicas y
  auditorías internas.

- Base sólida para futuras ampliaciones, sin comprometer la simplicidad
  de la primera entrega.

# 2. Descripción técnica

## 2.1 Flujo de datos

El flujo técnico de la primera fase debe entenderse como un proceso de
recepción, normalización, almacenamiento y visualización de datos, sin
incorporar todavía modelos de inteligencia artificial ni lógica
predictiva avanzada.

1.  Recepción de datos desde los sensores. Cada registro debe incluir,
    como mínimo, el valor de pH, la fecha y hora de la medida, el
    identificador del sensor y la referencia de ubicación dentro del
    museo.

2.  Persistencia de datos estructurados. Los datos de medida y metadatos
    operativos se almacenarán en una base de datos SQL, concretamente
    MySQL, para permitir consulta, filtrado y explotación estructurada.

3.  Persistencia de recursos visuales. Las fotos o recursos visuales 3D
    asociados a los sensores se almacenarán en MongoDB, tal y como se ha
    confirmado para el proyecto.

4.  Normalización y validación. Los datos deben homogeneizarse para
    asegurar consistencia en nombres de museos, salas, sensores y
    localizaciones, así como validar formatos y campos obligatorios.

5.  Enriquecimiento contextual. El sistema debe contemplar el uso de
    datos meteorológicos y variables ambientales complementarias cuando
    estén disponibles, ya sea mediante fuentes propias o mediante
    integración con servicios externos como la AEMET.

6.  Evaluación del estado. Sobre la base de los datos recibidos, el
    sistema determinará si cada sensor se encuentra dentro o fuera del
    rango permitido de pH.

7.  Presentación en la aplicación. La aplicación Electron consumirá esta
    información en un entorno local y privado, mostrando el dashboard de
    museos, el detalle por sala y sensor, así como vistas analíticas con
    gráficas de evolución y comparación y el recurso visual asociado
    cuando exista.

### 2.1.1 Versión inicial sin IA (reglas simples)

La primera entrega no incorpora IA. El cálculo del riesgo se basa
únicamente en reglas fijas y trazables, fáciles de validar por el equipo
y por el cliente.

- Existe riesgo cuando el valor de pH de un sensor es inferior a 6,5 o
  superior a 7,5.

- Si el valor de pH se mantiene dentro del intervalo \[6,5 - 7,5\], el
  sensor se considera dentro de rango.

- Los museos con sensores fuera de rango deberán aparecer priorizados en
  el dashboard principal.

- La representación visual exacta del estado, por ejemplo mediante
  colores o etiquetas, se definirá en la interfaz, pero deberá reflejar
  de forma inequívoca si existe o no incidencia.

### 2.1.2 Datos meteorológicos y contexto climático

Las notas de la reunión incorporan la conveniencia de enriquecer la
interpretación de las mediciones con información climática y ambiental.
Por ello, el sistema deberá quedar preparado para relacionar las medidas
de pH con datos meteorológicos cercanos al museo y con otras variables
de contexto, como temperatura, humedad o contaminantes, en los casos en
que tales datos estén disponibles y su integración quede validada.

### 2.1.3 Fase avanzada posible en el futuro

Como línea de evolución, el sistema podrá incorporar en fases
posteriores más variables de medida, reglas adicionales o modelos de IA
que permitan afinar la detección de anomalías. Esta capacidad no forma
parte del alcance comprometido de la primera versión y solo debe
entenderse como una posible ampliación futura.

# 3. Requisitos para el desarrollo

## 3.1 Infraestructura y stack tecnológico

- Frontend de escritorio: Electron, React, Vite, Tailwind CSS y
  Three.js.

- Backend: Laravel 12.

- Infraestructura base: Docker, Nginx, MySQL y Redis.

- Persistencia de recursos visuales 3D: MongoDB.

- Gestión de código y colaboración: GitHub.

## 3.2 Principios de arquitectura y despliegue

- La solución debe funcionar en un entorno local y privado. Este punto
  es crítico y debe reflejarse en las decisiones de arquitectura y
  despliegue.

- No se contempla una exposición pública de la plataforma ni un enfoque
  cloud abierto en la primera fase.

- La opción preferida es desplegar la solución en un servidor interno
  del CSIC, aunque la infraestructura final todavía no está definida.

- Hasta que dicha infraestructura quede cerrada, el desarrollo debe
  mantenerse compatible con entornos controlados y fácilmente
  replicables mediante Docker.

## 3.3 Consideraciones complementarias de producto

- Nombre de la aplicación: VirtualpH.

- Uso de cuentas con permisos para controlar el acceso a la información
  y a las operaciones disponibles.

- Las gráficas de análisis y comparación entre nodos, salas y museos
  constituyen una pieza central del producto y deberán recibir un
  tratamiento prioritario en diseño e implementación.

- La identidad visual final deberá alinearse con la imagen institucional
  vigente del CSIC y de las entidades participantes cuando proceda.

# 4. Equipo

## 4.1 Reparto general de responsabilidades

- Leads: crean ramas en el repositorio principal cuando hace falta,
  revisan y hacen merge de pull requests y pueden empujar cambios a
  ramas de trabajo no protegidas.

- Resto del equipo: trabaja desde su fork o rama asignada, desarrolla su
  parte funcional y abre pull requests hacia la rama principal siguiendo
  el flujo acordado.

## 4.2 Equipos y responsabilidad principal

- UI/UX: definir flujos, arquitectura de información y diseño visual,
  manteniendo criterios de accesibilidad y consistencia.

- Front End: implementar interfaces en la aplicación de escritorio e
  integrar estados de pantalla y consumo de API.

- Back End: implementar endpoints, modelos, migraciones y lógica de
  negocio, manteniendo contratos API estables y pruebas de backend. En
  la fase actual, una parte del equipo se dedicará al diseño de la base
  de datos y otra a investigar cómo funciona y cómo integrar la API de
  la AEMET para el control del clima.

- 3D / 360 Photo: integrar visualmente los recursos 3D/360 en el
  cliente, mantener escenas, visores y assets asociados, y facilitar la
  localización contextual de cada sensor dentro de su entorno.

- QA: validar requisitos funcionales, revisar flujos críticos y
  documentar bugs con pasos de reproducción claros.

- Deployment: mantener Docker, pipelines y configuración de despliegue,
  preparando la base para entornos de integración e instalación interna.

## 4.3 Personas por equipo

**• UI/UX**

> Lead: Gonzalo Pérez
>
> Lucía Santamaría
>
> Marcos Jiménez González

**• Front End**

> Lead: Alejandro Blanco
>
> Andrea Ávila Rodríguez
>
> Gabriel Calvo Ballesteros
>
> Kevin Yicheng Zhang

**• Back End**

> Lead: Iván Herrera
>
> Gonzalo Sánchez
>
> Hugo Osma Castrosin
>
> Lucas Henrique Silva De Carvalho

**• 3D / 360 Photo**

> Lead: Diego Martínez
>
> Rodrigo García
>
> Miguel Tort Soler
>
> Robert Aryan Promes García

**• QA**

> Lead: Arseniy Lugovoy
>
> Miguel Canals Cañete
>
> Jorge Tort Soler
>
> Laura Gómez Sange

**• Deployment**

> Lead: Carlos Parra
>
> Manuel Bayo
>
> Pablo Salazar Cepeda
>
> Daniel Cals Antón

# 5. Alcance del proyecto

## 5.1 Alcance incluido en la propuesta inicial

- Desarrollo de una plataforma de escritorio para la supervisión de
  sensores de pH.

- Funcionamiento en entorno local y privado.

- Recepción, almacenamiento y consulta de datos de sensores.

- Normalización y estructuración de los registros en base de datos.

- Dashboard principal con museos priorizados por incidencias activas.

- Vista de museo con salas, sensores, alertas, notas y localización
  asociada.

- Vista de sala con promedios, observaciones de materiales, microclimas
  y lista de sensores o nodos.

- Detalle de sensor con curva histórica de pH, curva de calibrado y
  notas de entorno.

- Módulo de análisis con gráficas de evolución y comparaciones entre
  nodos, salas y museos, con filtros y rangos de fechas.

- Integración de la foto o recurso visual 3D/360 asociado al sensor.

- Localización visual del sensor dentro del recurso 3D mediante un
  marcador pendiente de definición final.

- Sistema de alertas o señalización basado en reglas simples de pH fuera
  de rango.

- Preparación del sistema para incorporar datos meteorológicos y de
  contexto ambiental cuando la integración quede validada.

## 5.2 Fuera de alcance en la primera fase

- Modelos de inteligencia artificial o analítica predictiva avanzada.

- Ampliación del cálculo de riesgo con nuevas variables no confirmadas
  como criterio automático de decisión.

- Aplicación móvil.

- Exposición pública de la plataforma o despliegue abierto fuera de un
  entorno controlado.

- Integraciones complejas en tiempo real cuya infraestructura no esté
  previamente validada.

## 5.3 Dependencias y supuestos relevantes

- La definición final del servidor interno o infraestructura de
  ejecución corresponde al entorno del CSIC y todavía no está cerrada.

- La calidad de la localización visual dependerá de la disponibilidad
  real de fotos o recursos 3D asociados a cada sensor.

- La identificación de habitaciones, vitrinas o ubicaciones equivalentes
  deberá mantenerse consistente desde origen para facilitar la
  normalización.

- La disponibilidad y calidad de los datos meteorológicos externos
  dependerán de la validación técnica de la integración con la API de la
  AEMET o de otras fuentes que se acuerden.

# 6. Entregables del proyecto

- Documento de análisis funcional y técnico.

- Definición del flujo de datos y de la lógica inicial de riesgo basada
  en umbrales de pH.

- Backend en Laravel 12 con carga, acceso y gestión de datos de ejemplo.

- Definición inicial del modelo de base de datos y estructura de
  persistencia asociada.

- Base de datos estructurada precargada con registros de ejemplo.

- Base de datos MongoDB con los recursos visuales 3D o fotografías
  asociadas.

- Aplicación de escritorio con dashboard principal, vista de museo,
  vista de sala y detalle de sensor.

- Vistas analíticas con gráficas de evolución y comparación entre nodos,
  salas y museos.

- Mecanismo de señalización o alertas basado en reglas simples.

- Preparación técnica o documentación de investigación para la futura
  integración de la API de la AEMET.

- Documentación operativa básica y manual de uso para el equipo.

# 7. QA y criterios de aceptación

La validación de la primera entrega debe apoyarse en criterios
funcionales y técnicos simples, verificables y alineados con el alcance
real del proyecto.

## 7.1 Criterios funcionales

- El sistema permite visualizar el listado de museos desde un dashboard
  principal.

- Desde cada museo se puede acceder a salas y sensores con su valor de
  pH, ubicación y estado general.

- Cada sensor dispone de una vista o desplegable con su curva histórica
  de pH y su curva de calibrado.

- El sistema ofrece gráficas de evolución y comparaciones entre nodos,
  salas o museos con filtros y rangos de fechas operativos.

- Cuando existe recurso visual asociado, este puede abrirse desde el
  listado o detalle de sensores.

- El recurso 3D/360 permite comprender el entorno del sensor y mostrar
  su localización mediante un marcador visual cuando esté implementado.

- Los sensores fuera del intervalo 6,5–7,5 quedan correctamente
  identificados como incidencia.

## 7.2 Criterios técnicos

- Los datos estructurados se almacenan y consultan correctamente desde
  la base de datos prevista.

- Los recursos visuales asociados se recuperan correctamente desde
  MongoDB.

- La aplicación funciona en entorno local y privado sin depender de una
  exposición pública.

- La arquitectura mantiene separadas las responsabilidades de frontend,
  backend y persistencia de datos.

- La documentación permite al equipo comprender el flujo general del
  sistema y sus límites de alcance.

- El diseño de la base de datos y la investigación de integración con
  AEMET quedan reflejados en la documentación técnica del proyecto.

## 7.3 Criterios de calidad del trabajo de equipo

- Los cambios se integran mediante pull requests revisadas.

- Los bugs relevantes quedan documentados con pasos de reproducción y
  contexto suficiente.

- Las decisiones que afecten a arquitectura local/privada, contratos API
  o estrategia de integración externa deben quedar reflejadas en la
  documentación del proyecto.

Nota final: este documento deja cerradas las decisiones funcionales y
técnicas conocidas hasta la fecha. El detalle fino de pantallas,
wireframes y comportamiento visual podrá ampliarse posteriormente sin
alterar la base de alcance aquí descrita.
