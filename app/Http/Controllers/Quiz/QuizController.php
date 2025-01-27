<?php

namespace App\Http\Controllers\Quiz;

use App\Http\Controllers\Controller;
use App\Http\Requests\Quizzes\Quiz\CreateCategoryRequest;
use App\Http\Requests\Quizzes\Quiz\CreateRequest;
use App\Http\Requests\Quizzes\Quiz\CreateTranslateRequest;
use App\Http\Requests\Quizzes\Quiz\SubmitRequest;
use App\Http\Requests\Quizzes\Quiz\UpdateCategoryRequest;
use App\Http\Requests\Quizzes\Quiz\UpdateRequest;
use App\Models\Language;
use App\Models\Quizzes\Quiz;
use App\Models\Quizzes\QuizQuestionAnswer;
use App\Models\Quizzes\QuizResult;
use App\Models\Quizzes\QuizzesCategory;
use App\Models\Quizzes\QuizzesQuestion;
use App\Models\Quizzes\Translates\QuizAnswerTranslates;
use App\Models\Quizzes\Translates\QuizCategoryTranslates;
use App\Models\Quizzes\Translates\QuizQuestionTranslates;
use App\Models\Quizzes\Translates\QuizTranslates;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class QuizController extends Controller
{
    public function categories(QuizzesCategory $categories): Response
    {
        $allCategories = $categories->select(['id', 'img_url'])->get()->toArray();

        return Inertia::render('Quizzes/QuizCategories', ['categories' => $allCategories]);
    }
    public function editCategories(QuizzesCategory $categories): Response
    {
        $allCategories = $categories->get()->toArray();

        return Inertia::render('Quizzes/EditQuizCategories', ['categories' => $allCategories]);
    }

    public function editCategory(QuizzesCategory $quizzesCategory, Language $language, int $id): Response
    {
        $defaultLanguageId = Language::getDefaultLanguage()->id;
        $category = $quizzesCategory->whereId($id)->with(['translations'])->firstOrFail()->toArray();
        $languages = $language->select(['id', 'name', 'short_name', 'img_url'])->get()->toArray();
        $category['language_id'] = $defaultLanguageId;

        return Inertia::render('Quizzes/EditQuizCategory', ['category' => $category, 'languages' => $languages]);
    }

    public function showCategory(Quiz $quizzes, $id): Response
    {
        $allQuizzes = $quizzes->whereCategoryId($id)->get()->toArray();

        return Inertia::render('Quizzes/Quizzes', ['quizzes' => $allQuizzes]);
    }

    public function deleteCategory(QuizzesCategory $quizzesCategory): JsonResponse
    {
        try {
            $quizzesCategory->delete();

            return response()->json([
                'message' => 'Quizzes category deleted successfully.',
                'id' => $quizzesCategory->id,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete the quizzes category.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function showQuiz(Quiz $quiz, int $id): Response
    {
        $user = Auth::user()->with('settings')->firstOrFail();
        $languageId = $user->settings->languages_id;
        $quiz = $quiz->whereId($id)->with([
                'translations' => function ($query) use ($languageId) {
                    $query->where('language_id', $languageId);
                },
                'questions',
                'questions.translations' => function ($query) use ($languageId) {
                    $query->where('language_id', $languageId);
                },
                'questions.answers',
                'questions.answers.translates' => function ($query) use ($languageId) {
                    $query->where('language_id', $languageId);
                },
            ])
            ->firstOrFail();

        return Inertia::render('Quizzes/Quiz', compact('quiz', 'user'));
    }

    public function submitQuiz(SubmitRequest $request): JsonResponse
    {
        $data = $request->validated();
        $response = [];
        $score = 0;

        foreach ($data as $question) {
            $qq = QuizzesQuestion::whereId($question['question_id'])->first()->answers()->get()->toArray();

            if (sizeof($qq) != sizeof($question['answers'])) {
                return response()->json([
                    'error' => 'Failed count answers.',
                ], 500);
            }

            $point = true;

            foreach ($question['answers'] as $key => $answer) {
                if ($answer['answer'] != $qq[$key]['is_true']) {
                    $point = false;
                }
            }

            $score += $point;
        }

        $quizResult = new QuizResult();
        $quizResult->quizzes_id = QuizzesQuestion::whereId($data[0]['question_id'])->first()->quizzes()->first()->id;
        $quizResult->user_id = Auth::id();
        $quizResult->score = $score;

        $existingBestResult = QuizResult::where('quizzes_id', $quizResult->quizzes_id)
            ->where('user_id', $quizResult->user_id)
            ->where('is_best', true)
            ->first();

        if ($existingBestResult) {
            if ($existingBestResult->score < $quizResult->score) {
                $existingBestResult->is_best = false;
                $existingBestResult->save();

                $quizResult->is_best = true;
            } else {
                $quizResult->is_best = false;
            }
        } else {
            $quizResult->is_best = true;
        }

        $quizResult->save();

        $response['score'] = $score;
        $response['is_best'] = $quizResult->is_best;

        return response()->json($response);
    }

    public function saveQuizCategory(CreateCategoryRequest $request): JsonResponse
    {
        $data = $request->all();
        $quizCategory = QuizzesCategory::create($data);
        QuizCategoryTranslates::create([
            'quizzes_categories_id' => $quizCategory->id,
            'language_id' => $data['language_id'],
            'name' => $data['name'],
            'description' => $data['description'],
        ]);

        return response()->json(['id' => $quizCategory->id]);
    }

    public function updateCategory(UpdateCategoryRequest $request): JsonResponse
    {
        $data = $request->all();

        $quizCategory = QuizzesCategory::find($data['id']);
        if ($quizCategory) {
            $quizCategory->makeHidden(['name', 'description', 'default_name', 'default_description']);
            $quizCategory->update([
                'img_url' => $data['img_url'],
            ]);
        }

        foreach ($data['translations'] as $index => $translate) {
            if ($translate['id'] ?? false) {
                $quizTranslate = QuizCategoryTranslates::find($translate['id']);
                if ($quizTranslate) {
                    $quizTranslate->update([
                        'description' => $translate['description'],
                        'name' => $translate['name'],
                    ]);
                }
            } else {
                $quizTranslate = new QuizCategoryTranslates();
                $quizTranslate->name = $translate['name'];
                $quizTranslate->description = $translate['description'];
                $quizTranslate->language_id = $translate['language_id'];
                $quizTranslate->quizzes_categories_id = $translate['quizzes_categories_id'];
                $quizTranslate->save();

                $data['translations'][$index]['id'] = $quizTranslate->id;
            }
        }

        return response()->json($data);
    }

    public function deleteQuiz(Quiz $quiz): JsonResponse
    {
        try {
            $quiz->delete();

            return response()->json([
                'message' => 'Answer deleted successfully.',
                'id' => $quiz->id,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete the answer.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function createQuizCategory(Language $language, QuizzesCategory $quizzesCategory): Response
    {
        $allCategories = $quizzesCategory->select(['id'])->get()->toArray();
        $languages = $language->select(['id', 'name', 'short_name', 'img_url'])->get()->toArray();

        return Inertia::render('Quizzes/CreateQuizCategory', [
            'categories' => $allCategories,
            'defaultLanguage' => $language->getDefaultLanguage(),
            'languages' => $languages,
        ]);
    }

    public function createQuiz(Language $language, QuizzesCategory $quizzesCategory)
    {
        $allCategories = $quizzesCategory->select(['id'])->get()->toArray();
        $languages = $language->select(['id', 'name', 'short_name', 'img_url'])->get()->toArray();

        return Inertia::render('Quizzes/CreateQuiz', [
            'categories' => $allCategories,
            'defaultLanguage' => $language->getDefaultLanguage(),
            'languages' => $languages,
        ]);
    }

    public function saveQuiz(CreateRequest $request): JsonResponse
    {
        $data = $request->all();
        $quiz = Quiz::create($data);
        QuizTranslates::create([
            'quiz_id' => $quiz->id,
            'language_id' => $data['language_id'],
            'name' => $data['name'],
            'description' => $data['description'],
        ]);

        foreach ($data['questions'] as $question) {
            $quizQuestion = QuizzesQuestion::create([
                'quizzes_id' => $quiz->id,
                'is_multi_answers' => $question['is_multi_answers'],
                'img_url' => $question['img_url'],
            ]);
            QuizQuestionTranslates::create([
                'quizzes_question_id' => $quizQuestion->id,
                'language_id' => $data['language_id'],
                'question' => $question['question'],
            ]);

            foreach ($question['answers'] as $answer) {
                $quizQuestionAnswer = QuizQuestionAnswer::create([
                    'quizzes_questions_id' => $quizQuestion->id,
                    'is_true' => $answer['is_true'],
                    'img_url' => $answer['img_url'],
                ]);
                QuizAnswerTranslates::create([
                    'quiz_question_answer_id' => $quizQuestionAnswer->id,
                    'language_id' => $data['language_id'],
                    'answer' => $answer['answer'],
                ]);
            }
        }

        return response()->json(['id' => $quiz->id]);
    }

    public function editQuiz(
        Quiz $quiz,
        QuizzesCategory $quizzesCategory,
        Language $language,
        int $id
    )
    {
        $allCategories = $quizzesCategory->select(['id'])->get()->toArray();
        $languages = $language->select(['id', 'name', 'short_name', 'img_url'])->get()->toArray();
        $quiz = $quiz->whereId($id)
            ->with([
                'translations',
                'questions',
                'questions.translations',
                'questions.answers',
                'questions.answers.translates',
            ])
            ->firstOrFail();
        $quizTranslates = $quiz->translations()->select(['id', 'language_id', 'name', 'description'])->get()->toArray();

        return Inertia::render('Quizzes/EditQuiz', [
            'quiz' => $quiz,
            'languages' => $languages,
            'defaultLanguage' => $language->getDefaultLanguage(),
            'quizTranslates' => $quizTranslates,
            'categories' => $allCategories,
        ]);
    }

    public function addTranslate(Quiz $quiz, QuizTranslates $quizTranslates, Language $language, int $id)
    {
        $languages = $language->select(['id', 'name', 'short_name', 'img_url'])->get()->toArray();
        $quiz = $quiz->whereId($id)->select(['id'])
            ->with([
                'translations' => function ($query) {
                    $query->select('id', 'quiz_id', 'language_id', 'name', 'description');
                },
                'questions' => function ($query) {
                    $query->select('id', 'quizzes_id');
                },
                'questions.translations' => function ($query) {
                    $query->select('id', 'quizzes_question_id', 'language_id', 'question');
                },
                'questions.answers' => function ($query) {
                    $query->select('id', 'quizzes_questions_id');
                },
                'questions.answers.translates' => function ($query) {
                    $query->select('id', 'quiz_question_answer_id', 'language_id', 'answer');
                },
            ])
            ->firstOrFail();
        $defaultQuizTranslate = $quizTranslates->whereQuizId($quiz->id)->whereLanguageId(Language::getDefaultLanguage()->id)->select('language_id', 'name', 'description')->firstOrFail();

        return Inertia::render('Quizzes/CreateQuizTranslate', [
            'quiz' => $quiz,
            'defaultQuizTranslate' => $defaultQuizTranslate,
            'languages' => array_values($languages),
        ]);
    }

    public function updateQuiz(UpdateRequest $request): JsonResponse
    {
        $data = $request->all();

        $quiz = Quiz::find($data['id']);
        if ($quiz) {
            $quiz->makeHidden(['name', 'description']);
            $quiz->update([
                'category_id' => $data['category_id'],
                'img_url' => $data['img_url'],
            ]);
        }

        foreach ($data['translations'] as $translate) {
            $quizTranslate = QuizTranslates::find($translate['id']);
            if ($quizTranslate) {
                $quizTranslate->update([
                    'description' => $translate['description'],
                    'name' => $translate['name'],
                ]);
            }
        }

        foreach ($data['questions'] as $question) {
            $qQuestion = QuizzesQuestion::updateOrCreate(
                [
                    'id' => $question['id'] ?? '',
                ],[
                    'quizzes_id' => $question['quizzes_id'],
                    'is_multi_answers' => $question['is_multi_answers'],
                    'img_url' => $question['img_url'],
                ]
            );

            foreach ($question['translations'] as $translate) {
                QuizQuestionTranslates::updateOrCreate(
                    [
                        'id' => $translate['id'] ?? '',
                    ], [
                        'quizzes_question_id' => $qQuestion->id,
                        'language_id' => $translate['language_id'],
                        'question' => $translate['question'],
                    ]
                );
            }

            foreach ($question['answers'] as $answer) {
                $qqAnswer = QuizQuestionAnswer::updateOrCreate([
                    'id' => $answer['id'] ?? '',
                ],[
                    'quizzes_questions_id' => $qQuestion->id,
                    'is_true' => $answer['is_true'],
                    'img_url' => $answer['img_url'],
                ]);

                foreach ($answer['translates'] as $translate) {
                    QuizAnswerTranslates::updateOrCreate([
                        'id' => $translate['id'] ?? '',
                    ], [
                        'quiz_question_answer_id' => $qqAnswer->id,
                        'language_id' => $translate['language_id'],
                        'answer' => $translate['answer'],
                    ]);
                }
            }
        }

        return response()->json($data);
    }

    public function addQuestions(Quiz $quiz, Language $language, int $id)
    {
        $languages = $language->select(['id', 'name', 'short_name', 'img_url'])->get()->toArray();
        $quiz = $quiz->whereId($id)->with('translations')->firstOrFail();
        $quizTranslates = $quiz->translations()->select(['id', 'language_id', 'name', 'description'])->get()->toArray();

        return Inertia::render('Quizzes/CreateQuizQuestions', [
            'quizId' => $quiz,
            'languages' => $languages,
            'quizTranslates' => $quizTranslates,
        ]);
    }

    public function saveTranslate(CreateTranslateRequest $request): JsonResponse
    {
        $data = $request->all();

        QuizTranslates::updateOrCreate([
            'quiz_id' => $data['id'],
            'language_id' => $data['language_id'],
        ],[
            'name' => $data['name'],
            'description' => $data['description'],
        ]);

        foreach ($data['questions'] as $question) {
            QuizQuestionTranslates::updateOrCreate(
                [
                    'quizzes_question_id' => $question['id'],
                    'language_id' => $data['language_id'],
                ],[
                    'question' => $question['question'],
                ]
            );

            foreach ($question['answers'] as $answer) {
                QuizAnswerTranslates::updateOrCreate([
                    'quiz_question_answer_id' => $answer['id'],
                    'language_id' => $data['language_id'],
                ],[
                    'answer' => $answer['answer'],
                ]);
            }
        }

        return response()->json($data);
    }

    public function deleteAnswer(QuizQuestionAnswer $answer): JsonResponse
    {
        try {
            $question = $answer->quizzesQuestion;

            if ($question->answers()->count() <= 1) {
                return response()->json(['error' => 'Cannot delete the only answer for this question.'], 400);
            }

            if ($answer->is_true && $question->answers()->where('is_true', true)->count() <= 1) {
                return response()->json(['error' => 'Cannot delete the correct answer for this question.'], 400);
            }

            $answer->delete();

            return response()->json([
                'message' => 'Answer deleted successfully.',
                'id' => $answer->id,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete the answer.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function deleteQuestion(QuizzesQuestion $question): JsonResponse
    {
        try {
            $question->delete();

            return response()->json([
                'message' => 'Question deleted successfully.',
                'id' => $question->id,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete the question.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
