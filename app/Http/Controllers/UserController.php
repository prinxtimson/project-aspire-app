<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //

    public function index(){
        $users = User::withTrashed()->with('roles')->get();
        return $users;
    }

        /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $fields = $request->validate([
            'name' => 'required|string',
            'username' => 'required||unique:users,username',
            'dob' => 'nullable|date',
            'role' => 'nullable|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed'
        ]); 

        $hash = md5(strtolower(trim($fields['email'])));

        $user = User::create([
            'name' =>  $fields['name'],
            'email' => $fields['email'],
            'username' => strtolower($fields['username']),
            'avatar' => 'https://www.gravatar.com/avatar/'.$hash,
            'password' => bcrypt($fields['password'])
        ]);

        $user->profile()->create([
            'name' => $fields['name'],
            'dob' => $fields['dob']
        ]);

        $user->setting()->create([
            'font' => 'roboto',
            'theme' => 'dark',
            'language' => 'en'
        ]);

        if (isset($fields['role'])){
            $user->assignRole($fields['role']);
        }else {
            $user->assignRole('user');
        }

        Auth::login($user);

        $token = $user->createToken('access_token')->plainTextToken;
        auth()->user()->load(['roles', 'profile', 'setting']);
        auth()->user()->notifications;
        auth()->user()->unreadNotifications;

        $response = [
            'token' => $token,
            'user' => auth()->user()
        ];

        return $response;
    }

    public function register(Request $request)
    {
        try {
            $fields = $request->validate([
                'name' => 'required|string',
                'username' => 'required|string|unique:users,username',
                'dob' => 'nullable|date',
                'role' => 'nullable|string',
                'email' => 'required|string|unique:users,email',
                'password' => 'required|string|confirmed|min:8|max:12|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/'
            ]);

            $hash = md5(strtolower(trim($fields['email'])));

            $user = User::create([
                'name' =>  $fields['name'],
                'email' => $fields['email'],
                'username' => strtolower($fields['username']),
                'avatar' => 'https://www.gravatar.com/avatar/'.$hash,
                'password' => bcrypt($fields['password'])
            ]);

            $user->profile()->create([
                'name' => $fields['name'],
                'dob' => $fields['dob'] 
            ]);

            $user->setting()->create([
                'font' => 'roboto',
                'theme' => 'dark',
                'language' => 'en'
            ]);

            if (isset($fields['role'])){
                $user->assignRole($fields['role']);
            }else {
                $user->assignRole('user');
            }

            event(new Registered($user));

            $response = [
                'message' => 'Admin registration successful'
            ];

            return $response;

        } catch (Exception $e){
                return response(['message' => $e->getMessage()], 400);
        }
    }

    public function disable($id)
    {
        User::find($id)->delete();

        return ['message' => "Account deactivated successfully"];
    }

    public function enable($id)
    {
        User::withTrashed()->find($id)->restore();

        return ['message' => "Account activated successfully"];
    }

        /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::withTrashed()->find($id)->load(['roles']);

        $deleted = $user->forceDelete($id);

        //Mail::to($user)->send(new UserDelete($user->profile));

        return $deleted;
    }
}