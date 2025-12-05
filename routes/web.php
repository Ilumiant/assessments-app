<?php

use App\Http\Controllers\AssessmentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return redirect()->route('assessments.index');
    })->name('dashboard');

    Route::get('/assessments', [AssessmentController::class, 'index'])->name('assessments.index');
    Route::post('/assessments', [AssessmentController::class, 'store'])->name('assessments.store');
});

Route::get('/assessment/{token}', [AssessmentController::class, 'show'])->name('assessment.show');
Route::post('/assessment/{token}/submit', [AssessmentController::class, 'submit'])->name('assessment.submit');

require __DIR__.'/settings.php';

