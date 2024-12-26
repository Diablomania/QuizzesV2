<?php

namespace App\Http\Controllers\Quiz;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class QuizController extends Controller
{
    public function categories(): Response
    {
        return Inertia::render('Quizzes/QuizCategories', ['categories' => ["music", "films", "games", "sport", "food and drink"]]);
    }
}
