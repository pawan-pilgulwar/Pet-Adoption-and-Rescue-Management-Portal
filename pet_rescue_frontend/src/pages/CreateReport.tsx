import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';

const CreateReport: React.FC = () => {
  const [formData, setFormData] = useState({
    pet_name: '',
    pet_type: '',
    pet_breed: '',
    pet_color: '',
    pet_status: 'Lost',
    location: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/reports/create-report/', {
        pet_data: {
          name: formData.pet_name,
          pet_type: formData.pet_type,
          breed: formData.pet_breed,
          color: formData.pet_color,
          status: formData.pet_status,
        },
        location: formData.location,
        description: formData.description,
      });
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError('Failed to submit report. Please check your data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-black text-slate-800 mb-2">
        📢 File a <span className="text-orange-500">Rescue Report</span>
      </h1>
      <p className="text-slate-500 mb-6">Report a lost or found pet to help them get home safely.</p>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm font-medium border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-orange-50 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Pet Name" name="pet_name" required value={formData.pet_name} onChange={handleChange} />
          <div className="flex flex-col">
            <label className="mb-1.5 text-sm font-bold text-slate-700">Report Type</label>
            <select
              name="pet_status"
              className="px-4 py-2.5 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
              value={formData.pet_status}
              onChange={handleChange}
            >
              <option value="Lost">🔍 Lost (Looking for my pet)</option>
              <option value="Found">✅ Found (Found someone's pet)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Pet Type" placeholder="Dog, Cat, etc." name="pet_type" required value={formData.pet_type} onChange={handleChange} />
          <Input label="Breed" name="pet_breed" placeholder="Optional" value={formData.pet_breed} onChange={handleChange} />
          <Input label="Color" name="pet_color" placeholder="Optional" value={formData.pet_color} onChange={handleChange} />
          <Input label="Location" name="location" placeholder="Last seen / found location" required value={formData.location} onChange={handleChange} />
        </div>

        <div className="flex flex-col">
          <label className="mb-1.5 text-sm font-bold text-slate-700">Description</label>
          <textarea
            name="description"
            required
            rows={4}
            className="px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm resize-none"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide any additional details about the pet..."
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Report'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateReport;
