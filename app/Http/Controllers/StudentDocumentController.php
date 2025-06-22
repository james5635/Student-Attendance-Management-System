<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StudentDocument;
use App\Models\Student;
use Inertia\Inertia;

class StudentDocumentController extends Controller
{
    public function index()
    {
        $minimal_students = Student::select('student_id', 'first_name', 'last_name')->get();
        $student_documents = StudentDocument::all();
        return Inertia::render('student-documents', [
            'student_documents' => $student_documents,
            'minimal_students' => $minimal_students,
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'student_id' => 'required|integer|exists:students',
            'document_type' => 'required|string|max:255',
            'file' => 'required|file|max:2048', // max 2MB
            'issue_date' => 'required|date',
            'submitted_date' => 'required|date',
        ]);

        $path = $request->file('file')->store('student_documents', 'public');

        // Save to DB (assuming StudentDocument model exists)
        \App\Models\StudentDocument::create([
            'student_id' => $request->student_id,
            'document_type' => $request->document_type,
            'file_path' => $path,
            'issue_date' => $request->issue_date,
            'submitted_date' => $request->submitted_date,
        ]);

        return redirect()->back()->with('success', 'Document uploaded successfully.');
    }
    public function update(Request $request, $student_id, $document_type)
    {
        $student_document = StudentDocument::find([$student_id, $document_type]);
        // dump($request->all());
        $request->validate([
            'file' => 'required|file|max:2048', // max 2MB
            'issue_date' => 'required|date',
            'submitted_date' => 'required|date',
        ]);

        $path = $request->file('file')->store('student_documents', 'public');

        // Save to DB (assuming StudentDocument model exists)
        $student_document->update([
            'file_path' => $path,
            'issue_date' => $request->issue_date,
            'submitted_date' => $request->submitted_date,
        ]);

        return redirect()->back()->with('success', 'Document updated successfully.');
    }
    public function destroy($student_id, $document_type)
    {
        $student_document = StudentDocument::find([$student_id, $document_type]);
        $student_document->delete();
        return redirect()->back()->with('success', 'Document deleted successfully.');
    }
}
