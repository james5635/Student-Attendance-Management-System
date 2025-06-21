<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Thiagoprz\CompositeKey\HasCompositeKey;

class FeeInstallment extends Model
{
    use HasCompositeKey;
    // Laravel doesn't natively support composite primary key
    public $primaryKey = ['student_id', 'installment_no'];
    public $incrementing = false;
    public $fillable = ['student_id', 'installment_no', 'amount', 'due_date', 'payment_date', 'status'];
    // public $fillable = [ 'amount', 'due_date', 'payment_date', 'status'];

    public $timestamps = true;

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
