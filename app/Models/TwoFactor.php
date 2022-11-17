<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TwoFactor extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'confirmed_at'
    ];

   

    public function user() {
        return $this->belongsTo(User::class);
    }
}
