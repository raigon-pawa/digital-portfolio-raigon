// Environment configuration
export const isServer = typeof window === 'undefined';
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

// Database configuration - only available on server side
// Note: No fallback values for security - all values must be provided via .env
export const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

// Check if database is available
export const isDatabaseAvailable = () => {
  return !!(dbConfig.host && dbConfig.database && dbConfig.user && dbConfig.password && dbConfig.port);
};
