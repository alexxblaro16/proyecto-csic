<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            MuseoSeeder::class,
            UbicacionSqlSeeder::class,    // SQL ubicaciones (necesita museo_id)
            SensorSeeder::class,           // SQL sensores (necesita ubicacion_id SQL)
            CampaniaSeeder::class,
            ImagenSeeder::class,           // MongoDB imágenes PRIMERO (necesario para embeber en ubicaciones)
            UbicacionSeeder::class,        // MongoDB ubicaciones con sensores + imágenes embebidos
            MedicionSeeder::class,
        ]);
    }
}
