<?php

namespace App\Http\Requests\Quizzes\Quiz;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    public function rules()
    {
        return [
            'id' => 'required|integer|exists:quizzes,id',
            'category_id' => 'required|integer|exists:quizzes_categories,id',
            'img_url' => 'nullable|string',

            'translations' => 'required|array',
            'translations.*.id' => 'sometimes|integer|exists:quiz_translates,id',
            'translations.*.quiz_id' => 'required|integer|exists:quizzes,id',
            'translations.*.language_id' => 'required|integer|exists:languages,id',
            'translations.*.name' => 'required|string|max:255',
            'translations.*.description' => 'required|string|max:1000',

            'questions' => 'required|array|min:1',
            'questions.*.id' => 'sometimes|integer|exists:quizzes_questions,id',
            'questions.*.quizzes_id' => 'sometimes|integer|exists:quizzes,id',
            'questions.*.is_multi_answers' => 'required|boolean',
            'questions.*.img_url' => 'nullable|string|url',

            'questions.*.translations' => 'required|array|min:1',
            'questions.*.translations.*.id' => 'sometimes|integer|exists:quiz_question_translates,id',
            'questions.*.translations.*.language_id' => 'required|integer|exists:languages,id',
            'questions.*.translations.*.quizzes_question_id' => 'sometimes|integer|exists:quizzes_questions,id',
            'questions.*.translations.*.question' => 'required|string|max:500',

            'questions.*.answers' => 'required|array|min:1',
            'questions.*.answers.*.id' => 'sometimes|integer|exists:quizzes_questions_answers,id',
            'questions.*.answers.*.quizzes_questions_id' => 'sometimes|integer|exists:quizzes_questions_answers,id',
            'questions.*.answers.*.is_true' => 'required|boolean',
            'questions.*.answers.*.img_url' => 'nullable|string|url',

            'questions.*.answers.*.translates' => 'required|array|min:1',
            'questions.*.answers.*.translates.*.id' => 'sometimes|integer|exists:quiz_question_answer_translates,id',
            'questions.*.answers.*.translates.*.quiz_question_answer_id' => 'sometimes|integer|exists:quizzes_questions_answers,id',
            'questions.*.answers.*.translates.*.language_id' => 'required|integer|exists:languages,id',
            'questions.*.answers.*.translates.*.answer' => 'required|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'category_id.required' => 'Ід категорії є обов\'язковою.',
            'img_url.required' => 'Посиланн нв зображення є обов\'язковим.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array
     */
    public function attributes()
    {
        return [
            'category_id' => "Category ID",
            'img_url' => "Image URL",
        ];
    }
}
