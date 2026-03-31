import React from 'react';
import { Pet } from '../types';
import { MEDIA_BASE_URL } from '../services/api';

interface PetCardProps {
  pet: Pet;
  children?: React.ReactNode;
}

const PetCard: React.FC<PetCardProps> = ({ pet, children }) => {
  const imageUrl = pet.image
    ? `${MEDIA_BASE_URL}${pet.image}`
    : 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=70';
  const breed = pet.breed ? pet.breed : 'Unknown';
  const color = pet.color ? pet.color : 'Unknown';

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-md border border-orange-50 card-hover">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-orange-50">
        <img
          src={imageUrl}
          alt={pet.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-110"
        />
        <span className="absolute top-3 right-3 text-xs font-bold text-white bg-orange-500 px-3 py-1 rounded-full shadow-sm">
          {pet.pet_type}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-black text-slate-800">{pet.name}</h3>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            pet.status === 'Available'
              ? 'bg-teal-50 text-teal-600'
              : 'bg-slate-100 text-slate-500'
          }`}>
            {pet.status}
          </span>
        </div>
        <p className="text-sm text-slate-500 mb-2">
          Breed: {breed} • Color: {color} • Age: {pet.age ?? '—'}
        </p>
        <p className="text-sm text-slate-500 mb-2">
          Gender: {pet.gender || '—'} • Size: {pet.size || '—'}
        </p>
        {pet.vaccination_status && (
          <p className="text-sm text-emerald-600 mb-2">Vaccination: {pet.vaccination_status}</p>
        )}
        {pet.description && (
          <p className="text-sm text-slate-400 mb-3 line-clamp-2">{pet.description}</p>
        )}
        <div className="space-y-2">{children}</div>
      </div>
    </article>
  );
};

export default PetCard;
