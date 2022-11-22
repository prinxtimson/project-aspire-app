<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'booking_number',
        'meeting_link',
        'description',
        'date',
        'time',
        'status'
    ];

    protected $casts = [
        'date' => 'date'
    ];

    public function user ()
    {
        return $this->belongsTo(User::class);
    }
}
