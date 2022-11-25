<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\PasswordReset;
use JD\Cloudder\Facades\Cloudder;
use App\Notifications\AccountDelete;
use App\Notifications\ProfileUpdated;
use Illuminate\Support\Facades\Notification;

class AuthController extends Controller
{
    public function login(Request $request) {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            auth()->user()->generate_code();
            $notifications = auth()->user()->notifications;
            $count = auth()->user()->unreadNotifications->count();

            $response = [
                'user' => auth()->user()->load(['roles', 'profile']),
                'notifications' => [
                    'data' => $notifications,
                    'count' => $count
                ],
            ];

            return $response;
        }

        return response([
            'message' => 'invalid credentials'
        ], 401);
    }

    public function me() {
        $user = auth()->user()->load(['roles', 'profile']);

        $notifications = auth()->user()->notifications;
        $count = auth()->user()->unreadNotifications->count();

        $response = [
            'user' => $user,
            'notifications' => [
                    'data' => $notifications,
                    'count' => $count
                ],
        ];
        return $response;
    }

    public function logout(Request $request) {
        auth()->user()->tokens()->delete();

        //Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function update(Request $request)
    {
        $user = auth()->user();

        $fields = $request->validate([
            'name' => 'required|string',
            'user_status' => 'required|string'
        ]);

        $username = str_replace(' ', '', trim($fields['name']));

        //$user = User::find($user);
        $user->update([
            'name' =>  $fields['name'],
            'username' => strtolower($username),
            'status' => $fields['user_status'] ?? $user['status']
        ]);

        if ($request->hasFile('avatar')) {
            $cloudder = Cloudder::upload($request->file('avatar')->getRealPath(), "elintx-$user->id");
            $uploadResult = $cloudder->getResult();
    
            $user->update([
                'avatar' => $uploadResult['url'],
            ]);
        }

        $user->refresh()->load(['profile','roles']);

        $user->notify(new ProfileUpdated($user));

        $notifications = auth()->user()->notifications;
        $count = auth()->user()->unreadNotifications->count();

        $response = [
            'user' => $user,
            'notifications' => [
                'data' => $notifications,
                'count' => $count
            ],
        ];

        return $response;
    }

    public function changePass(Request $request)
    {
        $user = auth()->user();

        $fields = $request->validate([
            'password' => 'required|string',
            'new_password' => 'required|string|confirmed'
        ]);

        if(!Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'wrong password'
            ], 401);
        }

        if(!$user->email_verified_at) {
            $user->markEmailAsVerified();
        }
        $user->update([
            'password' => bcrypt($fields['new_password']),
        ]);

        return response([
            'message' => 'password update successful'
        ]);
    }

    public function forgotPass(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return response('Password reset link had been sent to your email');
        }
        
        return response('An error occur', 400);
    }

    public function resetPass(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);
    
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));
    
                $user->save();
    
                event(new PasswordReset($user));
            }
        );
    
        if ($status === Password::PASSWORD_RESET) {
            return response('Password reset successful');
        }
        
        return response('An error occur', 400);
    }

    public function markNotification()
    {
        $user = auth()->user();

        $user->unreadNotifications->markAsRead();

        $user->refresh();
        
        $response = [
            'data' => $user->notifications,
            'count' => $user->unreadNotifications->count(),
        ];

        return $response;
    }

    public function delete()
    {
        $user = auth()->user();
        $user->delete();

        $admins = User::role('admin')->get();

        Notification::send($admins, new AccountDelete($user));

        //Mail::to($user)->send(new UserDeactivate($user->profile));

        return $user;
    }
}