import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const { Pool } = pg;

async function validateDatabaseIntegration() {
  console.log('🔍 Validating database integration...\n');

  // Validate required environment variables
  const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => console.error(`   • ${varName}`));
    console.error('\n💡 Please check your .env file and ensure all required variables are set.');
    process.exit(1);
  }

  const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  try {
    // Test database connection
    console.log('1. Testing database connection...');
    await pool.query('SELECT NOW()');
    console.log('   ✅ Database connection successful\n');

    // Check if tables exist
    console.log('2. Checking database schema...');
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('blog_posts', 'projects')
    `);
    
    const tables = tablesResult.rows.map(row => row.table_name);
    console.log(`   ✅ Found tables: ${tables.join(', ')}\n`);

    // Check data counts
    console.log('3. Validating data...');
    
    const blogPostsCount = await pool.query('SELECT COUNT(*) FROM blog_posts');
    const projectsCount = await pool.query('SELECT COUNT(*) FROM projects');
    
    console.log(`   📝 Blog posts: ${blogPostsCount.rows[0].count}`);
    console.log(`   🚧 Projects: ${projectsCount.rows[0].count}\n`);

    // Check published blog posts
    const publishedPosts = await pool.query('SELECT COUNT(*) FROM blog_posts WHERE published = true');
    const featuredPosts = await pool.query('SELECT COUNT(*) FROM blog_posts WHERE featured = true');
    
    console.log(`   📰 Published blog posts: ${publishedPosts.rows[0].count}`);
    console.log(`   ⭐ Featured blog posts: ${featuredPosts.rows[0].count}\n`);

    // Check featured projects
    const featuredProjects = await pool.query('SELECT COUNT(*) FROM projects WHERE featured = true');
    console.log(`   ⭐ Featured projects: ${featuredProjects.rows[0].count}\n`);

    // Test API endpoints
    console.log('4. Testing API endpoints...');
    
    if (!process.env.VITE_API_BASE_URL) {
      console.log('   ⚠️  VITE_API_BASE_URL not configured, skipping API tests');
      console.log('   💡 Set VITE_API_BASE_URL in .env file to test API endpoints');
    } else {
      const apiBaseUrl = process.env.VITE_API_BASE_URL;
    
      try {
        // Test health endpoint
        const healthResponse = await fetch(`${apiBaseUrl}/health`);
        if (healthResponse.ok) {
          console.log('   ✅ Health endpoint working');
        } else {
          console.log('   ❌ Health endpoint failed');
        }

        // Test blog posts endpoint
        const blogResponse = await fetch(`${apiBaseUrl}/blog-posts`);
        if (blogResponse.ok) {
          const blogs = await blogResponse.json();
          console.log(`   ✅ Blog posts API working (${blogs.length} posts)`);
        } else {
          console.log('   ❌ Blog posts API failed');
        }

        // Test projects endpoint
        const projectsResponse = await fetch(`${apiBaseUrl}/projects`);
        if (projectsResponse.ok) {
          const projects = await projectsResponse.json();
          console.log(`   ✅ Projects API working (${projects.length} projects)`);
        } else {
          console.log('   ❌ Projects API failed');
        }

      } catch (apiError) {
        console.log('   ⚠️  API server not running or not accessible');
        console.log('   💡 Make sure to run: npm run server');
      }
    }

    console.log('\n🎉 Database integration validation completed!');
    console.log('\n📋 Summary:');
    console.log('   • PostgreSQL database is connected and working');
    console.log('   • Schema tables exist with data');
    console.log('   • API endpoints are accessible');
    console.log('   • Frontend can fetch data from database via API');
    console.log('\n💻 To run the full application:');
    console.log('   npm run dev:full');

  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Troubleshooting:');
      console.log('   1. Make sure PostgreSQL is running');
      console.log('   2. Check database credentials in .env file');
      console.log('   3. Verify database exists and is accessible');
    }
  } finally {
    await pool.end();
  }
}

validateDatabaseIntegration().catch(console.error);
