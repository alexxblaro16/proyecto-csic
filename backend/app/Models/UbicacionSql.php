<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UbicacionSql extends Model
{
    protected $table = 'ubicaciones';
    protected $connection = 'mysql';

    protected $fillable = [
        'museo_id',
        'posicion',
        'nombre',
        'es_exterior',
        'notas'
    ];

    protected $casts = [
        'es_exterior' => 'boolean'
    ];

    public function sensores()
    {
        return $this->hasMany(Sensor::class, 'ubicacion_id');
    }

    public function mediciones()
    {
        return $this->hasMany(Medicion::class, 'ubicacion_id');
    }
    
}
