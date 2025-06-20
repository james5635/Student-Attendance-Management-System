<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Requests\SubjectRequest;
use App\Models\Subject;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use function Pest\Laravel\get;
class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subjects = Subject::all();
        $minimal_courses = Course::select("course_id", "name")->get();
        $minimal_classrooms = DB::table('classrooms')
            ->select('classroom_id')
            ->get();
        $minimal_teachers = DB::table('teachers')
            ->select('teacher_id', 'first_name', 'last_name')
            ->get();
        $minimal_classes = DB::table('classes')
            ->select('class_id')
            ->get();
        return Inertia::render('subjects', [
            'subjects' => $subjects,
            'minimal_courses' => $minimal_courses,
            'minimal_classrooms' => $minimal_classrooms,
            'minimal_teachers' => $minimal_teachers,
            'minimal_classes' => $minimal_classes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SubjectRequest $request)
    {
        error_log("SubjectController@store called");
        $validated = $request->validated();
        Subject::create($validated);
        return redirect()->back()->with('message', 'Subject created successfully');

    }

    /**
     * Display the specified resource.
     */
    /*
        SELECT
      s.subject_id, -- First column as requested

      s.name AS subject_name,
      s.code AS subject_code,
      s.credits,
      s.description,

      cs.class_subject_id,
      cs.class_id,
      cs.teacher_id,

      sch.schedule_id,
      sch.day_of_week,
      sch.start_time,
      sch.end_time,
      sch.classroom_id,

      c.building,
      c.room_number,
      c.capacity

      FROM class_subjects cs
      INNER JOIN subjects s ON cs.subject_id = s.subject_id
      INNER JOIN schedules sch ON cs.class_subject_id = sch.class_subject_id
      INNER JOIN classrooms c ON sch.classroom_id = c.classroom_id;

    */
    public function show(Subject $subject)
    {

        $subject_details = DB::table('class_subjects as cs')
            ->join('subjects as s', 'cs.subject_id', '=', 's.subject_id')
            ->join('schedules as sch', 'cs.class_subject_id', '=', 'sch.class_subject_id')
            ->join('classrooms as c', 'sch.classroom_id', '=', 'c.classroom_id')
            ->where('s.subject_id', $subject->subject_id)
            ->select([
                'cs.class_id',
                'cs.teacher_id',
                'sch.day_of_week',
                'sch.start_time',
                'sch.end_time',
                'sch.classroom_id',
                'c.building',
                'c.room_number',
                'c.capacity',
            ])
            ->get();
        return Inertia::render('subject-detail', [
            'subject_details' => $subject_details,
            'subject' => $subject,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subject $subject)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SubjectRequest $request, Subject $subject)
    {
        $validated = $request->validated();
        $subject->update($validated);
        return redirect()->back()->with('message', 'Subject updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subject $subject)
    {

        $subject->delete();
        return redirect()->back()->with('message', 'Subject deleted successfully');
    }
}
