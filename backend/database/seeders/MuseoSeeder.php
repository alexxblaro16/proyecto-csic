<?php

namespace Database\Seeders;

use App\Models\Museo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MuseoSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $museos = [
            [
                'nombre' => 'Museo del Prado',
                'ciudad' => 'Madrid',
                'pais' => 'España',
                'descripcion' => 'El Museo del Prado es uno de los museos de arte más importantes del mundo. Fundado en 1819, alberga una vasta colección de obras maestras de artistas como Velázquez, Goya, El Greco y Rubens.',
                'categoria' => 'Arte',
            ],
            [
                'nombre' => 'Museo Reina Sofía',
                'ciudad' => 'Madrid',
                'pais' => 'España',
                'descripcion' => 'Dedicado al arte moderno y contemporáneo español e internacional. Alberga el famoso cuadro "Guernica" de Pablo Picasso.',
                'categoria' => 'Arte Contemporáneo',
            ],
            [
                'nombre' => 'Museo Thyssen-Bornemisza',
                'ciudad' => 'Madrid',
                'pais' => 'España',
                'descripcion' => 'Completa el triángulo del arte español con una colección de pintura europea de los siglos XIII a XX.',
                'categoria' => 'Arte',
            ],
            [
                'nombre' => 'Museo de América',
                'ciudad' => 'Madrid',
                'pais' => 'España',
                'descripcion' => 'Dedicado a las culturas y la historia de América, con una amplia colección de arte precolombino.',
                'categoria' => 'Historia y Arqueología',
            ],
            [
                'nombre' => 'Museu Nacional d\'Art de Catalunya',
                'ciudad' => 'Barcelona',
                'pais' => 'España',
                'descripcion' => 'Museo especializado en arte catalán, desde el arte románico hasta el moderno y contemporáneo.',
                'categoria' => 'Arte',
            ],
            [
                'nombre' => 'Fundació Joan Miró',
                'ciudad' => 'Barcelona',
                'pais' => 'España',
                'descripcion' => 'Centro dedicado a la obra y el legado del artista Joan Miró, con una importante colección de sus obras.',
                'categoria' => 'Arte Moderno',
            ],
            [
                'nombre' => 'Museo Picasso',
                'ciudad' => 'Málaga',
                'pais' => 'España',
                'descripcion' => 'Dedica a la vida y obra de Pablo Picasso, con una excelente colección de cuadros y esculturas del artista.',
                'categoria' => 'Arte Moderno',
            ],
            [
                'nombre' => 'Museo Dalí',
                'ciudad' => 'Figueras',
                'pais' => 'España',
                'descripcion' => 'Museo dedicado a la vida y obra del artista surrealista Salvador Dalí, con una vasta colección de sus obras.',
                'categoria' => 'Arte Surrealista',
            ],
            [
                'nombre' => 'Museo del Greco',
                'ciudad' => 'Toledo',
                'pais' => 'España',
                'descripcion' => 'Dedicado a la vida y obra de El Greco, con obras del artista y documentos históricos relacionados.',
                'categoria' => 'Arte Clásico',
            ],
            [
                'nombre' => 'Museo de los Concilios',
                'ciudad' => 'Toledo',
                'pais' => 'España',
                'descripcion' => 'Museo de arte medieval y arqueología ubicado en la iglesia de San Román de Toledo.',
                'categoria' => 'Historia y Arqueología',
            ],
        ];

        foreach ($museos as $museo) {
            Museo::create($museo);
        }
    }
}
