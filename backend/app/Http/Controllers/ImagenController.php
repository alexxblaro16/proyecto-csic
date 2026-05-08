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
            'sensor_referencia' => 'nullable|string',
            'ubicacion_id' => 'nullable|string',
            'archivo' => 'required|file',
            'notas' => 'nullable|string',
            'tipo' => 'nullable|string|in:sensor,ubicacion',
        ]);

        if ($request->file('archivo')) {
            $path = $request->file('archivo')->store('imagenes', 'public');
            $validated['archivo'] = asset('storage/' . $path);
        }

        $validated['fecha_subida'] = now();
        $validated['tipo'] = $validated['tipo'] ?? 'sensor';

        $imagen = Imagen::create($validated);
        return response()->json($imagen, 201);
    }

    /**
     * Obtener imágenes de un sensor por referencia
     */
    public function showBySensor($sensor_referencia)
    {
        $imagenes = Imagen::bySensor($sensor_referencia)->get();

        if ($imagenes->isEmpty()) {
            return response()->json([
                'ok' => false,
                'message' => 'No hay imágenes para este sensor'
            ], 404);
        }

        return response()->json($imagenes);
    }

    /**
     * Obtener imágenes de una ubicación
     */
    public function showByUbicacion($ubicacion_id)
    {
        $imagenes = Imagen::byUbicacion($ubicacion_id)->get();

        if ($imagenes->isEmpty()) {
            return response()->json([
                'ok' => false,
                'message' => 'No hay imágenes para esta ubicación'
            ], 404);
        }

        return response()->json($imagenes);
    }

    /**
     * Mostrar una imagen específica
     */
    public function show($id)
    {
        $imagen = Imagen::find($id);

        if (!$imagen) {
            return response()->json([
                'ok' => false,
                'message' => 'Imagen no encontrada'
            ], 404);
        }

        return response()->json($imagen);
    }

    /**
     * Actualizar una imagen
     */
    public function update(Request $request, $id)
    {
        $imagen = Imagen::find($id);

        if (!$imagen) {
            return response()->json([
                'ok' => false,
                'message' => 'Imagen no encontrada'
            ], 404);
        }

        $validated = $request->validate([
            'sensor_referencia' => 'nullable|string',
            'ubicacion_id' => 'nullable|string',
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
        $imagen = Imagen::find($id);

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
