<?php

use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\ClassSubjectController;
use App\Http\Controllers\CourseController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\ScheduleController;

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



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
