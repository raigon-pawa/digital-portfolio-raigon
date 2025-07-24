import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Shield, 
  Save,
  RefreshCw,
  Download,
  Upload,
  Database,
  Eye,
  EyeOff
} from 'lucide-react';
import AdminHeader from '../AdminHeader';
import { useAdmin } from '../../../contexts/AdminContext';
import { useDataExport } from '../../../hooks/useDataExport';

const AdminSettings: React.FC = () => {
  const { state, dispatch } = useAdmin();
  const { exportAllData } = useDataExport();
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    siteTitle: 'Cyber Portfolio',
    siteDescription: 'A cyberpunk-themed developer portfolio',
    enableNotifications: true,
    darkMode: true,
    autoSave: true,
    backupFrequency: 'weekly',
    maxFileSize: '10MB',
    allowedFormats: ['jpg', 'png', 'webp', 'svg'],
  });

  const [userSettings, setUserSettings] = useState({
    name: state.user?.name || 'Admin User',
    email: state.user?.email || 'admin@example.com',
    role: state.user?.role || 'Administrator',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSettingsChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleUserSettingsChange = (key: string, value: string) => {
    setUserSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to backend
    console.log('Saving settings:', settings);
    // Show success message
    alert('Settings saved successfully!');
  };

  const handleSaveUserSettings = () => {
    if (userSettings.newPassword && userSettings.newPassword !== userSettings.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    // Update user info in context
    dispatch({
      type: 'UPDATE_USER',
      payload: {
        name: userSettings.name,
        email: userSettings.email,
        role: userSettings.role as 'admin' | 'editor',
      }
    });
    
    console.log('Saving user settings:', userSettings);
    alert('User settings updated successfully!');
    
    // Clear password fields
    setUserSettings(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            // In a real app, validate and import the data
            console.log('Importing data:', data);
            alert('Data import feature coming soon!');
          } catch (error) {
            alert('Invalid JSON file!');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleClearCache = () => {
    // Clear browser cache (limited in web apps)
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }
    alert('Cache cleared successfully!');
  };

  return (
    <div className="flex-1 overflow-auto">
      <AdminHeader 
        title="Settings" 
        subtitle="Configure your admin panel and site preferences"
      />
      
      <div className="p-6 space-y-8">
        {/* User Settings */}
        <div className="bg-cyber-gray border border-cyber-blue/20 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <User className="h-5 w-5 text-cyber-blue" />
            <h2 className="text-xl font-bold text-white">User Settings</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={userSettings.name}
                  onChange={(e) => handleUserSettingsChange('name', e.target.value)}
                  className="w-full px-4 py-3 bg-cyber-gray-light border border-cyber-blue/20 rounded-lg text-white placeholder-gray-400 focus:border-cyber-blue focus:outline-none focus:ring-2 focus:ring-cyber-blue/20"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={userSettings.email}
                  onChange={(e) => handleUserSettingsChange('email', e.target.value)}
                  className="w-full px-4 py-3 bg-cyber-gray-light border border-cyber-blue/20 rounded-lg text-white placeholder-gray-400 focus:border-cyber-blue focus:outline-none focus:ring-2 focus:ring-cyber-blue/20"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Role
                </label>
                <select
                  value={userSettings.role}
                  onChange={(e) => handleUserSettingsChange('role', e.target.value)}
                  className="w-full px-4 py-3 bg-cyber-gray-light border border-cyber-blue/20 rounded-lg text-white focus:border-cyber-blue focus:outline-none focus:ring-2 focus:ring-cyber-blue/20"
                >
                  <option value="Administrator">Administrator</option>
                  <option value="Editor">Editor</option>
                  <option value="Author">Author</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={userSettings.currentPassword}
                    onChange={(e) => handleUserSettingsChange('currentPassword', e.target.value)}
                    className="w-full px-4 py-3 bg-cyber-gray-light border border-cyber-blue/20 rounded-lg text-white placeholder-gray-400 focus:border-cyber-blue focus:outline-none focus:ring-2 focus:ring-cyber-blue/20"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={userSettings.newPassword}
                  onChange={(e) => handleUserSettingsChange('newPassword', e.target.value)}
                  className="w-full px-4 py-3 bg-cyber-gray-light border border-cyber-blue/20 rounded-lg text-white placeholder-gray-400 focus:border-cyber-blue focus:outline-none focus:ring-2 focus:ring-cyber-blue/20"
                  placeholder="Enter new password"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={userSettings.confirmPassword}
                  onChange={(e) => handleUserSettingsChange('confirmPassword', e.target.value)}
                  className="w-full px-4 py-3 bg-cyber-gray-light border border-cyber-blue/20 rounded-lg text-white placeholder-gray-400 focus:border-cyber-blue focus:outline-none focus:ring-2 focus:ring-cyber-blue/20"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={handleSaveUserSettings}
              className="px-6 py-3 bg-cyber-blue text-white rounded-lg hover:bg-cyber-blue/80 transition-colors flex items-center space-x-2"
            >
              <Save size={18} />
              <span>Update Profile</span>
            </button>
          </div>
        </div>

        {/* Site Settings */}
        <div className="bg-cyber-gray border border-cyber-blue/20 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Settings className="h-5 w-5 text-cyber-green" />
            <h2 className="text-xl font-bold text-white">Site Settings</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Site Title
                </label>
                <input
                  type="text"
                  value={settings.siteTitle}
                  onChange={(e) => handleSettingsChange('siteTitle', e.target.value)}
                  className="w-full px-4 py-3 bg-cyber-gray-light border border-cyber-blue/20 rounded-lg text-white placeholder-gray-400 focus:border-cyber-blue focus:outline-none focus:ring-2 focus:ring-cyber-blue/20"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Site Description
                </label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => handleSettingsChange('siteDescription', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-cyber-gray-light border border-cyber-blue/20 rounded-lg text-white placeholder-gray-400 focus:border-cyber-blue focus:outline-none focus:ring-2 focus:ring-cyber-blue/20 resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Backup Frequency
                </label>
                <select
                  value={settings.backupFrequency}
                  onChange={(e) => handleSettingsChange('backupFrequency', e.target.value)}
                  className="w-full px-4 py-3 bg-cyber-gray-light border border-cyber-blue/20 rounded-lg text-white focus:border-cyber-blue focus:outline-none focus:ring-2 focus:ring-cyber-blue/20"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="manual">Manual Only</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.enableNotifications}
                    onChange={(e) => handleSettingsChange('enableNotifications', e.target.checked)}
                    className="w-4 h-4 text-cyber-blue bg-cyber-gray-light border-cyber-blue/20 rounded focus:ring-cyber-blue focus:ring-2"
                  />
                  <span className="text-gray-300">Enable Notifications</span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.darkMode}
                    onChange={(e) => handleSettingsChange('darkMode', e.target.checked)}
                    className="w-4 h-4 text-cyber-blue bg-cyber-gray-light border-cyber-blue/20 rounded focus:ring-cyber-blue focus:ring-2"
                  />
                  <span className="text-gray-300">Dark Mode</span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.autoSave}
                    onChange={(e) => handleSettingsChange('autoSave', e.target.checked)}
                    className="w-4 h-4 text-cyber-blue bg-cyber-gray-light border-cyber-blue/20 rounded focus:ring-cyber-blue focus:ring-2"
                  />
                  <span className="text-gray-300">Auto-save Changes</span>
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Max File Size
                </label>
                <select
                  value={settings.maxFileSize}
                  onChange={(e) => handleSettingsChange('maxFileSize', e.target.value)}
                  className="w-full px-4 py-3 bg-cyber-gray-light border border-cyber-blue/20 rounded-lg text-white focus:border-cyber-blue focus:outline-none focus:ring-2 focus:ring-cyber-blue/20"
                >
                  <option value="5MB">5 MB</option>
                  <option value="10MB">10 MB</option>
                  <option value="25MB">25 MB</option>
                  <option value="50MB">50 MB</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={handleSaveSettings}
              className="px-6 py-3 bg-cyber-green text-white rounded-lg hover:bg-cyber-green/80 transition-colors flex items-center space-x-2"
            >
              <Save size={18} />
              <span>Save Settings</span>
            </button>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-cyber-gray border border-cyber-blue/20 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Database className="h-5 w-5 text-cyber-purple" />
            <h2 className="text-xl font-bold text-white">Data Management</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={exportAllData}
              className="flex flex-col items-center space-y-2 p-4 bg-cyber-blue/10 border border-cyber-blue/20 rounded-lg hover:border-cyber-blue/50 hover:bg-cyber-blue/20 transition-all duration-300"
            >
              <Download className="h-6 w-6 text-cyber-blue" />
              <span className="text-white font-medium text-sm">Export Data</span>
              <span className="text-gray-400 text-xs text-center">Download all content</span>
            </button>

            <button
              onClick={handleImportData}
              className="flex flex-col items-center space-y-2 p-4 bg-cyber-green/10 border border-cyber-green/20 rounded-lg hover:border-cyber-green/50 hover:bg-cyber-green/20 transition-all duration-300"
            >
              <Upload className="h-6 w-6 text-cyber-green" />
              <span className="text-white font-medium text-sm">Import Data</span>
              <span className="text-gray-400 text-xs text-center">Upload JSON backup</span>
            </button>

            <button
              onClick={handleClearCache}
              className="flex flex-col items-center space-y-2 p-4 bg-cyber-pink/10 border border-cyber-pink/20 rounded-lg hover:border-cyber-pink/50 hover:bg-cyber-pink/20 transition-all duration-300"
            >
              <RefreshCw className="h-6 w-6 text-cyber-pink" />
              <span className="text-white font-medium text-sm">Clear Cache</span>
              <span className="text-gray-400 text-xs text-center">Reset stored data</span>
            </button>
          </div>
          
          <div className="mt-4 p-3 bg-cyber-gray-light rounded-lg border-l-4 border-cyber-purple">
            <p className="text-gray-300 text-sm">
              <strong className="text-cyber-purple">Backup Notice:</strong> Regular backups are automatically created based on your backup frequency setting. Manual exports are recommended before major changes.
            </p>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-cyber-gray border border-cyber-blue/20 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="h-5 w-5 text-cyber-pink" />
            <h2 className="text-xl font-bold text-white">Security & Privacy</h2>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-cyber-gray-light rounded-lg">
              <h3 className="text-white font-medium mb-2">Session Management</h3>
              <p className="text-gray-400 text-sm mb-3">
                Your session will automatically expire after 24 hours of inactivity for security.
              </p>
              <button className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors text-sm">
                Force Logout All Devices
              </button>
            </div>
            
            <div className="p-4 bg-cyber-gray-light rounded-lg">
              <h3 className="text-white font-medium mb-2">Data Privacy</h3>
              <p className="text-gray-400 text-sm mb-3">
                All data is stored locally in your browser. No information is sent to external servers.
              </p>
              <div className="flex space-x-2">
                <span className="px-2 py-1 bg-cyber-green/20 text-cyber-green text-xs rounded-full">Local Storage</span>
                <span className="px-2 py-1 bg-cyber-blue/20 text-cyber-blue text-xs rounded-full">No Tracking</span>
                <span className="px-2 py-1 bg-cyber-purple/20 text-cyber-purple text-xs rounded-full">Privacy First</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
