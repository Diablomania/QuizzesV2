<?php

namespace App\Models\Quizzes;

use Illuminate\Database\Eloquent\Model;

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

    public function quizzesQuestion(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo('App\Models\Quizzes\QuizzesQuestion', 'quizzes_questions_id');
    }
}
