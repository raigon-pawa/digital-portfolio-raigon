import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, Filter } from 'lucide-react';
import { useBlogPosts } from '../hooks/useData';
import MatrixRain from './MatrixRain';
import CustomCursor from './CustomCursor';
import Navigation from './Navigation';

const BlogListing: React.FC = () => {
  const { blogPosts, loading, error } = useBlogPosts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Get published blog posts
  const publishedPosts = blogPosts.filter(post => post.published);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = publishedPosts.flatMap(post => post.tags);
    return Array.from(new Set(tags)).sort();
  }, [publishedPosts]);

  // Filter posts based on search term and selected tag
  const filteredPosts = useMemo(() => {
    return publishedPosts.filter(post => {
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesTag = selectedTag === '' || post.tags.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  }, [publishedPosts, searchTerm, selectedTag]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-dark text-white font-cyber overflow-x-hidden">
        <MatrixRain />
        <CustomCursor />
        <Navigation />
        <main className="relative z-10 pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <div className="animate-pulse text-cyber-purple text-xl">Loading blog posts...</div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cyber-dark text-white font-cyber overflow-x-hidden">
        <MatrixRain />
        <CustomCursor />
        <Navigation />
        <main className="relative z-10 pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <div className="text-red-400 text-xl">Error loading blog posts: {error}</div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-dark text-white font-cyber overflow-x-hidden">
      {/* Background Effects */}
      <MatrixRain />
      <CustomCursor />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Blog Listing Content */}
      <main className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              All <span className="text-cyber-purple">Blog Posts</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Explore all articles on technology, design, and digital innovation.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12 space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-cyber-gray border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none focus:ring-2 focus:ring-cyber-pink/20"
              />
            </div>

            {/* Tag Filter */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center space-x-2 text-gray-400">
                <Filter size={16} />
                <span className="text-sm">Filter by tag:</span>
              </div>
              <button
                onClick={() => setSelectedTag('')}
                className={`px-3 py-1 text-sm rounded-full border transition-colors duration-300 ${
                  selectedTag === ''
                    ? 'bg-cyber-purple text-white border-cyber-purple'
                    : 'bg-cyber-gray text-gray-400 border-cyber-blue/30 hover:border-cyber-purple/50'
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors duration-300 ${
                    selectedTag === tag
                      ? 'bg-cyber-purple text-white border-cyber-purple'
                      : 'bg-cyber-gray text-gray-400 border-cyber-blue/30 hover:border-cyber-purple/50'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-8 text-center text-gray-400">
            {filteredPosts.length === publishedPosts.length ? (
              <p>Showing all {publishedPosts.length} articles</p>
            ) : (
              <p>
                Showing {filteredPosts.length} of {publishedPosts.length} articles
                {searchTerm && ` for "${searchTerm}"`}
                {selectedTag && ` tagged with "${selectedTag}"`}
              </p>
            )}
          </div>

          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-cyber-gray border border-cyber-blue/20 rounded-xl overflow-hidden hover:border-cyber-pink/50 transition-all duration-300 hover:scale-105"
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/80 via-transparent to-transparent" />
                      
                      {/* Featured Badge */}
                      {post.featured && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-cyber-pink text-white px-2 py-1 rounded-full text-xs font-semibold">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      {/* Meta */}
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white group-hover:text-cyber-purple transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-300 leading-relaxed line-clamp-3 text-sm">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-cyber-gray text-gray-400 border border-gray-600 rounded-full">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Read More */}
                      <div className="flex items-center space-x-2 text-cyber-purple group-hover:text-cyber-pink transition-colors duration-300 font-medium">
                        <span>Read More</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            /* No Results */
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-white mb-4">No articles found</h3>
              <p className="text-gray-400 mb-8">
                Try adjusting your search terms or filter criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTag('');
                }}
                className="bg-gradient-cyber text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Back to Home */}
          <div className="mt-16 text-center">
            <Link
              to="/#blog"
              className="inline-flex items-center space-x-2 text-cyber-blue hover:text-cyber-pink transition-colors duration-300"
            >
              <ArrowRight size={20} className="rotate-180" />
              <span>Back to Homepage</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogListing;
