<?php

use App\Http\Controllers\AnalysisController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TwoFactorAuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WebNotificationController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('/store-token', [WebNotificationController::class, 'storeToken']);
Route::post('/send-web-notification', [WebNotificationController::class, 'sendWebNotification']);

Route::post('two-factor-auth', [TwoFactorAuthController::class, 'store'])->name('2fa.store')->middleware('auth:sanctum');
Route::get('two-factor-auth/resend', [TwoFactorAuthController::class, 'resend'])->name('2fa.resend')->middleware('auth:sanctum');
Route::middleware(['auth:sanctum', 'n2fa'])->get('/two-factor-auth', function () {
    return view('welcome');
})->name('2fa.index');
Route::middleware(['auth:sanctum', 'n2fa'])->get('admin/two-factor-auth', function () {
    return view('welcome');
})->name('2fa.index');

Route::get('/email/verify', function () {
    return view('welcome');
})->middleware('auth:sanctum')->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return to_route('admin.login');
})->middleware(['auth:sanctum', 'signed'])->name('verification.verify');

Route::get('/', function () {
    return view('welcome');
})->name('home');
Route::get('/admin', function () {
    return view('welcome');
})->name('home.admin');
Route::get('/privacy-policy', function () {
    return view('welcome');
});
Route::get('/solution', function () {
    return view('welcome');
});
Route::get('/about-us', function () {
    return view('welcome');
});
Route::get('/subscribe', function () {
    return view('welcome');
});
Route::get('/contact-us', function () {
    return view('welcome');
});
Route::get('/terms-and-conditions', function () {
    return view('welcome');
});

Route::middleware(['guest'])->group(function () {
    //
    //Route::post('/login', [LoginController::class, 'authenticate']);
    Route::get('login', function () {
        return view('welcome');
    })->name('login');

    Route::get('register', function () {
        return view('welcome');
    })->name('register');
    
    Route::get('admin/login', function () {
        return view('welcome');
    })->name('admin.login');

    Route::get('admin/forgot-password', function () {
        return view('welcome');
    });

    Route::get('admin/register', function () {
        return view('welcome');
    })->name('admin.register');

    Route::get('reset-password/{token}', function () {
        return view('welcome');
    })->name('password.reset');

    Route::get('admin/reset-password/{token}', function () {
        return view('welcome');
    })->name('admin.password.reset');

    Route::get('forgot-password', function () {
        return view('welcome');
    });

    Route::post('login', [AuthController::class, 'login']);
    Route::post('password/email', [AuthController::class, 'forgotPass']);
    Route::post('password/update', [AuthController::class, 'resetPass']);

    Route::post('register', [UserController::class, 'register']);
});

Route::middleware(['auth:sanctum', '2fa', 'verified'])->group(function () {
    Route::put('change-password', [AuthController::class, 'changePass']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('change-password', function () {
        return view('welcome');
    });
    Route::get('profile', function () {
        return view('welcome');
    });
    Route::get('dashboard/{name?}', function () {
        return view('welcome');
    });

    Route::group(['prefix' => 'admin'], function () {
        Route::group(['prefix' => 'dashboard'], function () {
            Route::get("", function () {
                return view('welcome');
            });
            Route::get("settings", function () {
                return view('welcome');
            });
            Route::group(['prefix' => 'manage-account'], function () {
                Route::get("", function () {
                    return view('welcome');
                });
                Route::get("edit-profile", function () {
                    return view('welcome');
                });
                Route::get("change-password", function () {
                    return view('welcome');
                });
                Route::get("delete-account", function () {
                    return view('welcome');
                });
            });
            Route::group(['prefix' => 'manage-users'], function () {
                Route::get("", function () {
                    return view('welcome');
                });
                Route::get("subscription", function () {
                    return view('welcome');
                });
            });

            Route::group(['prefix' => 'analytics'], function () {
                Route::get("", function () {
                    return view('welcome');
                });
                Route::get("export-report", function () {
                    return view('welcome');
                });
                Route::get("archived-report", function () {
                    return view('welcome');
                });
                Route::get("deleted-report", function () {
                    return view('welcome');
                });
            });
        });
    });
   
    Route::get('analytics/download', [AnalysisController::class, 'download']);
    Route::post('analytics/email', [AnalysisController::class, 'email']);
});

Route::get('/subscribe/{plan}', function () {
    return view('welcome');
});