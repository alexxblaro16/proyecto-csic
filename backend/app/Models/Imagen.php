<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Imagen extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'imagenes';
    protected $fillable = ['sensor_id', 'archivo', 'notas', 'fecha_subida'];
}
