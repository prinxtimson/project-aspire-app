<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use App\Notifications\SubscriptionCancel;
use App\Notifications\SubscriptionConfirm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\RequestException;

class SubscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Subscription::with('user')->get();
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //

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
        $user = auth()->user();

        $fields = $request->validate([
            'orderID' => 'required|string',
            'subscriptionID' => 'required|string',
        ]);

       $username = env('PAYPAL_USER');
        $password = env('PAYPAL_PASSWORD');

        $token = Http::withBasicAuth($username, $password)->post('https://api-m.sandbox.paypal.com/v1/oauth2/token', [
            'grant_type' => 'client_credentials'
        ])->json();

        $res = Http::withToken($token['access_token'])->withHeaders([
            "Content-Type" => "application/json",
            "Accept" => 'application/json'
        ])->get('https://api-m.sandbox.paypal.com/v1/billing/subscriptions/'.$fields['subscriptionID'])->json();

        $user->subscription()->create([
            'order_id' => $fields['orderID'],
            'subscription_id' => $fields['subscriptionID'],
            'data' => $res,
        ]);

        $user->refresh()->load(['profile','roles', 'subscription']);

        // $user->notify(new SubscriptionConfirm($user->subscription()));

        $response = [
            'user' => $user,
        ];

        return $response;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function deactivate($id)
    {
        //
        $subscription = Subscription::find($id);

        $subscription->update([
            'status' => 'SUSPENDED'
        ]);

        return ['message' => "Subscription deactivated successfully"];
    }

    public function activate($id)
    {
        //
        $subscription = Subscription::find($id);

        $subscription->update([
            'status' => 'ACTIVE'
        ]);

        return ['message' => "Subscription activated successfully"];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $username = env('PAYPAL_USER');
        $password = env('PAYPAL_PASSWORD');

        $token = Http::withBasicAuth($username, $password)->post('https://api-m.sandbox.paypal.com/v1/oauth2/token', [
            'grant_type' => 'client_credentials'
        ])->json();

        $response = Http::withToken($token['access_token'])->withHeaders([
            "Content-Type" => "application/json",
            "Accept" => 'application/json'
        ])->post('https://api-m.sandbox.paypal.com/v1/billing/subscriptions/'.$id.'/revise', $request->all());

        return $response->throw()->json();
    }

    public function cancel(Request $request, $id)
    {
    //    $username = env('PAYPAL_USER');
    //     $password = env('PAYPAL_PASSWORD');

    //     $token = Http::withBasicAuth($username, $password)->post('https://api-m.sandbox.paypal.com/v1/oauth2/token', [
    //         'grant_type' => 'client_credentials'
    //     ])->json();

    //     $response = Http::withToken($token['access_token'])->withHeaders([
    //         "Content-Type" => "application/json",
    //         "Accept" => 'application/json'
    //     ])->post('https://api-m.sandbox.paypal.com/v1/billing/subscriptions/'.$id.'/cancel', $request->only('reason'));

    //     return $response->throw()->json();

        $subscription = Subscription::find($id);

        $subscription->update([
            'status' => 'CANCELLED'
        ]);

        return ['message' => "Subscription canceled successfully"];
    }

    public function on_suspended(Request $request)
    {
        $subscription = Subscription::where('subscription_id', $request->resource->id)->get();

        $user = $subscription->user();

        $user->notify(new SubscriptionCancel($subscription));
    }

    public function on_cancel(Request $request)
    {
        $subscription = Subscription::where('subscription_id', $request->resource->id)->get();

        $user = $subscription->user();

        $user->notify(new SubscriptionCancel($subscription));
    }

    public function payment_failed(Request $request)
    {
        $subscription = Subscription::where('subscription_id', $request->resource->id)->get();

        $user = $subscription->user();

        $user->notify(new SubscriptionCancel($subscription));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        //$user = auth()->user();

        $subscription = Subscription::find($id);

        $subscription->delete();

        //$user->notify(new SubscriptionCancel($subscription));

        return $subscription;
    }
}