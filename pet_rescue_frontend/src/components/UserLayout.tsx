import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const UserLayout: React.FC = () => (
  <div className="min-h-screen bg-cream flex flex-col font-nunito">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default UserLayout;
