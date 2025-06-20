<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    protected $primaryKey = 'enrollment_id';
    protected $fillable = ['student_id', 'class_id', 'enrollment_date'];
    public $timestamps = true;


    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function class()
    {
        return $this->belongsTo(Classroom::class, 'class_id');
    }
}
