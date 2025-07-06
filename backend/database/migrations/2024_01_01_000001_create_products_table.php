<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->integer('stock_quantity')->default(0);
            $table->string('sku')->unique();
            $table->enum('category', ['electronics', 'accessories', 'computers']);
            $table->boolean('status')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->index(['category', 'status']);
            $table->index(['price']);
            $table->index(['stock_quantity']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
};
