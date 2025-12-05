<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Assessment extends Model
{
    protected $fillable = ['manager_id', 'token', 'name', 'email', 'paid', 'price'];

    public function manager(): BelongsTo
    {
        return $this->belongsTo(Manager::class);
    }

    public function response(): HasOne
    {
        return $this->hasOne(AssessmentResponse::class);
    }
}
