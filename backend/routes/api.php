<?php

use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Public API routes (you might want to add authentication later)
Route::prefix('v1')->group(function () {
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    Route::apiResource('products', ProductController::class);
    Route::apiResource('orders', OrderController::class);
});
