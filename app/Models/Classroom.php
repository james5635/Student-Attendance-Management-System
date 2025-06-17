<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Classroom extends Model
{
    protected $primaryKey = 'classroom_id';
    protected $fillable = ['building', 'room_number', 'capacity'];
}
