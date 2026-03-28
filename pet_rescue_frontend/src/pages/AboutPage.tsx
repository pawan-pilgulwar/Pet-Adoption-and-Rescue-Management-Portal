import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            About <span className="text-orange-400">PawPal</span>
          </h1>
          <p className="text-slate-300 max-w-lg mx-auto">
            We're on a mission to connect every pet with a loving home.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-cream">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-orange-50">
            <h2 className="text-2xl font-black text-slate-800 mb-4">
              Our <span className="text-orange-500">Mission</span>
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              PawPal is a Pet Adoption and Rescue Management Platform built to bridge the gap 
              between pets in need and loving families. Whether an animal is looking for a new 
              home or has been lost, our platform makes it easy to connect, report, and reunite.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We believe that every pet deserves a second chance at happiness. Through our Smart 
              Matching System, we automatically connect lost pet reports with found pet reports, 
              making reunions faster and more efficient.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="section-padding bg-orange-50/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 text-center mb-10">
            What We <span className="text-orange-500">Offer</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-50 card-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  🏠
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Pet Adoption</h3>
                  <p className="text-sm text-slate-500">
                    Browse through pets that have been registered for adoption by verified administrators. 
                    Find dogs, cats, and more — all looking for their forever home.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-50 card-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  📢
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Rescue Reports</h3>
                  <p className="text-sm text-slate-500">
                    Lost your pet? Found someone's pet? File a report and our system will help 
                    match it with other reports in the community.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-50 card-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  🤝
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Smart Matching</h3>
                  <p className="text-sm text-slate-500">
                    Our automated system compares lost and found reports based on pet type, breed, 
                    color, and location to find potential matches instantly.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-50 card-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  🔔
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Real-time Notifications</h3>
                  <p className="text-sm text-slate-500">
                    Stay informed with notifications about new pets, report status updates, 
                    and potential matches for your lost or found pet reports.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-cream">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-black text-slate-800 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-slate-500 mb-6">
            Join PawPal today and help make a difference in the lives of animals.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/adoption"
              className="px-6 py-3 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all shadow-md text-sm"
            >
              Browse Pets
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 bg-slate-800 text-white font-bold rounded-full hover:bg-slate-700 transition-all text-sm"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
