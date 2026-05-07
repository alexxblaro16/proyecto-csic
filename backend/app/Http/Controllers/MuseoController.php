<?php

namespace App\Http\Controllers;

use App\Models\Museo;
use Illuminate\Http\Request;

class MuseoController extends Controller
{
    /**
     * Listar todos los museos
     */
    public function index()
    {
        $museos = Museo::all();
        return response()->json($museos);
    }

    /**
     * Crear un nuevo museo
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'ciudad' => 'required|string|max:255',
            'pais' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'categoria' => 'nullable|string|max:255',
        ]);

        $museo = Museo::create($validated);
        return response()->json($museo, 201);
    }

    /**
     * Mostrar un museo específico
     */
    public function show($id)
    {
        $museo = Museo::find($id);

        if (!$museo) {
            return response()->json([
                'ok' => false,
                'message' => 'Museo no encontrado'
            ], 404);
        }

        return response()->json($museo);
    }

    /**
     * Actualizar un museo
     */
    public function update(Request $request, $id)
    {
        $museo = Museo::find($id);

        if (!$museo) {
            return response()->json([
                'ok' => false,
                'message' => 'Museo no encontrado'
            ], 404);
        }

        $validated = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'ciudad' => 'sometimes|required|string|max:255',
            'pais' => 'sometimes|required|string|max:255',
            'descripcion' => 'nullable|string',
            'categoria' => 'nullable|string|max:255',
        ]);

        $museo->update($validated);
        return response()->json($museo);
    }

    /**
     * Eliminar un museo
     */
    public function destroy($id)
    {
        $museo = Museo::find($id);

        if (!$museo) {
            return response()->json([
                'ok' => false,
                'message' => 'Museo no encontrado'
            ], 404);
        }

        $museo->delete();

        return response()->json([
            'ok' => true,
            'message' => 'Museo eliminado correctamente'
        ]);
    }
}
