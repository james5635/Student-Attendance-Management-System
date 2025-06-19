<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $primaryKey = 'schedule_id';
    protected $fillable = ['class_subject_id', 'classroom_id', 'day_of_week', 'start_time', 'end_time'];
    public $timestamps = true;

    public function classSubject()
    {
        return $this->belongsTo(ClassSubject::class);
    }

    public function classroom()
    {
        return $this->belongsTo(Classroom::class);
    }
}
