<?php

namespace Database\Seeders;

use App\Models\Feedback;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FeedbackSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Feedback::create([
            'name' => 'John Dow',
            'email' => 'john@example.com',
            'message' => 'This is a sample feedback'
        ]);

        Feedback::create([
            'name' => 'Jane Dow',
            'email' => 'jane@example.com',
            'message' => 'This is a sample feedback'
        ]);

        Feedback::create([
            'name' => 'Taylor Dow',
            'email' => 'taylor@example.com',
            'message' => 'This is a sample feedback'
        ]);

        Feedback::create([
            'name' => 'Anita Dow',
            'email' => 'anita@example.com',
            'message' => 'This is a sample feedback'
        ]);

        Feedback::create([
            'name' => 'Bush Dow',
            'email' => 'bush@example.com',
            'message' => 'This is a sample feedback'
        ]);

        Feedback::create([
            'name' => 'Johnson Dow',
            'email' => 'johnson@example.com',
            'message' => 'This is a sample feedback'
        ]);
    }
}
