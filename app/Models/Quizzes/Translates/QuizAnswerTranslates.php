<?php

namespace App\Models\Quizzes\Translates;

use App\Models\Language;
use App\Models\Quizzes\QuizQuestionAnswer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * 
 *
 * @property int $id
 * @property int $quiz_question_answer_id
 * @property int $language_id
 * @property QuizQuestionAnswer|null $answer
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read Language $language
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizAnswerTranslates newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizAnswerTranslates newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizAnswerTranslates query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizAnswerTranslates whereAnswer($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizAnswerTranslates whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizAnswerTranslates whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizAnswerTranslates whereLanguageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizAnswerTranslates whereQuizQuestionAnswerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizAnswerTranslates whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class QuizAnswerTranslates extends Model
{
    protected $table = 'quiz_question_answer_translates';

    protected $fillable = [
        'quiz_question_answer_id', 'language_id', 'answer'
    ];

    public function answer(): BelongsTo
    {
        return $this->belongsTo(QuizQuestionAnswer::class);
    }

    public function language(): BelongsTo
    {
        return $this->belongsTo(Language::class);
    }
}
