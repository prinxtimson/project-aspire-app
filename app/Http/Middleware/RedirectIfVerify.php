<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Session;
use Illuminate\Http\Request;

class RedirectIfVerify
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        
        if ($request->session()->exists('user_2fa')) {
            return redirect(RouteServiceProvider::HOME);
        }
 
        return $next($request);
    }
}
