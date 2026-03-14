import React, { useEffect, useState } from 'react';
import { authService } from '../services/api';

const Profile: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        address: ''
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await authService.getMe();
            setUser(response.data);
            setFormData({
                first_name: response.data.first_name || '',
                last_name: response.data.last_name || '',
                phone_number: response.data.phone_number || '',
                address: response.data.address || ''
            });
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (user?.id) {
                await authService.updateUser(user.id, formData);
                fetchProfile(); // Refresh data
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32"></div>
                    <div className="px-8 pb-8 pt-6 relative">
                        <div className="absolute -top-16 left-8 bg-white p-2 rounded-2xl shadow-sm">
                            <div className="w-24 h-24 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-3xl font-bold uppercase">
                                {user?.username?.charAt(0) || 'U'}
                            </div>
                        </div>
                        
                        <div className="flex justify-end mb-6">
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className={`px-6 py-2 rounded-xl font-medium text-sm transition-colors ${
                                    isEditing 
                                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                }`}
                            >
                                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                            </button>
                        </div>

                        <div className="mt-8">
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                                {user?.first_name} {user?.last_name}
                            </h1>
                            <p className="text-gray-500 font-medium mb-8">@{user?.username}</p>

                            {isEditing ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                            <input
                                                type="text"
                                                name="first_name"
                                                value={formData.first_name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                            <input
                                                type="text"
                                                name="last_name"
                                                value={formData.last_name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                            <input
                                                type="text"
                                                name="phone_number"
                                                value={formData.phone_number}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
                                    >
                                        Save Changes
                                    </button>
                                </form>
                            ) : (
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-1">Email Address</p>
                                        <p className="text-gray-900 font-medium">{user?.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-1">Phone Number</p>
                                        <p className="text-gray-900 font-medium">{user?.phone_number || 'Not provided'}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="text-sm font-medium text-gray-500 mb-1">Address</p>
                                        <p className="text-gray-900 font-medium">{user?.address || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-1">Account Role</p>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            ['Admin', 'SuperAdmin'].includes(user?.role) 
                                                ? 'bg-purple-100 text-purple-700' 
                                                : 'bg-green-100 text-green-700'
                                        }`}>
                                            {user?.role}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-1">Member Since</p>
                                        <p className="text-gray-900 font-medium">
                                            {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
