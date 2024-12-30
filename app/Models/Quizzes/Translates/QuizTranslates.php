<?php

namespace App\Models\Quizzes\Translates;

use App\Models\Language;
use App\Models\Quizzes\Quiz;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * 
 *
 * @property int $id
 * @property int $quiz_id
 * @property int $language_id
 * @property string $name
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read Language $language
 * @property-read Quiz $quiz
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizTranslates newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizTranslates newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizTranslates query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizTranslates whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizTranslates whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizTranslates whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizTranslates whereLanguageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizTranslates whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizTranslates whereQuizId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizTranslates whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class QuizTranslates extends Model
{
    protected $table = 'quiz_translates';

    protected $fillable = [
        'quiz_id', 'language_id', 'name', 'description'
    ];

    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class);
    }

    public function language(): BelongsTo
    {
        return $this->belongsTo(Language::class);
    }
}
