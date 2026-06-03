<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Museo extends Model
{
    protected $table = 'museos';

    protected $fillable = [
        'nombre',
        'ciudad',
        'pais',
        'descripcion',
        'categoria'
    ];

    public function ubicaciones()
    {
        return $this->hasMany(UbicacionSql::class, 'museo_id');
    }
    

}
