<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\AuthenticateController;
use App\Http\Controllers\TaskController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['middleware' => 'auth:api'],function(){
    Route::get('authenticate', [AuthenticateController::class,"authenticate"]);
    Route::get('logout', [AuthController::class,"logout"]);
    Route::apiResource('tasks', TaskController::class);
    Route::get('tasksEnums', [TaskController::class,"enums"]);
});

Route::post('register', [RegisterController::class,"register"]);
Route::post('login', [AuthController::class,"login"]);
Route::post('forgotpassword', [AuthController::class,"forgotpassword"]);
Route::post('resetpassword', [AuthController::class,"resetpassword"]);