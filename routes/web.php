<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Quiz\QuizController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('quizzes.categories');
    } else {
        return Inertia::render('Home', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }
});

Route::middleware('guest')->post('/get-languages', [LanguageController::class, 'getLanguages'])->name('getLanguages');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [ProfileController::class, 'getDashboard'])->name('dashboard');
    Route::get('/leaderboard', [ProfileController::class, 'getLeaderboard'])->name('leaderboard');
    Route::post('/get-auth-languages', [LanguageController::class, 'getAuthLanguages'])->name('getAuthLanguages');
    Route::post('/language', [LanguageController::class, 'setLanguage'])->name('setLanguage');

    Route::group(['prefix' => 'quiz'], function () {
        Route::middleware(['admin'])->group(function () {
            Route::get('/categories/edit', [QuizController::class, 'editCategories'])->name('quizzes.categories.edit');
            Route::get('/category/create', [QuizController::class, 'createQuizCategory'])->name('quizzes.category.build');
            Route::post('/category/save', [QuizController::class, 'saveQuizCategory'])->name('quiz.category.save');
            Route::put('/category/update', [QuizController::class, 'updateCategory'])->name('quiz.category.update');
            Route::get('/category/{id}', [QuizController::class, 'editCategory'])->name('quizzes.category.edit');
            Route::delete('/category/{quizzesCategory}', [QuizController::class, 'deleteCategory'])->name('quizzes.category.delete');

            Route::get('/create', [QuizController::class, 'createQuiz'])->name('quiz.build');
            Route::get('/{id}/manage-translate', [QuizController::class, 'addTranslate'])->name('quiz.manage-translate');
            Route::get('/{id}/add-questions', [QuizController::class, 'addQuestions'])->name('quiz.add-questions');
            Route::post('/save-translate', [QuizController::class, 'saveTranslate'])->name('quiz.save-translate');
            Route::post('/save', [QuizController::class, 'saveQuiz'])->name('quiz.save');
            Route::get('/edit/{id}', [QuizController::class, 'editQuiz'])->name('quiz.edit');
            Route::put('/update', [QuizController::class, 'updateQuiz'])->name('quiz.update');
            Route::delete('/{quiz}', [QuizController::class, 'deleteQuiz'])->name('quiz.delete');
            Route::delete('/answer/{answer}', [QuizController::class, 'deleteAnswer'])->name('quiz.delete-answer');
            Route::delete('/question/{question}', [QuizController::class, 'deleteQuestion'])->name('quiz.delete-question');
        });

        Route::get('/categories', [QuizController::class, 'categories'])->name('quizzes.categories');
        Route::get('/categories/{id}', [QuizController::class, 'showCategory'])->name('quizzes.categories.show');
        Route::post('/submit', [QuizController::class, 'submitQuiz'])->name('quiz.submit');
        Route::get('/{id}', [QuizController::class, 'showQuiz'])->name('quiz');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware(['admin'])->post('/upload-image', [ImageController::class, 'store']);
});

require __DIR__.'/auth.php';
