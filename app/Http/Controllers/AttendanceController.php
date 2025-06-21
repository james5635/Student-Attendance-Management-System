<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;
use App\Models\ClassSession;

class AttendanceController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'student_id' => 'required|integer|exists:students,student_id',
            'status' => 'required|string|in:Present,Absent,Late',
            'remarks' => 'nullable|string|max:255',
        ]);
        $session_id = ClassSession::max('session_id');
        Attendance::create([
            'session_id' => $session_id,
            'student_id' => $validatedData['student_id'],
            'status' => $validatedData['status'],
            'remarks' => $validatedData['remarks'] ?? null,
        ]);

        return redirect()->back()->with('success', 'Attendance recorded successfully.');
    }
}
