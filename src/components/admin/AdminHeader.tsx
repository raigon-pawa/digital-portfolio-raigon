import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle }) => {
  const { state } = useAdmin();

  return (
    <header className="bg-cyber-dark border-b border-cyber-blue/20 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-cyber-gray border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none text-sm w-64"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 bg-cyber-gray border border-cyber-blue/30 rounded-lg hover:border-cyber-pink/50 transition-colors">
            <Bell className="h-5 w-5 text-gray-400" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-cyber-pink rounded-full"></span>
          </button>

          {/* User Avatar */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-cyber rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="text-sm">
              <p className="text-white font-medium">{state.user?.name}</p>
              <p className="text-gray-400 text-xs">{state.user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
