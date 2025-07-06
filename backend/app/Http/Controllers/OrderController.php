<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with('orderItems.product');

        // Search filter
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('order_number', 'like', '%' . $search . '%')
                  ->orWhere('customer_name', 'like', '%' . $search . '%')
                  ->orWhere('customer_email', 'like', '%' . $search . '%');
            });
        }

        // Status filter
        if ($request->filled('status')) {
            $query->byStatus($request->status);
        }

        // Date filter
        if ($request->filled('date')) {
            $query->byDate($request->date);
        }

        // Payment method filter
        if ($request->filled('payment_method')) {
            $query->byPaymentMethod($request->payment_method);
        }

        $orders = $query->latest()->paginate(10);

        if ($request->ajax()) {
            return response()->json([
                'orders' => $orders->items(),
                'pagination' => [
                    'current_page' => $orders->currentPage(),
                    'last_page' => $orders->lastPage(),
                    'total' => $orders->total()
                ]
            ]);
        }

        return view('orders.index', compact('orders'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email',
            'customer_phone' => 'nullable|string',
            'status' => 'required|in:pending,processing,completed,cancelled',
            'payment_method' => 'required|in:credit_card,debit_card,paypal,bank_transfer,cash',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0'
        ]);

        $order = Order::create([
            'customer_name' => $validated['customer_name'],
            'customer_email' => $validated['customer_email'],
            'customer_phone' => $validated['customer_phone'],
            'status' => $validated['status'],
            'payment_method' => $validated['payment_method'],
            'notes' => $validated['notes'],
            'total_amount' => 0
        ]);

        $total = 0;
        foreach ($validated['items'] as $item) {
            $order->orderItems()->create($item);
            $total += $item['quantity'] * $item['price'];
            
            // Update product stock
            $product = Product::find($item['product_id']);
            $product->decrement('stock_quantity', $item['quantity']);
        }

        $order->update(['total_amount' => $total]);
        $order->load('orderItems.product');

        if ($request->ajax()) {
            return response()->json([
                'success' => true,
                'message' => 'Order created successfully.',
                'order' => $order
            ], 201);
        }

        return redirect()->route('orders.index')
            ->with('success', 'Order created successfully.');
    }

    public function show(Order $order)
    {
        $order->load('orderItems.product');

        if (request()->ajax()) {
            return response()->json($order);
        }

        return view('orders.show', compact('order'));
    }

    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email',
            'customer_phone' => 'nullable|string',
            'status' => 'required|in:pending,processing,completed,cancelled',
            'payment_method' => 'required|in:credit_card,debit_card,paypal,bank_transfer,cash',
            'notes' => 'nullable|string'
        ]);

        $order->update($validated);

        if ($request->ajax()) {
            return response()->json([
                'success' => true,
                'message' => 'Order updated successfully.',
                'order' => $order
            ]);
        }

        return redirect()->route('orders.index')
            ->with('success', 'Order updated successfully.');
    }

    public function destroy(Order $order)
    {
        // Restore stock quantities
        foreach ($order->orderItems as $item) {
            $product = Product::find($item->product_id);
            if ($product) {
                $product->increment('stock_quantity', $item->quantity);
            }
        }

        $order->delete();

        if (request()->ajax()) {
            return response()->json([
                'success' => true,
                'message' => 'Order deleted successfully.'
            ]);
        }

        return redirect()->route('orders.index')
            ->with('success', 'Order deleted successfully.');
    }
}
