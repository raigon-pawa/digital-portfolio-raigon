import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useBlogPosts } from '../hooks/useData';

const Blog: React.FC = () => {
  const { blogPosts, loading, error } = useBlogPosts();
  
  if (loading) {
    return (
      <section id="blog" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse text-cyber-purple text-xl">Loading blog posts...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="text-red-400 text-xl">Error loading blog posts: {error}</div>
          </div>
        </div>
      </section>
    );
  }
  
  // Get published blog posts from hook
  const publishedPosts = blogPosts.filter(post => post.published);
  const featuredPosts = publishedPosts.filter(post => post.featured);
  const recentPosts = publishedPosts.filter(post => !post.featured).slice(0, 3);

  return (
    <section id="blog" className="py-20 relative">
      <div className="absolute top-10 right-10 text-cyber-purple/20 text-6xl font-light">
        ブログ
      </div>
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Latest <span className="text-cyber-purple">Insights</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Thoughts on technology, design, and the future of digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Posts */}
          <div className="lg:col-span-2 space-y-8">
            {featuredPosts.map((post) => (
              <article
                key={post.id}
                className="group bg-cyber-gray border border-cyber-purple/20 rounded-xl overflow-hidden hover:border-cyber-pink/50 transition-all duration-300 cursor-pointer"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="md:flex">
                    <div className="md:w-1/3 relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 md:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-cyber-dark/50" />
                    </div>
                    
                    <div className="md:w-2/3 p-6 space-y-4">
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

                      <h3 className="text-xl font-bold text-white group-hover:text-cyber-purple transition-colors duration-300">
                        {post.title}
                      </h3>

                      <p className="text-gray-300 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs bg-cyber-purple/10 text-cyber-purple border border-cyber-purple/20 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center space-x-2 text-cyber-purple group-hover:text-cyber-pink transition-colors duration-300 font-medium">
                        <span>Read More</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Sidebar Posts */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Recent Posts</h3>
            {recentPosts.map((post) => (
              <article
                key={post.id}
                className="group bg-cyber-gray border border-cyber-blue/20 rounded-xl p-4 hover:border-cyber-pink/50 transition-all duration-300"
              >
                <Link to={`/blog/${post.slug}`} className="block space-y-3">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  
                  <div className="space-y-2">
                    <h4 className="font-bold text-white group-hover:text-cyber-blue transition-colors duration-300 text-sm">
                      {post.title}
                    </h4>
                    
                    <div className="flex items-center space-x-3 text-xs text-gray-400">
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* View All Posts Button */}
        {publishedPosts.length > featuredPosts.length + recentPosts.length && (
          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="inline-flex items-center space-x-2 bg-gradient-cyber text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
            >
              <span>View All Posts</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;