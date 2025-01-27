<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateImageRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function store(CreateImageRequest $request): JsonResponse
    {
        $currentDate = now()->format('dmY');
        $folderPath = 'images/' . $currentDate;
        $path = $request->file('image')->store($folderPath, 'public');

        return response()->json(['imageUrl' => Storage::url($path)]);
    }
}
