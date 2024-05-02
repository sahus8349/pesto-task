<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Models\User;

class Incident extends Model
{
    use SoftDeletes;

    protected $table = "incident";

    protected $fillable = [
        "incident_id",
        "incident_details",
        "incident_type",
        "priority",
        "status",
        "reporter_id",
        "reported_date",
    ];

    protected $casts = [
       'created_at' => 'datetime:d, M Y',
       'updated_at' => 'datetime:d, M Y',
    ];

    public function reporter(): HasOne 
    {
        return $this->hasOne(User::class,'id','reporter_id');
    }
}
