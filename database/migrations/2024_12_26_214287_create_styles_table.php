<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('styles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('img_url')->nullable();
            $table->timestamps();
        });

        DB::table('styles')->insert([
            [
                'name' => 'normal',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'dark',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'light',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('styles');
    }
};
