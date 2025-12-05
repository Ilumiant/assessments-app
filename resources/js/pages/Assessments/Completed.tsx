import { Head } from '@inertiajs/react';

export default function AssessmentCompleted({ assessment }: { assessment: { name: string } }) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <Head title="Assessment Completado" />
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
                <div className="mb-4 text-green-500">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h1 className="text-2xl font-bold mb-2">¡Gracias!</h1>
                <p className="text-gray-600">
                    El assessment para <strong>{assessment.name}</strong> ha sido completado exitosamente.
                </p>
            </div>
        </div>
    );
}
