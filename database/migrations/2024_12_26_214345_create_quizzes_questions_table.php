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
        Schema::create('quizzes_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quizzes_id')
                ->constrained('quizzes')
                ->onDelete('cascade')
                ->onUpdate('cascade')
            ;
            $table->boolean('is_multi_answers')->default(false);
            $table->string('img_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quizzes_questions');
    }
};
