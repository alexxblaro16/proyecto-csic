<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Campania extends Model
{
    protected $table = 'campania';

    protected $fillable = [
        'nombre',
        'descripcion',
        'fecha_inicio',
        'fecha_fin',
        'notas'
    ];

    public function medidas()
    {
        return $this->hasMany(Medida::class, 'campania_id');
    }
}
