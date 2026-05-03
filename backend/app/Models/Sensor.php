<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sensor extends Model
{
    protected $table = 'sensor';

    protected $fillable = [
        'ubicacion_id',
        'referencia',
        'estado',
        'notas'
    ];

    public function ubicacion()
    {
        return $this->belongsTo(Ubicacion::class, 'ubicacion_id');
    }

    public function medidas()
    {
        return $this->hasMany(Medida::class, 'sensor_id');
    }
}
