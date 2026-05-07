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
        Schema::create('mediciones', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sensor_id');
            $table->unsignedBigInteger('campania_id')->nullable();
            $table->timestamp('fecha');
            $table->decimal('valor_ph', 5, 2)->nullable(); 
            $table->decimal('temperatura', 5, 2)->nullable();
            $table->decimal('humedad_relativa', 5, 2)->nullable();
            $table->boolean('es_medida_inicial')->default(false);
            $table->string('observaciones', 255)->nullable();
            $table->timestamps();

            $table->foreign('sensor_id')->references('id')->on('sensores')->onDelete('cascade');
            $table->foreign('campania_id')->references('id')->on('campanias');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mediciones');
    }
};
