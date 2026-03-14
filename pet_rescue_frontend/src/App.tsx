import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ReportPet from './pages/ReportPet';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Adoption from './pages/Adoption';
import Rescue from './pages/Rescue';
import Profile from './pages/Profile';
import { authService } from './services/api';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = authService.getCurrentUser();
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};

// Admin Route Component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const user = authService.getCurrentUser();
  if (!user || (user.role !== 'Admin' && user.role !== 'SuperAdmin')) return <Navigate to="/" />;
  return <>{children}</>;
};

function App() {
  return (
    <div className="App min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/adoption"
            element={
              <ProtectedRoute>
                <Adoption />
              </ProtectedRoute>
            }
          />

          <Route
            path="/rescue"
            element={
              <ProtectedRoute>
                <Rescue />
              </ProtectedRoute>
            }
          />

          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <ReportPet />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </main>

      <footer className="bg-white border-t border-gray-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm font-medium">
            &copy; 2026 PetRescue Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
