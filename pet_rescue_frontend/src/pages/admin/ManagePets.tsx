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
  const [editingPet, setEditingPet] = useState<Pet | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    pet_type: '',
    breed: '',
    color: '',
    age: '',
    gender: '',
    size: '',
    description: '',
    vaccination_status: '',
    status: 'Available',
    image: null as File | null,
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

  const handleEditPet = (pet: Pet) => {
    setEditingPet(pet);
    setFormData({
      name: pet.name,
      pet_type: pet.pet_type,
      breed: pet.breed || '',
      color: pet.color || '',
      age: pet.age?.toString() || '',
      gender: pet.gender || '',
      size: pet.size || '',
      description: pet.description || '',
      vaccination_status: pet.vaccination_status || '',
      status: pet.status,
      image: null, // Keep null for edit, as image might not change
    });
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingPet(null);
    setFormData({
      name: '',
      pet_type: '',
      breed: '',
      color: '',
      age: '',
      gender: '',
      size: '',
      description: '',
      vaccination_status: '',
      status: 'Available',
      image: null,
    });
    setShowForm(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target instanceof HTMLInputElement && e.target.type === 'file' && e.target.files?.[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegisterPet = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const fm = new FormData();
      fm.append('name', formData.name);
      fm.append('pet_type', formData.pet_type);
      fm.append('breed', formData.breed);
      fm.append('color', formData.color);
      if (formData.age) fm.append('age', formData.age);
      if (formData.gender) fm.append('gender', formData.gender);
      if (formData.size) fm.append('size', formData.size);
      if (formData.description) fm.append('description', formData.description);
      if (formData.vaccination_status) fm.append('vaccination_status', formData.vaccination_status);
      fm.append('status', formData.status);
      if (formData.image) fm.append('image', formData.image);

      let response: any;
      if (editingPet) {
        // Update existing pet
        response = await api.put(`/pets/${editingPet.id}/admin-update-pet/`, fm, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        // Update the pet in the list
        setPets(pets.map(p => p.id === editingPet.id ? response.data.data : p));
      } else {
        // Create new pet
        response = await api.post('/pets/admin-register-pet/', fm, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setPets([...pets, response.data.data]);
      }

      setShowForm(false);
      setEditingPet(null);
      setFormData({
        name: '',
        pet_type: '',
        breed: '',
        color: '',
        age: '',
        gender: '',
        size: '',
        description: '',
        vaccination_status: '',
        status: 'Available',
        image: null,
      });
    } catch (error) {
      console.error('Failed to save pet:', error);
      alert('Error saving pet.');
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800">🐕 Manage Pets</h1>
          <p className="text-slate-500 mt-1">Register and manage pets for adoption.</p>
        </div>
        <Button onClick={() => editingPet ? handleCancelEdit() : setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Add New Pet'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleRegisterPet} className="bg-white p-6 rounded-2xl shadow-sm border border-orange-50 mb-8 space-y-4 animate-fade-in">
          <h2 className="text-lg font-bold text-slate-800">{editingPet ? 'Edit Pet' : 'Register a Pet for Adoption'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Pet Name" name="name" required value={formData.name} onChange={handleChange} />
            <Input label="Pet Type (Dog, Cat...)" name="pet_type" required value={formData.pet_type} onChange={handleChange} />
            <Input label="Breed" name="breed" value={formData.breed} onChange={handleChange} />
            <Input label="Color" name="color" value={formData.color} onChange={handleChange} />
            <Input label="Age" name="age" value={formData.age} onChange={handleChange} />
            <Input label="Gender" name="gender" value={formData.gender} onChange={handleChange} />
            <Input label="Size" name="size" value={formData.size} onChange={handleChange} />
            <Input label="Vaccination Status" name="vaccination_status" value={formData.vaccination_status} onChange={handleChange} />
            <Input label="Description" name="description" value={formData.description} onChange={handleChange} />
            <Input label="Pet Image" type="file" name="image" onChange={handleChange} />
          </div>
          <Button type="submit">{editingPet ? 'Update Pet' : 'Publish Pet'}</Button>
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
              <div className="flex gap-2">
                <Button className="flex-1" variant="secondary" onClick={() => handleEditPet(pet)}>
                  Edit Pet
                </Button>
                <Button className="flex-1" variant="danger" onClick={() => handleDeletePet(pet.id)}>
                  Remove Pet
                </Button>
              </div>
            </PetCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagePets;
