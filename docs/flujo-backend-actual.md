# Flujo actual del backend

## Resumen
El backend está separado en dos dominios de datos:

- SQL (MySQL): dominio de negocio principal (museos, ubicaciones físicas, sensores, mediciones, campañas).
- MongoDB: dominio documental de imágenes y ubicaciones documentales para imágenes.

Esta separación evita mezclar la ubicación física de sensores con la ubicación documental usada para agrupar imágenes.

## Modelo de datos vigente

### SQL
- Museo
- UbicacionSql (tabla: ubicaciones)
- Sensor (tabla: sensores)
- Medicion
- Campania

Relaciones principales:
- Sensor pertenece a UbicacionSql por ubicacion_id.
- UbicacionSql pertenece a Museo por museo_id.
- UbicacionSql tiene muchos Sensor.

### MongoDB
- Imagen (colección: imagenes)
- UbicacionImagen (colección: ubicaciones)

Relaciones documentales:
- Imagen puede asociarse a sensor por sensor_referencia.
- Imagen puede asociarse a ubicación documental por ubicacion_id (Mongo).

Compatibilidad:
- El modelo Ubicacion existe como alias de UbicacionImagen para no romper referencias antiguas.

## Rutas API activas

### Rutas públicas principales
- POST /login
- Resource /usuarios
- Resource /museos
- Resource /ubicaciones (SQL)
- Resource /ubicaciones-imagenes (Mongo)
- Resource /sensores
- Resource /mediciones
- Resource /campanias

### Rutas de imágenes activas
- GET /imagenes/sensor/{sensor_referencia}
- GET /imagenes/ubicacion/{ubicacion_id}

Nota:
- El resource completo de imágenes está comentado actualmente en rutas.

## Flujo de lectura de sensores
1. Se consulta un sensor o listado de sensores.
2. El controlador de sensores carga la relación ubicacionSql.museo.
3. La respuesta incluye datos del sensor + ubicación SQL + museo.
4. Las imágenes NO se cargan automáticamente en esta respuesta.

## Flujo de imágenes por sensor
1. El frontend obtiene referencia del sensor (campo referencia).
2. Consulta GET /imagenes/sensor/{sensor_referencia}.
3. Mongo devuelve las imágenes asociadas a esa referencia.

## Flujo de imágenes por ubicación documental
1. El frontend obtiene id de ubicación documental Mongo.
2. Consulta GET /imagenes/ubicacion/{ubicacion_id}.
3. Mongo devuelve imágenes asociadas a esa ubicación documental.

## Flujo de ubicaciones SQL
1. Alta de ubicación SQL en /ubicaciones con museo_id, posicion, nombre, es_exterior, notas.
2. Validación de museo_id contra museos en SQL.
3. La respuesta devuelve la ubicación SQL con museo cargado.

## Flujo de ubicaciones Mongo para imágenes
1. Alta de ubicación documental en /ubicaciones-imagenes con notas y sensores (array).
2. Se guarda documento en Mongo colección ubicaciones.
3. Esta entidad no sustituye a UbicacionSql, solo soporta flujo documental de imágenes.

## Decisiones de diseño actuales
- Sensor usa relación nombrada ubicacionSql para explicitar que apunta a SQL.
- Se evita cargar imágenes en listados de sensores para no penalizar rendimiento.
- Se mantiene consulta de imágenes desacoplada por endpoint dedicado.

## Contrato recomendado para frontend
- Para sensores y contexto físico:
  - usar /sensores y leer ubicacion_sql + museo.
- Para imágenes:
  - usar /imagenes/sensor/{sensor_referencia} o /imagenes/ubicacion/{ubicacion_id}.
- Para CRUD de ubicaciones físicas:
  - usar /ubicaciones.
- Para CRUD de ubicaciones documentales de imágenes:
  - usar /ubicaciones-imagenes.

## Riesgos y puntos de atención
- Si el frontend todavía lee sensor.ubicacion, debe migrar a sensor.ubicacion_sql.
- Si se habilita Resource de imágenes completo, hay que revisar consistencia con rutas específicas ya activas.
- Conviene documentar en frontend la diferencia entre ubicaciones SQL y ubicaciones Mongo para evitar cruces de ids.
