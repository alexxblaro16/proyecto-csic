<?php

namespace Database\Seeders;

use App\Models\Imagen;
use App\Models\Sensor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ImagenSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sensores = Sensor::all();

        $imagenes = [
            // Imágenes para SENSOR-PRADO-001
            [
                'sensor_id' => $sensores->where('referencia', 'SENSOR-PRADO-001')->first()->id,
                'archivo' => 'imagenes/sensor-prado-001-20260315.jpg',
                'notas' => 'Sensor de temperatura instalado en Sala 1',
                'fecha_subida' => '2026-03-15 10:30:00',
            ],
            [
                'sensor_id' => $sensores->where('referencia', 'SENSOR-PRADO-001')->first()->id,
                'archivo' => 'imagenes/sensor-prado-001-20260415.jpg',
                'notas' => 'Revisión visual del sensor en abril',
                'fecha_subida' => '2026-04-15 14:45:00',
            ],
            // Imágenes para SENSOR-PRADO-002
            [
                'sensor_id' => $sensores->where('referencia', 'SENSOR-PRADO-002')->first()->id,
                'archivo' => 'imagenes/sensor-prado-002-20260320.jpg',
                'notas' => 'Sensor de luz instalado en Sala 1',
                'fecha_subida' => '2026-03-20 09:15:00',
            ],
            // Imágenes para SENSOR-RSOFIA-001 (Guernica)
            [
                'sensor_id' => $sensores->where('referencia', 'SENSOR-RSOFIA-001')->first()->id,
                'archivo' => 'imagenes/sensor-guernica-001-20251201.jpg',
                'notas' => 'Sensor instalado cerca del Guernica',
                'fecha_subida' => '2025-12-01 08:00:00',
            ],
            [
                'sensor_id' => $sensores->where('referencia', 'SENSOR-RSOFIA-001')->first()->id,
                'archivo' => 'imagenes/sensor-guernica-001-20260115.jpg',
                'notas' => 'Verificación de funcionamiento del sensor',
                'fecha_subida' => '2026-01-15 11:20:00',
            ],
            // Imágenes para SENSOR-RSOFIA-002
            [
                'sensor_id' => $sensores->where('referencia', 'SENSOR-RSOFIA-002')->first()->id,
                'archivo' => 'imagenes/sensor-guernica-002-20251205.jpg',
                'notas' => 'Sensor de humedad instalado',
                'fecha_subida' => '2025-12-05 13:30:00',
            ],
            // Imágenes para SENSOR-THYSSEN-001 (Sala Norte)
            [
                'sensor_id' => $sensores->where('referencia', 'SENSOR-THYSSEN-001')->first()->id,
                'archivo' => 'imagenes/sensor-thyssen-norte-001-20260601.jpg',
                'notas' => 'Sensor crítico instalado en Sala Norte',
                'fecha_subida' => '2026-06-01 07:45:00',
            ],
            [
                'sensor_id' => $sensores->where('referencia', 'SENSOR-THYSSEN-001')->first()->id,
                'archivo' => 'imagenes/sensor-thyssen-norte-001-20260715.jpg',
                'notas' => 'Control visual durante alerta de temperatura',
                'fecha_subida' => '2026-07-15 16:20:00',
            ],
            // Imágenes para SENSOR-THYSSEN-002
            [
                'sensor_id' => $sensores->where('referencia', 'SENSOR-THYSSEN-002')->first()->id,
                'archivo' => 'imagenes/sensor-thyssen-norte-002-20260605.jpg',
                'notas' => 'Sensor de humedad en Sala Norte',
                'fecha_subida' => '2026-06-05 10:00:00',
            ],
            // Imágenes para SENSOR-PRADO-003
            [
                'sensor_id' => $sensores->where('referencia', 'SENSOR-PRADO-003')->first()->id,
                'archivo' => 'imagenes/sensor-prado-003-20260315.jpg',
                'notas' => 'Sensor de temperatura en Sala 2',
                'fecha_subida' => '2026-03-15 15:30:00',
            ],
            // Imágenes para SENSOR-PRADO-004
            [
                'sensor_id' => $sensores->where('referencia', 'SENSOR-PRADO-004')->first()->id,
                'archivo' => 'imagenes/sensor-prado-004-20260320.jpg',
                'notas' => 'Sensor de luz en Sala 2',
                'fecha_subida' => '2026-03-20 16:45:00',
            ],
            // Imágenes para SENSOR-PRADO-005 (Exterior)
            [
                'sensor_id' => $sensores->where('referencia', 'SENSOR-PRADO-005')->first()->id,
                'archivo' => 'imagenes/sensor-prado-exterior-005-20260325.jpg',
                'notas' => 'Sensor exterior en Patio Central',
                'fecha_subida' => '2026-03-25 12:00:00',
            ],
        ];

        foreach ($imagenes as $imagen) {
            Imagen::create($imagen);
        }
    }
}
