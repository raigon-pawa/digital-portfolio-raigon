// Types for the admin panel
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  author: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface AboutContent {
  title: string;
  subtitle: string;
  description: string[];
  stats: {
    projects: number;
    years: number;
    linesOfCode: number;
  };
  skills: Skill[];
  avatar: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  category: string;
  icon: string;
  technologies: string[];
  color: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  discord: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  responseTime: {
    email: string;
    projects: string;
    urgent: string;
  };
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
  lastLogin: string;
}

export interface AdminState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  projects: Project[];
  blogPosts: BlogPost[];
  aboutContent: AboutContent;
  contactInfo: ContactInfo;
  loading: boolean;
  error: string | null;
}
