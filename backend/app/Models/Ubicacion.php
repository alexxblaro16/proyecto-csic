<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ubicacion extends Model
{
    protected $table = 'ubicacion';

    protected $fillable = [
        'coordenadas',
        'descripcion',
        'es_exterior',
        'notas'
    ];

    public function sensores()
    {
        return $this->hasMany(Sensor::class, 'ubicacion_id');
    }
}
