<?php

namespace Database\Seeders;

use App\Models\Imagen;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ImagenSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     * 
     * Las imágenes se crean como documentos independientes en MongoDB
     * con referencias a sensores por sensor_referencia.
     * Luego, UbicacionSeeder las embebé en las ubicaciones junto a los sensores.
     */
    public function run(): void
    {
        $imagenesData = [
            // SENSOR-PRADO-001
            [
                'sensor_referencia' => 'SENSOR-PRADO-001',
                'archivo' => 'imagenes/sensor-prado-001-20260315.jpg',
                'notas' => 'Sensor de temperatura instalado en Sala 1',
                'fecha_subida' => '2026-03-15 10:30:00',
                'tipo' => 'sensor'
            ],
            [
                'sensor_referencia' => 'SENSOR-PRADO-001',
                'archivo' => 'imagenes/sensor-prado-001-20260415.jpg',
                'notas' => 'Revisión visual del sensor en abril',
                'fecha_subida' => '2026-04-15 14:45:00',
                'tipo' => 'sensor'
            ],
            // SENSOR-PRADO-002
            [
                'sensor_referencia' => 'SENSOR-PRADO-002',
                'archivo' => 'imagenes/sensor-prado-002-20260320.jpg',
                'notas' => 'Sensor de luz instalado en Sala 1',
                'fecha_subida' => '2026-03-20 09:15:00',
                'tipo' => 'sensor'
            ],
            // SENSOR-PRADO-003
            [
                'sensor_referencia' => 'SENSOR-PRADO-003',
                'archivo' => 'imagenes/sensor-prado-003-20260315.jpg',
                'notas' => 'Sensor de temperatura en Sala 2',
                'fecha_subida' => '2026-03-15 15:30:00',
                'tipo' => 'sensor'
            ],
            // SENSOR-PRADO-004
            [
                'sensor_referencia' => 'SENSOR-PRADO-004',
                'archivo' => 'imagenes/sensor-prado-004-20260320.jpg',
                'notas' => 'Sensor de luz en Sala 2',
                'fecha_subida' => '2026-03-20 16:45:00',
                'tipo' => 'sensor'
            ],
            // SENSOR-PRADO-005 (Exterior)
            [
                'sensor_referencia' => 'SENSOR-PRADO-005',
                'archivo' => 'imagenes/sensor-prado-exterior-005-20260325.jpg',
                'notas' => 'Sensor exterior en Patio Central',
                'fecha_subida' => '2026-03-25 12:00:00',
                'tipo' => 'sensor'
            ],
            // SENSOR-RSOFIA-001 (Guernica)
            [
                'sensor_referencia' => 'SENSOR-RSOFIA-001',
                'archivo' => 'imagenes/sensor-guernica-001-20251201.jpg',
                'notas' => 'Sensor instalado cerca del Guernica',
                'fecha_subida' => '2025-12-01 08:00:00',
                'tipo' => 'sensor'
            ],
            [
                'sensor_referencia' => 'SENSOR-RSOFIA-001',
                'archivo' => 'imagenes/sensor-guernica-001-20260115.jpg',
                'notas' => 'Verificación de funcionamiento del sensor',
                'fecha_subida' => '2026-01-15 11:20:00',
                'tipo' => 'sensor'
            ],
            // SENSOR-RSOFIA-002
            [
                'sensor_referencia' => 'SENSOR-RSOFIA-002',
                'archivo' => 'imagenes/sensor-guernica-002-20251205.jpg',
                'notas' => 'Sensor de humedad instalado',
                'fecha_subida' => '2025-12-05 13:30:00',
                'tipo' => 'sensor'
            ],
            // SENSOR-THYSSEN-001
            [
                'sensor_referencia' => 'SENSOR-THYSSEN-001',
                'archivo' => 'imagenes/sensor-thyssen-norte-001-20260601.jpg',
                'notas' => 'Sensor crítico instalado en Sala Norte',
                'fecha_subida' => '2026-06-01 07:45:00',
                'tipo' => 'sensor'
            ],
            [
                'sensor_referencia' => 'SENSOR-THYSSEN-001',
                'archivo' => 'imagenes/sensor-thyssen-norte-001-20260715.jpg',
                'notas' => 'Control visual durante alerta de temperatura',
                'fecha_subida' => '2026-07-15 16:20:00',
                'tipo' => 'sensor'
            ],
            // SENSOR-THYSSEN-002
            [
                'sensor_referencia' => 'SENSOR-THYSSEN-002',
                'archivo' => 'imagenes/sensor-thyssen-norte-002-20260605.jpg',
                'notas' => 'Sensor de humedad en Sala Norte',
                'fecha_subida' => '2026-06-05 10:00:00',
                'tipo' => 'sensor'
            ],
        ];

        foreach ($imagenesData as $data) {
            Imagen::create($data);
        }
    }
}
