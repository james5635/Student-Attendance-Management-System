<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
        protected $primaryKey = 'teacher_id';
    protected $fillable = ['first_name', 'last_name', 'email', 'phone', 'department_id', 'hire_date', 'status'];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
