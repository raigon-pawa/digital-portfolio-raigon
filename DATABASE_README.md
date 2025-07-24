# Digital Portfolio - Database Integration

This project has been successfully migrated from static JSON files to a PostgreSQL database with a REST API.

## Database Setup

### Prerequisites
- PostgreSQL server running on localhost:5432
- Database credentials configured in `.env` file

### Database Schema
The database contains two main tables:
- `blog_posts` - Stores blog articles with metadata
- `projects` - Stores portfolio projects with technologies and links

### Migration
To migrate existing JSON data to the database:
```bash
npm run migrate
```

## API Server

### Running the API
Start the API server (serves data from PostgreSQL):
```bash
npm run server
```
The API runs on `http://localhost:3001`

### API Endpoints

#### Blog Posts
- `GET /api/blog-posts` - All blog posts
- `GET /api/blog-posts/published` - Published blog posts only
- `GET /api/blog-posts/featured` - Featured blog posts
- `GET /api/blog-posts/:id` - Single blog post by ID
- `GET /api/blog-posts/slug/:slug` - Single blog post by slug

#### Projects
- `GET /api/projects` - All projects
- `GET /api/projects/featured` - Featured projects only
- `GET /api/projects/:id` - Single project by ID

#### Health Check
- `GET /api/health` - API status check

## Frontend Development

### Running Both Services
To run both the API server and frontend development server:
```bash
npm run dev:full
```

This starts:
- API server on `http://localhost:3001`
- Frontend dev server on `http://localhost:5173`

### Data Flow
1. Frontend components use custom hooks (`useBlogPosts`, `useProjects`, etc.)
2. Hooks call API service functions
3. API service makes HTTP requests to the backend
4. Backend queries PostgreSQL database
5. If API is unavailable, components fall back to cached/static data

### Fallback Strategy
The application includes multiple fallback layers:
1. **Primary**: API server with PostgreSQL database
2. **Secondary**: Local storage cache
3. **Tertiary**: Static JSON files (original data)

## Environment Variables

Copy `.env.example` to `.env` and configure:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name_here
DB_USER=your_database_user_here
DB_PASSWORD=your_password_here

# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api
API_PORT=3001
```

## File Structure Changes

### New Files Added
```
server/
  api.js                     # Express API server
src/
  config/
    environment.ts           # Environment configuration
  hooks/
    useData.ts              # Custom hooks for data fetching
  lib/
    database.ts             # Database connection (server-side)
  repositories/
    blogPostRepository.ts   # Database operations for blog posts
    projectRepository.ts    # Database operations for projects
  services/
    apiService.ts           # HTTP API client
    blogPostService.ts      # Blog post business logic
    projectService.ts       # Project business logic
  types/
    database.ts             # Database type definitions
scripts/
  database_schema.sql       # Database schema definition
  migrate.js               # Data migration script
```

### Modified Files
- Updated `AdminContext.tsx` to use database services
- Updated public components (`Blog.tsx`, `Projects.tsx`, `BlogListing.tsx`, `BlogPost.tsx`) to use data hooks
- Enhanced error handling and loading states

## Benefits of Database Integration

1. **Scalability**: Database can handle larger datasets efficiently
2. **Real-time Updates**: Changes reflect immediately without rebuilding
3. **Data Integrity**: ACID transactions and constraints
4. **Performance**: Indexed queries and optimized data retrieval
5. **Backup & Recovery**: Database-level backup strategies
6. **Multi-user Support**: Concurrent access with proper isolation
7. **Analytics**: Query capabilities for insights and reporting

## Deployment Considerations

For production deployment:
1. Set up PostgreSQL database server
2. Configure environment variables for production
3. Update CORS settings in API server
4. Consider using connection pooling
5. Implement proper authentication/authorization
6. Set up database migrations pipeline
7. Configure SSL for database connections

## Development Workflow

1. Make database schema changes in `scripts/database_schema.sql`
2. Update TypeScript interfaces in `src/types/`
3. Modify repository classes if needed
4. Update service layers for business logic
5. Test API endpoints
6. Update frontend components/hooks as needed

The application maintains backward compatibility and graceful fallbacks, ensuring a smooth user experience even if the database is temporarily unavailable.
