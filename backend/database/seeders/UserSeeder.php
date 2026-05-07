<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear usuarios específicos
        User::create([
            'name' => 'Administrador',
            'email' => 'admin@csic.es',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Juan García López',
            'email' => 'juan.garcia@csic.es',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'María Rodríguez Díaz',
            'email' => 'maria.rodriguez@csic.es',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Carlos López Martínez',
            'email' => 'carlos.lopez@csic.es',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        // Crear 10 usuarios adicionales usando factory
        User::factory(10)->create();
    }
}
