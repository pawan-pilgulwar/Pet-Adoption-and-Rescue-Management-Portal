import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Pet } from '../types';
import PetCard from '../components/PetCard';

const Home: React.FC = () => {
  const { user } = useAuth();
  const [featuredPets, setFeaturedPets] = useState<Pet[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get('/pets/all-pets/');
        // Show first 3 pets as featured
        setFeaturedPets((res.data.data.Pets || []).slice(0, 3));
      } catch (err) {
        // User might not be logged in, that's okay
      }
    };
    if (user) {
      fetchFeatured();
    }
  }, [user]);

  return (
    <div>
      {/* ===== Hero Section ===== */}
      <section className="relative bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">🐾</div>
          <div className="absolute top-32 right-20 text-6xl">🐕</div>
          <div className="absolute bottom-20 left-1/3 text-7xl">🐈</div>
          <div className="absolute bottom-10 right-10 text-5xl">🐾</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Find Your Perfect
              <br />
              <span className="text-amber-200">Furry Companion</span>
            </h1>
            <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-lg">
              Adopt a loving pet or help reunite lost animals with their families.
              Every pet deserves a happy home.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/adoption"
                className="px-8 py-3.5 bg-white text-orange-600 font-bold rounded-full hover:bg-orange-50 transition-all shadow-lg shadow-black/10 text-sm"
              >
                🐾 Adopt a Pet
              </Link>
              <Link
                to={user ? '/create-report' : '/login'}
                className="px-8 py-3.5 bg-white/20 text-white font-bold rounded-full hover:bg-white/30 transition-all border border-white/30 text-sm"
              >
                📢 Report a Pet
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 30C1440 30 1200 0 720 0C240 0 0 30 0 30L0 60Z" fill="#FFFBF5" />
          </svg>
        </div>
      </section>

      {/* ===== Features Section ===== */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-3">
              How We <span className="text-orange-500">Help</span>
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Our platform connects pet lovers with animals in need through these key features.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-50 text-center card-hover">
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                🏠
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Pet Adoption</h3>
              <p className="text-sm text-slate-500">
                Browse available pets and find your perfect companion to bring home.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-50 text-center card-hover">
              <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                🔍
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Lost & Found</h3>
              <p className="text-sm text-slate-500">
                Report lost or found pets and help reunite them with their families.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-50 text-center card-hover">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                🤝
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Smart Matching</h3>
              <p className="text-sm text-slate-500">
                Our system automatically matches lost pets with found reports.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-50 text-center card-hover">
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                🔔
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Notifications</h3>
              <p className="text-sm text-slate-500">
                Get notified about new pets, report updates, and potential matches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Featured Pets Section ===== */}
      {user && featuredPets.length > 0 && (
        <section className="section-padding bg-orange-50/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black text-slate-800">
                  Featured <span className="text-orange-500">Pets</span>
                </h2>
                <p className="text-slate-500 mt-1">Meet some of the amazing pets looking for a home</p>
              </div>
              <Link
                to="/adoption"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>

            <div className="sm:hidden text-center mt-6">
              <Link
                to="/adoption"
                className="text-sm font-bold text-orange-600 hover:text-orange-700"
              >
                View All Pets →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== How It Works ===== */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-3">
              How It <span className="text-orange-500">Works</span>
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Getting started is easy — just follow these three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black shadow-lg shadow-orange-500/30">
                1
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Create an Account</h3>
              <p className="text-sm text-slate-500">
                Sign up for free and join our community of pet lovers.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black shadow-lg shadow-amber-500/30">
                2
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Browse or Report</h3>
              <p className="text-sm text-slate-500">
                Browse available pets for adoption or report a lost/found pet.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black shadow-lg shadow-teal-500/30">
                3
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Connect & Adopt</h3>
              <p className="text-sm text-slate-500">
                Get matched with the perfect pet or reunite lost pets with owners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      {!user && (
        <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white section-padding">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Ready to Make a <span className="text-orange-400">Difference</span>?
            </h2>
            <p className="text-slate-300 mb-8 max-w-lg mx-auto">
              Join thousands of pet lovers who are helping animals find their forever homes.
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-3.5 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30 text-sm"
            >
              Get Started — It's Free
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
