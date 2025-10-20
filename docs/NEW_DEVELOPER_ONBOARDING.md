# 👋 Welcome New Developer!

This guide will help you get up to speed on the GBV Dashboard project quickly and easily.

---

## 🎯 What You Need to Know First

### The Project
**GBV Dashboard** is a comprehensive gender-based violence case management system for Sierra Leone's Ministry of Gender & Children's Affairs. It tracks incidents, manages service delivery, and provides analytics across 16 districts.

### The Stack
- **Backend**: Hono (TypeScript) on Cloudflare Workers
- **Frontend**: Vanilla JavaScript + Tailwind CSS
- **Database**: Cloudflare D1 (SQLite)
- **Deployment**: Cloudflare Pages (Global Edge)

### Your First Day Goals
1. ✅ Get the application running locally
2. ✅ Understand the project structure
3. ✅ Review key documentation
4. ✅ Make your first small change

---

## ⏱️ Hour-by-Hour Onboarding

### Hour 1: Setup (30-45 minutes)

#### Step 1: Clone and Install
```bash
git clone https://github.com/tosin-bit/gbv-dashboard.git
cd gbv-dashboard
npm install
```

#### Step 2: Setup Database
```bash
npm run db:migrate:local
npm run db:seed
```

#### Step 3: Build and Run
```bash
npm run build
npm run dev:sandbox
```

#### Step 4: Test It Works
- Open http://localhost:3000
- Try clicking different tabs
- Submit a test case in "Report Case"
- View it in "View Cases"
- Try portal logins:
  - Rainbo: `rainbo.freetown` / `rainbo2025`
  - Police: `police.freetown` / `police2025`

✅ **Checkpoint**: Application running? Dashboard showing data? Moving on!

---

### Hour 2: Understanding the Code (1 hour)

#### Read These Files (in order):
1. **[../README.md](../README.md)** (10 min)
   - Project overview
   - Features and tech stack

2. **[GETTING_STARTED.md](setup/GETTING_STARTED.md)** (10 min)
   - Commands and structure
   - Common issues and solutions

3. **[SYSTEM_ARCHITECTURE.md](architecture/SYSTEM_ARCHITECTURE.md)** (20 min)
   - How everything connects
   - Request flows
   - Design principles

4. **[DATABASE_SCHEMA.md](architecture/DATABASE_SCHEMA.md)** (20 min)
   - All 14 tables
   - Relationships
   - Sample queries

✅ **Checkpoint**: Understand how a case flows from form submission to database?

---

### Hour 3: Code Walkthrough (1 hour)

#### Backend: `src/index.tsx` (30 min)
Open the file and find these sections:

1. **Type Definitions** (lines 1-20)
   ```typescript
   type Bindings = {
     DB: D1Database;  // Database connection
   }
   ```

2. **Hono App Setup** (lines 20-30)
   ```typescript
   const app = new Hono<{ Bindings: Bindings }>()
   app.use('/api/*', cors())  // Enable CORS
   ```

3. **API Routes** (lines 30-200)
   - `GET /api/stats` - Dashboard statistics
   - `GET /api/districts` - District list
   - `GET /api/cases` - All cases
   - `POST /api/cases` - Create case
   - `POST /api/auth/login` - Portal login

4. **HTML Route** (lines 200-end)
   - Renders the main dashboard HTML
   - Includes all CSS and JavaScript

#### Frontend: `public/static/` (30 min)
Open these key files:

1. **app-simplified.js**
   - Dashboard data loading
   - Chart rendering
   - Statistics display

2. **tab-system.js**
   - Tab navigation
   - Content switching
   - URL management

3. **report-case-form.js**
   - Form validation
   - Data submission
   - Success/error handling

✅ **Checkpoint**: Can you trace a request from button click to database?

---

### Hour 4: Make Your First Change (1 hour)

#### Challenge: Add Your Name to Footer

1. **Find the footer** in `src/index.tsx`
   ```typescript
   <footer className="bg-white border-t mt-12">
   ```

2. **Add your name**
   ```typescript
   <span className="text-sm text-gray-500">
     Maintained by [Your Name]
   </span>
   ```

3. **Test it**
   ```bash
   npm run build
   # Server auto-reloads, refresh browser
   ```

4. **Commit it**
   ```bash
   git add src/index.tsx
   git commit -m "docs: Add my name to footer"
   ```

✅ **Checkpoint**: See your name in the footer? Great!

---

## 📚 Essential Documentation

### Must Read (First Week)
1. **[README.md](../README.md)** - Project overview
2. **[CONTRIBUTING.md](../CONTRIBUTING.md)** - How to contribute
3. **[GETTING_STARTED.md](setup/GETTING_STARTED.md)** - Setup guide
4. **[SYSTEM_ARCHITECTURE.md](architecture/SYSTEM_ARCHITECTURE.md)** - Architecture
5. **[DATABASE_SCHEMA.md](architecture/DATABASE_SCHEMA.md)** - Database

### Should Read (First Month)
6. **[API_DOCUMENTATION.md](architecture/API_DOCUMENTATION.md)** - API details
7. **[FRONTEND_STRUCTURE.md](architecture/FRONTEND_STRUCTURE.md)** - Frontend
8. **[FEATURE_DEVELOPMENT.md](development/FEATURE_DEVELOPMENT.md)** - Building features
9. **[CLOUDFLARE_DEPLOYMENT.md](deployment/CLOUDFLARE_DEPLOYMENT.md)** - Deployment

---

## 🛠️ Common Tasks

### "I want to add a new API endpoint"

1. **Add route** in `src/index.tsx`:
```typescript
app.get('/api/my-endpoint', async (c) => {
  const { env } = c;
  
  const result = await env.DB.prepare(`
    SELECT * FROM table_name
  `).all();
  
  return c.json({ data: result.results });
});
```

