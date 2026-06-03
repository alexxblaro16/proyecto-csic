<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class UbicacionImagen extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'ubicaciones';

    protected $fillable = [
        'notas',
        'sensores',
    ];

    protected $casts = [
        'sensores' => 'array',
    ];
}