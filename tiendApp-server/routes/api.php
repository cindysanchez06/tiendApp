<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\MarkController;
use \App\Http\Controllers\ProductController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('mark/create', [MarkController::class, 'register']);
Route::get('mark/list', [MarkController::class, 'list']);
Route::post('mark/edit/{mark}', [MarkController::class, 'edit']);
Route::delete('mark/delete/{mark}', [MarkController::class, 'delete']);

Route::post('product/create', [ProductController::class, 'create']);
Route::get('product/list', [ProductController::class, 'list']);
Route::post('product/edit/{product}', [ProductController::class, 'edit']);
Route::delete('product/delete/{product}', [ProductController::class, 'delete']);
