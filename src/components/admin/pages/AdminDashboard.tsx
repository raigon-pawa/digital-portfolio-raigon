import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FolderOpen, 
  FileText, 
  Eye, 
  TrendingUp,
  Calendar,
  Activity,
  Download,
  Database
} from 'lucide-react';
import AdminHeader from '../AdminHeader';
import { useAdmin } from '../../../contexts/AdminContext';
import { useDataExport } from '../../../hooks/useDataExport';

const AdminDashboard: React.FC = () => {
  const { state } = useAdmin();
  const navigate = useNavigate();
  const { exportProjects, exportBlogPosts, exportAllData, generatePostgreSQLSchema, generateMigrationSQL } = useDataExport();

  const stats = [
    {
      title: 'Total Projects',
      value: state.projects.length,
      icon: FolderOpen,
      color: 'cyber-blue',
      change: '+12%'
    },
    {
      title: 'Blog Posts',
      value: state.blogPosts.length,
      icon: FileText,
      color: 'cyber-green',
      change: '+8%'
    },
    {
      title: 'Page Views',
      value: '24.5K',
      icon: Eye,
      color: 'cyber-purple',
      change: '+23%'
    },
    {
      title: 'Engagement',
      value: '89%',
      icon: TrendingUp,
      color: 'cyber-pink',
      change: '+5%'
    }
  ];

  const recentActivity = [
    { action: 'Project updated', item: 'Neural Network Visualizer', time: '2 hours ago' },
    { action: 'Blog post published', item: 'Building Cyberpunk UIs with Modern CSS', time: '5 hours ago' },
    { action: 'Contact info updated', item: 'Email and social links', time: '1 day ago' },
    { action: 'New project added', item: 'Cyber Terminal Chat', time: '2 days ago' },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <AdminHeader 
        title="Dashboard" 
        subtitle="Welcome back! Here's what's happening with your portfolio"
      />
      
      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className={`bg-cyber-gray border border-${stat.color}/20 rounded-xl p-6 hover:border-${stat.color}/50 transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-${stat.color}/10 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                </div>
                <span className={`text-${stat.color} text-sm font-medium`}>{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.title}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-cyber-gray border border-cyber-blue/20 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Activity className="h-5 w-5 text-cyber-blue" />
              <h2 className="text-xl font-bold text-white">Recent Activity</h2>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 hover:bg-cyber-gray-light rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-cyber-blue rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-white text-sm">
                      <span className="font-medium">{activity.action}:</span> {activity.item}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-cyber-gray border border-cyber-blue/20 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Calendar className="h-5 w-5 text-cyber-purple" />
              <h2 className="text-xl font-bold text-white">Quick Actions</h2>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/admin/projects')}
                className="w-full flex items-center space-x-3 p-3 bg-cyber-blue/10 border border-cyber-blue/20 rounded-lg hover:border-cyber-blue/50 transition-colors text-left"
              >
                <FolderOpen className="h-5 w-5 text-cyber-blue" />
                <div>
                  <p className="text-white font-medium">Add New Project</p>
                  <p className="text-gray-400 text-sm">Create a new portfolio project</p>
                </div>
              </button>
              
              <button 
                onClick={() => navigate('/admin/blog')}
                className="w-full flex items-center space-x-3 p-3 bg-cyber-green/10 border border-cyber-green/20 rounded-lg hover:border-cyber-green/50 transition-colors text-left"
              >
                <FileText className="h-5 w-5 text-cyber-green" />
                <div>
                  <p className="text-white font-medium">Write Blog Post</p>
                  <p className="text-gray-400 text-sm">Create a new blog article</p>
                </div>
              </button>
              
              <button 
                onClick={() => navigate('/')}
                className="w-full flex items-center space-x-3 p-3 bg-cyber-pink/10 border border-cyber-pink/20 rounded-lg hover:border-cyber-pink/50 transition-colors text-left"
              >
                <Eye className="h-5 w-5 text-cyber-pink" />
                <div>
                  <p className="text-white font-medium">Preview Site</p>
                  <p className="text-gray-400 text-sm">View your live portfolio</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Data Export Section */}
        <div className="mt-8 bg-cyber-gray border border-cyber-blue/20 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Database className="h-5 w-5 text-cyber-pink" />
            <h2 className="text-xl font-bold text-white">Data Export & Migration</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={exportProjects}
              className="flex flex-col items-center space-y-2 p-4 bg-cyber-blue/10 border border-cyber-blue/20 rounded-lg hover:border-cyber-blue/50 hover:bg-cyber-blue/20 transition-all duration-300"
            >
              <Download className="h-6 w-6 text-cyber-blue" />
              <span className="text-white font-medium text-sm">Export Projects</span>
              <span className="text-gray-400 text-xs text-center">Download projects as JSON</span>
            </button>

            <button
              onClick={exportBlogPosts}
              className="flex flex-col items-center space-y-2 p-4 bg-cyber-green/10 border border-cyber-green/20 rounded-lg hover:border-cyber-green/50 hover:bg-cyber-green/20 transition-all duration-300"
            >
              <Download className="h-6 w-6 text-cyber-green" />
              <span className="text-white font-medium text-sm">Export Blog Posts</span>
              <span className="text-gray-400 text-xs text-center">Download blog posts as JSON</span>
            </button>

            <button
              onClick={exportAllData}
              className="flex flex-col items-center space-y-2 p-4 bg-cyber-purple/10 border border-cyber-purple/20 rounded-lg hover:border-cyber-purple/50 hover:bg-cyber-purple/20 transition-all duration-300"
            >
              <Download className="h-6 w-6 text-cyber-purple" />
              <span className="text-white font-medium text-sm">Export All Data</span>
              <span className="text-gray-400 text-xs text-center">Complete portfolio backup</span>
            </button>

            <button
              onClick={generatePostgreSQLSchema}
              className="flex flex-col items-center space-y-2 p-4 bg-cyber-pink/10 border border-cyber-pink/20 rounded-lg hover:border-cyber-pink/50 hover:bg-cyber-pink/20 transition-all duration-300"
            >
              <Database className="h-6 w-6 text-cyber-pink" />
              <span className="text-white font-medium text-sm">PostgreSQL Schema</span>
              <span className="text-gray-400 text-xs text-center">Generate database schema</span>
            </button>
          </div>

          <div className="mt-4">
            <button
              onClick={generateMigrationSQL}
              className="w-full flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-cyber-pink/10 to-cyber-purple/10 border border-cyber-pink/20 rounded-lg hover:border-cyber-pink/50 hover:from-cyber-pink/20 hover:to-cyber-purple/20 transition-all duration-300"
            >
              <Database className="h-5 w-5 text-cyber-pink" />
              <span className="text-white font-medium">Generate Migration SQL</span>
              <span className="text-gray-400 text-sm">- Complete PostgreSQL migration with data</span>
            </button>
          </div>

          <div className="mt-4 p-3 bg-cyber-gray-light rounded-lg border-l-4 border-cyber-blue">
            <p className="text-gray-300 text-sm">
              <strong className="text-cyber-blue">Migration Ready:</strong> Use these exports to easily migrate your portfolio to PostgreSQL or any other database system. The schema and migration files are production-ready.
            </p>
          </div>
        </div>

        {/* Content Overview */}
        <div className="mt-8 bg-cyber-gray border border-cyber-blue/20 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Content Overview</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Latest Projects */}
            <div>
              <h3 className="text-lg font-semibold text-cyber-blue mb-4">Latest Projects</h3>
              <div className="space-y-3">
                {state.projects.slice(0, 3).map((project) => (
                  <div key={project.id} className="flex items-center space-x-3 p-3 bg-cyber-gray-light rounded-lg">
                    <img 
                      src={project.image || 'https://via.placeholder.com/40x40'} 
                      alt={project.title}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{project.title}</p>
                      <p className="text-gray-400 text-xs">{project.technologies.slice(0, 2).join(', ')}</p>
                    </div>
                    {project.featured && (
                      <span className="px-2 py-1 bg-cyber-pink/20 text-cyber-pink text-xs rounded-full">Featured</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Blog Posts */}
            <div>
              <h3 className="text-lg font-semibold text-cyber-green mb-4">Latest Blog Posts</h3>
              <div className="space-y-3">
                {state.blogPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="flex items-center space-x-3 p-3 bg-cyber-gray-light rounded-lg">
                    <div className="w-10 h-10 bg-cyber-green/20 rounded flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-cyber-green" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{post.title}</p>
                      <p className="text-gray-400 text-xs">{new Date(post.date).toLocaleDateString()}</p>
                    </div>
                    {post.published ? (
                      <span className="px-2 py-1 bg-cyber-green/20 text-cyber-green text-xs rounded-full">Published</span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">Draft</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
