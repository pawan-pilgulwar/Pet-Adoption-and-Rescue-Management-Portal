import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Pet } from '../../types';
import Button from '../../components/Button';
import Input from '../../components/Input';
import PetCard from '../../components/PetCard';
import { useAuth } from '../../context/AuthContext';

const ManagePets: React.FC = () => {
  const { user } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    pet_type: '',
    breed: '',
    color: '',
    status: 'Available'
  });

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await api.get('/pets/admin-all-pets/');
      setPets(response.data.data.pets);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePet = async (id: number) => {
    if (!window.confirm("Delete this pet?")) return;
    try {
      await api.delete(`/pets/${id}/admin-delete-pet/`);
      setPets(pets.filter(p => p.id !== id));
    } catch (error) {
      console.error('Failed to delete pet:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegisterPet = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/pets/admin-register-pet/', {
        ...formData,
        created_by: user?.id
      });
      setPets([...pets, response.data.data]);
      setShowForm(false);
      setFormData({ name: '', pet_type: '', breed: '', color: '', status: 'Available' });
    } catch (error) {
      console.error('Failed to register pet:', error);
      alert('Error registering pet.');
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800">🐕 Manage Pets</h1>
          <p className="text-slate-500 mt-1">Register and manage pets for adoption.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Add New Pet'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleRegisterPet} className="bg-white p-6 rounded-2xl shadow-sm border border-orange-50 mb-8 space-y-4 animate-fade-in">
          <h2 className="text-lg font-bold text-slate-800">Register a Pet for Adoption</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Pet Name" name="name" required value={formData.name} onChange={handleChange} />
            <Input label="Pet Type (Dog, Cat...)" name="pet_type" required value={formData.pet_type} onChange={handleChange} />
            <Input label="Breed" name="breed" value={formData.breed} onChange={handleChange} />
            <Input label="Color" name="color" value={formData.color} onChange={handleChange} />
          </div>
          <Button type="submit">Publish Pet</Button>
        </form>
      )}

      {loading ? (
        <div className="text-center py-16">
          <span className="text-4xl animate-float inline-block">🐾</span>
          <p className="mt-4 text-slate-500 font-bold">Loading pets...</p>
        </div>
      ) : pets.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-orange-50">
          <span className="text-4xl">🐕</span>
          <p className="mt-4 text-slate-500 font-bold">No pets found in the system.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet}>
              <Button className="w-full mt-1" variant="danger" onClick={() => handleDeletePet(pet.id)}>
                Remove Pet
              </Button>
            </PetCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagePets;
