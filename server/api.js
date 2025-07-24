import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingVars.forEach(varName => console.error(`   • ${varName}`));
  console.error('\n💡 Please check your .env file and ensure all required variables are set.');
  process.exit(1);
}

const app = express();
const port = process.env.API_PORT || 3001;

// Middleware
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || false 
    : ['http://localhost:5173', 'http://localhost:3000'], // Vite dev server
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' })); // Limit payload size

// Database connection
const { Pool } = pg;
const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Helper function to transform database rows to frontend format
function transformBlogPost(row) {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    image: row.image,
    date: row.date,
    readTime: row.read_time,
    tags: row.tags,
    featured: row.featured,
    published: row.published,
    author: row.author,
    slug: row.slug,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function transformProject(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    technologies: row.technologies,
    image: row.image,
    demoUrl: row.demo_url,
    githubUrl: row.github_url,
    featured: row.featured,
    order: row.order_index,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

// Blog Posts API Routes
app.get('/api/blog-posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blog_posts ORDER BY date DESC, created_at DESC');
    const blogPosts = result.rows.map(transformBlogPost);
    res.json(blogPosts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

app.get('/api/blog-posts/published', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blog_posts WHERE published = true ORDER BY date DESC, created_at DESC');
    const blogPosts = result.rows.map(transformBlogPost);
    res.json(blogPosts);
  } catch (error) {
    console.error('Error fetching published blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch published blog posts' });
  }
});

app.get('/api/blog-posts/featured', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blog_posts WHERE featured = true AND published = true ORDER BY date DESC, created_at DESC');
    const blogPosts = result.rows.map(transformBlogPost);
    res.json(blogPosts);
  } catch (error) {
    console.error('Error fetching featured blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch featured blog posts' });
  }
});

app.get('/api/blog-posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM blog_posts WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    const blogPost = transformBlogPost(result.rows[0]);
    res.json(blogPost);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

app.get('/api/blog-posts/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query('SELECT * FROM blog_posts WHERE slug = $1', [slug]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    const blogPost = transformBlogPost(result.rows[0]);
    res.json(blogPost);
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

// Projects API Routes
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY order_index ASC, created_at DESC');
    const projects = result.rows.map(transformProject);
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.get('/api/projects/featured', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects WHERE featured = true ORDER BY order_index ASC, created_at DESC');
    const projects = result.rows.map(transformProject);
    res.json(projects);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    res.status(500).json({ error: 'Failed to fetch featured projects' });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    const project = transformProject(result.rows[0]);
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 API server running on http://localhost:${port}`);
  console.log(`📊 Health check: http://localhost:${port}/api/health`);
});
