<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_products' => Product::count(),
            'active_products' => Product::active()->count(),
            'low_stock_products' => Product::lowStock()->count(),
            'total_orders' => Order::count(),
            'pending_orders' => Order::byStatus('pending')->count(),
            'completed_orders' => Order::byStatus('completed')->count(),
            'processing_orders' => Order::byStatus('processing')->count(),
            'cancelled_orders' => Order::byStatus('cancelled')->count(),
        ];

        $recent_orders = Order::with('orderItems.product')
            ->latest()
            ->take(5)
            ->get();

        $low_stock_products = Product::lowStock()
            ->take(5)
            ->get();

        return view('dashboard', compact('stats', 'recent_orders', 'low_stock_products'));
    }

    public function getStats()
    {
        $stats = [
            'total_products' => Product::count(),
            'total_orders' => Order::count(),
            'low_stock_products' => Product::lowStock()->count(),
        ];

        return response()->json($stats);
    }
}
