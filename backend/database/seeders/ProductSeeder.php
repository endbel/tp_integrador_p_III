<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            [
                'name' => 'Laptop Pro 15"',
                'description' => 'High-performance laptop with 16GB RAM and 512GB SSD',
                'price' => 1299.99,
                'stock_quantity' => 25,
                'sku' => 'LAP-PRO-15',
                'category' => 'computers',
                'status' => true
            ],
            [
                'name' => 'Wireless Mouse',
                'description' => 'Ergonomic wireless mouse with long battery life',
                'price' => 29.99,
                'stock_quantity' => 100,
                'sku' => 'MOUSE-WL-01',
                'category' => 'accessories',
                'status' => true
            ],
            [
                'name' => 'Mechanical Keyboard',
                'description' => 'RGB backlit mechanical keyboard with blue switches',
                'price' => 89.99,
                'stock_quantity' => 8,
                'sku' => 'KB-MECH-RGB',
                'category' => 'accessories',
                'status' => true
            ],
            [
                'name' => '4K Monitor 27"',
                'description' => '27-inch 4K UHD monitor with HDR support',
                'price' => 399.99,
                'stock_quantity' => 15,
                'sku' => 'MON-4K-27',
                'category' => 'electronics',
                'status' => true
            ],
            [
                'name' => 'USB-C Hub',
                'description' => '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader',
                'price' => 49.99,
                'stock_quantity' => 75,
                'sku' => 'HUB-USBC-7',
                'category' => 'accessories',
                'status' => true
            ],
            [
                'name' => 'Smartphone Pro',
                'description' => 'Latest flagship smartphone with advanced camera',
                'price' => 899.99,
                'stock_quantity' => 5,
                'sku' => 'PHONE-PRO-01',
                'category' => 'electronics',
                'status' => true
            ]
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
