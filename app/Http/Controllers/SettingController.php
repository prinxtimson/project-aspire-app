<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function update(Request $request)
    {
        $user = auth()->user();

        $fields = $request->validate([
            'font' => 'required|string',
            'theme' => 'required|string',
            'language' => 'required|string'
        ]);

        $user->setting()->update([
            'font' => $fields['font'],
            'theme' => $fields['theme'],
            'language' => $fields['language']
        ]);

        auth()->user()->load(['roles', 'profile', 'setting']);
        auth()->user()->notifications;
        auth()->user()->unreadNotifications;

        return response([
            'user' => auth()->user(),
            'message' => 'Settings had save'
        ]);
    }
}
