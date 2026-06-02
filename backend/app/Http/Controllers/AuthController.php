<?php

// Ivan: esto lo he tocado yo (Alejandro) para que el front vaya bien.
// Lo he anadido para el login (POST /api/login con Sanctum). Si lo quieres
// asumir/ajustar tu como back, adelante — lo deje funcionando para no bloquear.

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Login: valida credenciales y devuelve un token Sanctum.
     */
    public function login(Request $request)
    {
        $datos = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $datos['email'])->first();

        if (! $user || ! Hash::check($datos['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Las credenciales no son correctas.'],
            ]);
        }

        $token = $user->createToken('desktop')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
        ]);
    }

    /**
     * Usuario autenticado actual.
     */
    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    /**
     * Logout: revoca el token actual.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['ok' => true]);
    }
}
