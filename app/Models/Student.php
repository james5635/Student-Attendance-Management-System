<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $primaryKey = 'student_id';
    protected $fillable = ['first_name', 'last_name', 'dob', 'gender', 'email', 'phone', 'address', 'department_id', 'enrollment_year', 'status'];
    public $timestamps = true;

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
