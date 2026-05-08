<?php

namespace Database\Seeders;

use App\Models\UbicacionSql;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UbicacionSqlSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ubicaciones = [
            // Museo del Prado
            [
                'museo_id' => 1,
                'posicion' => 'Sala 1 - Pintura Antigua',
                'nombre' => 'Sala 1 - Pintura Antigua',
                'es_exterior' => false,
                'notas' => 'Sala dedicada a pintura antigua',
            ],
            [
                'museo_id' => 1,
                'posicion' => 'Sala 2 - Pintura Moderna',
                'nombre' => 'Sala 2 - Pintura Moderna',
                'es_exterior' => false,
                'notas' => 'Sala dedicada a pintura moderna',
            ],
            [
                'museo_id' => 1,
                'posicion' => 'Patio Central',
                'nombre' => 'Patio Central',
                'es_exterior' => true,
                'notas' => 'Patio central del museo',
            ],
            // Museo Reina Sofía
            [
                'museo_id' => 2,
                'posicion' => 'Planta 2 - Guernica',
                'nombre' => 'Planta 2 - Guernica',
                'es_exterior' => false,
                'notas' => 'Sala donde se expone el Guernica',
            ],
            [
                'museo_id' => 2,
                'posicion' => 'Planta 3 - Arte Contemporáneo',
                'nombre' => 'Planta 3 - Arte Contemporáneo',
                'es_exterior' => false,
                'notas' => 'Sala de arte contemporáneo',
            ],
            // Museo Thyssen
            [
                'museo_id' => 3,
                'posicion' => 'Sala Norte',
                'nombre' => 'Sala Norte',
                'es_exterior' => false,
                'notas' => 'Sala norte del museo',
            ],
            [
                'museo_id' => 3,
                'posicion' => 'Sala Sur',
                'nombre' => 'Sala Sur',
                'es_exterior' => false,
                'notas' => 'Sala sur del museo',
            ],
        ];

        foreach ($ubicaciones as $ubicacion) {
            UbicacionSql::create($ubicacion);
        }
    }
}
