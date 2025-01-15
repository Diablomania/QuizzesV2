<?php

use App\Http\Controllers\LanguageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Quiz\QuizController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/home', function () {
    return view('user.home', []);
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/hello', function () {
    return Inertia::render('Hello');
})->middleware(['auth', 'verified'])->name('hello');

Route::middleware('auth')->group(function () {
    Route::get('/languages', [LanguageController::class, 'getLanguages'])->name('getLanguages');
    Route::post('/language', [LanguageController::class, 'setLanguage'])->name('setLanguage');

    Route::group(['prefix' => 'quiz'], function () {
        Route::get('/categories', [QuizController::class, 'categories'])->name('quizzes.categories');
        Route::get('/categories/{id}', [QuizController::class, 'showCategory'])->name('quizzes.categories.show');
        Route::get('/create', [QuizController::class, 'createQuiz'])->name('quiz.build');
        Route::get('/{id}/manage-translate', [QuizController::class, 'addTranslate'])->name('quiz.manage-translate');
        Route::get('/{id}/add-questions', [QuizController::class, 'addQuestions'])->name('quiz.add-questions');
        Route::post('/save-translate', [QuizController::class, 'saveTranslate'])->name('quiz.save-translate');
        Route::post('/save', [QuizController::class, 'saveQuiz'])->name('quiz.save');
        Route::get('/edit/{id}', [QuizController::class, 'editQuiz'])->name('quiz.edit');
        Route::put('/update', [QuizController::class, 'updateQuiz'])->name('quiz.update');
        Route::get('/{quiz}', [QuizController::class, 'showQuiz'])->name('quiz');
        Route::delete('/{quiz}', [QuizController::class, 'deleteQuiz'])->name('quiz.delete');
        Route::delete('/answer/{answer}', [QuizController::class, 'deleteAnswer'])->name('quiz.delete-answer');
        Route::delete('/question/{question}', [QuizController::class, 'deleteQuestion'])->name('quiz.delete-question');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
