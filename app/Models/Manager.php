<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\HasMany;

class Manager extends Model
{
    protected $fillable = ['name', 'email'];

    public function assessments(): HasMany
    {
        return $this->hasMany(Assessment::class);
    }
}
