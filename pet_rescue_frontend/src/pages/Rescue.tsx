import React, { useEffect, useState } from 'react';
import { reportService } from '../services/api';
import PetCard from '../components/PetCard';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';

const Rescue: React.FC = () => {
    const [reports, setReports] = useState<any[]>([]);
    const [filteredReports, setFilteredReports] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRescueReports();
    }, []);

    const fetchRescueReports = async () => {
        try {
            const response = await reportService.getAll();
            // Assuming response contains Reports and they are already filtered by 'Accepted' status on backend
            // But we can double check here
            const acceptedReports = response.data?.Reports?.filter((report: any) => report.status === 'Accepted') || [];

            // Format reports to match PetCard props
            const formattedReports = acceptedReports.map((report: any) => ({
                id: report.id,
                name: report.pet_detail?.name || 'Unknown',
                pet_type: report.pet_detail?.pet_type || 'Unknown',
                breed: report.pet_detail?.breed || 'Unknown',
                location: report.location,
                image: report.pet_detail?.image || null,
                status: report.pet_detail?.status || 'Reported',
            }));

            setReports(formattedReports);
            setFilteredReports(formattedReports);
        } catch (error) {
            console.error('Error fetching rescue reports:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (query: string) => {
        const filtered = reports.filter((report) =>
            report.name.toLowerCase().includes(query.toLowerCase()) ||
            report.breed.toLowerCase().includes(query.toLowerCase()) ||
            report.location.toLowerCase().includes(query.toLowerCase()) ||
            report.pet_type.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredReports(filtered);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                            Rescue <span className="text-blue-600">Lost/Found Pets</span>
                        </h1>
                        <p className="mt-4 text-xl text-gray-500 max-w-2xl">
                            Help reunite lost pets with their families or report a pet you found.
                        </p>
                    </div>
                    <Link
                        to="/report"
                        className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 flex items-center"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Create Report
                    </Link>
                </div>

                <div className="mb-12 max-w-2xl mx-auto md:mx-0">
                    <SearchBar onSearch={handleSearch} />
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : filteredReports.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredReports.map((report) => (
                            <PetCard key={report.id} pet={report} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                        <p className="text-xl text-gray-400">No verified reports found at this time.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Rescue;
