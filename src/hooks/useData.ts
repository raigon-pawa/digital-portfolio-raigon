import { useState, useEffect } from 'react';
import { blogPostService } from '../services/blogPostService';
import { projectService } from '../services/projectService';
import { BlogPost, Project } from '../types/admin';

// Hook for accessing blog posts from the frontend
export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const posts = await blogPostService.getPublishedBlogPosts();
        setBlogPosts(posts);
      } catch (err) {
        console.error('Error loading blog posts:', err);
        setError('Failed to load blog posts');
        // Fallback to localStorage only
        try {
          const savedData = localStorage.getItem('adminData');
          if (savedData) {
            const parsed = JSON.parse(savedData);
            if (parsed.blogPosts) {
              setBlogPosts(parsed.blogPosts.filter((post: BlogPost) => post.published));
            }
          }
        } catch (fallbackError) {
          console.error('Fallback data loading failed:', fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  return { blogPosts, loading, error };
};

// Hook for accessing projects from the frontend
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const projectData = await projectService.getAllProjects();
        setProjects(projectData);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError('Failed to load projects');
        // Fallback to localStorage only
        try {
          const savedData = localStorage.getItem('adminData');
          if (savedData) {
            const parsed = JSON.parse(savedData);
            if (parsed.projects) {
              setProjects(parsed.projects);
            }
          }
        } catch (fallbackError) {
          console.error('Fallback data loading failed:', fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return { projects, loading, error };
};

// Hook for getting a single blog post by slug
export const useBlogPost = (slug: string) => {
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogPost = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        setError(null);
        const post = await blogPostService.getBlogPostBySlug(slug);
        setBlogPost(post);
      } catch (err) {
        console.error('Error loading blog post:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    loadBlogPost();
  }, [slug]);

  return { blogPost, loading, error };
};

// Hook for getting featured content
export const useFeaturedContent = () => {
  const [featuredBlogPosts, setFeaturedBlogPosts] = useState<BlogPost[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFeaturedContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const [posts, projects] = await Promise.all([
          blogPostService.getFeaturedBlogPosts(),
          projectService.getFeaturedProjects()
        ]);
        setFeaturedBlogPosts(posts);
        setFeaturedProjects(projects);
      } catch (err) {
        console.error('Error loading featured content:', err);
        setError('Failed to load featured content');
        // Fallback to localStorage
        try {
          const savedData = localStorage.getItem('adminData');
          if (savedData) {
            const parsed = JSON.parse(savedData);
            if (parsed.blogPosts) {
              setFeaturedBlogPosts(parsed.blogPosts.filter((post: BlogPost) => post.featured && post.published));
            }
            if (parsed.projects) {
              setFeaturedProjects(parsed.projects.filter((project: Project) => project.featured));
            }
          }
        } catch (fallbackError) {
          console.error('Fallback data loading failed:', fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedContent();
  }, []);

  return { featuredBlogPosts, featuredProjects, loading, error };
};
