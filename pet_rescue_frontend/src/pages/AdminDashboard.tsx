import React, { useState, useEffect } from 'react';
import { adminService, reportService } from '../services/api';
import DashboardTable from '../components/DashboardTable';

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<any>(null);
    const [reports, setReports] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        try {
            const [statsRes, reportsRes] = await Promise.all([
                adminService.getStats(),
                adminService.getReports()
            ]);
            setStats(statsRes.data);
            setReports(reportsRes.data.reports);
            console.log(reportsRes.data.reports);
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Admin Control Panel</h1>

                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Users</p>
                            <p className="text-4xl font-black text-blue-600 mt-1">{stats.total_users}</p>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Reports</p>
                            <p className="text-4xl font-black text-indigo-600 mt-1">{stats.total_reports}</p>
                        </div>
                        {stats.total_admin_users !== undefined && (
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Admins</p>
                                <p className="text-4xl font-black text-purple-600 mt-1">{stats.total_admin_users}</p>
                            </div>
                        )}
                    </div>
                )}

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Pet Reports</h2>
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <DashboardTable
                            headers={['ID', 'Pet Name', 'Owner', 'Status', 'Date', 'Actions']}
                            data={reports}
                            renderRow={(report) => (
                                <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{report.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{report.pet_name || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.reporter_name || 'User'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                                            Pending
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(report.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-4 font-bold">Approve</button>
                                        <button className="text-red-600 hover:text-red-900 font-bold">Reject</button>
                                    </td>
                                </tr>
                            )}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
