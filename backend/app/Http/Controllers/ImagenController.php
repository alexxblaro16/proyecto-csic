<?php

namespace App\Http\Controllers;

use App\Models\Imagen;
use Illuminate\Http\Request;

class ImagenController extends Controller
{
    /**
     * Listar todas las imágenes
     */
    public function index()
    {
        $imagenes = Imagen::all();
        return response()->json($imagenes);
    }

    /**
     * Crear una nueva imagen
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'sensor_id' => 'required|integer|exists:mysql.sensores,id',
            'archivo' => 'required|file',
            'notas' => 'nullable|string',
        ]);

        if ($request->file('archivo')) {
            $path = $request->file('archivo')->store('imagenes', 'public');
            $validated['archivo'] = asset('storage/' . $path);
        }

        $validated['fecha_subida'] = now();

        $imagen = Imagen::create($validated);
        return response()->json($imagen, 201);
    }

    /**
     * Mostrar imágenes de un sensor específico
     */
    public function show($sensor_id)
    {
        $imagenes = Imagen::where('sensor_id', (int)$sensor_id)->get();

        if ($imagenes->isEmpty()) {
            return response()->json([
                'ok' => false,
                'message' => 'No hay imágenes para este sensor'
            ], 404);
        }

        return response()->json($imagenes);
    }

    /**
     * Actualizar una imagen
     */
    public function update(Request $request, $id)
    {
        $imagen = Imagen::find((int)$id);

        if (!$imagen) {
            return response()->json([
                'ok' => false,
                'message' => 'Imagen no encontrada'
            ], 404);
        }

        $validated = $request->validate([
            'sensor_id' => 'sometimes|required|integer|exists:mysql.sensores,id',
            'archivo' => 'sometimes|file',
            'notas' => 'nullable|string',
        ]);

        if ($request->file('archivo')) {
            $path = $request->file('archivo')->store('imagenes', 'public');
            $validated['archivo'] = asset('storage/' . $path);
        }

        $imagen->update($validated);
        return response()->json($imagen);
    }

    /**
     * Eliminar una imagen
     */
    public function destroy($id)
    {
        $imagen = Imagen::find((int)$id);

        if (!$imagen) {
            return response()->json([
                'ok' => false,
                'message' => 'Imagen no encontrada'
            ], 404);
        }

        $imagen->delete();

        return response()->json([
            'ok' => true,
            'message' => 'Imagen eliminada correctamente'
        ]);
    }
}
