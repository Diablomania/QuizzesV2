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
        Schema::create('quiz_category_translates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quizzes_categories_id')
                ->constrained('quizzes_categories')
                ->onDelete('cascade')
                ->onUpdate('cascade')
            ;
            $table->foreignId('language_id')
                ->constrained('languages')
                ->onDelete('cascade')
                ->onUpdate('cascade')
            ;
            $table->string('name');
            $table->text('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quiz_category_translates');
    }
};
