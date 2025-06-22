<?php

use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\ClassSubjectController;
use App\Http\Controllers\CourseController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\TeacherController;

Route::get('/', function () {
    return Inertia::location('start');
})->name('home');

Route::get('start', function () {
    return Inertia::render('start');
})->name('start');

// Classroom routes
Route::get('/classrooms', [ClassroomController::class, 'index'])->name('classrooms.index');
Route::post('/classrooms', [ClassroomController::class, 'store'])->name('classrooms.store');
Route::put('/classrooms/{classroom}', [ClassroomController::class, 'update'])->name('classrooms.update');
Route::delete('/classrooms/{classroom}', [ClassroomController::class, 'destroy'])->name('classrooms.destroy');


// Subject routes
Route::get('/subjects', [SubjectController::class, 'index'])->name('subjects.index');
Route::get('/subject-detail/{subject}', [SubjectController::class, 'show'])->name('subject-detail.show');
Route::post('/subjects', [SubjectController::class, 'store'])->name('subjects.store');
Route::put('/subjects/{subject}', [SubjectController::class, 'update'])->name('subjects.update');
Route::delete('/subjects/{subject}', [SubjectController::class, 'destroy'])->name('subjects.destroy');

// Course routes
Route::get('/courses', [CourseController::class, 'index'])->name('courses.index');
Route::post('/courses', [CourseController::class, 'store'])->name('courses.store');
Route::put('/courses/{course}', [CourseController::class, 'update'])->name('courses.update');
Route::delete('/courses/{course}', [CourseController::class, 'destroy'])->name('courses.destroy');

// ClassSubject routes
Route::post('/class-subjects', [ClassSubjectController::class, 'store'])->name('class-subjects.store');

// Schedule routes
Route::post('/schedules', [ScheduleController::class, 'store'])->name('schedules.store');



// Department routes
Route::get('/departments', [DepartmentController::class, 'index'])->name('departments.index');
Route::post('/departments', [DepartmentController::class, 'store'])->name('departments.store');
Route::put('/departments/{department}', [DepartmentController::class, 'update'])->name('departments.update');
Route::delete('/departments/{department}', [DepartmentController::class, 'destroy'])->name('departments.destroy');

// Teacher routes
Route::get('/teachers', [TeacherController::class, 'index'])->name('teachers.index');
Route::post('/teachers', [TeacherController::class, 'store'])->name('teachers.store');
Route::put('/teachers/{teacher}', [TeacherController::class, 'update'])->name('teachers.update');
Route::delete('/teachers/{teacher}', [TeacherController::class, 'destroy'])->name('teachers.destroy');

// Student routes
Route::get('/students', [App\Http\Controllers\StudentController::class, 'index'])->name('students.index');
Route::get('/student-detail/{student}', [App\Http\Controllers\StudentController::class, 'show'])->name('students.show');
Route::post('/students', [App\Http\Controllers\StudentController::class, 'store'])->name('students.store');
Route::put('/students/{student}', [App\Http\Controllers\StudentController::class, 'update'])->name('students.update');
Route::delete('/students/{student}', [App\Http\Controllers\StudentController::class, 'destroy'])->name('students.destroy');

// SchoolClass routes
Route::post('/classes', [App\Http\Controllers\SchoolClassController::class, 'store'])->name('classes.store');

// Enrollment routes
Route::post('/enrollments', [App\Http\Controllers\EnrollmentController::class, 'store'])->name('enrollments.store');

// ClassSession routes
Route::get('/class-sessions', [App\Http\Controllers\ClassSessionController::class, 'index'])->name('class-sessions.index');
Route::get('/class-session-detail/{classSession}', [App\Http\Controllers\ClassSessionController::class, 'show'])->name('class-sessions.show');
Route::post('/class-sessions', [App\Http\Controllers\ClassSessionController::class, 'store'])->name('class-sessions.store');
Route::put('/class-sessions/{classSession}', [App\Http\Controllers\ClassSessionController::class, 'update'])->name('class-sessions.update');
Route::delete('/class-sessions/{classSession}', [App\Http\Controllers\ClassSessionController::class, 'destroy'])->name('class-sessions.destroy');

// Attendance routes

Route::post('/attendance', [App\Http\Controllers\AttendanceController::class, 'store'])->name('attendances.store');

// Fee-installment route
Route::get('/fee-installments', [App\Http\Controllers\FeeInstallmentController::class, 'index'])->name('fee-installments.index');
Route::post('/fee-installments', [App\Http\Controllers\FeeInstallmentController::class, 'store'])->name('fee-installments.store');
Route::put('/fee-installments/{student_id}/{installment_no}', [App\Http\Controllers\FeeInstallmentController::class, 'update'])->name('fee-installments.update');
Route::delete('/fee-installments/{student_id}/{installment_no}', [App\Http\Controllers\FeeInstallmentController::class, 'destroy'])->name('fee-installments.destroy');

// Student Document route
Route::get('/student-documents', [App\Http\Controllers\StudentDocumentController::class, 'index'])->name('student-documents.index');
Route::post('/student-documents', [App\Http\Controllers\StudentDocumentController::class, 'store'])->name('student-documents.store');
// Route::post('/astudent-documents/{student_id}/{document_type}', [App\Http\Controllers\StudentDocumentController::class, 'update'])->name('student-documents.update');
Route::put('/student-documents/{student_id}/{document_type}', [App\Http\Controllers\StudentDocumentController::class, 'update'])->name('student-documents.update');
Route::delete('/student-documents/{student_id}/{document_type}', [App\Http\Controllers\StudentDocumentController::class, 'destroy'])->name('student-documents.destroy');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
