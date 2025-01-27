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
 * @property int $category_id
 * @property string|null $img_url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Quizzes\QuizzesCategory $category
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Quizzes\QuizzesQuestion> $questions
 * @property-read int|null $questions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Quizzes\Translates\QuizTranslates> $translations
 * @property-read int|null $translations_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Quiz newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Quiz newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Quiz query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Quiz whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Quiz whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Quiz whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Quiz whereImgUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Quiz whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Quiz extends Model
{
    protected $table = 'quizzes';

    protected $fillable = [
        'category_id', 'img_url'
    ];

    protected $appends = ['name', 'description', 'default_name', 'default_description'];

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($quiz) {
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

    public function category(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo('App\Models\Quizzes\QuizzesCategory');
    }

    public function questions(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany('App\Models\Quizzes\QuizzesQuestion', 'quizzes_id', 'id');
    }

    public function translations(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany('App\Models\Quizzes\Translates\QuizTranslates', 'quiz_id', 'id');
    }

    public function results(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany('App\Models\Quizzes\QuizResult', 'quizzes_id', 'id');
    }
}
