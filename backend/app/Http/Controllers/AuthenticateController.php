<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AuthenticateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function authenticate() {
        return response()->json(['status'=>'success','data' => auth()->user()], 200);
    }
}
