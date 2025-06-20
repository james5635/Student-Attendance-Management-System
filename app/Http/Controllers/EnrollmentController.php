<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Models\Student;
use App\Models\SchoolClass;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'enrollment_date' => 'required|date',
        ]);
        $student_id = Student::max('student_id'); // student_id is integer
        $class_id = SchoolClass::max('class_id'); // class_id is integer
        // Create a new enrollment with the validated data
        Enrollment::create(
            [
                'student_id' => $student_id,
                'class_id' => $class_id,
                'enrollment_date' => $validated['enrollment_date'],
            ]
        );
        // Return a response or redirect
        return redirect()->back()->with('success', 'Enrollment created successfully.');
    }
}
