<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Language;
use App\Models\Style;
use App\Models\User;
use App\Models\UserSettings;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request, Language $language): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'local' => 'required|string',
            'style' => 'required|string',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $local = $request->local;
        $lang = $local ? explode('-', $local)[0] : Language::DEFAULT_SHORT_NAME_LANGUAGE;
        $language = $language->whereShortName($lang)->first();
        $finalLanguage = $language ?? Language::getDefaultLanguage();

        $style = Style::whereName($request->style)->first();
        if (!$style) {
            $style = Style::whereName(Style::NORMAL_STYLE_NAME)->first();
        }

        if ($user) {
            $userSettings = new UserSettings();
            $userSettings->user_id = $user->id;
            $userSettings->languages_id = $finalLanguage->id;
            $userSettings->styles_id = $style->id;
            $userSettings->save();
        }

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
