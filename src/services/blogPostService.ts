import { blogPostApi } from './apiService';
import { BlogPost } from '../types/admin';

export class BlogPostService {
  private getFallbackData(): BlogPost[] {
    // Try to get cached data from localStorage
    try {
      const savedData = localStorage.getItem('adminData');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.blogPosts && Array.isArray(parsed.blogPosts)) {
          return parsed.blogPosts.filter((post: BlogPost) => post.published);
        }
      }
    } catch (error) {
      console.warn('Failed to load cached blog posts:', error);
    }
    return [];
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    try {
      return await blogPostApi.getAll();
    } catch (error) {
      console.warn('API unavailable, using fallback data:', error);
      return this.getFallbackData();
    }
  }

  async getBlogPostById(id: string): Promise<BlogPost | null> {
    try {
      return await blogPostApi.getById(id);
    } catch (error) {
      console.warn('API unavailable, using fallback data:', error);
      const fallbackData = this.getFallbackData();
      return fallbackData.find(post => post.id === id) || null;
    }
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      return await blogPostApi.getBySlug(slug);
    } catch (error) {
      console.warn('API unavailable, using fallback data:', error);
      const fallbackData = this.getFallbackData();
      return fallbackData.find(post => post.slug === slug) || null;
    }
  }

  async getFeaturedBlogPosts(): Promise<BlogPost[]> {
    try {
      return await blogPostApi.getFeatured();
    } catch (error) {
      console.warn('API unavailable, using fallback data:', error);
      const fallbackData = this.getFallbackData();
      return fallbackData.filter(post => post.featured && post.published);
    }
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    try {
      return await blogPostApi.getPublished();
    } catch (error) {
      console.warn('API unavailable, using fallback data:', error);
      const fallbackData = this.getFallbackData();
      return fallbackData.filter(post => post.published);
    }
  }

  async createBlogPost(post: BlogPost): Promise<BlogPost> {
    try {
      return await blogPostApi.create(post);
    } catch (error) {
      console.error('Failed to create blog post:', error);
      throw new Error('Unable to create blog post - API unavailable');
    }
  }

  async updateBlogPost(id: string, post: Partial<BlogPost>): Promise<BlogPost> {
    try {
      return await blogPostApi.update(id, post);
    } catch (error) {
      console.error('Failed to update blog post:', error);
      throw new Error('Unable to update blog post - API unavailable');
    }
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    try {
      await blogPostApi.delete(id);
      return true;
    } catch (error) {
      console.error('Failed to delete blog post:', error);
      throw new Error('Unable to delete blog post - API unavailable');
    }
  }
}

export const blogPostService = new BlogPostService();
