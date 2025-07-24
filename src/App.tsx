import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MatrixRain from './components/MatrixRain';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Blog from './components/Blog';
import About from './components/About';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import AdminApp from './components/AdminApp';
import BlogPost from './components/BlogPost';
import BlogListing from './components/BlogListing';
import { AdminProvider } from './contexts/AdminContext';

// Public Portfolio Site
const PublicSite: React.FC = () => {
  return (
    <div className="min-h-screen bg-cyber-dark text-white font-cyber overflow-x-hidden">
      {/* Background Effects */}
      <MatrixRain />
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Blog />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 border-t border-cyber-blue/20 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-cyber-blue mb-4">
            <span className="text-2xl">サイバー</span>
            <span className="text-lg">•</span>
            <span className="text-sm">Digital Portfolio 2024</span>
          </div>
          <p className="text-gray-400 text-sm">
            Crafted with passion in the digital realm • All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <AdminProvider>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminApp />} />
          
          {/* Blog Routes */}
          <Route path="/blog" element={<BlogListing />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          
          {/* Public Site */}
          <Route path="/*" element={<PublicSite />} />
        </Routes>
      </Router>
    </AdminProvider>
  );
}

export default App;