<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Models\User;

class Task extends Model
{
    use SoftDeletes, HasFactory;

    protected $table = "tasks";

    protected $fillable = [
        "title",
        "description",
        "status",
        "created_by_id",
    ];

    protected $casts = [
       'created_at' => 'datetime:d, M Y',
       'updated_at' => 'datetime:d, M Y',
    ];

    public function user(): HasOne 
    {
        return $this->hasOne(User::class,'id','created_by_id');
    }
}
