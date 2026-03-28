import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    total_users: 0,
    total_reports: 0,
    total_pets: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/users/admin-dashboard/');
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching admin dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: 'Total Users',
      value: stats.total_users,
      icon: '👥',
      color: 'from-orange-500 to-amber-500',
      bgLight: 'bg-orange-50',
    },
    {
      label: 'Pets for Adoption',
      value: stats.total_pets,
      icon: '🐕',
      color: 'from-teal-500 to-emerald-500',
      bgLight: 'bg-teal-50',
    },
    {
      label: 'Community Reports',
      value: stats.total_reports,
      icon: '📋',
      color: 'from-purple-500 to-indigo-500',
      bgLight: 'bg-purple-50',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-black text-slate-800 mb-2">Dashboard Overview</h1>
      <p className="text-slate-500 mb-8">Welcome to the admin control panel.</p>

      {loading ? (
        <div className="text-center py-16">
          <span className="text-4xl animate-float inline-block">📊</span>
          <p className="mt-4 text-slate-500 font-bold">Loading statistics...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((card) => (
            <div
              key={card.label}
              className="bg-white p-6 rounded-2xl shadow-sm border border-orange-50 card-hover"
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 ${card.bgLight} rounded-2xl flex items-center justify-center text-2xl`}>
                  {card.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400">{card.label}</p>
                  <p className={`text-3xl font-black bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>
                    {card.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
