<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $primaryKey = 'subject_id';
    protected $fillable = ['course_id', 'name', 'code', 'credits', 'description'];
    public $timestamps = true;
    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id', 'course_id');
    }
}

