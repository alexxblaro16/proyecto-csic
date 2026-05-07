<?php

namespace Database\Seeders;

use App\Models\Ubicacion;
use App\Models\Museo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UbicacionSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $museos = Museo::all();

        $ubicaciones = [
            // Museo del Prado
            [
                'museo_id' => $museos->where('nombre', 'Museo del Prado')->first()->id,
                'posicion' => 'Sala 1 - Pintura Antigua',
                'nombre' => 'Sala principal dedicada a la pintura antigua española',
                'es_exterior' => false,
                'notas' => 'Zona de acceso restringido',
            ],
            [
                'museo_id' => $museos->where('nombre', 'Museo del Prado')->first()->id,
                'posicion' => 'Sala 2 - Pintura Moderna',
                'nombre' => 'Galería de pintura moderna del siglo XIX y XX',
                'es_exterior' => false,
                'notas' => 'Control especial de iluminación',
            ],
            [
                'museo_id' => $museos->where('nombre', 'Museo del Prado')->first()->id,
                'posicion' => 'Patio Central',
                'nombre' => 'Patio central del museo',
                'es_exterior' => true,
                'notas' => 'Exposición a elementos naturales',
            ],
            // Museo Reina Sofía
            [
                'museo_id' => $museos->where('nombre', 'Museo Reina Sofía')->first()->id,
                'posicion' => 'Planta 2 - Guernica',
                'nombre' => 'Sala donde se exhibe el Guernica de Picasso',
                'es_exterior' => false,
                'notas' => 'Control crítico de temperatura y humedad',
            ],
            [
                'museo_id' => $museos->where('nombre', 'Museo Reina Sofía')->first()->id,
                'posicion' => 'Planta 3 - Arte Contemporáneo',
                'nombre' => 'Galerías de arte contemporáneo',
                'es_exterior' => false,
                'notas' => 'Iluminación variable según exposición',
            ],
            // Museo Thyssen-Bornemisza
            [
                'museo_id' => $museos->where('nombre', 'Museo Thyssen-Bornemisza')->first()->id,
                'posicion' => 'Sala Norte',
                'nombre' => 'Ala norte del museo con exposición directa solar',
                'es_exterior' => false,
                'notas' => 'Alto riesgo de sobrecalentamiento',
            ],
            [
                'museo_id' => $museos->where('nombre', 'Museo Thyssen-Bornemisza')->first()->id,
                'posicion' => 'Sala Sur',
                'nombre' => 'Ala sur del museo',
                'es_exterior' => false,
                'notas' => 'Temperatura más estable',
            ],
        ];

        foreach ($ubicaciones as $ubicacion) {
            Ubicacion::create($ubicacion);
        }
    }
}
