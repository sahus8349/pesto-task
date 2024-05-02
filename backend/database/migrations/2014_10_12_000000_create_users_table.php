<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name')->nullable()->default(null);
            $table->string('last_name')->nullable()->default(null);
            $table->string('address')->nullable()->default(null);
            $table->string('country',4)->nullable()->default(null);
            $table->string('state',50)->nullable()->default(null);
            $table->string('city',50)->nullable()->default(null);
            $table->string('pincode',8)->nullable()->default(null);
            $table->string('country_code',5)->nullable()->default(null);
            $table->string('fax',12)->nullable()->default(null);
            $table->string('phone',12)->nullable()->default(null);
            $table->string('mobile',12)->nullable()->default(null);
            $table->string('user_type',20)->nullable()->default(null);
            $table->string('email')->unique()->nullable()->default(null);
            $table->timestamp('email_verified_at')->nullable()->nullable()->default(null);
            $table->string('password')->nullable()->default(null);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
