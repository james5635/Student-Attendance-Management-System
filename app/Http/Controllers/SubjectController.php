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
        // foreach ($subjects as $id => $subject) {
        //     echo $id . ' ' . $subject->name . '<br />';
        // }
        return Inertia::render('subjects', [
            'subjects' => $subjects,
            'minimal_courses' => $minimal_courses
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


    }

    /**
     * Display the specified resource.
     */
    public function show(Subject $subject)
    {

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
        Subject::update($validated);
        return redirect()->back()->with('message', 'Subject updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subject $subject)
    {
        //
    }
}
