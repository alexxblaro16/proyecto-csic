<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sensor', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ubicacion_id');
            $table->string('referencia', 100)->unique();
            $table->enum('estado', ['activo', 'inactivo'])->default('activo');
            $table->string('notas', 255)->nullable();

            $table->foreign('ubicacion_id')->references('id')->on('ubicacion')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sensor');
    }
};
