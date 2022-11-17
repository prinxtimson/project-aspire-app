<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Content;

class ContentController extends Controller
{
    //
    public function show($type) {
        return Content::where('type', $type)->first();
    }

    public function update(Request $request, $id) {
        $content = Content::find($id);

        $request->validate([
            'body' => 'required',
        ]);

        $content->update($request->only('body'));

        return $content;
    }

}