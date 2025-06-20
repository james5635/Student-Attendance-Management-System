<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Department;
use App\Models\Course;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::all();
        $minimal_departments = Department::select('department_id', 'name')->get();
        $minimal_courses = Course::select('course_id', 'name')->get();
        $minimal_teachers = Teacher::select('teacher_id', 'first_name', 'last_name')->get();
        return Inertia::render('students', [
            'students' => $students,
            'minimal_departments' => $minimal_departments,
            'minimal_courses' => $minimal_courses,
            'minimal_teachers' => $minimal_teachers,
        ]);
    }
    public function store(Request $request)
    {

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'dob' => 'required|date',
            'gender' => 'required|string',
            'email' => 'required|email|max:255|unique:students,email',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'department_id' => 'required|exists:departments,department_id',
            'enrollment_year' => 'required|integer|min:1900|max:' . date('Y'),
            'status' => 'required|in:Active,Inactive',
        ]);

        Student::create($validated);

        return redirect()->route('students.index')->with('success', 'Student created successfully.');
    }
}
