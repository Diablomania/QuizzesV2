<?php

namespace App\Http\Requests\Quizzes\Quiz;

use Illuminate\Foundation\Http\FormRequest;

class CreateTranslateRequest extends FormRequest
{
    public function rules()
    {
        return [
            'id' => 'required|integer|exists:quizzes,id',
            'language_id' => 'required|integer|exists:languages,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'questions' => 'required|array|min:1',
            'questions.*.question' => 'required|string|max:500',
            'questions.*.answers' => 'required|array|min:1',
            'questions.*.answers.*.answer' => 'required|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'id.required' => 'Ід вікторини є обов\'язковим.',
            'language_id.required' => 'Ід мови є обов\'язковою.',
            'name.required' => 'Назва вікторини є обов\'язковою.',
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
            'id' => "Quiz ID",
            'language_id' => "Language ID",
            'name' => "Quiz name",
        ];
    }
}
