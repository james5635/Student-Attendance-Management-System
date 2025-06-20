<?php

namespace App\Http\Controllers;

use App\Models\SchoolClass;
use Illuminate\Http\Request;

class SchoolClassController extends Controller
{
    public function store(Request $request)
    {

        // Validate the request data
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,course_id',
            'year' => 'required|integer',
            'section' => 'required|string|max:10',
            'advisor_id' => 'nullable|exists:teachers,teacher_id',
        ]);

        // Create a new class with the validated data
        SchoolClass::create($validated);

        // Return a response or redirect
        return redirect()->back()->with('success', 'Class created successfully.');
    }
}
