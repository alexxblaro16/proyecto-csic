<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ubicacion extends Model
{
    protected $table = 'ubicaciones';

    protected $fillable = [
        'museo_id',
        'posicion',
        'nombre',
        'es_exterior',
        'notas'
    ];

    public function sensores()
    {
        return $this->hasMany(Sensor::class, 'ubicacion_id');
    }

    public function museo()
    {
        return $this->belongsTo(Museo::class, 'museo_id');
    }
}
