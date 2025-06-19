<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Models\ClassSubject;
use Illuminate\Http\Request;

class ClassSubjectController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'teacher_id' => 'required|integer|exists:teachers,teacher_id',
            'class_id' => 'required|integer|exists:classrooms,classroom_id',
        ]);
        $subject_id = Subject::max('subject_id'); // subject_id is integer

        // Assuming ClassSubject is a model that handles the relationship
        ClassSubject::create([
            'subject_id' => $subject_id,
            'teacher_id' => $validated['teacher_id'],
            'class_id' => $validated['class_id'],
        ]);
        return redirect()->back()->with('message', 'Class subject created successfully');
    }
}
