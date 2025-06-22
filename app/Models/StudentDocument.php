<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Thiagoprz\CompositeKey\HasCompositeKey;

class StudentDocument extends Model
{
    use HasCompositeKey;
    // Laravel doesn't natively support composite primary key
    protected $primaryKey = ['student_id', 'document_type'];
    public $incrementing = false;
    protected $fillable = ['student_id', 'document_type', 'file_path', 'issue_date', 'submitted_date'];
    public $timestamps = true;

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
