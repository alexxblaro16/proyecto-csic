<?php

namespace App\Models;

/**
 * Alias de compatibilidad de UbicacionImagen (modelo Mongo de fotos).
 *
 * El modelo se renombró a UbicacionImagen para separar la ubicación documental
 * (imágenes en MongoDB) de la ubicación física de sensores (UbicacionSql).
 * Esta clase existe solo para no romper referencias antiguas a Ubicacion::class.
 *
 * Para nuevo código usar:
 *   - UbicacionSql    -> ubicación física de sensores (MySQL, tabla 'ubicaciones')
 *   - UbicacionImagen -> ubicación documental de imágenes (MongoDB, colección 'ubicaciones')
 */
class Ubicacion extends UbicacionImagen
{
    //
}
