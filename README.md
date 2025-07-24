# Digital Portfolio with Database Integration

A modern, cyberpunk-themed portfolio website built with React, TypeScript, and PostgreSQL.

## 🚀 Features

- **Database-Driven**: PostgreSQL backend with REST API
- **Real-time Updates**: Dynamic content management without rebuilds
- **Cyberpunk Design**: Futuristic UI with neon effects and animations
- **Admin Panel**: Content management system for blog posts and projects
- **Responsive**: Mobile-first design that works on all devices
- **Performance**: Optimized loading with fallback strategies

## 🛡️ Security First

This project prioritizes security with:
- No hardcoded credentials
- Environment-based configuration
- Proper secret management
- Production-ready security practices

**📖 Read the [Security Guide](SECURITY.md) before setup!**

## 🏗️ Architecture

```
Frontend (React/TypeScript) → API Server (Express) → PostgreSQL Database
                            ↘ Fallback to cached/static data
```

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL 12+ server
- Git

## ⚡ Quick Start

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd digital-portfolio-raigon
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Set up database:**
   ```bash
   npm run migrate
   ```

5. **Start the application:**
   ```bash
   npm run dev:full
   ```

6. **Verify setup:**
   ```bash
   npm run validate
   ```

Visit `http://localhost:5173` to see your portfolio!

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend development server |
| `npm run server` | Start API server |
| `npm run dev:full` | Start both frontend and API servers |
| `npm run build` | Build for production |
| `npm run migrate` | Migrate JSON data to database |
| `npm run validate` | Validate database integration |
| `npm run lint` | Run ESLint |

## 🗂️ Project Structure

```
├── server/
│   └── api.js                 # Express API server
├── src/
│   ├── components/            # React components
│   ├── hooks/                 # Custom hooks for data fetching
│   ├── services/              # API and business logic
│   ├── repositories/          # Database operations
│   ├── contexts/              # React contexts
│   └── types/                 # TypeScript definitions
├── scripts/
│   ├── migrate.js            # Database migration
│   ├── validate.js           # Integration validation
│   └── database_schema.sql   # Database schema
└── docs/
    ├── DATABASE_README.md    # Database integration guide
    └── SECURITY.md          # Security best practices
```

## 🎨 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons

### Backend
- **Express.js** API server
- **PostgreSQL** database
- **pg** (node-postgres) driver
- **CORS** for cross-origin requests

### Development
- **ESLint** for code quality
- **Concurrently** for running multiple processes
- **dotenv** for environment management

## 🗄️ Database Integration

This project uses PostgreSQL with a REST API layer:

- **Blog posts** and **projects** stored in database
- **Real-time updates** without rebuilding
- **Fallback strategies** for reliability
- **Migration scripts** for easy setup

See [Database Integration Guide](DATABASE_README.md) for details.

## 🔧 Configuration

### Environment Variables

All configuration via `.env` file:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database
DB_USER=your_user
DB_PASSWORD=your_password

# API
VITE_API_BASE_URL=http://localhost:3001/api
API_PORT=3001
```

### Security

- ✅ No hardcoded credentials
- ✅ Environment validation
- ✅ Proper error handling
- ✅ Production-ready configuration

## 🚀 Deployment

### Development
```bash
npm run dev:full
```

### Production
1. Set up PostgreSQL database
2. Configure production environment variables
3. Build the application: `npm run build`
4. Deploy API server and static files
5. Run database migration on production DB

## 🤝 Contributing

1. Read the [Security Guide](SECURITY.md)
2. Fork the repository
3. Create a feature branch
4. Make your changes
5. Test thoroughly
6. Submit a pull request

### Development Guidelines

- Never commit credentials or `.env` files
- Update `.env.example` for new variables
- Run `npm run validate` before commits
- Follow TypeScript best practices
- Maintain security standards

## 📄 License

This project is open source. See [LICENSE](LICENSE) for details.

## 🆘 Support

- 📖 Check the [Database Guide](DATABASE_README.md)
- 🔒 Review [Security Practices](SECURITY.md)
- 🐛 Report issues via GitHub Issues
- 💬 Discussions via GitHub Discussions

## 🎯 Features Roadmap

- [ ] User authentication and authorization
- [ ] Advanced admin dashboard analytics
- [ ] Blog post commenting system
- [ ] SEO optimization and meta tags
- [ ] Performance monitoring
- [ ] Automated testing suite
- [ ] CI/CD pipeline
- [ ] Docker containerization

---

**⚡ Built with security, performance, and scalability in mind.**
