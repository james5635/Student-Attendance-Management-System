<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $primaryKey = 'course_id';
    protected $fillable = ['name', 'code', 'department_id', 'duration_semesters', 'description'];
    public $timestamps = true;
}
