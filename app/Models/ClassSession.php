<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClassSession extends Model
{
    protected $primaryKey = 'session_id';
    protected $fillable = ['class_subject_id', 'session_date', 'start_time', 'end_time', 'status'];

    public function classSubject()
    {
        return $this->belongsTo(ClassSubject::class, 'class_subject_id');
    }
}
