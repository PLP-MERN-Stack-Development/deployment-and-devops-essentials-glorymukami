import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Dashboard from '../pages/Dashboard';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
};

export default Layout;