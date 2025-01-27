<?php

namespace App\Http\Requests\Quizzes\Quiz;

use Illuminate\Foundation\Http\FormRequest;

class CreateCategoryRequest extends FormRequest
{
    public function rules()
    {
        return [
            'language_id' => 'required|integer|exists:languages,id',
            'img_url' => 'nullable|string',
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
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
