import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PetForm from '../components/PetForm';
import { reportService } from '../services/api';

const ReportPet: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (formData: any) => {
        try {
            // Reformat payload according to backend PetReportCreateSerializer structure
            const payload = {
                pet_data: {
                    name: formData.name || 'Unknown',
                    pet_type: formData.pet_type,
                    breed: formData.breed,
                    color: formData.color,
                    status: formData.status,
                },
                location: formData.location,
                description: formData.description || '',
            };

            await reportService.create(payload);
            navigate('/rescue'); // Redirect to Rescue page where verifed reports show up
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to report pet. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Report a Pet</h1>
                    <p className="text-lg text-gray-600">
                        Provide details about a lost or found pet to help us help them.
                    </p>
                </div>

                {error && (
                    <div className="max-w-2xl mx-auto mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <PetForm onSubmit={handleSubmit} title="Pet Information" />
            </div>
        </div>
    );
};

export default ReportPet;
