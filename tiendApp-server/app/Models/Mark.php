<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mark extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'reference','active'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
