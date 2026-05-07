<?php

namespace Database\Seeders;

use App\Models\Medicion;
use App\Models\Sensor;
use App\Models\Campania;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MedicionSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sensores = Sensor::all();
        $campanias = Campania::all();

        $mediciones = [
            // Mediciones para SENSOR-PRADO-001
            [
                'sensor_id' => $sensores->where('referencia', 'SENSOR-PRADO-001')->first()->id,
                'campania_id' => $campanias->where('nombre', 'Campaña Prado 2026 - Primavera')->first()->id,
                'fecha' => '2026-03-15',
                'valor_ph' => 5.3,
                'temperatura' => 21.5,
                'humedad_relativa' => 55.2,
                'es_medida_inicial' => true,
                'observaciones' => 'Medida inicial de primavera',
            ],
            [
                'sensor_id' => $sensores->where('referencia', 'SENSOR-PRADO-001')->first()->id,
                'campania_id' => $campanias->where('nombre', 'Campaña Prado 2026 - Primavera')->first()->id,
                'fecha' => '2026-04-15',
                'valor_ph' => 7.4,
                'temperatura' => 22.1,
                'humedad_relativa' => 54.8,
                'es_medida_inicial' => false,
                'observaciones' => 'Medida intermedia de primavera',
            ],
            [
                'sensor_id' => $sensores->where('referencia', 'SENSOR-PRADO-001')->first()->id,
                'campania_id' => $campanias->where('nombre', 'Campaña Prado 2026 - Primavera')->first()->id,
                'fecha' => '2026-05-15',
                'valor_ph' => 5.8,
                'temperatura' => 23.2,
                'humedad_relativa' => 52.1,
                'es_medida_inicial' => false,
                'observaciones' => 'Medida final de primavera',
            ],
            // Mediciones para SENSOR-RSOFIA-001 (Guernica)
            [
                'sensor_id' => $sensores->where('referencia', 'SENSOR-RSOFIA-001')->first()->id,
                'campania_id' => $campanias->where('nombre', 'Campaña Reina Sofía 2026 - Invierno')->first()->id,
                'fecha' => '2025-12-15',
                'valor_ph' => 5.5,
                'temperatura' => 19.8,
                'humedad_relativa' => 48.5,
                'es_medida_inicial' => true,
                'observaciones' => 'Condiciones óptimas para Guernica',
            ],
            [
                'sensor_id' => $sensores->where('referencia', 'SENSOR-RSOFIA-001')->first()->id,
                'campania_id' => $campanias->where('nombre', 'Campaña Reina Sofía 2026 - Invierno')->first()->id,
                'fecha' => '2026-01-15',
                'valor_ph' => 5.6,
                'temperatura' => 19.5,
                'humedad_relativa' => 49.2,
                'es_medida_inicial' => false,
                'observaciones' => 'Temperatura estable en invierno',
            ],
            // Mediciones para SENSOR-THYSSEN-001 (Sala Norte)
            [
                'sensor_id' => $sensores->where('referencia', 'SENSOR-THYSSEN-001')->first()->id,
                'campania_id' => $campanias->where('nombre', 'Campaña Thyssen 2026 - Verano')->first()->id,
                'fecha' => '2026-06-15',
                'valor_ph' => 7.3,
                'temperatura' => 25.3,
                'humedad_relativa' => 45.7,
                'es_medida_inicial' => true,
                'observaciones' => 'Alerta de temperatura elevada',
            ],
            [
                'sensor_id' => $sensores->where('referencia', 'SENSOR-THYSSEN-001')->first()->id,
                'campania_id' => $campanias->where('nombre', 'Campaña Thyssen 2026 - Verano')->first()->id,
                'fecha' => '2026-07-15',
                'valor_ph' => 8.0,
                'temperatura' => 26.8,
                'humedad_relativa' => 42.1,
                'es_medida_inicial' => false,
                'observaciones' => 'Temperatura muy elevada en verano',
            ],
            [
                'sensor_id' => $sensores->where('referencia', 'SENSOR-THYSSEN-001')->first()->id,
                'campania_id' => $campanias->where('nombre', 'Campaña Thyssen 2026 - Verano')->first()->id,
                'fecha' => '2026-08-15',
                'valor_ph' => 5.3,
                'temperatura' => 27.1,
                'humedad_relativa' => 41.5,
                'es_medida_inicial' => false,
                'observaciones' => 'Pico máximo de temperatura',
            ],
        ];

        foreach ($mediciones as $medicion) {
            Medicion::create($medicion);
        }
    }
}
