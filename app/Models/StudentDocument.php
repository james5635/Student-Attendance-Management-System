<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentDocument extends Model
{
        protected $primaryKey = ['student_id', 'document_type'];
    public $incrementing = false;
    protected $fillable = ['student_id', 'document_type', 'file_path', 'issue_date', 'submitted_date'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
