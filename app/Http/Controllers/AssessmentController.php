<?php

namespace App\Http\Controllers;

use App\Mail\AssessmentAccessMail;
use App\Mail\AssessmentCompletedMail;
use App\Models\Assessment;
use App\Models\Manager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AssessmentController extends Controller
{
    public function index(Request $request)
    {
        $managers = Manager::all(['id', 'name']);
        $assessments = [];

        if ($request->has('manager_id')) {
            $assessments = Assessment::where('manager_id', $request->manager_id)
                ->with('response')
                ->get()
                ->map(function ($assessment) {
                    return [
                        'id' => $assessment->id,
                        'name' => $assessment->name,
                        'email' => $assessment->email,
                        'paid' => $assessment->paid,
                        'price' => $assessment->price,
                        'status' => $assessment->response ? 'Completado' : 'Pendiente',
                    ];
                });
        }

        return Inertia::render('Assessments/Index', [
            'managers' => $managers,
            'assessments' => $assessments,
            'filters' => $request->only(['manager_id']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'manager_id' => 'required|exists:managers,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'price' => 'required|numeric',
            'paid' => 'boolean',
        ]);

        $assessment = Assessment::create([
            'manager_id' => $validated['manager_id'],
            'token' => Str::uuid(),
            'name' => $validated['name'],
            'email' => $validated['email'],
            'price' => $validated['price'],
            'paid' => $validated['paid'] ?? false,
        ]);

        Mail::to($assessment->email)->send(new AssessmentAccessMail($assessment));

        return redirect()->route('assessments.index', ['manager_id' => $assessment->manager_id])
            ->with('success', 'Assessment created successfully.');
    }

    public function show($token)
    {
        $assessment = Assessment::where('token', $token)->firstOrFail();

        if ($assessment->response) {
             return Inertia::render('Assessments/Completed', ['assessment' => $assessment]);
        }

        return Inertia::render('Assessments/Show', [
            'assessment' => $assessment,
        ]);
    }

    public function submit(Request $request, $token)
    {
        $assessment = Assessment::where('token', $token)->firstOrFail();

        if ($assessment->response) {
            return redirect()->back()->with('error', 'Assessment already completed.');
        }

        $validated = $request->validate([
            'responses' => 'required|array',
        ]);

        $assessment->response()->create([
            'responses' => $validated['responses'],
            'completed_at' => now(),
        ]);

        // Reload to get the relationship
        $assessment->load('response', 'manager');

        Mail::to($assessment->manager->email)->send(new AssessmentCompletedMail($assessment));

        return redirect()->route('assessment.show', $token)->with('success', 'Assessment submitted successfully.');
    }
}
