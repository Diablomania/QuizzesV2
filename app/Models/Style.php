<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

/**
 *
 *
 * @property int $id
 * @property string $name
 * @property string|null $img_url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Style newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Style newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Style query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Style whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Style whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Style whereImgUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Style whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Style whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Style extends Model
{
    public const NORMAL_STYLE_NAME = "normal";
    public const DARK_STYLE_NAME = "dark";
    public const LIGHT_STYLE_NAME = "light";

    protected $fillable = [
        'name', 'img_url'
    ];

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($style) {
            if ($style->img_url) {
                $relativePath = str_replace('/storage/', '', $style->img_url);

                if (Storage::disk('public')->exists($relativePath)) {
                    Storage::disk('public')->delete($relativePath);
                }
            }
        });
    }
}
