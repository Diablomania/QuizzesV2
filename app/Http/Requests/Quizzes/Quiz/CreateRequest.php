<?php

namespace App\Http\Requests\Quizzes\Quiz;

use Illuminate\Foundation\Http\FormRequest;

class CreateRequest extends FormRequest
{
    public function rules()
    {
        return [
            'language_id' => 'required|integer|exists:languages,id',
            'category_id' => 'required|integer|exists:quizzes_categories,id',
            'img_url' => 'nullable|string',
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'questions' => 'required|array|min:1',
            'questions.*.is_multi_answers' => 'required|boolean',
            'questions.*.img_url' => 'nullable|string|url',
            'questions.*.question' => 'required|string|max:500',
            'questions.*.answers' => 'required|array|min:1',
            'questions.*.answers.*.is_true' => 'required|boolean',
            'questions.*.answers.*.img_url' => 'nullable|string|url',
            'questions.*.answers.*.answer' => 'required|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'category_id.required' => 'Ід категорії є обов\'язковою.',
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
