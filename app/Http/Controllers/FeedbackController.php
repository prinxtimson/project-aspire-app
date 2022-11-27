<?php

namespace App\Http\Controllers;

use App\Mail\FeedbackReply;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $feedbacks = Feedback::withTrashed()->with('user')->orderBy('id', 'DESC')->get();

        return $feedbacks;
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
            'name' => 'required|string',
            'email' => 'required|string',
            'message' => 'required|string'
        ]);

        $feedback = Feedback::create([
            'user_id' => $user->id ?? null,
            'name' => $fields['name'],
            'email' => $fields['email'],
            'message' => $fields['message']
        ]);

        return $feedback;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Feedback::find($id)->load(['user']);
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
    }

    public function archiveFeedback($id)
    {
        $feedback = Feedback::find($id);

        $feedback->update([
            'status' => 'archive'
        ]);

        return $feedback->refresh()->load('user');
    }

    public function unarchiveFeedback($id)
    {
        $feedback = Feedback::find($id);

        $feedback->update([
            'status' => 'approved'
        ]);

        return $feedback->refresh()->load('user');
    }

    public function replyFeedback(Request $request)
    {
        try {
            $fields = $request->validate([
                'name' => 'required|string',
                'email' => 'required|string',
                'message' => 'required|string'
            ]);
    
            Mail::to($fields['email'])->send(new FeedbackReply($fields['name'], $fields['message']));

            return response(['msg' => "Feedback reply mail had been sent"]);

        } catch (\Exception $e) {
            return response(['msg' => $e->getMessage()], 400);
        }

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
    }
}
