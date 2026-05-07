<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Campania;

class CampaniaController extends Controller
{
    /**
     * Listar todas las campañas
     */
    public function index()
    {
        $campanias = Campania::all();
        return response()->json($campanias);
    }

    /**
     * Crear una nueva campaña
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after:fecha_inicio',
            'notas' => 'nullable|string',
        ]);

        $campania = Campania::create($validated);
        return response()->json($campania, 201);
    }

    /**
     * Mostrar una campaña específica
     */
    public function show($id)
    {
        $campania = Campania::find($id);

        if (!$campania) {
            return response()->json([
                'ok' => false,
                'message' => 'Campaña no encontrada'
            ], 404);
        }

        return response()->json($campania);
    }

    /**
     * Actualizar una campaña
     */
    public function update(Request $request, $id)
    {
        $campania = Campania::find($id);

        if (!$campania) {
            return response()->json([
                'ok' => false,
                'message' => 'Campaña no encontrada'
            ], 404);
        }

        $validated = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'descripcion' => 'nullable|string',
            'fecha_inicio' => 'sometimes|required|date',
            'fecha_fin' => 'sometimes|required|date|after:fecha_inicio',
            'notas' => 'nullable|string',
        ]);

        $campania->update($validated);
        return response()->json($campania);
    }

    /**
     * Eliminar una campaña
     */
    public function destroy($id)
    {
        $campania = Campania::find($id);

        if (!$campania) {
            return response()->json([
                'ok' => false,
                'message' => 'Campaña no encontrada'
            ], 404);
        }

        $campania->delete();

        return response()->json([
            'ok' => true,
            'message' => 'Campaña eliminada correctamente'
        ]);
    }
}
