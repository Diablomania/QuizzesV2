<?php

namespace App\Models\Quizzes;

use App\Models\Language;
use Illuminate\Database\Eloquent\Model;

/**
 *
 *
 * @property int $id
 * @property int $category_id
 * @property string|null $img_url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Quizzes\QuizQuestionAnswer> $answers
 * @property-read int|null $answers_count
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

    public static function boot()
    {
        parent::boot();

        static::retrieved(function ($quiz) {
            $systemLanguageId = Language::whereShortName(config('app.locale'))->first()->id;
            $translation = $quiz->translations()->whereLanguageId($systemLanguageId)->first(['name', 'description']);
            if ($translation) {
                $quiz->name = $translation->name;
                $quiz->description = $translation->description;
            }
        });
    }

    public function category(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo('App\Models\Quizzes\QuizzesCategory');
    }

    public function questions(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany('App\Models\Quizzes\QuizzesQuestion');
    }

    public function answers(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany('App\Models\Quizzes\QuizQuestionAnswer');
    }

    public function translations(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany('App\Models\Quizzes\Translates\QuizTranslates');
    }
}
