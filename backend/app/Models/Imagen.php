<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Imagen extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'imagenes';
    
    protected $fillable = [
        'sensor_referencia',
        'ubicacion_id', 
        'archivo',
        'notas',
        'fecha_subida',
        'tipo'
    ];

    protected $casts = [
        'fecha_subida' => 'datetime'
    ];

    /**
     * Relación con Ubicacion (si es imagen de sala)
     */
    public function ubicacion()
    {
        return $this->belongsTo(Ubicacion::class, 'ubicacion_id');
    }

    /**
     * Scope para obtener imágenes de un sensor
     */
    public function scopeBySensor($query, $sensorReferencia)
    {
        return $query->where('sensor_referencia', $sensorReferencia);
    }

    /**
     * Scope para obtener imágenes de una ubicación
     */
    public function scopeByUbicacion($query, $ubicacionId)
    {
        return $query->where('ubicacion_id', $ubicacionId);
    }
}
