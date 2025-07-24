import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Editor from '@monaco-editor/react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { 
  Save, 
  Eye, 
  Upload, 
  ArrowLeft,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';
import AdminHeader from '../AdminHeader';
import { useAdmin } from '../../../contexts/AdminContext';
import { BlogPost } from '../../../types/admin';

interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  tags: string;
  featured: boolean;
  published: boolean;
  image: string;
  readTime: string;
}

const BlogEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useAdmin();
  
  const [previewMode, setPreviewMode] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [autoSave, setAutoSave] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [previewContent, setPreviewContent] = useState<string>('');

  const isEditing = !!id;
  const existingPost = isEditing ? state.blogPosts.find(p => p.id === id) : null;

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<BlogFormData>({
    defaultValues: existingPost ? {
      title: existingPost.title,
      excerpt: existingPost.excerpt,
      content: existingPost.content,
      tags: existingPost.tags.join(', '),
      featured: existingPost.featured,
      published: existingPost.published,
      image: existingPost.image,
      readTime: existingPost.readTime
    } : {
      title: '',
      excerpt: '',
      content: '# Your Blog Post Title\n\nStart writing your amazing blog post here...\n\n## Features\n\n- **Rich Text Editor**: Monaco editor with syntax highlighting\n- **Live Preview**: See your content as you type\n- **Auto-save**: Never lose your work\n- **Responsive Preview**: See how it looks on different devices\n\n## Code Examples\n\n```javascript\nfunction createAwesomeContent() {\n  return "This is a cyberpunk blog!";\n}\n```\n\n> Remember: Great content tells a story and provides value to your readers.',
      tags: '',
      featured: false,
      published: false,
      image: '',
      readTime: '5 min'
    }
  });

  const formData = watch();

  // Auto-save functionality
  useEffect(() => {
    if (!autoSave) return;

    const timer = setTimeout(() => {
      if (formData.title || formData.content) {
        handleSave(formData, true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [formData, autoSave]);

  // Update preview content when formData changes
  useEffect(() => {
    const updatePreview = async () => {
      if (formData.content) {
        const rendered = await renderMarkdown(formData.content);
        setPreviewContent(rendered);
      } else {
        setPreviewContent('');
      }
    };
    updatePreview();
  }, [formData.content]);

  const handleSave = (data: BlogFormData, isAutoSave = false) => {
    const now = new Date().toISOString();
    const blogPost: BlogPost = {
      id: isEditing ? id! : `blog_${Date.now()}`,
      title: data.title || 'Untitled Post',
      excerpt: data.excerpt,
      content: data.content,
      image: data.image || 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: existingPost?.date || now,
      readTime: data.readTime || '5 min',
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
      featured: data.featured,
      published: data.published,
      author: state.user?.name || 'Admin',
      slug: (data.title || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      createdAt: existingPost?.createdAt || now,
      updatedAt: now
    };

    if (isEditing) {
      dispatch({ type: 'UPDATE_BLOG_POST', payload: blogPost });
    } else {
      dispatch({ type: 'ADD_BLOG_POST', payload: blogPost });
    }

    if (!isAutoSave) {
      navigate('/admin/blog');
    } else {
      setLastSaved(new Date());
    }
  };

  const onSubmit = (data: BlogFormData) => {
    handleSave(data);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a service like Cloudinary
      const reader = new FileReader();
      reader.onload = (e) => {
        setValue('image', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderMarkdown = async (content: string) => {
    try {
      // Convert markdown to HTML safely
      const rawHtml = await marked(content);
      // Sanitize HTML to prevent XSS
      return DOMPurify.sanitize(rawHtml);
    } catch (error) {
      console.error('Markdown rendering error:', error);
      return DOMPurify.sanitize(content); // Return sanitized plain text as fallback
    }
  };

  const getViewportClass = () => {
    switch (viewMode) {
      case 'mobile': return 'max-w-sm mx-auto';
      case 'tablet': return 'max-w-2xl mx-auto';
      default: return 'max-w-full';
    }
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <AdminHeader 
        title={isEditing ? 'Edit Blog Post' : 'Create Blog Post'}
        subtitle="Advanced editor with live preview and auto-save"
      />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Sidebar */}
        <div className="w-80 bg-cyber-gray border-r border-cyber-blue/20 p-4 overflow-y-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-cyber-blue text-sm font-medium mb-2">
                Title *
              </label>
              <input
                {...register('title', { required: 'Title is required' })}
                className="w-full px-3 py-2 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none text-sm"
                placeholder="Enter post title..."
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
              )}
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-cyber-blue text-sm font-medium mb-2">
                Excerpt
              </label>
              <textarea
                {...register('excerpt')}
                rows={3}
                className="w-full px-3 py-2 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none text-sm resize-none"
                placeholder="Brief description..."
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-cyber-blue text-sm font-medium mb-2">
                Featured Image
              </label>
              <div className="space-y-2">
                <input
                  {...register('image')}
                  className="w-full px-3 py-2 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none text-sm"
                  placeholder="Image URL..."
                />
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <button
                    type="button"
                    className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg text-cyber-blue hover:border-cyber-blue/50 transition-colors text-sm"
                  >
                    <Upload size={16} />
                    <span>Upload Image</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-cyber-blue text-sm font-medium mb-2">
                Tags
              </label>
              <input
                {...register('tags')}
                className="w-full px-3 py-2 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none text-sm"
                placeholder="tag1, tag2, tag3..."
              />
            </div>

            {/* Read Time */}
            <div>
              <label className="block text-cyber-blue text-sm font-medium mb-2">
                Read Time
              </label>
              <input
                {...register('readTime')}
                className="w-full px-3 py-2 bg-cyber-dark border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:border-cyber-pink focus:outline-none text-sm"
                placeholder="5 min"
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('featured')}
                  className="rounded border-cyber-blue/30 bg-cyber-dark text-cyber-blue focus:ring-cyber-blue focus:ring-offset-0"
                />
                <span className="text-sm text-gray-300">Featured Post</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('published')}
                  className="rounded border-cyber-blue/30 bg-cyber-dark text-cyber-green focus:ring-cyber-green focus:ring-offset-0"
                />
                <span className="text-sm text-gray-300">Publish Now</span>
              </label>
            </div>

            {/* Auto-save toggle */}
            <div className="border-t border-cyber-blue/20 pt-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={autoSave}
                  onChange={(e) => setAutoSave(e.target.checked)}
                  className="rounded border-cyber-blue/30 bg-cyber-dark text-cyber-purple focus:ring-cyber-purple focus:ring-offset-0"
                />
                <span className="text-sm text-gray-300">Auto-save</span>
              </label>
              {lastSaved && (
                <p className="text-xs text-gray-400 mt-1">
                  Last saved: {lastSaved.toLocaleTimeString()}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-4">
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-cyber text-white rounded-lg font-medium hover:scale-105 transition-transform duration-200"
              >
                <Save size={16} />
                <span>{isEditing ? 'Update' : 'Save'} Post</span>
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/admin/blog')}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-cyber-gray border border-cyber-blue/30 text-gray-300 rounded-lg hover:border-cyber-blue/50 transition-colors"
              >
                <ArrowLeft size={16} />
                <span>Back to Blog</span>
              </button>
            </div>
          </form>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col">
          {/* Editor Controls */}
          <div className="bg-cyber-gray border-b border-cyber-blue/20 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  previewMode 
                    ? 'bg-cyber-blue/20 text-cyber-blue' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Eye size={16} />
                <span>Preview</span>
              </button>

              {previewMode && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('desktop')}
                    className={`p-2 rounded ${viewMode === 'desktop' ? 'bg-cyber-blue/20 text-cyber-blue' : 'text-gray-400'}`}
                  >
                    <Monitor size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('tablet')}
                    className={`p-2 rounded ${viewMode === 'tablet' ? 'bg-cyber-blue/20 text-cyber-blue' : 'text-gray-400'}`}
                  >
                    <Tablet size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('mobile')}
                    className={`p-2 rounded ${viewMode === 'mobile' ? 'bg-cyber-blue/20 text-cyber-blue' : 'text-gray-400'}`}
                  >
                    <Smartphone size={16} />
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Words: {formData.content?.split(' ').length || 0}</span>
              <span>Characters: {formData.content?.length || 0}</span>
            </div>
          </div>

          {/* Editor/Preview */}
          <div className="flex-1 overflow-hidden">
            {previewMode ? (
              <div className="h-full overflow-y-auto p-6 bg-cyber-dark">
                <div className={`${getViewportClass()}`}>
                  <article className="prose prose-invert max-w-none">
                    {formData.image && (
                      <img 
                        src={formData.image} 
                        alt={formData.title}
                        className="w-full h-64 object-cover rounded-lg mb-6"
                      />
                    )}
                    <div 
                      className="prose-content"
                      dangerouslySetInnerHTML={{ 
                        __html: previewContent
                      }} 
                    />
                  </article>
                </div>
              </div>
            ) : (
              <Editor
                height="100%"
                defaultLanguage="markdown"
                value={formData.content}
                onChange={(value) => setValue('content', value || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  wordWrap: 'on',
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                  padding: { top: 20, bottom: 20 }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
