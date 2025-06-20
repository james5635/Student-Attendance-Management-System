<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Teacher;
use App\Models\Department;

class TeacherController extends Controller
{
    public function index()
    {
        $teachers = Teacher::all();
        $minimal_departments = Department::select('department_id', 'name')->get();
        return Inertia::render('teachers', [
            'teachers' => $teachers,
            'minimal_departments' => $minimal_departments,
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:teachers,email',
            'phone' => 'nullable|string|max:20',
            'department_id' => 'required|exists:departments,department_id',
            'hire_date' => 'required|date',
            'status' => 'required|string|in:Active,Inactive,On Sabbatical',
            // 'status' => 'required|string',
        ]);

        Teacher::create($validated);

        return redirect()->back()->with('success', 'Teacher created successfully.');
    }
    public function update(Request $request, Teacher $teacher)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255' ,
            'phone' => 'nullable|string|max:20',
            'department_id' => 'required|exists:departments,department_id',
            'hire_date' => 'required|date',
            'status' => 'required|string|in:Active,Inactive,On Sabbatical',
        ]);

        $teacher->update($validated);

        return redirect()->back()->with('success', 'Teacher updated successfully.');
    }
    public function destroy(Teacher $teacher)
    {
        $teacher->delete();
        return redirect()->back()->with('success', 'Teacher deleted successfully.');
    }
}
