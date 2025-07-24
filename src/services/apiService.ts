// API client for communicating with backend services
import { BlogPost, Project } from '../types/admin';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.warn('⚠️ VITE_API_BASE_URL not configured. API requests will fail.');
}

class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new ApiError(`API request failed: ${response.statusText}`, response.status);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error or API unavailable', 0);
  }
}

export const blogPostApi = {
  async getAll(): Promise<BlogPost[]> {
    return apiRequest<BlogPost[]>('/blog-posts');
  },

  async getById(id: string): Promise<BlogPost> {
    return apiRequest<BlogPost>(`/blog-posts/${id}`);
  },

  async getBySlug(slug: string): Promise<BlogPost> {
    return apiRequest<BlogPost>(`/blog-posts/slug/${slug}`);
  },

  async getFeatured(): Promise<BlogPost[]> {
    return apiRequest<BlogPost[]>('/blog-posts/featured');
  },

  async getPublished(): Promise<BlogPost[]> {
    return apiRequest<BlogPost[]>('/blog-posts/published');
  },

  async create(post: Omit<BlogPost, 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    return apiRequest<BlogPost>('/blog-posts', {
      method: 'POST',
      body: JSON.stringify(post),
    });
  },

  async update(id: string, post: Partial<BlogPost>): Promise<BlogPost> {
    return apiRequest<BlogPost>(`/blog-posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(post),
    });
  },

  async delete(id: string): Promise<void> {
    return apiRequest<void>(`/blog-posts/${id}`, {
      method: 'DELETE',
    });
  },
};

export const projectApi = {
  async getAll(): Promise<Project[]> {
    return apiRequest<Project[]>('/projects');
  },

  async getById(id: string): Promise<Project> {
    return apiRequest<Project>(`/projects/${id}`);
  },

  async getFeatured(): Promise<Project[]> {
    return apiRequest<Project[]>('/projects/featured');
  },

  async create(project: Omit<Project, 'createdAt' | 'updatedAt'>): Promise<Project> {
    return apiRequest<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  },

  async update(id: string, project: Partial<Project>): Promise<Project> {
    return apiRequest<Project>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
  },

  async delete(id: string): Promise<void> {
    return apiRequest<void>(`/projects/${id}`, {
      method: 'DELETE',
    });
  },
};
