import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Assessment {
    name: string;
    token: string;
}

interface Question {
    id: string;
    text: string;
}

const questions: Question[] = [
    { id: 'Q1', text: 'Trabajo bien bajo presión' },
    { id: 'Q2', text: 'Me adapto rápidamente' },
    { id: 'Q3', text: 'Comunico claramente mis ideas' },
];

export default function AssessmentShow({ assessment }: { assessment: Assessment }) {
    const { data, setData, post, processing, errors } = useForm<{ responses: Record<string, number> }>({
        responses: {},
    });

    const handleOptionChange = (questionId: string, value: string) => {
        setData('responses', {
            ...data.responses,
            [questionId]: parseInt(value),
        });
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/assessment/${assessment.token}/submit`);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <Head title="Assessment" />
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
                <h1 className="text-2xl font-bold mb-2">Assessment para {assessment.name}</h1>
                <p className="text-gray-600 mb-6">Por favor responda las siguientes preguntas.</p>

                <form onSubmit={submit}>
                    {questions.map((q) => (
                        <div key={q.id} className="mb-6">
                            <p className="font-medium mb-2">{q.text}</p>
                            <div className="flex justify-between items-center bg-gray-50 p-4 rounded">
                                {[1, 2, 3, 4, 5].map((val) => (
                                    <label key={val} className="flex flex-col items-center cursor-pointer">
                                        <Input
                                            type="radio"
                                            name={q.id}
                                            value={val}
                                            checked={data.responses[q.id] === val}
                                            onChange={(e) => handleOptionChange(q.id, e.target.value)}
                                            className="mb-1 h-4 w-4"
                                            required
                                        />
                                        <span className="text-sm text-gray-600">{val}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-end mt-8">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            Enviar Respuestas
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
