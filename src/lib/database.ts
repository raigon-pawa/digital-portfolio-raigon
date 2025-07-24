import { Pool } from 'pg';
import { isServer, isDatabaseAvailable } from '../config/environment';

let pool: Pool | null = null;

// Only create pool on server side with valid config
if (isServer && isDatabaseAvailable()) {
  // Validate required environment variables
  const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables for database connection:');
    missingVars.forEach(varName => console.error(`   • ${varName}`));
    throw new Error('Database configuration incomplete');
  }

  pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });
}

export default pool;

export const query = (text: string, params?: any[]) => {
  if (!pool) {
    throw new Error('Database connection not available');
  }
  return pool.query(text, params);
};
