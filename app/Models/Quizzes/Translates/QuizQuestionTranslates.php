<?php

namespace App\Models\Quizzes\Translates;

use App\Models\Language;
use App\Models\Quizzes\QuizzesQuestion;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * 
 *
 * @property int $id
 * @property int $quizzes_question_id
 * @property int $language_id
 * @property QuizzesQuestion|null $question
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read Language $language
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizQuestionTranslates newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizQuestionTranslates newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizQuestionTranslates query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizQuestionTranslates whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizQuestionTranslates whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizQuestionTranslates whereLanguageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizQuestionTranslates whereQuestion($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizQuestionTranslates whereQuizzesQuestionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizQuestionTranslates whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class QuizQuestionTranslates extends Model
{
    protected $table = 'quiz_question_translates';

    protected $fillable = [
        'quizzes_question_id', 'language_id', 'question'
    ];

    public function question(): BelongsTo
    {
        return $this->belongsTo(QuizzesQuestion::class);
    }

    public function language(): BelongsTo
    {
        return $this->belongsTo(Language::class);
    }
}
