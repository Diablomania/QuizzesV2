<?php

namespace App\Http\Controllers\Quiz;

use App\Http\Controllers\Controller;
use App\Models\Quizzes\Quiz;
use App\Models\Quizzes\QuizzesCategory;
use Inertia\Inertia;
use Inertia\Response;

class QuizController extends Controller
{
    public function categories(QuizzesCategory $categories): Response
    {
        $allCategories = $categories->select(['id', 'img_url'])->get()->toArray();

        return Inertia::render('Quizzes/QuizCategories', ['categories' => $allCategories]);
    }

    public function showCategory(Quiz $quizzes, $id): Response
    {
        $allQuizzes = $quizzes->whereCategoryId($id)->get()->toArray();

        return Inertia::render('Quizzes/Quizzes', ['quizzes' => $allQuizzes]);
    }

    public function showQuiz(Quiz $quizzes, $id): Response
    {
        return Inertia::render('Quizzes/Quiz', ['quiz' => $quizzes->whereId($id)->firstOrFail()]);
    }

    public function createQuiz(QuizzesCategory $quizzesCategory): Response
    {
        $allCategories = $quizzesCategory->select(['id'])->get()->toArray();

        return Inertia::render('Quizzes/CreateQuiz', ['categories' => $allCategories]);
    }

    public function saveQuiz(QuizzesCategory $quizzesCategory): Response
    {
        $allCategories = $quizzesCategory->select(['id', 'name'])->get()->toArray();

        return Inertia::render('Quizzes/BuildQuiz', ['categories' => $allCategories]);
    }
}
