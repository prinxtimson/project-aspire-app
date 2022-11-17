<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\RequestException;

class ChartController extends Controller
{
    
    public function health_history() {
        return Http::get('https://disease.sh/v3/covid-19/historical/all?lastdays=all')->throw()->json();
    }

    public function health_world() {
        return Http::get('https://disease.sh/v3/covid-19/all')->throw()->json();
    }

    public function health_country($country) {
        return Http::get('https://disease.sh/v3/covid-19/countries/'.$country)->throw()->json();
    }

    public function food($food){
        $api_key=env('NUTRITION_API_KEY');
        return Http::get('https://api.edamam.com/api/nutrition-data?app_id=72c7af91&app_key='.$api_key.'&nutrition-type=logging&ingr='.$food)->throw()->json();
    }

    public function trend_video(){
        return Http::withHeaders([
            'x-rapidapi-host' => 'tiktok-best-experience.p.rapidapi.com',
	        'x-rapidapi-key' => env('RAPID_API_KEY_1')
        ])->get('https://tiktok-best-experience.p.rapidapi.com/trending')->throw()->json();
    }

    public function tennis_ranking(){
        return Http::withHeaders([
            'x-rapidapi-host' => 'tennis-live-data.p.rapidapi.com',
	        'x-rapidapi-key' => env('RAPID_API_KEY_1')
        ])->get('https://tennis-live-data.p.rapidapi.com/rankings/ATP')->throw()->json();
    }

    public function fixtures(){
        return Http::withHeaders([
            'x-rapidapi-host' => 'api-football-v1.p.rapidapi.com',
	        'x-rapidapi-key' => env('RAPID_API_KEY_2')
        ])->get('https://api-football-v1.p.rapidapi.com/v3/fixtures', ['last' => 50])->throw()->json();
    }

    public function statistics($id){
        return Http::withHeaders([
            'x-rapidapi-host' => 'api-football-v1.p.rapidapi.com',
	        'x-rapidapi-key' => env('RAPID_API_KEY_2')
        ])->get('https://api-football-v1.p.rapidapi.com/v3/fixtures/statistics', ['fixture' => $id])->throw()->json();
    }

    public function fashion_gender()
    {
        return Http::get("https://www.projectelintx.readypenconsult.com/api/fashion/show_gen_count_api")->throw()->json();
    }

    public function fashion_season()
    {
        return Http::get("https://www.projectelintx.readypenconsult.com/api/fashion/show_ses_count_api")->throw()->json();
    }

    public function fashion_category()
    {
        return Http::get("https://www.projectelintx.readypenconsult.com/api/fashion/show_cat_count_api")->throw()->json();
    }
}