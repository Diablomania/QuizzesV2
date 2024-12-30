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
        Schema::create('quiz_question_translates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quizzes_question_id')
                ->constrained('quizzes_questions')
                ->onDelete('cascade')
                ->onUpdate('cascade')
            ;
            $table->foreignId('language_id')
                ->constrained('languages')
                ->onDelete('cascade')
                ->onUpdate('cascade')
            ;
            $table->string('question');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quiz_question_translates');
    }
};
