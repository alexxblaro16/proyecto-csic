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
        Schema::create('ubicaciones', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('museo_id');
            $table->string('posicion', 100);
            $table->string('nombre', 100); // nombre del lugar
            $table->boolean('es_exterior')->default(false);
            $table->string('notas', 255)->nullable();

            $table->foreign('museo_id')->references('id')->on('museos')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ubicaciones');
    }
};