2. **Test locally**:
```bash
curl http://localhost:3000/api/my-endpoint
```

3. **Commit**:
```bash
git add src/index.tsx
git commit -m "feat: Add my-endpoint API"
```

### "I want to add a new dashboard card"

1. **Edit** `public/static/app-simplified.js`:
```javascript
function updateDashboard(data) {
  // Add your card update logic
  document.getElementById('my-card').innerHTML = `
    <h3>${data.title}</h3>
    <div>${data.value}</div>
  `;
}
```

2. **Add HTML** in `src/index.tsx`:
```html
<div id="my-card" class="bg-white p-6">
  <!-- Your card content -->
</div>
```

3. **Test and commit**:
```bash
npm run build
# Check in browser
git add public/static/app-simplified.js src/index.tsx
git commit -m "feat: Add new dashboard card"
```

### "I want to update the database schema"

1. **Create migration** `migrations/0003_my_change.sql`:
```sql
-- Add new column
ALTER TABLE gbv_cases ADD COLUMN my_field TEXT;

-- Create new table
CREATE TABLE IF NOT EXISTS my_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);
```

2. **Apply locally**:
```bash
npm run db:migrate:local
```

3. **Test** that everything still works

4. **Commit**:
```bash
git add migrations/0003_my_change.sql
git commit -m "feat: Add my_field to gbv_cases table"
```

---

## 🐛 Troubleshooting

### Problem: Port 3000 already in use
```bash
npm run clean-port
# or
fuser -k 3000/tcp
```

### Problem: Database not found
```bash
npm run db:reset
```

### Problem: Changes not showing
```bash
# Clear build and rebuild
rm -rf dist .wrangler
npm run build
```

### Problem: Can't push to GitHub
```bash
# Check remote
git remote -v

# Re-add if needed
git remote add origin https://github.com/tosin-bit/gbv-dashboard.git
```

---

## 💡 Pro Tips

### 1. Use Browser DevTools (F12)
- Console tab: See JavaScript errors
- Network tab: See API calls
- Elements tab: Inspect HTML/CSS

### 2. Read Error Messages Carefully
- Backend errors: In terminal where dev server runs
- Frontend errors: In browser console
- Database errors: Look for SQL syntax issues

### 3. Use Git Properly
```bash
# Before starting work
git pull origin main

# Create feature branch
git checkout -b feature/my-feature

# Commit often
git add .
git commit -m "feat: Small incremental change"

# Push when ready
git push origin feature/my-feature
```

### 4. Test Before Committing
- Does the app still load?
- Do existing features still work?
- Did you test your new code?
- Any console errors?

### 5. Ask for Help
- Check documentation first
- Search GitHub issues
- Ask team members
- Create an issue if stuck

---

## 🎯 Your First Week Goals

### Day 1
- ✅ Setup complete
- ✅ Application running
- ✅ Understand structure
- ✅ Make first commit

### Day 2-3
- ✅ Read all "Must Read" docs
- ✅ Understand request flows
- ✅ Review database schema
- ✅ Explore all 10 dashboard tabs

### Day 4-5
- ✅ Pick a small issue from GitHub
- ✅ Create branch and implement
- ✅ Test thoroughly
- ✅ Create Pull Request

---

## 🚀 Ready for More?

### Next Steps
1. **Join team meetings** - Understand project roadmap
2. **Review open issues** - Find good first issues
3. **Pair program** - Work with experienced team members
4. **Read advanced docs** - Dive deeper into specific areas

### Resources
- **GitHub**: https://github.com/tosin-bit/gbv-dashboard
- **Live App**: https://gbv-dashboard.pages.dev
- **Documentation**: `/docs` folder
- **Team Chat**: [To be added]

---

## 🙋 Questions?

### Common Questions

**Q: What if I break something?**
A: Don't worry! Git lets you undo. Test locally first, never push broken code to main.

**Q: How do I know what to work on?**
A: Check GitHub issues with "good first issue" label. Ask team lead.

**Q: Can I refactor existing code?**
A: Yes! But discuss with team first. Make sure tests pass.

**Q: What coding style should I use?**
A: See [CODING_STANDARDS.md](development/CODING_STANDARDS.md)

**Q: How do I deploy my changes?**
A: Push to GitHub, create PR, get approval, merge to main. Auto-deploys to production.

---

## ✅ Onboarding Checklist

### Technical Setup
- [ ] Cloned repository
- [ ] Installed dependencies
- [ ] Database setup complete
- [ ] Application runs locally
- [ ] Can access all tabs
- [ ] Portal logins work

### Knowledge
- [ ] Read README.md
- [ ] Read CONTRIBUTING.md
- [ ] Read GETTING_STARTED.md
- [ ] Read SYSTEM_ARCHITECTURE.md
- [ ] Read DATABASE_SCHEMA.md
- [ ] Understand git workflow

### Practical
- [ ] Made first commit
- [ ] Tested API endpoints
- [ ] Explored database
- [ ] Reviewed all code files
- [ ] Asked questions
- [ ] Feel ready to contribute!

---

## 🎉 Welcome to the Team!

You're now ready to contribute to the GBV Dashboard! Remember:

- **Ask questions** - We're here to help
- **Read documentation** - Most answers are there
- **Test thoroughly** - Quality matters
- **Commit often** - Small changes are better
- **Have fun** - You're building something meaningful!

---

**Need help?** Check [docs/README.md](README.md) for more resources.

**Ready to contribute?** See [CONTRIBUTING.md](../CONTRIBUTING.md).

**Have questions?** Open an issue on [GitHub](https://github.com/tosin-bit/gbv-dashboard/issues).

---

*Together, we're building a safer Sierra Leone.* 💚
