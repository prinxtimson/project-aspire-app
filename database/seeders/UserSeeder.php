<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $hash = md5(strtolower('developertritek@gmail.com'));
        $user = User::create([
            'name' => 'Tritek Dev',
            'username' => 'tritekdev',
            'avatar' => 'https://www.gravatar.com/avatar/'.$hash,
            'email' => 'developertritek@gmail.com',
            'password' => Hash::make('Tritek@2022'),
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        $user->markEmailAsVerified();

        $user->assignRole('admin');

        $user->profile()->create([
            'name' => 'Tritek Dev',
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        $user->setting()->create([
            'font' => 'roboto',
            'theme' => 'dark',
            'language' => 'en'
        ]);

        $hash = md5(strtolower('projecticonic102022@gmail.com'));
        $user = User::create([
            'name' => 'Project Iconic',
            'username' => 'iconic',
            'avatar' => 'https://www.gravatar.com/avatar/'.$hash,
            'email' => 'projecticonic102022@gmail.com',
            'password' => Hash::make('Tritek@2023'),
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        $user->markEmailAsVerified();

        $user->assignRole('admin');

        $user->profile()->create([
            'name' => 'Project Iconic',
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        $user->setting()->create([
            'font' => 'roboto',
            'theme' => 'dark',
            'language' => 'en'
        ]);
    }
}