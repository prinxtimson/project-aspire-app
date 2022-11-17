<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'subscription_id',
        'data',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}