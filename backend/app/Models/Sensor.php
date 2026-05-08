<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sensor extends Model
{
    protected $table = 'sensores';

    protected $fillable = [
        'ubicacion_id',
        'referencia',
        'estado',
        'eje_x',
        'eje_y',
        'eje_z',
        'notas'
    ];

    public function ubicacion()
    {
        return $this->belongsTo(UbicacionSql::class, 'ubicacion_id');
    }

    public function medidas()
    {
        return $this->hasMany(Medicion::class, 'sensor_id');
    }
}
