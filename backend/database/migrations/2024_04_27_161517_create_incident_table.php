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
        Schema::create('incident', function (Blueprint $table) {
            $table->id();
            $table->string("incident_id",20)->nullable();
            $table->text("incident_details")->nullable();
            $table->string("incident_type")->nullable();
            $table->string("priority",10)->nullable();
            $table->string("status",20)->nullable();
            $table->string("reporter_id")->nullable()->index("reporter_id");
            $table->datetime("reported_date")->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incident');
    }
};
