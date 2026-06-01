<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Medicion extends Model
{
    protected $table = 'mediciones';

    protected $fillable = [
        'sensor_id',
        'campania_id',
        'fecha',
        'valor_ph',
        'temperatura',
        'humedad_relativa',
        'es_medida_inicial',
        'observaciones'
    ];

    public function sensor()
    {
        return $this->belongsTo(Sensor::class, 'sensor_id');
    }

    public function campania()
    {
        return $this->belongsTo(Campania::class, 'campania_id');
    }

    public function ubicacion()
    {
        return $this->belongsTo(UbicacionSql::class, 'ubicacion_id');   
    }
}
