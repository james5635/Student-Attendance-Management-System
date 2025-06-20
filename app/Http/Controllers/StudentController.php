<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Department;
use App\Models\Course;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

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

        return redirect()->back()->with('success', 'Student created successfully.');
    }
    /* 
        SELECT
        e.enrollment_date,
        
        c.course_id,
        c.year ,
        c.section,
    
        CONCAT(t.first_name, ' ', t.last_name) AS teacher_name,
        t.email AS teacher_email,
        t.phone AS teacher_phone,
        t.department_id AS teacher_department_id,
        t.hire_date AS teacher_hire_date,
        t.status AS teacher_status
    
        FROM students s
        JOIN enrollments e ON s.student_id = e.student_id
        JOIN classes c ON e.class_id = c.class_id
        LEFT JOIN teachers t ON c.advisor_id = t.teacher_id
        WHERE s.student_id = 6;

    */
    public function show(Request $request, Student $student)
    {
        $student_details = DB::table('students as s')
            ->join('enrollments as e', 's.student_id', '=', 'e.student_id')
            ->join('classes as c', 'e.class_id', '=', 'c.class_id')
            ->leftJoin('teachers as t', 'c.advisor_id', '=', 't.teacher_id')
            ->where('s.student_id', $student->student_id)
            ->select([
                'e.enrollment_date',
                'c.course_id',
                'c.year',
                'c.section',
                DB::raw("CONCAT(t.first_name, ' ', t.last_name) as teacher_name"),
                't.email as teacher_email',
                't.phone as teacher_phone',
                't.department_id as teacher_department_id',
                't.hire_date as teacher_hire_date',
                't.status as teacher_status'
            ])
            ->get();
        return Inertia::render('student-detail', [
            'student_details' => $student_details,
            'student' => $student,
        ]);
    }
    public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'dob' => 'required|date',
            'gender' => 'required|string',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'department_id' => 'required|exists:departments,department_id',
            'enrollment_year' => 'required|integer|min:1900|max:' . date('Y'),
            'status' => 'required|in:Active,Inactive',
        ]);
        $student->update($validated);
        return redirect()->back()->with('success', 'Student updated successfully.');
    }
    public function destroy(Student $student)
    {
        $student->delete();
        return redirect()->back()->with('success', 'Student deleted successfully.');
    }
}
