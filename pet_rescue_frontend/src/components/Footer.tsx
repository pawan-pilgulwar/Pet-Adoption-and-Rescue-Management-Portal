import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white mt-auto">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🐾</span>
              <span className="text-xl font-black">
                Paw<span className="text-orange-400">Pal</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Connecting loving families with pets in need. Whether you want to adopt a furry friend
              or help reunite lost pets with their owners, PawPal is here to help.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-orange-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/adoption" className="text-slate-400 hover:text-orange-400 transition-colors text-sm">
                  Adopt a Pet
                </Link>
              </li>
              <li>
                <Link to="/rescue" className="text-slate-400 hover:text-orange-400 transition-colors text-sm">
                  Lost & Found
                </Link>
              </li>
              <li>
                <Link to="/create-report" className="text-slate-400 hover:text-orange-400 transition-colors text-sm">
                  File a Report
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-orange-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-orange-400">Get in Touch</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span>📧</span> support@pawpal.com
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span> +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span> 123 Pet Street, Animal City
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} PawPal. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Made with ❤️ for pets everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
