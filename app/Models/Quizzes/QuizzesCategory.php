<?php

namespace App\Models\Quizzes;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Lang;

/**
 *
 *
 * @property int $id
 * @property string|null $img_url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Quizzes\Quiz> $quizzes
 * @property-read int|null $quizzes_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizzesCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizzesCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizzesCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizzesCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizzesCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizzesCategory whereImgUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|QuizzesCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class QuizzesCategory extends Model
{
    protected $table = 'quizzes_categories';

    protected $fillable = [
        'img_url'
    ];

    public static function boot()
    {
        parent::boot();

        static::retrieved(function ($category) {
            $category->name =
                Lang::has("categories.".$category->id.".name")
                    ? __("categories.".$category->id.".name")
                    : ""
            ;
            $category->description =
                Lang::has("categories.".$category->id.".description")
                    ? __("categories.".$category->id.".description")
                    : ""
            ;
        });
    }

    public function quizzes(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany('App\Models\Quizzes\Quiz');
    }
}
