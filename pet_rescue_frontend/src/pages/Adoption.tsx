import React, { useEffect, useState } from 'react';
import { petService } from '../services/api';
import PetCard from '../components/PetCard';
import SearchBar from '../components/SearchBar';

const Adoption: React.FC = () => {
  const [pets, setPets] = useState<any[]>([]);
  const [filteredPets, setFilteredPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdoptionPets();
  }, []);

  const fetchAdoptionPets = async () => {
    try {
      const response = await petService.getAll();
      setPets(response.data.Pets);
      setFilteredPets(response.data.Pets);
    } catch (error) {
      console.error('Error fetching adoption pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    const filtered = pets.filter((pet) =>
      pet.name.toLowerCase().includes(query.toLowerCase()) ||
      pet.breed.toLowerCase().includes(query.toLowerCase()) ||
      pet.location.toLowerCase().includes(query.toLowerCase()) ||
      pet.pet_type.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPets(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Pets Available for <span className="text-blue-600">Adoption</span>
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Find your new best friend among these wonderful pets waiting for a loving home.
          </p>
        </div>

        <div className="mb-12 max-w-2xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredPets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-xl text-gray-400">No pets available for adoption matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Adoption;
