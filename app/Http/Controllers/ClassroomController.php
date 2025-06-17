<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassroomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $classrooms = Classroom::all();
        return Inertia::render('classrooms', [
            'classrooms' => $classrooms
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
    public function store(Request $request)

    {
        $validated = $request->validate([
            'building' => 'required|string|max:50',
            'room_number' => 'required|string|max:10',
            'capacity' => 'nullable|integer',
        ]);


        Classroom::create($validated);

        return redirect()->back()->with('message', 'Classroom created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Classroom $classroom)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Classroom $classroom)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Classroom $classroom)
    {
        $validated = $request->validate([
            'building' => 'required|string|max:50',
            'room_number' => 'required|string|max:10',
            'capacity' => 'nullable|integer',
        ]);

        $classroom->update($validated);
        return redirect()->back()->with('message', 'Classroom updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Classroom $classroom)

    {
        $classroom->delete();
        return redirect()->back()->with('message', 'Classroom deleted successfully');
    }
}
