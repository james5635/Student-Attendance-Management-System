<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FeeInstallmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'student_id' => 'required|exists:students,student_id',
            'installment_no' => [
                'required',
                'integer',
                Rule::unique('fee_installments')->where(function ($query) {
                    return $query->where('student_id', $this->input('student_id'));
                }),
                'min:1',
            ],
            'amount' => 'required|numeric|min:0',
            'due_date' => 'required|date',
            'payment_date' => 'nullable|date',
            'status' => 'nullable|string|max:20',
        ];
    }

      public function messages(): array
    {
        return [
            'installment_no.unique' => 'The installment number have already associated with the student.',
            'installment_no.min' => 'The installment number must be at least 1.',
        ];
    }
}
