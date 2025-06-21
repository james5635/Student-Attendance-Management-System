<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\ClassSession;
use \App\Models\Student;
use \App\Models\Subject;
use \App\Models\Teacher;
use \App\Models\SchoolClass;
use \App\Models\ClassSubject;
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
    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'session_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'status' => 'nullable|string|max:255',
            'subject_id' => 'required|integer',
            'teacher_id' => 'required|integer',
            'class_id' => 'required|integer',
        ]);

        $classId = $validatedData['class_id'];
        $subjectId = $validatedData['subject_id'];
        $teacherId = $validatedData['teacher_id'];

        // Try to find the existing record
        $classSubject = ClassSubject::where('class_id', $classId)
            ->where('subject_id', $subjectId)
            ->where('teacher_id', $teacherId)
            ->first();

        if (!$classSubject) {
            // If not found, create a new one
            $classSubject = ClassSubject::create([
                'class_id' => $classId,
                'subject_id' => $subjectId,
                'teacher_id' => $teacherId,
            ]);
        }

        // Get the ID
        $classSubjectId = $classSubject->class_subject_id;

        ClassSession::create([
            'class_subject_id' => $classSubjectId,
            'session_date' => $validatedData['session_date'],
            'start_time' => $validatedData['start_time'],
            'end_time' => $validatedData['end_time'],
            'status' => $validatedData['status'] ?? null,
        ]);

        return redirect()->back()->with('success', 'Class session created successfully.');
    }
    public function update(Request $request, ClassSession $classSession)
    {

        $validatedData = $request->validate([
            'session_date' => 'required|date',
            'start_time' => 'required|date_format:H:i:s',
            'end_time' => 'required|date_format:H:i:s|after:start_time',
            'status' => 'nullable|string|max:255',
            'subject_id' => 'required|integer',
            'teacher_id' => 'required|integer',
            'class_id' => 'required|integer',
        ]);

        $classId = $validatedData['class_id'];
        $subjectId = $validatedData['subject_id'];
        $teacherId = $validatedData['teacher_id'];

        // Try to find the existing record
        $classSubject = ClassSubject::where('class_id', $classId)
            ->where('subject_id', $subjectId)
            ->where('teacher_id', $teacherId)
            ->first();

        if (!$classSubject) {
            // If not found, create a new one
            $classSubject = ClassSubject::create([
                'class_id' => $classId,
                'subject_id' => $subjectId,
                'teacher_id' => $teacherId,
            ]);
        }

        // Get the ID
        $classSubjectId = $classSubject->class_subject_id;

        $classSession->update([
            'class_subject_id' => $classSubjectId,
            'session_date' => $validatedData['session_date'],
            'start_time' => $validatedData['start_time'],
            'end_time' => $validatedData['end_time'],
            'status' => $validatedData['status'] ?? null,
        ]);

        return redirect()->back()->with('success', 'Class session updated successfully.');
    }
    public function destroy(ClassSession $classSession)
    {
        $classSession->delete();
        return redirect()->back()->with('success', 'Class session deleted successfully.');
    }
}
