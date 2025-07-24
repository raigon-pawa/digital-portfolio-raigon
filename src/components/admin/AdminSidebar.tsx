import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderOpen, 
  FileText, 
  User, 
  Mail, 
  LogOut,
  Settings
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

const AdminSidebar: React.FC = () => {
  const { state, dispatch } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/admin');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: FolderOpen, label: 'Projects', path: '/admin/projects' },
    { icon: FileText, label: 'Blog', path: '/admin/blog' },
    { icon: User, label: 'About', path: '/admin/about' },
    { icon: Mail, label: 'Contact', path: '/admin/contact' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="w-64 bg-cyber-gray border-r border-cyber-blue/20 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-cyber-blue/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-cyber rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">サ</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">Cyber Admin</h1>
            <p className="text-gray-400 text-sm">Content Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
                  : 'text-gray-300 hover:text-white hover:bg-cyber-gray-light'
              }`
            }
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-cyber-blue/20">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-cyber-purple/20 rounded-full flex items-center justify-center">
            <User size={16} className="text-cyber-purple" />
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-medium">{state.user?.name}</p>
            <p className="text-gray-400 text-xs">{state.user?.role}</p>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
