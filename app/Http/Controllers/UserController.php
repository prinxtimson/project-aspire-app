<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;
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
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed'
        ]);

        $hash = md5(strtolower(trim($fields['email'])));

        $username = str_replace(' ', '', $fields['name']);

        $user = User::create([
            'name' =>  $fields['name'],
            'email' => $fields['email'],
            'username' => strtolower($username),
            'avatar' => 'https://www.gravatar.com/avatar/'.$hash,
            'password' => bcrypt($fields['password'])
        ]);

        $user->profile()->create([
            'name' => $fields['name'],
        ]);

        $user->assignRole('user');

        $token = $user->createToken('access_token')->plainTextToken;

        $response = [
            'user' => $user->load(['roles']),
            'token' => $token
        ];

        return $response;
    }

    public function register(Request $request)
    {
        //
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed'
        ]);

        $hash = md5(strtolower(trim($fields['email'])));

        $username = str_replace(' ', '', $fields['name']);

        $user = User::create([
            'name' =>  $fields['name'],
            'email' => $fields['email'],
            'username' => strtolower($username),
            'avatar' => 'https://www.gravatar.com/avatar/'.$hash,
            'password' => bcrypt($fields['password'])
        ]);

        $user->profile()->create([
            'name' => $fields['name'],
        ]);

        $user->assignRole('user');

        Auth::login($user);

        $request->session()->regenerate();

        auth()->user()->generate_code();

        $token = $user->createToken('access_token')->plainTextToken;

        $response = [
            'user' => $user->load(['roles']),
            'token' => $token
        ];

        return $response;
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

        //$user->reports()->delete();

        $deleted = $user->forceDelete($id);

        //Mail::to($user)->send(new UserDelete($user->profile));

        return $deleted;
    }
}