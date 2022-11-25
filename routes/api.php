<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChartController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\AnalysisController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\FeedbackController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPass']);
Route::post('/reset-password', [AuthController::class, 'resetPass']);
Route::post('/register', [UserController::class, 'register']);
Route::get('/content/{type}', [ContentController::class, 'show']);
Route::get('sport/football/{id}', [ChartController::class, 'statistics']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/on-cancel', [SubscriptionController::class, 'on_cancel']);
Route::post('/on-suspended', [SubscriptionController::class, 'on_suspended']);
Route::post('/payment-failed', [SubscriptionController::class, 'payment_failed']);
Route::get('analytics/bounce/{days}', [AnalysisController::class, 'bounce']);

Route::group(['middleware' => ['auth:sanctum', '2fa']], function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/mark-notification', [AuthController::class, 'markNotification']);
    Route::delete('/delete-account', [AuthController::class, 'delete']);
    Route::put('/change-password', [AuthController::class, 'changePass']);
    Route::put('/update', [AuthController::class, 'update']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/subscription/save-payment', [SubscriptionController::class, 'store']);
    Route::post('/subscription/{id}/cancel', [SubscriptionController::class, 'cancel']);
    Route::put('/subscription/{id}', [SubscriptionController::class, 'update']);

    Route::get('health', [ChartController::class, 'health_history']);
    Route::get('health/world', [ChartController::class, 'health_world']);
    Route::get('health/{country}', [ChartController::class, 'health_country']);

    Route::get('fashion/gender', [ChartController::class, 'fashion_gender']);
    Route::get('fashion/season', [ChartController::class, 'fashion_season']);
    Route::get('fashion/category', [ChartController::class, 'fashion_category']);

    Route::get('entertainment/video', [ChartController::class, 'trend_video']);

    Route::get('sport/tennis', [ChartController::class, 'tennis_ranking']);
    Route::get('sport/football', [ChartController::class, 'fixtures']);
    //Route::get('sport/football/{id}', [ChartController::class, 'statistics']);

    Route::get('food-and-drinks/{food}', [ChartController::class, 'food']);

    Route::get('feedbacks', [FeedbackController::class, 'index']);
    Route::get('feedbacks/{id}', [FeedbackController::class, 'show']);
    Route::post('feedbacks/{id}/archive', [FeedbackController::class, 'archiveFeedback']);
    Route::post('feedbacks', [FeedbackController::class, 'store']);
    Route::post('feedbacks/reply', [FeedbackController::class, 'replyFeedback']);

    Route::get('bookings', [BookingController::class, 'index']);
    Route::get('bookings/all', [BookingController::class, 'all']);
    Route::get('bookings/{id}', [BookingController::class, 'show']);
    Route::post('bookings/{id}/cancel', [BookingController::class, 'cancel']);
    Route::post('bookings', [BookingController::class, 'store']);
    Route::put('bookings/{id}', [BookingController::class, 'update']);
    Route::delete('bookings/{id}', [BookingController::class, 'destroy']);

    Route::get('analytics/visit/{days}', [AnalysisController::class, 'index']);
    Route::get('analytics/most/{days}', [AnalysisController::class, 'show']);
    Route::get('analytics/browser/{days}', [AnalysisController::class, 'browser']);
    Route::get('analytics/user-type/{days}', [AnalysisController::class, 'user_type']);
    Route::get('analytics/time/{days}', [AnalysisController::class, 'session_time']);
    Route::get('analytics/country/{days}', [AnalysisController::class, 'session_country']);
    Route::get('analytics/bounce/{days}', [AnalysisController::class, 'bounce']);
    Route::get('analytics/analysis', [AnalysisController::class, 'analysis']);
});

Route::group(['middleware' => ['auth:sanctum', 'role:admin']], function () {
    //
    Route::get('users', [UserController::class, 'index']);
    Route::delete('users/{id}', [UserController::class, 'destroy']);
    Route::put('/content/{id}', [ContentController::class, 'update']);

    Route::get('/subscription', [SubscriptionController::class, 'index']);
    // Route::put('users/disable/{id}', [UserController::class, 'disable']);
    // Route::put('users/enable/{id}', [UserController::class, 'enable']);

});