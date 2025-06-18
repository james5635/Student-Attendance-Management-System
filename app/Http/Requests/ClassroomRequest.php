<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ClassroomRequest extends FormRequest
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
            'building' => 'required|string|max:50',
            'room_number' => [
                'required',
                'string',
                'max:10',
                Rule::unique('classrooms')->where(function ($query) {
                    return $query->where('building', $this->input('building'));
                }),
            ],
            'capacity' => 'nullable|integer',
        ];
    }
    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'room_number.unique' => 'The room number must be unique within the same building.',
        ];
    }
}
