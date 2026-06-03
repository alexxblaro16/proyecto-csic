<?php

namespace Database\Seeders;

use App\Models\UbicacionImagen;
use App\Models\Museo;
use App\Models\Sensor;
use App\Models\Imagen;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UbicacionSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     * 
     * Crea ubicaciones en MongoDB con sus sensores embebidos.
     * Los sensores se traen de SQL y se les agrega sus imágenes de MongoDB.
     */
    public function run(): void
    {
        // Traer ubicaciones SQL para mapearlas
        $ubicacionesSql = \App\Models\UbicacionSql::all();

        foreach ($ubicacionesSql as $ubicacion_sql) {
            // Traer sensores SQL de esta ubicación
            $sensores = Sensor::where('ubicacion_id', $ubicacion_sql->id)->get();
            
            $sensores_data = [];
            foreach ($sensores as $sensor) {
                // Traer imágenes de MongoDB para este sensor
                $imagenes = Imagen::bySensor($sensor->referencia)->get();
                
                $imagenes_data = [];
                foreach ($imagenes as $imagen) {
                    $imagenes_data[] = [
                        '_id' => $imagen->_id,
                        'archivo' => $imagen->archivo,
                        'notas' => $imagen->notas,
                        'fecha_subida' => $imagen->fecha_subida,
                        'tipo' => $imagen->tipo,
                    ];
                }
                
                $sensores_data[] = [
                    'referencia' => $sensor->referencia,
                    'imagenes' => $imagenes_data
                ];
            }

            // Crear ubicación en MongoDB solo con _id, notas y sensores con imágenes
            UbicacionImagen::create([
                'notas' => $ubicacion_sql->notas ?? '',
                'sensores' => $sensores_data
            ]);
        }
    }
}
