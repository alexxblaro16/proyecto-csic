<?php

namespace Database\Seeders;

use App\Models\Campania;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CampaniaSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $campanias = [
            [
                'nombre' => 'Campaña Prado 2026 - Primavera',
                'descripcion' => 'Campaña de medición de condiciones ambientales en primavera del Museo del Prado',
                'fecha_inicio' => '2026-03-01',
                'fecha_fin' => '2026-05-31',
                'notas' => 'Enfoque en salas de pintura moderna',
            ],
            [
                'nombre' => 'Campaña Reina Sofía 2026 - Invierno',
                'descripcion' => 'Monitoreo de temperatura y humedad en invierno del Museo Reina Sofía',
                'fecha_inicio' => '2025-12-01',
                'fecha_fin' => '2026-02-28',
                'notas' => 'Especial atención a obra Guernica',
            ],
            [
                'nombre' => 'Campaña Thyssen 2026 - Verano',
                'descripcion' => 'Mediciones estivales en el Museo Thyssen-Bornemisza',
                'fecha_inicio' => '2026-06-01',
                'fecha_fin' => '2026-08-31',
                'notas' => 'Control de exposición solar en salas norte',
            ],
            [
                'nombre' => 'Campaña América 2026 - Otoño',
                'descripcion' => 'Campaña de preservación otoñal en Museo de América',
                'fecha_inicio' => '2026-09-01',
                'fecha_fin' => '2026-11-30',
                'notas' => 'Protección de artefactos precolombinos',
            ],
            [
                'nombre' => 'Campaña MNAC Barcelona 2026',
                'descripcion' => 'Monitoreo anual del Museu Nacional d\'Art de Catalunya',
                'fecha_inicio' => '2026-01-01',
                'fecha_fin' => '2026-12-31',
                'notas' => 'Seguimiento continuo de condiciones microclimáticas',
            ],
        ];

        foreach ($campanias as $campania) {
            Campania::create($campania);
        }
    }
}
