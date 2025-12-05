import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useState, FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Select from 'react-select';

interface Manager {
    id: number;
    name: string;
}

interface Assessment {
    id: number;
    name: string;
    email: string;
    paid: boolean;
    price: string;
    status: string;
}

interface Props {
    managers: Manager[];
    assessments: Assessment[];
    filters: { manager_id?: string };
}

export default function AssessmentsIndex({ managers, assessments, filters }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        manager_id: filters.manager_id || '',
        name: '',
        email: '',
        price: '',
        paid: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        setSubmitError(null);
        post('/assessments', {
            onSuccess: () => {
                setIsModalOpen(false);
                reset('name', 'email', 'price', 'paid');
            },
            onError: (errors) => {
                console.error('Errors:', errors);
                setSubmitError('Hay errores en el formulario. Por favor revísalos.');
            }
        });
    };


    const managerOptions = managers.map(m => ({ value: m.id, label: m.name }));

    return (
        <AppLayout breadcrumbs={[{ title: 'Assessments', href: '/assessments' }]}>
            <Head title="Assessments" />

            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Assessments</h1>
                    <Button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Crear Assessment
                    </Button>
                </div>

                <div className="mb-6 max-w-md">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Manager</label>
                    <Select
                        options={managerOptions}
                        value={managerOptions.find(option => option.value === Number(filters.manager_id))}
                        onChange={(option) => {
                            const managerId = option ? option.value : '';
                            router.get('/assessments', { manager_id: managerId }, { preserveState: true });
                        }}
                        placeholder="Buscar manager..."
                        isClearable
                        className="w-full"
                    />
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {assessments.length > 0 ? (
                                assessments.map((assessment) => (
                                    <tr key={assessment.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{assessment.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{assessment.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {assessment.paid ? (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Yes</span>
                                            ) : (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">No</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">${assessment.price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                assessment.status === 'Completado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {assessment.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                        {filters.manager_id ? 'No hay assessments para este manager.' : 'Seleccione un manager para ver los assessments.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <h2 className="text-xl font-bold mb-4">Nuevo Assessment</h2>
                            <form onSubmit={submit}>
                                {submitError && <div className="mb-4 text-red-500 text-sm font-bold">{submitError}</div>}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Manager</label>
                                    <Select
                                        options={managerOptions}
                                        value={managerOptions.find(option => option.value === Number(data.manager_id))}
                                        onChange={(option) => setData('manager_id', option ? String(option.value) : '')}
                                        placeholder="Seleccione un manager"
                                        className="mt-1"
                                        required
                                    />
                                    {errors.manager_id && <div className="text-red-500 text-sm mt-1">{errors.manager_id}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Nombre Evaluado</label>
                                    <Input 
                                        type="text" 
                                        className="mt-1"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        required
                                    />
                                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Email Evaluado</label>
                                    <Input 
                                        type="email" 
                                        className="mt-1"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        required
                                    />
                                    {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Precio</label>
                                    <Input 
                                        type="number" 
                                        step="0.01"
                                        className="mt-1"
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                        required
                                    />
                                    {errors.price && <div className="text-red-500 text-sm mt-1">{errors.price}</div>}
                                </div>

                                <div className="mb-4 flex items-center">
                                    <Input 
                                        type="checkbox" 
                                        id="paid"
                                        className="mr-2 h-4 w-4"
                                        checked={data.paid}
                                        onChange={e => setData('paid', e.target.checked)}
                                    />
                                    <label htmlFor="paid" className="text-sm font-medium text-gray-700">Pagado</label>
                                </div>

                                <div className="flex justify-end gap-2">
                                    <Button 
                                        type="button" 
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 border rounded text-gray-50 hover:bg-gray-700"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        disabled={processing}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        Guardar
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
