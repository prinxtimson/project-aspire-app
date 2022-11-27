<?php

namespace App\Http\Controllers;

use App\Mail\BookingEligibility;
use App\Mail\NewBooking;
use App\Mail\NotEligible;
use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class BookingController extends Controller
{

    public function all()
    {
        
        $bookings = Booking::withTrashed()->orderBy('id', 'DESC')->get();

        return $bookings;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        $bookings = Booking::withTrashed()->where('user_id', $user->id)->orderBy('id', 'DESC')->get();

        return $bookings;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = auth()->user();

        $fields = $request->validate([
            'title' => 'required|string',
            'description' => 'string',
            'date' => 'required',
            'meeting_link' => 'string',
            'time' => 'required|string'
        ]);

        $fields['booking_number'] = 'BKG' . time();

        $booking = $user->bookings()->create($fields);

        //Mail::to('developertritek@gmail.com')->send(new NewBooking($user, $booking));

        return response($booking);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Booking::withTrashed()->find($id);
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
        $fields = $request->validate([
            'date' => 'required|date',
            'time' => 'string',
        ]);

        $booking = Booking::withTrashed()->find($id);

        $booking->update($fields);
        $booking->restore();
        
        return $booking;
    }

    public function eligible($id)
    {
        $fields = [
            'isEligible' => true,
        ];

        $booking = Booking::withTrashed()->find($id);

        $user = $booking->user;

        $booking->update($fields);
        $booking->restore();

        //Mail::to($user)->send(new BookingEligibility($user, $booking));
        
        return $booking;
    }

    public function not_eligible($id)
    {
        $fields = [
            'isEligible' => false,
        ];

        $booking = Booking::withTrashed()->find($id);
        
        $user = $booking->user;

        $booking->update($fields);
        $booking->restore();

        //Mail::to($user)->send(new NotEligible($user, $booking));
        
        return $booking;
    }

    public function cancel ($id)
    {
        $booking = Booking::withTrashed()->find($id);

        if(isset($booking) && isset($booking->delete_at)){
            return response([
                'message' => 'Booking had been canceled successfuly'
            ]);
        }        
        $booking->delete();

        return response([
            'message' => 'Booking had been canceled successfuly'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $booking = Booking::withTrashed()->find($id);

        if(is_null($booking)){
            return 'Booking not found';
        }

        $booking->forceDelete();

        return response([
            'message' => 'Booking had been deleted successfuly'
        ]);
    }
}
