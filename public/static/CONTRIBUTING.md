# Contributing to GBV Dashboard

Welcome to the GBV Dashboard project! This guide will help you understand the codebase and start contributing.

## 📚 Documentation Structure

All documentation is organized in the `/docs` folder:

```
docs/
├── setup/              # Getting started guides
│   ├── GETTING_STARTED.md
│   ├── LOCAL_DEVELOPMENT.md
│   └── ENVIRONMENT_SETUP.md
├── architecture/       # System design and structure
│   ├── DATABASE_SCHEMA.md
│   ├── API_DOCUMENTATION.md
│   └── SYSTEM_ARCHITECTURE.md
├── development/        # Development guides
│   ├── CODING_STANDARDS.md
│   ├── TESTING_GUIDE.md
│   └── FEATURE_DEVELOPMENT.md
└── deployment/         # Deployment guides
    ├── CLOUDFLARE_DEPLOYMENT.md
    ├── DATABASE_MIGRATIONS.md
    └── PRODUCTION_CHECKLIST.md
```

## 🚀 Quick Start for New Developers

### 1. Read First
Start with these documents in order:
1. [README.md](README.md) - Project overview
2. [docs/setup/GETTING_STARTED.md](docs/setup/GETTING_STARTED.md) - Setup instructions
3. [docs/architecture/SYSTEM_ARCHITECTURE.md](docs/architecture/SYSTEM_ARCHITECTURE.md) - How it works

### 2. Setup Your Environment
```bash
# Clone the repository
git clone https://github.com/tosin-bit/gbv-dashboard.git
cd gbv-dashboard

# Install dependencies
npm install

# Setup environment variables
cp .env.example .dev.vars
# Edit .dev.vars with your configuration

# Run database migrations
npm run db:migrate:local

# Seed the database
npm run db:seed

# Start development server
npm run build
npm run dev:sandbox
```

### 3. Understand the Codebase
- **Backend**: See [docs/architecture/API_DOCUMENTATION.md](docs/architecture/API_DOCUMENTATION.md)
- **Frontend**: See [docs/architecture/FRONTEND_STRUCTURE.md](docs/architecture/FRONTEND_STRUCTURE.md)
- **Database**: See [docs/architecture/DATABASE_SCHEMA.md](docs/architecture/DATABASE_SCHEMA.md)

## 🏗️ Project Structure

```
gbv-dashboard/
├── src/                    # Backend source code
│   └── index.tsx          # Main Hono application
├── public/                # Frontend assets
│   └── static/            # JavaScript, CSS, images
├── migrations/            # Database migrations
├── docs/                  # Documentation (you are here!)
├── tests/                 # Test files (future)
├── wrangler.jsonc         # Cloudflare configuration
└── package.json           # Dependencies and scripts
```

## 💻 Development Workflow

### Making Changes

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow [docs/development/CODING_STANDARDS.md](docs/development/CODING_STANDARDS.md)
   - Write tests if applicable
   - Update documentation

3. **Test locally**
   ```bash
   npm run build
   npm run dev:sandbox
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: Add your feature description"
   ```

5. **Push to GitHub**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Go to GitHub
   - Create PR from your branch to `main`
   - Add description of changes
   - Wait for review

### Commit Message Format

We use conventional commits:

```
<type>: <description>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes (formatting)
- refactor: Code refactoring
- test: Adding tests
- chore: Maintenance tasks

Examples:
✅ feat: Add user authentication system
✅ fix: Resolve form submission error
✅ docs: Update API documentation
✅ refactor: Improve database queries
```

## 🧪 Testing

```bash
# Run all tests (when implemented)
npm run test

# Run specific test file
npm run test -- path/to/test.js

# Run with coverage
npm run test:coverage
```

See [docs/development/TESTING_GUIDE.md](docs/development/TESTING_GUIDE.md) for details.

## 🐛 Reporting Issues

Found a bug? Have a feature request?

1. Check [existing issues](https://github.com/tosin-bit/gbv-dashboard/issues)
2. If not found, [create new issue](https://github.com/tosin-bit/gbv-dashboard/issues/new)
3. Use the issue template
4. Provide clear description and steps to reproduce

## 📞 Getting Help

- **Documentation**: Check the `/docs` folder first
- **Issues**: Ask questions in GitHub Issues
- **Code Comments**: Read inline comments in source code

## 🎯 Areas to Contribute

### High Priority
- [ ] Add comprehensive test coverage
- [ ] Implement email notifications
- [ ] Add data export features
- [ ] Improve mobile responsiveness

### Medium Priority
- [ ] Add more chart types
- [ ] Implement real-time updates
- [ ] Add advanced filtering
- [ ] Improve accessibility

### Low Priority
- [ ] Add dark mode
- [ ] Internationalization (i18n)
- [ ] Performance optimizations
- [ ] Additional report templates

## 🔐 Security

- **Never commit** `.env` files or API keys
- **Always** use environment variables for secrets
- **Report** security issues privately to maintainers
- **Follow** security best practices in code

## 📝 Documentation Guidelines

When adding features:
1. Update relevant documentation in `/docs`
2. Add JSDoc comments to functions
3. Update API documentation if needed
4. Add examples and usage notes

## ✅ Pull Request Checklist

Before submitting PR, ensure:
- [ ] Code follows project standards
- [ ] Tests pass (if applicable)
- [ ] Documentation updated
- [ ] No console.log statements left
- [ ] No sensitive data in commits
- [ ] Commit messages are clear
- [ ] PR description explains changes

## 🙏 Thank You!

Thank you for contributing to the GBV Dashboard! Your work helps improve gender-based violence prevention and response in Sierra Leone.

---

**Questions?** Open an issue or check the documentation in `/docs`.
