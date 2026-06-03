<?php

namespace App\Http\Controllers;

use App\Models\Sensor;
use Illuminate\Http\Request;

class SensorController extends Controller
{
    /**
     * Listar todos los sensores
     */
    public function index()
    {
        $sensores = Sensor::with('ubicacionSql.museo')->get();

        return response()->json($sensores);
    }

    /**
     * Crear un nuevo sensor
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ubicacion_id' => 'required|integer|exists:ubicaciones,id',
            'referencia' => 'required|string|max:255',
            'estado' => 'nullable|string|max:255',
            'eje_x' => 'nullable|numeric',
            'eje_y' => 'nullable|numeric',
            'eje_z' => 'nullable|numeric',
            'notas' => 'nullable|string',
        ]);

        $sensor = Sensor::create($validated)->load('ubicacionSql.museo');

        return response()->json($sensor, 201);
    }

    /**
     * Mostrar un sensor específico
     */
    public function show($id)
    {
        $sensor = Sensor::with('ubicacionSql.museo')->find($id);

        if (!$sensor) {
            return response()->json([
                'ok' => false,
                'message' => 'Sensor no encontrado'
            ], 404);
        }

        return response()->json($sensor);
    }

    /**
     * Actualizar un sensor
     */
    public function update(Request $request, $id)
    {
        $sensor = Sensor::find($id);

        if (!$sensor) {
            return response()->json([
                'ok' => false,
                'message' => 'Sensor no encontrado'
            ], 404);
        }

        $validated = $request->validate([
            'ubicacion_id' => 'sometimes|required|integer|exists:ubicaciones,id',
            'referencia' => 'sometimes|required|string|max:255',
            'estado' => 'nullable|string|max:255',
            'eje_x' => 'nullable|numeric',
            'eje_y' => 'nullable|numeric',
            'eje_z' => 'nullable|numeric',
            'notas' => 'nullable|string',
        ]);

        $sensor->update($validated);
        $sensor->load('ubicacionSql.museo');

        return response()->json($sensor);
    }

    /**
     * Eliminar un sensor
     */
    public function destroy($id)
    {
        $sensor = Sensor::find($id);

        if (!$sensor) {
            return response()->json([
                'ok' => false,
                'message' => 'Sensor no encontrado'
            ], 404);
        }

        $sensor->delete();

        return response()->json([
            'ok' => true,
            'message' => 'Sensor eliminado correctamente'
        ]);
    }
}
