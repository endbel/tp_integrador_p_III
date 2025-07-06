<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run()
    {
        $orders = [
            [
                'customer_name' => 'John Doe',
                'customer_email' => 'john@example.com',
                'customer_phone' => '+1234567890',
                'status' => 'completed',
                'payment_method' => 'credit_card',
                'total_amount' => 1329.98,
                'notes' => 'Express delivery requested'
            ],
            [
                'customer_name' => 'Jane Smith',
                'customer_email' => 'jane@example.com',
                'customer_phone' => '+1234567891',
                'status' => 'pending',
                'payment_method' => 'paypal',
                'total_amount' => 89.99,
                'notes' => null
            ],
            [
                'customer_name' => 'Bob Johnson',
                'customer_email' => 'bob@example.com',
                'customer_phone' => '+1234567892',
                'status' => 'processing',
                'payment_method' => 'debit_card',
                'total_amount' => 449.98,
                'notes' => 'Gift wrapping requested'
            ],
            [
                'customer_name' => 'Alice Brown',
                'customer_email' => 'alice@example.com',
                'customer_phone' => '+1234567893',
                'status' => 'completed',
                'payment_method' => 'bank_transfer',
                'total_amount' => 1199.99,
                'notes' => null
            ],
            [
                'customer_name' => 'Charlie Wilson',
                'customer_email' => 'charlie@example.com',
                'customer_phone' => '+1234567894',
                'status' => 'cancelled',
                'payment_method' => 'credit_card',
                'total_amount' => 299.99,
                'notes' => 'Customer requested cancellation'
            ]
        ];

        foreach ($orders as $orderData) {
            $order = Order::create($orderData);
            
            // Add some sample order items
            $products = Product::inRandomOrder()->take(rand(1, 3))->get();
            
            foreach ($products as $product) {
                $quantity = rand(1, 3);
                $order->orderItems()->create([
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'price' => $product->price
                ]);
            }
        }
    }
}
