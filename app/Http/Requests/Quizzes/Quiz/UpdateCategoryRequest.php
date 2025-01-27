<?php

namespace App\Http\Requests\Quizzes\Quiz;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCategoryRequest extends FormRequest
{
    public function rules()
    {
        return [
            'id' => 'required|integer|exists:quizzes_categories,id',
            'img_url' => 'nullable|string',

            'translations' => 'required|array',
            'translations.*.id' => 'sometimes|integer|exists:quiz_category_translates,id',
            'translations.*.quizzes_categories_id' => 'required|integer|exists:quizzes_categories,id',
            'translations.*.language_id' => 'required|integer|exists:languages,id',
            'translations.*.name' => 'required|string|max:255',
            'translations.*.description' => 'required|string|max:1000',
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
