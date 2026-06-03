<?php

namespace App\Http\Controllers;

use App\Models\Imagen;
use App\Models\UbicacionImagen;
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
            'sensor_referencia' => 'nullable|string|required_without:ubicacion_id',
            'ubicacion_id' => 'nullable|string|required_without:sensor_referencia',
            'archivo' => 'required|file',
            'notas' => 'nullable|string',
            'tipo' => 'nullable|string|in:sensor,ubicacion',
        ]);

        if (!empty($validated['ubicacion_id']) && !UbicacionImagen::find($validated['ubicacion_id'])) {
            return response()->json([
                'ok' => false,
                'message' => 'La ubicación de imágenes no existe en MongoDB',
            ], 422);
        }

        if ($request->file('archivo')) {
            $path = $request->file('archivo')->store('imagenes', 'public');
            $validated['archivo'] = asset('storage/' . $path);
        }

        $validated['fecha_subida'] = now();
        $validated['tipo'] = $validated['tipo'] ?? (!empty($validated['ubicacion_id']) ? 'ubicacion' : 'sensor');

        $imagen = Imagen::create($validated);
        return response()->json($imagen, 201);
    }

    /**
     * Crear una imagen asociada a una ubicación documental de MongoDB
     */
    public function storeByUbicacion(Request $request, $ubicacion_id)
    {
        $validated = $request->validate([
            'archivo' => 'required|file',
            'notas' => 'nullable|string',
        ]);

        if (!UbicacionImagen::find($ubicacion_id)) {
            return response()->json([
                'ok' => false,
                'message' => 'Ubicación de imágenes no encontrada',
            ], 404);
        }

        $path = $request->file('archivo')->store('imagenes', 'public');

        $imagen = Imagen::create([
            'ubicacion_id' => $ubicacion_id,
            'archivo' => asset('storage/' . $path),
            'notas' => $validated['notas'] ?? null,
            'fecha_subida' => now(),
            'tipo' => 'ubicacion',
        ]);

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
