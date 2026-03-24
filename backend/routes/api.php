<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Models\Product;

Route::get('/health', function () {
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
});
