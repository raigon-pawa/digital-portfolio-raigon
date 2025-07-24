import { useAdmin } from '../contexts/AdminContext';

/**
 * Utility hook for exporting and importing data
 * This will be useful for migrating to PostgreSQL later
 */
export const useDataExport = () => {
  const { state } = useAdmin();

  const exportProjects = () => {
    const projectsJson = JSON.stringify(state.projects, null, 2);
    downloadJson(projectsJson, 'projects.json');
  };

  const exportBlogPosts = () => {
    const blogPostsJson = JSON.stringify(state.blogPosts, null, 2);
    downloadJson(blogPostsJson, 'blogPosts.json');
  };

  const exportAllData = () => {
    const allData = {
      projects: state.projects,
      blogPosts: state.blogPosts,
      aboutContent: state.aboutContent,
      contactInfo: state.contactInfo,
      exportedAt: new Date().toISOString(),
    };
    const allDataJson = JSON.stringify(allData, null, 2);
    downloadJson(allDataJson, `portfolio-data-${new Date().toISOString().split('T')[0]}.json`);
  };

  const downloadJson = (jsonString: string, filename: string) => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generatePostgreSQLSchema = () => {
    const schema = `-- PostgreSQL Schema for Portfolio Data
-- Generated on ${new Date().toISOString()}

-- Projects Table
CREATE TABLE projects (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    technologies TEXT[], -- PostgreSQL array type
    image VARCHAR(500),
    demo_url VARCHAR(500),
    github_url VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    order_index INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Posts Table
CREATE TABLE blog_posts (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content TEXT,
    image VARCHAR(500),
    date TIMESTAMP WITH TIME ZONE,
    read_time VARCHAR(50),
    tags TEXT[], -- PostgreSQL array type
    featured BOOLEAN DEFAULT FALSE,
    published BOOLEAN DEFAULT FALSE,
    author VARCHAR(255),
    slug VARCHAR(255) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- About Content Table
CREATE TABLE about_content (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    subtitle VARCHAR(255),
    description TEXT[],
    stats_projects INTEGER,
    stats_years INTEGER,
    stats_lines_of_code INTEGER,
    avatar VARCHAR(500),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills Table
CREATE TABLE skills (
    id VARCHAR(255) PRIMARY KEY,
    category VARCHAR(255),
    icon VARCHAR(255),
    technologies TEXT[],
    color VARCHAR(50),
    about_content_id INTEGER REFERENCES about_content(id)
);

-- Contact Info Table
CREATE TABLE contact_info (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    phone VARCHAR(50),
    location VARCHAR(255),
    discord VARCHAR(255),
    github_url VARCHAR(500),
    linkedin_url VARCHAR(500),
    twitter_url VARCHAR(500),
    response_time_email VARCHAR(100),
    response_time_projects VARCHAR(100),
    response_time_urgent VARCHAR(100),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_order ON projects(order_index);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX idx_blog_posts_date ON blog_posts(date);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);

-- Insert sample data (you'll need to run separate INSERT statements)
-- This schema is ready for your data migration!
`;

    downloadJson(schema, 'postgresql-schema.sql');
  };

  const generateMigrationSQL = () => {
    // Generate INSERT statements for current data
    let sql = `-- Data Migration SQL\n-- Generated on ${new Date().toISOString()}\n\n`;

    // Projects INSERT statements
    sql += `-- Insert Projects\n`;
    state.projects.forEach(project => {
      const title = project.title.replace(/'/g, "''");
      const description = project.description.replace(/'/g, "''");
      const technologies = project.technologies.map(t => `'${t.replace(/'/g, "''")}'`).join(', ');
      
      sql += `INSERT INTO projects (id, title, description, technologies, image, demo_url, github_url, featured, order_index, created_at, updated_at) VALUES (\n`;
      sql += `  '${project.id}',\n`;
      sql += `  '${title}',\n`;
      sql += `  '${description}',\n`;
      sql += `  ARRAY[${technologies}],\n`;
      sql += `  '${project.image || ''}',\n`;
      sql += `  '${project.demoUrl || ''}',\n`;
      sql += `  '${project.githubUrl || ''}',\n`;
      sql += `  ${project.featured},\n`;
      sql += `  ${project.order || 0},\n`;
      sql += `  '${project.createdAt || new Date().toISOString()}',\n`;
      sql += `  '${project.updatedAt || new Date().toISOString()}'\n`;
      sql += `);\n\n`;
    });

    // Blog Posts INSERT statements
    sql += `-- Insert Blog Posts\n`;
    state.blogPosts.forEach(post => {
      const title = post.title.replace(/'/g, "''");
      const excerpt = post.excerpt.replace(/'/g, "''");
      const content = post.content.replace(/'/g, "''");
      const tags = post.tags.map(t => `'${t.replace(/'/g, "''")}'`).join(', ');
      
      sql += `INSERT INTO blog_posts (id, title, excerpt, content, image, date, read_time, tags, featured, published, author, slug, created_at, updated_at) VALUES (\n`;
      sql += `  '${post.id}',\n`;
      sql += `  '${title}',\n`;
      sql += `  '${excerpt}',\n`;
      sql += `  '${content}',\n`;
      sql += `  '${post.image || ''}',\n`;
      sql += `  '${post.date}',\n`;
      sql += `  '${post.readTime}',\n`;
      sql += `  ARRAY[${tags}],\n`;
      sql += `  ${post.featured},\n`;
      sql += `  ${post.published},\n`;
      sql += `  '${post.author}',\n`;
      sql += `  '${post.slug}',\n`;
      sql += `  '${post.createdAt || new Date().toISOString()}',\n`;
      sql += `  '${post.updatedAt || new Date().toISOString()}'\n`;
      sql += `);\n\n`;
    });

    downloadJson(sql, 'migration-data.sql');
  };

  return {
    exportProjects,
    exportBlogPosts,
    exportAllData,
    generatePostgreSQLSchema,
    generateMigrationSQL,
  };
};
