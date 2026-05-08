<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Models\Product;
use App\Models\Museo;

/* Route::get('/health', function () {
    return response()->json([
        'ok' => true,
        'app' => config('app.name'),
    ]);
});

Route::get('/test-mongodb', function () {
    try {
        // Test connection
        DB::connection('mongodb')->ping();
        
        // Test create sample document
        $product = Product::create([
            'name' => 'Test Product',
            'sku' => 'TEST-001',
            'price' => 99.99
        ]);
        
        // Test retrieve
        $all = Product::all();
        
        return response()->json([
            'ok' => true,
            'message' => 'MongoDB connection successful!',
            'created_product' => $product,
            'total_products' => $all->count()
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'ok' => false,
            'error' => $e->getMessage()
        ], 500);
    }
}); */

// Rutas públicas (sin autenticación)
Route::apiResource('usuarios', App\Http\Controllers\UserController::class);
Route::apiResource('museos', App\Http\Controllers\MuseoController::class);
Route::apiResource('ubicaciones', App\Http\Controllers\UbicacionController::class);
Route::apiResource('sensores', App\Http\Controllers\SensorController::class);
Route::apiResource('mediciones', App\Http\Controllers\MedicionController::class);
Route::apiResource('campanias', App\Http\Controllers\CampaniaController::class);
//Route::apiResource('imagenes', App\Http\Controllers\ImagenController::class);

// Rutas específicas para imágenes por sensor o ubicación
Route::get('/imagenes/sensor/{sensor_referencia}', [App\Http\Controllers\ImagenController::class, 'showBySensor']);
Route::get('/imagenes/ubicacion/{ubicacion_id}', [App\Http\Controllers\ImagenController::class, 'showByUbicacion']);

// Rutas protegidas (con autenticación)
Route::middleware('auth:sanctum')->group(function () {
    
});


