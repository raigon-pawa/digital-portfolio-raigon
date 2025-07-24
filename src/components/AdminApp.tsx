import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider, useAdmin } from '../contexts/AdminContext';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/pages/AdminDashboard';
import ProjectsManagement from './admin/pages/ProjectsManagement';
import BlogManagement from './admin/pages/BlogManagement';
import BlogEditor from './admin/pages/BlogEditor';
import AboutManagement from './admin/pages/AboutManagement';
import ContactManagement from './admin/pages/ContactManagement';
import AdminSettings from './admin/pages/AdminSettings';
import '../admin.css';

// Admin Routes Component
const AdminRoutes: React.FC = () => {
  const { state } = useAdmin();

  if (!state.isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="projects" element={<ProjectsManagement />} />
        <Route path="blog" element={<BlogManagement />} />
        <Route path="blog/new" element={<BlogEditor />} />
        <Route path="blog/edit/:id" element={<BlogEditor />} />
        <Route path="about" element={<AboutManagement />} />
        <Route path="contact" element={<ContactManagement />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
};

// Main Admin App
const AdminApp: React.FC = () => {
  // Ensure cursor is visible in admin area
  useEffect(() => {
    document.body.classList.add('admin-active');
    document.documentElement.classList.add('admin-active');
    
    return () => {
      document.body.classList.remove('admin-active');
      document.documentElement.classList.remove('admin-active');
    };
  }, []);

  return (
    <AdminProvider>
      <div className="admin-area min-h-screen bg-cyber-dark text-white font-cyber" style={{ cursor: 'auto' }}>
        <AdminRoutes />
      </div>
    </AdminProvider>
  );
};

export default AdminApp;
