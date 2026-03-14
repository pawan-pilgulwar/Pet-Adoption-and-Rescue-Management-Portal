import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white py-20 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Find and Rescue Your <span className="text-blue-600">Perfect Pet</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Helping lost pets find their way home and connecting loving families with their next best friend.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              to="/adoption" 
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1"
            >
              Pet Adoption
            </Link>
            <Link 
              to="/rescue" 
              className="px-8 py-4 bg-white hover:bg-gray-50 text-blue-600 font-bold border-2 border-blue-600 rounded-xl shadow-sm transition-all transform hover:-translate-y-1"
            >
              Lost & Found Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
