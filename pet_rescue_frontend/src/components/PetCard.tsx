import React from 'react';

interface PetCardProps {
    pet: {
        id: number;
        name: string;
        pet_type: string;
        breed: string;
        location: string;
        image: string | null;
        status: string;
    };
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="relative aspect-[4/3] bg-gray-100">
                {pet.image ? (
                    <img
                        src={pet.image}
                        alt={pet.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-sm">No Image</span>
                    </div>
                )}
                <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold shadow-sm ${pet.status === 'Lost' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}>
                        {pet.status}
                    </span>
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{pet.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{pet.pet_type} • {pet.breed}</p>
                <div className="flex items-center text-gray-600 text-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {pet.location}
                </div>
                <button className="w-full mt-4 py-2 bg-gray-50 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default PetCard;
