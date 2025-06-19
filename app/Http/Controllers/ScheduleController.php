<?php

namespace App\Http\Controllers;

use App\Models\ClassSubject;
use App\Models\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'classroom_id' => 'required|integer|exists:classrooms,classroom_id',
            'day_of_week' => 'required|string|in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);
        $class_subject_id = ClassSubject::max('class_subject_id'); // class_subject_id is integer

        Schedule::create([
            'class_subject_id' => $class_subject_id,
            'classroom_id' => $validated['classroom_id'],
            'day_of_week' => $validated['day_of_week'],
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
        ]);
        return redirect()->back()->with('message', 'Schedule created successfully');

    }
    
}
