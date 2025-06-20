<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\ClassSession;
use \App\Models\Student;
use \App\Models\Subject;
use \App\Models\Teacher;
use \App\Models\SchoolClass;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ClassSessionController extends Controller
{
    public function index()
    {
        $minimal_students =  Student::select(
            'student_id',
            DB::raw("CONCAT(first_name, ' ', last_name) as student_name"),
        )->get();
        $minimal_subjects = Subject::select('subject_id', 'name')->get();
        $minimal_teachers = Teacher::select(
            'teacher_id',
            DB::raw("CONCAT(first_name, ' ', last_name) as teacher_name"),
        )->get();
        $minimal_classes =  SchoolClass::select('class_id')->get();

        $class_sessions = \App\Models\ClassSession::all();
        return Inertia::render('class-sessions', [
            'class_sessions' => $class_sessions,
            'minimal_students' => $minimal_students,
            'minimal_subjects' => $minimal_subjects,
            'minimal_teachers' => $minimal_teachers,
            'minimal_classes' => $minimal_classes,
        ]);
    }
}
