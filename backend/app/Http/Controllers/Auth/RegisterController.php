<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Rules\ReCaptchaV3;
use Illuminate\Validation\Rules;
use App\Models\User;

class RegisterController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'country' => ['required', 'string', 'max:255'],
            'state' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'pincode' => ['required', 'numeric'],
            'country_code' => ['required', 'string'],
            'fax' => ['required', 'numeric'],
            'phone' => ['required', 'numeric'],
            'user_type' => ['required', 'string'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'mobile' => ['required', 'numeric', 'unique:users'],
            'password' => ['required', 'confirmed',Rules\Password::defaults()],
            'reCaptchaToken' => ['required',new ReCaptchaV3('Login')]
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\Models\User
     */
    protected function create(array $data)
    {
        return User::create([
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'address' => $data['address'],
            'country' => $data['country'],
            'state' => $data['state'],
            'city' => $data['city'],
            'pincode' => $data['pincode'],
            'country_code' => $data['country_code'],
            'fax' => $data['fax'],
            'phone' => $data['phone'],
            'user_type' => $data['user_type'],
            'mobile' => $data['mobile'],
        ]);
    }

    /**
     * Handle a registration request for the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $this->validator($request->all())->validate();
        
        event(new Registered($user = $this->create($request->all())));

        $token =  $user->createToken('incident')->accessToken;

        if (!empty($user->id)) {
            return response()->json(['status'=>'success','data' => ['token'=>$token]], 200);
        }else{
            return response()->json(['status'=>'error','message'=>'There are some problem to connecting server pease try again later!'], 422);
        }
    }
}
