<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VideoController;

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

// Because we can reupload the video
// We're not using this put/patch method
// Because it not allowed to upload file
Route::post('/videos/{id}', [VideoController::class, 'update']);
Route::resource('videos', VideoController::class)->except(['create', 'show', 'edit',]);
