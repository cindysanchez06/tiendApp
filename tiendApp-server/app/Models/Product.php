<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'size', 'observation', 'boarding_date', 'quantity', 'mark_id', 'active' ];

    public function mark()
    {
        return $this->belongsTo('App\Models\Mark');
    }
}
