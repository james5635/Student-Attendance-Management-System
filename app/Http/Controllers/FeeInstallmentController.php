<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\FeeInstallment;
use \App\Models\Student;
use \Inertia\Inertia;
use App\Http\Requests\FeeInstallmentRequest;
use Illuminate\Support\Facades\Log;
use \Symfony\Component\Console\Output\ConsoleOutput;

class FeeInstallmentController extends Controller
{
    public function index()
    {

        $fee_installments = FeeInstallment::all();
        $minimal_students = Student::select('student_id', 'first_name', 'last_name')->get();
        return Inertia::render('fee-installments', [
            'fee_installments' => $fee_installments,
            'minimal_students' => $minimal_students,
        ]);
    }
    public function store(FeeInstallmentRequest $request)
    {


        $validated = $request->validated();

        FeeInstallment::create($validated);
        return redirect()->back()->with('success', 'Fee installment created successfully.');
    }
    public function update(Request $request, $student_id, $installment_no)
    {
        $fee_installment =  FeeInstallment::where('student_id', $student_id)
            ->where('installment_no', $installment_no)
            ->firstOrFail();

        $validated_data = $request->validate([
            'amount' => 'required|numeric|min:0',
            'due_date' => 'required|date',
            'payment_date' => 'nullable|date',
            'status' => 'nullable|string|max:20',
        ]);

        $fee_installment->update($validated_data);
        return redirect()->back()->with('success', 'Fee installment updated successfully.');
    }
}
