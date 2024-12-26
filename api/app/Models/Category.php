<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder; // Ensure Builder is imported

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'serial', 'status', 'description', 'photo', 'user_id'];

    /**
     * Store a new category in the database.
     *
     * @param array $input
     * @return Builder|Model
     */
    final public function storeCategory(array $input): Builder|Model
    {
        return self::query()->create($input);
    }
}
