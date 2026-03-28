import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Load notifications when dropdown opens
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const res = await api.get('/notifications/get-user-notifications/');
        setNotifications(res.data.data.Notifications || []);
      } catch (error) {
        console.error('Could not load notifications', error);
      }
    };

    if (dropdownOpen) {
      loadNotifications();
    }
  }, [dropdownOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [dropdownOpen]);

  const unreadCount = notifications.filter((item) => !item.is_read).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-lg text-sm font-bold transition-colors duration-200 ${
      isActive
        ? 'text-orange-600 bg-orange-50'
        : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50'
    }`;

  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            <span className="text-xl font-black tracking-tight text-slate-800">
              Paw<span className="text-orange-500">Pal</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={navLinkClass}>Home</NavLink>
            <NavLink to="/adoption" className={navLinkClass}>Adoption</NavLink>
            <NavLink to="/rescue" className={navLinkClass}>Rescue</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            {user && user.role === 'Admin' && (
              <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>
            )}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-3">
            {/* Notification bell */}
            {user && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="relative p-2 rounded-full hover:bg-orange-50 transition-colors"
                  id="notification-bell"
                >
                  <span className="text-xl">🔔</span>
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 z-50 bg-white rounded-2xl shadow-xl border border-orange-100 animate-fade-in">
                    <div className="p-4 border-b border-orange-50 font-bold text-slate-800 flex items-center gap-2">
                      <span>🔔</span> Notifications
                    </div>
                    <div className="max-h-64 overflow-y-auto p-2 space-y-1">
                      {notifications.length === 0 ? (
                        <div className="text-sm text-slate-400 text-center py-6">No notifications yet.</div>
                      ) : (
                        notifications.map((item) => (
                          <div
                            key={item.id}
                            className={`p-3 rounded-xl transition-colors ${
                              item.is_read ? 'bg-white' : 'bg-orange-50'
                            }`}
                          >
                            <p className="text-sm font-bold text-slate-800">{item.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{item.message}</p>
                            <p className="text-[10px] text-slate-400 mt-1">
                              {new Date(item.created_at).toLocaleString()}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="p-3 border-t border-orange-50 text-center">
                      <button
                        onClick={() => setDropdownOpen(false)}
                        className="text-sm text-orange-600 font-bold hover:underline"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Auth buttons */}
            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className="text-sm font-bold text-slate-700 hover:text-orange-600 px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors"
                >
                  {user.first_name || user.username}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-bold px-4 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <NavLink
                  to="/login"
                  className="text-sm font-bold text-slate-700 hover:text-orange-600 px-4 py-2 rounded-lg transition-colors"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="text-sm font-bold px-5 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20"
                >
                  Sign Up
                </NavLink>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-orange-50"
            >
              <span className="text-xl">{mobileMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-orange-50 mt-2 pt-3 space-y-1 animate-fade-in">
            <NavLink to="/" end className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
            <NavLink to="/adoption" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>Adoption</NavLink>
            <NavLink to="/rescue" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>Rescue</NavLink>
            <NavLink to="/about" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>About</NavLink>
            {user && user.role === 'Admin' && (
              <NavLink to="/admin" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>Admin Panel</NavLink>
            )}
            <div className="pt-2 border-t border-orange-50 mt-2">
              {user ? (
                <div className="space-y-1">
                  <Link to="/dashboard" className="block px-3 py-2 text-sm font-bold text-slate-700 hover:bg-orange-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <NavLink to="/login" className="block px-3 py-2 text-sm font-bold text-slate-700 hover:bg-orange-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Login</NavLink>
                  <NavLink to="/register" className="block px-3 py-2 text-sm font-bold text-orange-600 hover:bg-orange-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Sign Up</NavLink>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
