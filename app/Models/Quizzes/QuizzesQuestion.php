<?php

namespace App\Models\Quizzes;

use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @property int $id
 * @property int $quizzes_id
 * @property int $is_multi_answers
 * @property string|null $img_url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Quizzes\QuizQuestionAnswer> $answers
 * @property-read int|null $answers_count
 * @property-read \App\Models\Quizzes\Quiz $quizzes
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizzesQuestion newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizzesQuestion newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizzesQuestion query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizzesQuestion whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizzesQuestion whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizzesQuestion whereImgUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizzesQuestion whereIsMultiAnswers($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizzesQuestion whereQuizzesId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizzesQuestion whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class QuizzesQuestion extends Model
{
    protected $table = 'quizzes_questions';

    protected $fillable = [
        'quizzes_id', 'is_multi_answers', 'img_url'
    ];

    public function quizzes(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo('App\Models\Quizzes\Quiz', 'quizzes_id');
    }

    public function answers(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany('App\Models\Quizzes\QuizQuestionAnswer', 'quizzes_questions_id');
    }
}
