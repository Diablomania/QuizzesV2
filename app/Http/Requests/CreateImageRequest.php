<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateImageRequest extends FormRequest
{
    public function rules()
    {
        return [
            'image' => 'required|image|mimes:xbm,tif,tiff,jiff,ico,tiff,gif,svg,jpeg,svgz,jpg,webp,png,bmp,pjp,apng,pjpeg,avif|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'image.max' => 'The file size must not exceed 2MB.',
            'image.required' => 'The image file is required.',
            'image.image' => 'The uploaded file must be an image.',
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
            'image' => "Image",
        ];
    }
}
