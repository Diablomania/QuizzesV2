<?php

namespace App\Models\Quizzes;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

/**
 *
 *
 * @property int $id
 * @property int $quizzes_id
 * @property int $user_id
 * @property int $score
 * @property int $is_best
 * @property string|null $img_url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizResult newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizResult newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizResult query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizResult whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizResult whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizResult whereImgUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizResult whereIsBest($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizResult whereQuizzesId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizResult whereScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizResult whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizResult whereUserId($value)
 * @mixin \Eloquent
 */
class QuizResult extends Model
{
    protected $table = 'quiz_results';

    protected $fillable = [
        'quizzes_id', 'user_id', 'score', 'is_best', 'img_url'
    ];

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($quizResult) {
            if ($quizResult->img_url) {
                $relativePath = str_replace('/storage/', '', $quizResult->img_url);

                if (Storage::disk('public')->exists($relativePath)) {
                    Storage::disk('public')->delete($relativePath);
                }
            }
        });
    }

    public function quizzes(): BelongsTo
    {
        return $this->belongsTo('App\Models\Quizzes\Quiz');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo('App\Models\User');
    }
}
