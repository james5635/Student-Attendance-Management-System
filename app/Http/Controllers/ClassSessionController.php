<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\ClassSession;
use \App\Models\Student;
use \App\Models\Subject;
use \App\Models\Teacher;
use \App\Models\SchoolClass;
use \App\Models\ClassSubject;
use \App\Models\Attendance;
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
    /*
            SELECT
        --     csess.session_id,

            a.attendance_id,
        --     a.student_id,
            a.status AS attendance_status,
            a.remarks,

        --     csess.class_subject_id,
        --     csess.session_date,
        --     csess.start_time,
        --     csess.end_time,
        --     csess.status AS session_status,

        --     cs.class_id,
        --     cs.subject_id,
        --     cs.teacher_id,

            cl.class_id,
        --     cl.course_id AS class_course_id,
        --     cl.year,
        --     cl.section,
        --     cl.advisor_id,

            s.student_id,
            s.first_name AS student_first_name,
            s.last_name AS student_last_name,
            s.dob,
            s.gender,
            s.email AS student_email,
            s.phone AS student_phone,
            s.address,
            s.department_id AS student_department_id,
            s.enrollment_year,
            s.status AS student_status,

            sub.subject_id,
        --     sub.course_id AS subject_course_id,
            sub.name AS subject_name,
        --     sub.code AS subject_code,
        --     sub.credits,
        --     sub.description AS subject_description,

        	t.teacher_id,
            t.first_name AS teacher_first_name,
            t.last_name AS teacher_last_name
        --     t.email AS teacher_email,
        --     t.phone AS teacher_phone,
        --     t.department_id AS teacher_department_id,
        --     t.hire_date,
        --     t.status AS teacher_status

        FROM attendances a
        JOIN class_sessions csess ON a.session_id = csess.session_id
        JOIN class_subjects cs ON csess.class_subject_id = cs.class_subject_id
        JOIN classes cl ON cs.class_id = cl.class_id
        JOIN students s ON a.student_id = s.student_id
        JOIN subjects sub ON cs.subject_id = sub.subject_id
        LEFT JOIN teachers t ON cs.teacher_id = t.teacher_id
        WHERE a.session_id = 5;


    */
    public function show(Request $request, ClassSession $classSession)
    {

        $class_session_details = Attendance::with([
            'session.classSubject.class', // ->cl
            'session.classSubject.subject', // ->sub
            'session.classSubject.teacher', // ->t
            'student' // ->s
        ])->where('session_id', $classSession->session_id)->get()->map(function ($attendance) {
            return [
                'attendance_id' => $attendance->attendance_id,
                'attendance_status' => $attendance->status,
                'remarks' => $attendance->remarks,

                'class_id' => optional($attendance->session->classSubject->class)->class_id,

                'student_id' => $attendance->student->student_id,
                'student_first_name' => $attendance->student->first_name,
                'student_last_name' => $attendance->student->last_name,
                'dob' => $attendance->student->dob,
                'gender' => $attendance->student->gender,
                'student_email' => $attendance->student->email,
                'student_phone' => $attendance->student->phone,
                'address' => $attendance->student->address,
                'student_department_id' => $attendance->student->department_id,
                'enrollment_year' => $attendance->student->enrollment_year,
                'student_status' => $attendance->student->status,

                'subject_id' => optional($attendance->session->classSubject->subject)->subject_id,
                'subject_name' => optional($attendance->session->classSubject->subject)->name,

                'teacher_id' => optional($attendance->session->classSubject->teacher)->teacher_id,
                'teacher_first_name' => optional($attendance->session->classSubject->teacher)->first_name,
                'teacher_last_name' => optional($attendance->session->classSubject->teacher)->last_name,
            ];
        });
        return Inertia::render('class-session-detail', [
            'class_session' => $classSession,
            'class_session_details' => $class_session_details,
        ]);
    }

    public function destroy(ClassSession $classSession)
    {
        $classSession->delete();
        return redirect()->back()->with('success', 'Class session deleted successfully.');
    }
}
