<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FeeInstallment extends Model
{
        protected $primaryKey = ['student_id', 'installment_no'];
    public $incrementing = false;
    protected $fillable = ['student_id', 'installment_no', 'amount', 'due_date', 'payment_date', 'status'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
