<?php

namespace App\Models\Quizzes\Translates;

use App\Models\Language;
use App\Models\Quizzes\QuizzesCategory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * 
 *
 * @property-read QuizzesCategory|null $category
 * @property-read Language|null $language
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizCategoryTranslates newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizCategoryTranslates newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizCategoryTranslates query()
 * @mixin \Eloquent
 */
class QuizCategoryTranslates extends Model
{
    protected $table = 'quiz_category_translates';

    protected $fillable = [
        'quizzes_categories_id', 'language_id', 'name', 'description'
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(QuizzesCategory::class, 'quizzes_categories_id', 'id');
    }

    public function language(): BelongsTo
    {
        return $this->belongsTo(Language::class);
    }
}
