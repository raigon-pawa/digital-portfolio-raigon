// Database models that match the PostgreSQL schema
export interface DbBlogPost {
  id: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: string;
  date?: Date;
  read_time?: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  author?: string;
  slug?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface DbProject {
  id: string;
  title: string;
  description?: string;
  technologies?: string[];
  image?: string;
  demo_url?: string;
  github_url?: string;
  featured?: boolean;
  order_index?: number;
  created_at?: Date;
  updated_at?: Date;
}

// Repository interfaces for database operations
export interface BlogPostRepository {
  getAll(): Promise<DbBlogPost[]>;
  getById(id: string): Promise<DbBlogPost | null>;
  getBySlug(slug: string): Promise<DbBlogPost | null>;
  getFeatured(): Promise<DbBlogPost[]>;
  getPublished(): Promise<DbBlogPost[]>;
  create(post: Omit<DbBlogPost, 'created_at' | 'updated_at'>): Promise<DbBlogPost>;
  update(id: string, post: Partial<DbBlogPost>): Promise<DbBlogPost>;
  delete(id: string): Promise<boolean>;
}

export interface ProjectRepository {
  getAll(): Promise<DbProject[]>;
  getById(id: string): Promise<DbProject | null>;
  getFeatured(): Promise<DbProject[]>;
  create(project: Omit<DbProject, 'created_at' | 'updated_at'>): Promise<DbProject>;
  update(id: string, project: Partial<DbProject>): Promise<DbProject>;
  delete(id: string): Promise<boolean>;
}
