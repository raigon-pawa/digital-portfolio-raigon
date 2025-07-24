import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, User, Tag, Share2, ExternalLink } from 'lucide-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { useBlogPost } from '../hooks/useData';
import MatrixRain from './MatrixRain';
import CustomCursor from './CustomCursor';
import Navigation from './Navigation';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { blogPost, loading, error } = useBlogPost(slug || '');
  const [htmlContent, setHtmlContent] = useState<string>('');

  useEffect(() => {
    if (blogPost?.content) {
      // Configure marked for cyberpunk styling
      marked.setOptions({
        breaks: true,
        gfm: true,
      });

      // Convert markdown to HTML
      const convertMarkdown = async () => {
        const rawHtml = await marked(blogPost.content);
        
        // Sanitize HTML to prevent XSS
        const cleanHtml = DOMPurify.sanitize(rawHtml);
        
        setHtmlContent(cleanHtml);
      };
      
      convertMarkdown();
    }
  }, [blogPost]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-dark text-white font-cyber overflow-x-hidden">
        <MatrixRain />
        <CustomCursor />
        <Navigation />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse text-cyber-purple text-xl">Loading blog post...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cyber-dark text-white font-cyber overflow-x-hidden">
        <MatrixRain />
        <CustomCursor />
        <Navigation />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center space-y-6">
            <h1 className="text-6xl font-bold text-cyber-pink mb-4">Error</h1>
            <h2 className="text-3xl font-bold text-white mb-4">Failed to Load Blog Post</h2>
            <p className="text-gray-400 text-lg mb-8">
              {error}
            </p>
            <Link
              to="/#blog"
              className="inline-flex items-center space-x-2 bg-gradient-cyber text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
            >
              <ArrowLeft size={20} />
              <span>Back to Blog</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-cyber-dark text-white font-cyber overflow-x-hidden">
        <MatrixRain />
        <CustomCursor />
        <Navigation />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center space-y-6">
            <h1 className="text-6xl font-bold text-cyber-pink mb-4">404</h1>
            <h2 className="text-3xl font-bold text-white mb-4">Blog Post Not Found</h2>
            <p className="text-gray-400 text-lg mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/#blog"
              className="inline-flex items-center space-x-2 bg-gradient-cyber text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
            >
              <ArrowLeft size={20} />
              <span>Back to Blog</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blogPost.title,
          text: blogPost.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  return (
    <div className="min-h-screen bg-cyber-dark text-white font-cyber overflow-x-hidden">
      {/* Background Effects */}
      <MatrixRain />
      <CustomCursor />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Blog Post Content */}
      <article className="relative z-10 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              to="/#blog"
              className="inline-flex items-center space-x-2 text-cyber-blue hover:text-cyber-pink transition-colors duration-300"
            >
              <ArrowLeft size={20} />
              <span>Back to Blog</span>
            </Link>
          </div>

          {/* Header */}
          <header className="mb-12">
            {/* Hero Image */}
            <div className="relative h-96 mb-8 rounded-xl overflow-hidden">
              <img
                src={blogPost.image}
                alt={blogPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent" />
              
              {/* Featured Badge */}
              {blogPost.featured && (
                <div className="absolute top-6 right-6">
                  <span className="bg-cyber-pink text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                </div>
              )}
            </div>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm mb-6">
              <div className="flex items-center space-x-2">
                <User size={16} />
                <span>{blogPost.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>{new Date(blogPost.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>{blogPost.readTime}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {blogPost.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {blogPost.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {blogPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center space-x-1 px-3 py-2 bg-cyber-purple/10 text-cyber-purple border border-cyber-purple/20 rounded-full text-sm"
                >
                  <Tag size={14} />
                  <span>{tag}</span>
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 bg-cyber-gray border border-cyber-blue/30 text-cyber-blue px-4 py-2 rounded-lg hover:border-cyber-pink/50 hover:text-cyber-pink transition-colors duration-300"
              >
                <Share2 size={16} />
                <span>Share</span>
              </button>
              
              <a
                href={`#blog-${blogPost.id}`}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <ExternalLink size={16} />
                <span>Permalink</span>
              </a>
            </div>
          </header>

          {/* Content */}
          <div 
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-h1:text-4xl prose-h1:text-cyber-pink prose-h1:mb-6
              prose-h2:text-3xl prose-h2:text-cyber-blue prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:text-cyber-purple prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-cyber-blue prose-a:no-underline hover:prose-a:text-cyber-pink
              prose-strong:text-white prose-strong:font-semibold
              prose-code:text-cyber-pink prose-code:bg-cyber-gray prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-pre:bg-cyber-gray prose-pre:border prose-pre:border-cyber-blue/30 prose-pre:rounded-lg
              prose-blockquote:border-l-4 prose-blockquote:border-cyber-purple prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-400
              prose-ul:text-gray-300 prose-ol:text-gray-300
              prose-li:mb-2
              prose-img:rounded-lg prose-img:shadow-2xl
            "
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-cyber-blue/20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <p className="text-gray-400 text-sm">Published by</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-cyber rounded-full flex items-center justify-center">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{blogPost.author}</p>
                    <p className="text-gray-400 text-sm">Digital Architect</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleShare}
                  className="bg-cyber-purple text-white px-4 py-2 rounded-lg hover:bg-cyber-pink transition-colors duration-300"
                >
                  Share Article
                </button>
                <Link
                  to="/#blog"
                  className="bg-cyber-gray border border-cyber-blue/30 text-cyber-blue px-4 py-2 rounded-lg hover:border-cyber-pink/50 hover:text-cyber-pink transition-colors duration-300"
                >
                  More Articles
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
