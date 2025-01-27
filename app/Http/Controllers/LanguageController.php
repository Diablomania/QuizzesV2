<?php

namespace App\Http\Controllers;

use App\Models\Language;
use App\Models\UserSettings;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    public function getLanguages(Language $language): JsonResponse
    {
        $languages = $language->select(['id', 'name', 'short_name', 'img_url'])->get()->toArray();

        return response()->json(compact('languages'));
    }

    public function getAuthLanguages(Language $language): JsonResponse
    {
        $user = Auth::user()->with('settings')->first();
        $languages = $language->select(['id', 'name', 'short_name', 'img_url'])->get()->toArray();

        return response()->json(compact('languages', 'user'));
    }

    public function setLanguage(Request $request): JsonResponse
    {
        $request->validate([
            'language_id' => 'required|integer|exists:languages,id',
        ]);
        $userId = Auth::user()->id;
        $userSetting = UserSettings::updateOrCreate([
            'user_id' => $userId,
        ],[
            'languages_id' => $request->language_id,
        ]);

        return response()->json([
            'language_id' => $request->language_id,
            'userSetting' => $userSetting->id,
        ]);
    }
}
