<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Listar todos los usuarios
     */
    public function index()
    {
        $usuarios = User::all();
        return response()->json($usuarios);
    }

    /**
     * Crear un nuevo usuario
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:8',
            ]);

            $usuario = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
            ]);

            return response()->json($usuario, 201);
        } catch (ValidationException $e) {
            return response()->json([
                'ok' => false,
                'errors' => $e->errors()
            ], 422);
        }
    }

    /**
     * Mostrar un usuario específico
     */
    public function show($id)
    {
        $usuario = User::find($id);

        if (!$usuario) {
            return response()->json([
                'ok' => false,
                'message' => 'Usuario no encontrado'
            ], 404);
        }

        return response()->json($usuario);
    }

    /**
     * Actualizar un usuario
     */
    public function update(Request $request, $id)
    {
        try {
            $usuario = User::find($id);

            if (!$usuario) {
                return response()->json([
                    'ok' => false,
                    'message' => 'Usuario no encontrado'
                ], 404);
            }

            $validated = $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'email' => 'sometimes|required|email|unique:users,email,' . $id,
                'password' => 'sometimes|required|string|min:8',
            ]);

            if (isset($validated['password'])) {
                $validated['password'] = Hash::make($validated['password']);
            }

            $usuario->update($validated);

            return response()->json($usuario);
        } catch (ValidationException $e) {
            return response()->json([
                'ok' => false,
                'errors' => $e->errors()
            ], 422);
        }
    }

    /**
     * Eliminar un usuario
     */
    public function destroy($id)
    {
        $usuario = User::find($id);

        if (!$usuario) {
            return response()->json([
                'ok' => false,
                'message' => 'Usuario no encontrado'
            ], 404);
        }

        $usuario->delete();

        return response()->json([
            'ok' => true,
            'message' => 'Usuario eliminado correctamente'
        ]);
    }
}
