<?php

namespace Database\Seeders;

use App\Models\Language;
use App\Models\Style;
use App\Models\User;
use App\Models\UserSettings;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $email = config('admin.email');
        $password = config('admin.password');

        if (!$email || !$password) {
            throw new \Exception("ADMIN_EMAIL or ADMIN_PASSWORD not installed in .env file");
        }

        $user = User::updateOrCreate(
            ['email' => $email],
            [
                'name' => 'Super Admin',
                'password' => Hash::make($password),
                'is_admin' => true,
            ]
        );

        $defaultLanguage = Language::getDefaultLanguage();
        if (!$defaultLanguage) {
            throw new \Exception("Can't get default language.");
        }

        $normalStyle = Style::whereName(Style::NORMAL_STYLE_NAME)->first();
        if (!$normalStyle) {
            throw new \Exception("Can't get normal style.");
        }

        UserSettings::updateOrCreate(
            ['user_id' => $user->id],
            [
                'languages_id' => $defaultLanguage->id,
                'styles_id' => $normalStyle->id
            ]
        );
    }
}
