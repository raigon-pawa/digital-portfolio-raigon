# Security and Environment Configuration

## ⚠️ Importa2. **Environment Variables:**
   - Only `VITE_` prefixed variables are exposed to the frontend
   - Server-side variables (DB credentials) remain secure
   - Never use `define: { 'process.env': process.env }` in Vite config
   - `.env` is in `.gitignore` - never committed
   - `.env.example` provides template without real values
   - Different `.env` files for different environmentsecurity Notice

This project requires proper environment configuration for security. **Never commit sensitive data to version control.**

## Required Environment Variables

All database and API configurations must be provided via environment variables. There are **no hardcoded fallbacks** for security reasons.

### Required Variables

Create a `.env` file in the root directory with these variables:

```env
# Database Configuration (Required)
DB_HOST=your_database_host
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_secure_password

# API Configuration (Required for frontend)
VITE_API_BASE_URL=http://localhost:3001/api
API_PORT=3001
```

### Environment Setup

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Update with your values:**
   - Replace all placeholder values with your actual configuration
   - Use a strong, unique password for `DB_PASSWORD`
   - Ensure `DB_HOST`, `DB_NAME`, and `DB_USER` match your PostgreSQL setup

3. **Verify configuration:**
   ```bash
   npm run validate
   ```

## Security Best Practices

### ✅ What We Do Right

- **No hardcoded credentials** - All sensitive data via environment variables
- **Environment validation** - Scripts fail fast if required variables are missing
- **Separation of concerns** - Database config separate from application logic
- **Secure client-side env handling** - Only `VITE_` prefixed variables exposed to frontend
- **No process.env exposure** - Vite's secure defaults prevent credential leaks
- **Documentation** - Clear examples without real credentials

### 🔒 Additional Security Measures

1. **Environment Files:**
   - `.env` is in `.gitignore` - never committed
   - `.env.example` provides template without real values
   - Different `.env` files for different environments

2. **Database Security:**
   - Use strong, unique passwords
   - Enable SSL in production (`NODE_ENV=production`)
   - Limit database user permissions to minimum required
   - Regular security updates

3. **API Security:**
   - CORS configuration in production
   - Rate limiting (consider adding)
   - Input validation and sanitization
   - Error handling without exposing sensitive data

### 🚨 Security Checklist

Before deploying or open-sourcing:

- [ ] No hardcoded credentials in code
- [ ] `.env` file not committed to git
- [ ] Production environment variables configured
- [ ] Database user has minimal required permissions
- [ ] SSL enabled for production database connections
- [ ] API endpoints properly secured
- [ ] Error messages don't expose sensitive information
- [ ] Dependencies regularly updated for security patches

## Production Deployment

### Environment Variables for Production

```env
NODE_ENV=production
DB_HOST=your_production_db_host
DB_PORT=5432
DB_NAME=your_production_db_name
DB_USER=your_production_db_user
DB_PASSWORD=your_very_secure_production_password
VITE_API_BASE_URL=https://your-api-domain.com/api
API_PORT=3001
```

### Additional Production Considerations

1. **Database:**
   - Use managed database service (AWS RDS, Google Cloud SQL, etc.)
   - Enable SSL/TLS encryption
   - Configure automated backups
   - Set up monitoring and alerts

2. **API Server:**
   - Use process manager (PM2, Docker, etc.)
   - Configure reverse proxy (Nginx, CloudFlare)
   - Enable HTTPS
   - Implement rate limiting
   - Add authentication/authorization as needed

3. **Environment Management:**
   - Use secrets management service
   - Rotate credentials regularly
   - Monitor for credential leaks
   - Implement least-privilege access

## Troubleshooting

### Missing Environment Variables

If you see errors about missing environment variables:

1. Check your `.env` file exists in the root directory
2. Verify all required variables are present and have values
3. Restart your application after changing `.env`
4. Run `npm run validate` to check configuration

### Database Connection Issues

1. Verify PostgreSQL is running
2. Check database credentials are correct
3. Ensure database and user exist
4. Verify network connectivity to database host
5. Check firewall/security group settings

### API Connection Issues

1. Verify API server is running (`npm run server`)
2. Check `VITE_API_BASE_URL` is correctly set
3. Ensure CORS is properly configured
4. Verify API endpoints are accessible

## Contributing

When contributing to this project:

1. **Never commit** `.env` files or credentials
2. **Update** `.env.example` if adding new required variables
3. **Document** any new environment requirements
4. **Test** with fresh environment setup
5. **Validate** security implications of changes

Remember: Security is everyone's responsibility! 🔐
