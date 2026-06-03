<?php

namespace App\Http\Controllers;

use App\Models\UbicacionImagen;
use Illuminate\Http\Request;

/**
 * Controlador de UBICACIONES DOCUMENTALES DE IMÁGENES (MongoDB).
 *
 * Gestiona el modelo UbicacionImagen (MongoDB, colección 'ubicaciones'): agrupa
 * imágenes y referencia sensores por su 'referencia'. Es el dominio de fotos.
 * Ruta: /api/ubicaciones-imagenes
 *
 * NO confundir con UbicacionController, que gestiona la ubicación física SQL
 * de los sensores (/api/ubicaciones).
 */
class UbicacionImagenController extends Controller
{
    public function index()
    {
        return response()->json(UbicacionImagen::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'notas' => 'nullable|string',
            'sensores' => 'nullable|array',
        ]);

        $validated['sensores'] = $validated['sensores'] ?? [];

        $ubicacionImagen = UbicacionImagen::create($validated);

        return response()->json($ubicacionImagen, 201);
    }

    public function show($id)
    {
        $ubicacionImagen = UbicacionImagen::find($id);

        if (!$ubicacionImagen) {
            return response()->json([
                'ok' => false,
                'message' => 'Ubicación de imágenes no encontrada',
            ], 404);
        }

        return response()->json($ubicacionImagen);
    }

    public function update(Request $request, $id)
    {
        $ubicacionImagen = UbicacionImagen::find($id);

        if (!$ubicacionImagen) {
            return response()->json([
                'ok' => false,
                'message' => 'Ubicación de imágenes no encontrada',
            ], 404);
        }

        $validated = $request->validate([
            'notas' => 'nullable|string',
            'sensores' => 'nullable|array',
        ]);

        $ubicacionImagen->update($validated);

        return response()->json($ubicacionImagen);
    }

    public function destroy($id)
    {
        $ubicacionImagen = UbicacionImagen::find($id);

        if (!$ubicacionImagen) {
            return response()->json([
                'ok' => false,
                'message' => 'Ubicación de imágenes no encontrada',
            ], 404);
        }

        $ubicacionImagen->delete();

        return response()->json([
            'ok' => true,
            'message' => 'Ubicación de imágenes eliminada correctamente',
        ]);
    }
}