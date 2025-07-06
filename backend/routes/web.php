<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

// Dashboard routes
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/api/dashboard/stats', [DashboardController::class, 'getStats'])->name('dashboard.stats');

// Product routes
Route::resource('products', ProductController::class);

// Order routes
Route::resource('orders', OrderController::class);

// API routes for AJAX calls
Route::prefix('api')->group(function () {
    Route::get('/products', [ProductController::class, 'index'])->name('api.products.index');
    Route::post('/products', [ProductController::class, 'store'])->name('api.products.store');
    Route::get('/products/{product}', [ProductController::class, 'show'])->name('api.products.show');
    Route::put('/products/{product}', [ProductController::class, 'update'])->name('api.products.update');
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('api.products.destroy');
    
    Route::get('/orders', [OrderController::class, 'index'])->name('api.orders.index');
    Route::post('/orders', [OrderController::class, 'store'])->name('api.orders.store');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('api.orders.show');
    Route::put('/orders/{order}', [OrderController::class, 'update'])->name('api.orders.update');
    Route::delete('/orders/{order}', [OrderController::class, 'destroy'])->name('api.orders.destroy');
});
