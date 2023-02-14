<?php

namespace App\Models;

use App\Mail\TwoFactorAuth;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Mail;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class User extends Authenticatable implements HasMedia, MustVerifyEmail
{
    use HasApiTokens, HasRoles, HasFactory, Notifiable, InteractsWithMedia, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'avatar',
        'username',
        'status',
        'email',
        'password',
        'device_token',
    ];

    //protected $guard_name = 'web';

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function profile () 
    {
        return $this->hasOne(Profile::class);
    }

    public function setting () 
    {
        return $this->hasOne(Setting::class);
    }

    public function subscription()
    {
        return $this->hasMany(Subscription::class);
    }

    public function reports()
    {
        return $this->hasMany(Report::class);
    }

    public function bookings ()
    {
       return $this->hasMany(Booking::class);
    }

    public function two_factor () 
    {
        return $this->hasOne(TwoFactor::class);
    }

    public function generate_code ()
    {
        $code = rand(100000, 999999);

        $this->two_factor()->updateOrCreate([
            'code' => $code
        ]);

        $receiverNum = $this->phone;
        $message = "Your Login OTP code is ". $code;

        try {
            // $account_sid = getenv("TWILIO_ACCOUNT_SID");
            // $auth_token = getenv("TWILIO_AUTH_TOKEN");
            // $number = getenv("TWILIO_FROM");
    
            // $client = new Client($account_sid, $auth_token);
            // $client->messages->create($receiverNum, [
            //     'from' => $number, 
            //     'body' => $message]);
            Mail::to($this)->send(new TwoFactorAuth($code, $this));
    
        } catch (\Exception $e) {
            error_log($e);
        }
    }
}