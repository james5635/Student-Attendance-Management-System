<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SchoolClass extends Model
{
    protected $table = 'classes'; // important!
    protected $primaryKey = 'class_id';
    protected $fillable = ['course_id', 'year', 'section', 'advisor_id'];
    public $timestamps = true;


    public function advisor()
    {
        return $this->belongsTo(Teacher::class, 'advisor_id');
    }
}
