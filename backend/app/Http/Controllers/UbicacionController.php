<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UbicacionSql;

class UbicacionController extends Controller
{
    /**
     * Listar todas las ubicaciones
     */
    public function index()
    {
        $ubicaciones = UbicacionSql::with('museo')->get();
        return response()->json($ubicaciones);
    }

    /**
     * Crear una nueva ubicación
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'museo_id' => 'required|integer|exists:museos,id',
            'posicion' => 'required|string|max:255',
            'nombre' => 'nullable|string|max:255',
            'es_exterior' => 'nullable|boolean',
            'notas' => 'nullable|string',
        ]);

        $ubicacion = UbicacionSql::create($validated)->load('museo');
        return response()->json($ubicacion, 201);
    }

    /**
     * Mostrar una ubicación específica
     */
    public function show($id)
    {
        $ubicacion = UbicacionSql::with(['museo', 'sensores'])->find($id);

        if (!$ubicacion) {
            return response()->json([
                'ok' => false,
                'message' => 'Ubicación no encontrada'
            ], 404);
        }

        return response()->json($ubicacion);
    }

    /**
     * Actualizar una ubicación
     */
    public function update(Request $request, $id)
    {
        $ubicacion = UbicacionSql::find($id);

        if (!$ubicacion) {
            return response()->json([
                'ok' => false,
                'message' => 'Ubicación no encontrada'
            ], 404);
        }

        $validated = $request->validate([
            'museo_id' => 'sometimes|required|integer|exists:museos,id',
            'posicion' => 'sometimes|required|string|max:255',
            'nombre' => 'nullable|string|max:255',
            'es_exterior' => 'nullable|boolean',
            'notas' => 'nullable|string',
        ]);

        $ubicacion->update($validated);
        $ubicacion->load('museo');

        return response()->json($ubicacion);
    }

    /**
     * Eliminar una ubicación
     */
    public function destroy($id)
    {
        $ubicacion = UbicacionSql::find($id);

        if (!$ubicacion) {
            return response()->json([
                'ok' => false,
                'message' => 'Ubicación no encontrada'
            ], 404);
        }

        $ubicacion->delete();

        return response()->json([
            'ok' => true,
            'message' => 'Ubicación eliminada correctamente'
        ]);
    }
}
            
