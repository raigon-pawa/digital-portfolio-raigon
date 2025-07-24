import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  Calendar,
  Clock,
  Star
} from 'lucide-react';
import AdminHeader from '../AdminHeader';
import { useAdmin } from '../../../contexts/AdminContext';

const BlogManagement: React.FC = () => {
  const { state, dispatch } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft' | 'featured'>('all');

  const filteredPosts = state.blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter = filterStatus === 'all' ||
                         (filterStatus === 'published' && post.published) ||
                         (filterStatus === 'draft' && !post.published) ||
                         (filterStatus === 'featured' && post.featured);

    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      dispatch({ type: 'DELETE_BLOG_POST', payload: id });
    }
  };

  const togglePublished = (post: any) => {
    const updatedPost = { ...post, published: !post.published, updatedAt: new Date().toISOString() };
    dispatch({ type: 'UPDATE_BLOG_POST', payload: updatedPost });
  };

  const toggleFeatured = (post: any) => {
    const updatedPost = { ...post, featured: !post.featured, updatedAt: new Date().toISOString() };
    dispatch({ type: 'UPDATE_BLOG_POST', payload: updatedPost });
  };

  return (
    <div className="flex-1 overflow-auto">
      <AdminHeader 
        title="Blog Management" 
        subtitle={`Manage your ${state.blogPosts.length} blog posts`}
      />
      
      <div className="p-6">
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-cyber-gray border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none text-sm w-64"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="pl-10 pr-8 py-2 bg-cyber-gray border border-cyber-blue/30 rounded-lg text-white focus:border-cyber-pink focus:outline-none text-sm appearance-none"
              >
                <option value="all">All Posts</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
                <option value="featured">Featured</option>
              </select>
            </div>
          </div>

          {/* Add New Button */}
          <Link
            to="/admin/blog/new"
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-cyber text-white rounded-lg font-medium hover:scale-105 transition-transform duration-200"
          >
            <Plus size={18} />
            <span>New Blog Post</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-cyber-gray border border-cyber-blue/20 rounded-lg p-4">
            <h3 className="text-cyber-blue text-sm font-medium">Total Posts</h3>
            <p className="text-2xl font-bold text-white">{state.blogPosts.length}</p>
          </div>
          <div className="bg-cyber-gray border border-cyber-green/20 rounded-lg p-4">
            <h3 className="text-cyber-green text-sm font-medium">Published</h3>
            <p className="text-2xl font-bold text-white">
              {state.blogPosts.filter(p => p.published).length}
            </p>
          </div>
          <div className="bg-cyber-gray border border-yellow-500/20 rounded-lg p-4">
            <h3 className="text-yellow-400 text-sm font-medium">Drafts</h3>
            <p className="text-2xl font-bold text-white">
              {state.blogPosts.filter(p => !p.published).length}
            </p>
          </div>
          <div className="bg-cyber-gray border border-cyber-pink/20 rounded-lg p-4">
            <h3 className="text-cyber-pink text-sm font-medium">Featured</h3>
            <p className="text-2xl font-bold text-white">
              {state.blogPosts.filter(p => p.featured).length}
            </p>
          </div>
        </div>

        {/* Blog Posts List */}
        <div className="bg-cyber-gray border border-cyber-blue/20 rounded-xl overflow-hidden">
          {filteredPosts.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-400 mb-4">
                <Eye size={48} className="mx-auto mb-4 opacity-50" />
                <p>No blog posts found.</p>
                <p className="text-sm">Create your first blog post to get started!</p>
              </div>
              <Link
                to="/admin/blog/new"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-cyber text-white rounded-lg font-medium hover:scale-105 transition-transform duration-200"
              >
                <Plus size={18} />
                <span>Create First Post</span>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-cyber-dark border-b border-cyber-blue/20">
                  <tr>
                    <th className="text-left px-6 py-4 text-cyber-blue font-medium">Title</th>
                    <th className="text-left px-6 py-4 text-cyber-blue font-medium">Status</th>
                    <th className="text-left px-6 py-4 text-cyber-blue font-medium">Date</th>
                    <th className="text-left px-6 py-4 text-cyber-blue font-medium">Tags</th>
                    <th className="text-right px-6 py-4 text-cyber-blue font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="border-b border-cyber-blue/10 hover:bg-cyber-gray-light transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-start space-x-3">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-12 h-12 rounded object-cover flex-shrink-0"
                          />
                          <div className="flex-1">
                            <h3 className="text-white font-medium text-sm">{post.title}</h3>
                            <p className="text-gray-400 text-xs mt-1 line-clamp-2">{post.excerpt}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Clock className="h-3 w-3 text-gray-500" />
                              <span className="text-xs text-gray-500">{post.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span 
                              className={`px-2 py-1 text-xs rounded-full ${
                                post.published 
                                  ? 'bg-cyber-green/20 text-cyber-green' 
                                  : 'bg-yellow-500/20 text-yellow-400'
                              }`}
                            >
                              {post.published ? 'Published' : 'Draft'}
                            </span>
                            {post.featured && (
                              <span className="px-2 py-1 bg-cyber-pink/20 text-cyber-pink text-xs rounded-full flex items-center space-x-1">
                                <Star size={10} />
                                <span>Featured</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Updated: {new Date(post.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span 
                              key={tag}
                              className="px-2 py-1 bg-cyber-blue/10 text-cyber-blue text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-xs text-gray-400">+{post.tags.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => toggleFeatured(post)}
                            className={`p-2 rounded-lg transition-colors ${
                              post.featured 
                                ? 'bg-cyber-pink/20 text-cyber-pink' 
                                : 'bg-cyber-gray-light text-gray-400 hover:text-cyber-pink'
                            }`}
                            title="Toggle Featured"
                          >
                            <Star size={16} />
                          </button>
                          
                          <button
                            onClick={() => togglePublished(post)}
                            className={`p-2 rounded-lg transition-colors ${
                              post.published 
                                ? 'bg-cyber-green/20 text-cyber-green' 
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}
                            title="Toggle Published"
                          >
                            <Eye size={16} />
                          </button>

                          <Link
                            to={`/admin/blog/edit/${post.id}`}
                            className="p-2 bg-cyber-blue/20 text-cyber-blue rounded-lg hover:bg-cyber-blue/30 transition-colors"
                            title="Edit Post"
                          >
                            <Edit size={16} />
                          </Link>

                          <button
                            onClick={() => handleDelete(post.id)}
                            className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                            title="Delete Post"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogManagement;
