<?php

namespace Database\Seeders;

use App\Models\Sensor;
use App\Models\UbicacionSql;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SensorSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ubicaciones = UbicacionSql::all();

        $sensores = [
            // Sensores para Sala 1 - Pintura Antigua (Prado)
            [
                'ubicacion_id' => $ubicaciones->where('posicion', 'Sala 1 - Pintura Antigua')->first()->id,
                'referencia' => 'SENSOR-PRADO-001',
                'estado' => 'activo',
                'eje_x' => 28392.20,
                'eje_y' => 19283.50,
                'eje_z' => 150.00,
                'notas' => 'Sensor de temperatura y humedad',
            ],
            [
                'ubicacion_id' => $ubicaciones->where('posicion', 'Sala 1 - Pintura Antigua')->first()->id,
                'referencia' => 'SENSOR-PRADO-002',
                'estado' => 'activo',
                'eje_x' => 28395.00,
                'eje_y' => 19285.00,
                'eje_z' => 150.00,
                'notas' => 'Sensor de luz/radiación',
            ],
            // Sensores para Sala 2 - Pintura Moderna (Prado)
            [
                'ubicacion_id' => $ubicaciones->where('posicion', 'Sala 2 - Pintura Moderna')->first()->id,
                'referencia' => 'SENSOR-PRADO-003',
                'estado' => 'activo',
                'eje_x' => 28400.00,
                'eje_y' => 19290.00,
                'eje_z' => 150.00,
                'notas' => 'Sensor de temperatura y humedad',
            ],
            [
                'ubicacion_id' => $ubicaciones->where('posicion', 'Sala 2 - Pintura Moderna')->first()->id,
                'referencia' => 'SENSOR-PRADO-004',
                'estado' => 'activo',
                'eje_x' => 28405.00,
                'eje_y' => 19295.00,
                'eje_z' => 150.00,
                'notas' => 'Sensor de luz/radiación',
            ],
            // Sensores para Patio Central (Prado)
            [
                'ubicacion_id' => $ubicaciones->where('posicion', 'Patio Central')->first()->id,
                'referencia' => 'SENSOR-PRADO-005',
                'estado' => 'activo',
                'eje_x' => 28410.00,
                'eje_y' => 19300.00,
                'eje_z' => 150.00,
                'notas' => 'Sensor exterior de temperatura y humedad',
            ],
            // Sensores para Planta 2 - Guernica (Reina Sofía)
            [
                'ubicacion_id' => $ubicaciones->where('posicion', 'Planta 2 - Guernica')->first()->id,
                'referencia' => 'SENSOR-RSOFIA-001',
                'estado' => 'activo',
                'eje_x' => 28415.00,
                'eje_y' => 19305.00,
                'eje_z' => 150.00,
                'notas' => 'Sensor crítico de temperatura',
            ],
            [
                'ubicacion_id' => $ubicaciones->where('posicion', 'Planta 2 - Guernica')->first()->id,
                'referencia' => 'SENSOR-RSOFIA-002',
                'estado' => 'activo',
                'eje_x' => 28420.00,
                'eje_y' => 19310.00,
                'eje_z' => 150.00,
                'notas' => 'Sensor crítico de humedad relativa',
            ],
            // Sensores para Sala Norte (Thyssen)
            [
                'ubicacion_id' => $ubicaciones->where('posicion', 'Sala Norte')->first()->id,
                'referencia' => 'SENSOR-THYSSEN-001',
                'estado' => 'activo',
                'eje_x' => 28425.00,
                'eje_y' => 19315.00,
                'eje_z' => 150.00,
                'notas' => 'Sensor de temperatura (alto riesgo)',
            ],
            [
                'ubicacion_id' => $ubicaciones->where('posicion', 'Sala Norte')->first()->id,
                'referencia' => 'SENSOR-THYSSEN-002',
                'estado' => 'activo',
                'eje_x' => 28430.00,
                'eje_y' => 19320.00,
                'eje_z' => 150.00,
                'notas' => 'Sensor de humedad',
            ],
        ];

        foreach ($sensores as $sensor) {
            Sensor::create($sensor);
        }
    }
}
