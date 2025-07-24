import React, { useState, useEffect } from 'react';
import { Menu, X, Home, User, Briefcase, BookOpen, Mail } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: User, label: 'About', href: '#about' },
    { icon: Briefcase, label: 'Projects', href: '#projects' },
    { icon: BookOpen, label: 'Blog', href: '#blog' },
    { icon: Mail, label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-cyber-dark/80' : 'bg-cyber-dark/60'
      } border border-cyber-blue/30 rounded-full px-6 py-3 shadow-lg`}>
        <div className="flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="group hidden md:flex items-center space-x-2 text-cyber-blue hover:text-cyber-pink transition-all duration-300 hover:animate-glow"
            >
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 md:hidden bg-cyber-dark/80 border border-cyber-blue/30 rounded-full p-3 backdrop-blur-md"
      >
        {isOpen ? (
          <X className="text-cyber-pink animate-glow\" size={24} />
        ) : (
          <Menu className="text-cyber-blue" size={24} />
        )}
      </button>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-cyber-dark/95 backdrop-blur-md" />
          <div className="relative flex flex-col items-center justify-center h-full space-y-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="group flex items-center space-x-4 text-cyber-blue hover:text-cyber-pink transition-all duration-300 text-xl"
              >
                <item.icon size={24} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;