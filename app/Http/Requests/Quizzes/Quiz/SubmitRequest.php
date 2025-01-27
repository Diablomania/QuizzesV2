<?php

namespace App\Http\Requests\Quizzes\Quiz;

use Illuminate\Foundation\Http\FormRequest;

class SubmitRequest extends FormRequest
{
    public function rules()
    {
        return [
            '*.question_id' => 'required|integer|exists:quizzes_questions,id',
            '*.answers' => 'required|array|min:1',
            '*.answers.*.answer_id' => 'required|integer|exists:quizzes_questions_answers,id',
            '*.answers.*.answer' => 'required|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            '*.question_id.required' => 'Each question must have a question_id.',
            '*.question_id.integer' => 'The question_id must be an integer.',
            '*.question_id.exists' => 'The question_id must exist in the quizzes_questions table.',
            '*.answers.required' => 'Each question must have answers.',
            '*.answers.array' => 'The answers must be an array.',
            '*.answers.min' => 'Each question must have at least one answer.',
            '*.answers.*.answer_id.required' => 'Each answer must have an answer_id.',
            '*.answers.*.answer_id.integer' => 'The answer_id must be an integer.',
            '*.answers.*.answer_id.exists' => 'The answer_id must exist in the quizzes_questions_answers table.',
            '*.answers.*.answer.required' => 'Each answer must have a value.',
            '*.answers.*.answer.boolean' => 'Each answer must be true or false.',
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
            '*.question_id' => "Question ID",
            '*.answers.*.answer_id' => "Answer ID",
        ];
    }
}
