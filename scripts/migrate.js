import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
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

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  const client = await pool.connect();
  
  try {
    console.log('🚀 Starting database migration...');
    
    // Read and execute schema
    const schemaSQL = fs.readFileSync(path.join(__dirname, 'database_schema.sql'), 'utf8');
    await client.query(schemaSQL);
    console.log('✅ Database schema created successfully');
    
    // Read JSON data
    const blogPostsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../src/data/blogPosts.json'), 'utf8')
    );
    const projectsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../src/data/projects.json'), 'utf8')
    );
    
    // Clear existing data
    await client.query('DELETE FROM blog_posts');
    await client.query('DELETE FROM projects');
    console.log('🧹 Cleared existing data');
    
    // Insert blog posts
    console.log('📝 Migrating blog posts...');
    for (const post of blogPostsData) {
      await client.query(`
        INSERT INTO blog_posts (
          id, title, excerpt, content, image, date, read_time, tags,
          featured, published, author, slug, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      `, [
        post.id,
        post.title,
        post.excerpt,
        post.content,
        post.image,
        post.date,
        post.readTime,
        post.tags,
        post.featured,
        post.published,
        post.author,
        post.slug,
        post.createdAt,
        post.updatedAt
      ]);
    }
    console.log(`✅ Migrated ${blogPostsData.length} blog posts`);
    
    // Insert projects
    console.log('🚧 Migrating projects...');
    for (const project of projectsData) {
      await client.query(`
        INSERT INTO projects (
          id, title, description, technologies, image, demo_url, github_url,
          featured, order_index, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `, [
        project.id,
        project.title,
        project.description,
        project.technologies,
        project.image,
        project.demoUrl,
        project.githubUrl,
        project.featured,
        project.order,
        project.createdAt,
        project.updatedAt
      ]);
    }
    console.log(`✅ Migrated ${projectsData.length} projects`);
    
    console.log('🎉 Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration().catch(console.error);
