<?php

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
    Route::group(['prefix' => 'quiz'], function () {
        Route::get('/categories', [QuizController::class, 'categories'])->name('quizzes.categories');
        Route::get('/categories/{id}', [QuizController::class, 'showCategory'])->name('quizzes.categories.show');
        Route::get('/create', [QuizController::class, 'createQuiz'])->name('quiz.build');
        Route::post('/save', [QuizController::class, 'saveQuiz'])->name('quiz.save');
        Route::get('/{id}', [QuizController::class, 'showQuiz'])->name('quiz');
    });
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
