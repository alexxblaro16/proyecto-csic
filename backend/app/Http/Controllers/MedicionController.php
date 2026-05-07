<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Medicion;

class MedicionController extends Controller
{
    /**
     * Listar todas las mediciones
     */
    public function index()
    {
        $mediciones = Medicion::all();
        return response()->json($mediciones);
    }

    /**
     * Crear una nueva medición
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'sensor_id' => 'required|integer|exists:sensores,id',
            'campania_id' => 'required|integer|exists:campanias,id',
            'fecha' => 'required|date',
            'valor_ph' => 'nullable|numeric',
            'temperatura' => 'nullable|numeric',
            'humedad_relativa' => 'nullable|numeric',
            'es_medida_inicial' => 'nullable|boolean',
            'observaciones' => 'nullable|string',
        ]);

        $medicion = Medicion::create($validated);
        return response()->json($medicion, 201);
    }

    /**
     * Mostrar una medición específica
     */
    public function show($id)
    {
        $medicion = Medicion::find($id);

        if (!$medicion) {
            return response()->json([
                'ok' => false,
                'message' => 'Medición no encontrada'
            ], 404);
        }

        return response()->json($medicion);
    }

    /**
     * Actualizar una medición
     */
    public function update(Request $request, $id)
    {
        $medicion = Medicion::find($id);

        if (!$medicion) {
            return response()->json([
                'ok' => false,
                'message' => 'Medición no encontrada'
            ], 404);
        }

        $validated = $request->validate([
            'sensor_id' => 'sometimes|required|integer|exists:sensores,id',
            'campania_id' => 'sometimes|required|integer|exists:campanias,id',
            'fecha' => 'sometimes|required|date',
            'valor_ph' => 'nullable|numeric',
            'temperatura' => 'nullable|numeric',
            'humedad_relativa' => 'nullable|numeric',
            'es_medida_inicial' => 'nullable|boolean',
            'observaciones' => 'nullable|string',
        ]);

        $medicion->update($validated);
        return response()->json($medicion);
    }

    /**
     * Eliminar una medición
     */
    public function destroy($id)
    {
        $medicion = Medicion::find($id);

        if (!$medicion) {
            return response()->json([
                'ok' => false,
                'message' => 'Medición no encontrada'
            ], 404);
        }

        $medicion->delete();

        return response()->json([
            'ok' => true,
            'message' => 'Medición eliminada correctamente'
        ]);
    }
}

