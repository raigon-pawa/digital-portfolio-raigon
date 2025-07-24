import { projectApi } from './apiService';
import { Project } from '../types/admin';

export class ProjectService {
  private getFallbackData(): Project[] {
    // Try to get cached data from localStorage
    try {
      const savedData = localStorage.getItem('adminData');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.projects && Array.isArray(parsed.projects)) {
          return parsed.projects;
        }
      }
    } catch (error) {
      console.warn('Failed to load cached projects:', error);
    }
    return [];
  }

  async getAllProjects(): Promise<Project[]> {
    try {
      return await projectApi.getAll();
    } catch (error) {
      console.warn('API unavailable, using fallback data:', error);
      return this.getFallbackData();
    }
  }

  async getProjectById(id: string): Promise<Project | null> {
    try {
      return await projectApi.getById(id);
    } catch (error) {
      console.warn('API unavailable, using fallback data:', error);
      const fallbackData = this.getFallbackData();
      return fallbackData.find(project => project.id === id) || null;
    }
  }

  async getFeaturedProjects(): Promise<Project[]> {
    try {
      return await projectApi.getFeatured();
    } catch (error) {
      console.warn('API unavailable, using fallback data:', error);
      const fallbackData = this.getFallbackData();
      return fallbackData.filter(project => project.featured);
    }
  }

  async createProject(project: Project): Promise<Project> {
    try {
      return await projectApi.create(project);
    } catch (error) {
      console.error('Failed to create project:', error);
      throw new Error('Unable to create project - API unavailable');
    }
  }

  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    try {
      return await projectApi.update(id, project);
    } catch (error) {
      console.error('Failed to update project:', error);
      throw new Error('Unable to update project - API unavailable');
    }
  }

  async deleteProject(id: string): Promise<boolean> {
    try {
      await projectApi.delete(id);
      return true;
    } catch (error) {
      console.error('Failed to delete project:', error);
      throw new Error('Unable to delete project - API unavailable');
    }
  }
}

export const projectService = new ProjectService();
