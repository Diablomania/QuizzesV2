<?php

namespace App\Models\Quizzes;

use App\Models\Language;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

/**
 *
 *
 * @property int $id
 * @property string|null $img_url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $description
 * @property-read mixed $name
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Quizzes\Quiz> $quizzes
 * @property-read int|null $quizzes_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Quizzes\Translates\QuizCategoryTranslates> $translations
 * @property-read int|null $translations_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizzesCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizzesCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizzesCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizzesCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizzesCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizzesCategory whereImgUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizzesCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class QuizzesCategory extends Model
{
    protected $table = 'quizzes_categories';

    protected $fillable = [
        'img_url'
    ];

    protected $appends = ['name', 'description', 'default_name', 'default_description'];

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($quizzesCategory) {
            if ($quizzesCategory->img_url) {
                $relativePath = str_replace('/storage/', '', $quizzesCategory->img_url);

                if (Storage::disk('public')->exists($relativePath)) {
                    Storage::disk('public')->delete($relativePath);
                }
            }

            $quizzesCategory->quizzes->each(function ($quiz) {
                if ($quiz->img_url) {
                    $relativePath = str_replace('/storage/', '', $quiz->img_url);

                    if (Storage::disk('public')->exists($relativePath)) {
                        Storage::disk('public')->delete($relativePath);
                    }
                }

                $quiz->questions->each(function ($question) {
                    if ($question->img_url) {
                        $relativePath = str_replace('/storage/', '', $question->img_url);

                        if (Storage::disk('public')->exists($relativePath)) {
                            Storage::disk('public')->delete($relativePath);
                        }
                    }

                    $question->answers->each(function ($answer) {
                        if ($answer->img_url) {
                            $relativePath = str_replace('/storage/', '', $answer->img_url);

                            if (Storage::disk('public')->exists($relativePath)) {
                                Storage::disk('public')->delete($relativePath);
                            }
                        }

                        $answer->delete();
                    });

                    $question->delete();
                });

                $quiz->results->each(function ($result) {
                    if ($result->img_url) {
                        $relativePath = str_replace('/storage/', '', $result->img_url);

                        if (Storage::disk('public')->exists($relativePath)) {
                            Storage::disk('public')->delete($relativePath);
                        }
                    }

                    $result->delete();
                });

                $quiz->delete();
            });
        });
    }

    public function getTranslationAttribute(string $attribute)
    {
        $defaultLanguageId = Language::getDefaultLanguage()->id;

        $userLanguageId = Auth::check()
            ? Auth::user()->settings->languages_id
            : $defaultLanguageId;

        $translation = $this->translations()->whereLanguageId($userLanguageId)->first()
            ?? $this->translations()->whereLanguageId($defaultLanguageId)->first();

        return $translation ? $translation->$attribute : null;
    }

    public function getDefaultTranslationAttribute(string $attribute)
    {
        $defaultLanguageId = Language::getDefaultLanguage()->id;
        $translation = $this->translations()->whereLanguageId($defaultLanguageId)->first();

        return $translation ? $translation->$attribute : null;
    }

    public function getDefaultNameAttribute()
    {
        return $this->getDefaultTranslationAttribute('name');
    }

    public function getDefaultDescriptionAttribute()
    {
        return $this->getDefaultTranslationAttribute('description');
    }

    public function getNameAttribute()
    {
        return $this->getTranslationAttribute('name');
    }

    public function getDescriptionAttribute()
    {
        return $this->getTranslationAttribute('description');
    }

    public function quizzes(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany('App\Models\Quizzes\Quiz', 'category_id', 'id');
    }

    public function translations(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany('App\Models\Quizzes\Translates\QuizCategoryTranslates', 'quizzes_categories_id', 'id');
    }
}
