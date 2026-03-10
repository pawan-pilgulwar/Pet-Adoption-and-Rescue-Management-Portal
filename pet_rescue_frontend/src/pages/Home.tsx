import React, { useEffect, useState } from 'react';
import { petService } from '../services/api';
import PetCard from '../components/PetCard';
import SearchBar from '../components/SearchBar';

const Home: React.FC = () => {
  const [pets, setPets] = useState<any[]>([]);
  const [filteredPets, setFilteredPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await petService.getAll();
      setPets(response.data.Pets);
      setFilteredPets(response.data.Pets);
    } catch (error) {
      console.error('Error fetching pets:', error);
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white py-16 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Find and Rescue Your <span className="text-blue-600">Perfect Pet</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Helping lost pets find their way home and connecting loving families with their next best friend.
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Recent Pet Reports</h2>
          <div className="flex space-x-2">
            <span className="bg-white px-3 py-1 rounded-full text-sm font-medium border border-gray-200 text-gray-600 shadow-sm">
              All Pets
            </span>
          </div>
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
            <p className="text-xl text-gray-400">No pets found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
