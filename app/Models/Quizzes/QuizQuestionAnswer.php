<?php

namespace App\Models\Quizzes;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

/**
 *
 *
 * @property int $id
 * @property int $quizzes_questions_id
 * @property int $is_true
 * @property string|null $img_url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Quizzes\QuizzesQuestion $quizzesQuestion
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizQuestionAnswer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizQuestionAnswer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizQuestionAnswer query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizQuestionAnswer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizQuestionAnswer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizQuestionAnswer whereImgUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizQuestionAnswer whereIsTrue($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizQuestionAnswer whereQuizzesQuestionsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizQuestionAnswer whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class QuizQuestionAnswer extends Model
{
    protected $table = 'quizzes_questions_answers';

    protected $fillable = [
        'quizzes_questions_id', 'is_true', 'img_url'
    ];

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($quizzesQuestionAnswer) {
            if ($quizzesQuestionAnswer->img_url) {
                $relativePath = str_replace('/storage/', '', $quizzesQuestionAnswer->img_url);

                if (Storage::disk('public')->exists($relativePath)) {
                    Storage::disk('public')->delete($relativePath);
                }
            }
        });
    }

    public function quizzesQuestion(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo('App\Models\Quizzes\QuizzesQuestion', 'quizzes_questions_id', 'id');
    }

    public function translates(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany('App\Models\Quizzes\Translates\QuizAnswerTranslates', 'quiz_question_answer_id', 'id');
    }
}
