# GitHub Integration Guide

Complete guide for linking your Figma Make app to the GitHub repository.

---

## 🎯 Overview

This guide covers:
1. **Exporting** your app from Figma Make
2. **Pushing** code to GitHub
3. **Setting up** CI/CD
4. **Deploying** to production
5. **Maintaining** the codebase

---

## 📦 Step 1: Export from Figma Make

### Option A: Download Project Files

1. **In Figma Make:**
   - Look for "Export" or "Download" button
   - Download as `.zip` file

2. **Extract files:**
   ```bash
   mkdir integratewise-live
   cd integratewise-live
   unzip [downloaded-file].zip
   ```

### Option B: Copy Files Manually

If no export option, copy these files:
- `/App.tsx`
- `/components/` (entire directory)
- `/styles/` (entire directory)
- `/design-tokens/` (entire directory)
- `/imports/` (documentation)
- `Guidelines.md`
- `package.json`
- `tsconfig.json`
- Any other config files

---

## 🔗 Step 2: Connect to GitHub

### Method A: Using Git CLI (Recommended)

```bash
# Navigate to your project directory
cd integratewise-live

# Initialize Git (if not already done)
git init

# Add remote repository
git remote add origin https://github.com/NirmalPrinceJ/integratewise-live.git

# Verify remote
git remote -v

# Add all files
git add .

# Commit
git commit -m "Initial commit: IntegrateWise app from Figma Make"

# Push to GitHub
git branch -M main
git push -u origin main
```

### Method B: Using GitHub Desktop

1. **Download GitHub Desktop:** https://desktop.github.com

2. **Add repository:**
   - File → Add Local Repository
   - Choose your project folder
   - Click "Create repository" or "Add"

3. **Publish to GitHub:**
   - Click "Publish repository"
   - Uncheck "Keep this code private" (if you want it public)
   - Click "Publish Repository"

### Method C: Using VS Code

1. **Open project in VS Code**

2. **Initialize Git:**
   - Click Source Control icon (left sidebar)
   - Click "Initialize Repository"

3. **Commit files:**
   - Stage all changes (+ icon)
   - Write commit message
   - Click ✓ (checkmark) to commit

4. **Push to GitHub:**
   - Click "..." → "Remote" → "Add Remote"
   - Paste: `https://github.com/NirmalPrinceJ/integratewise-live.git`
   - Click "..." → "Push"

---

## 📝 Step 3: Review Files Created

Your GitHub repository now includes:

### Core Application Files
```
/App.tsx                              # Main app entry
/components/                          # All React components
/styles/globals.css                   # Tailwind + tokens
/design-tokens/                       # Complete token system
```

### GitHub-Specific Files (Created for You)
```
/.gitignore                           # Files to ignore
/README.md                            # Repository documentation
/CONTRIBUTING.md                      # Contribution guidelines
/DEPLOYMENT.md                        # Deployment instructions
/.github/
  /workflows/ci.yml                   # CI/CD pipeline
  /ISSUE_TEMPLATE/
    /bug_report.md                    # Bug report template
    /feature_request.md               # Feature request template
  /pull_request_template.md           # PR template
```

### Documentation Files
```
/Guidelines.md                        # Development guidelines v3.7
/TESTING_GUIDE.md                     # Testing instructions
/DESIGN_TOKENS_EXPORT.md             # Token documentation
/GITHUB_INTEGRATION_GUIDE.md         # This file
```

---

## 🚀 Step 4: Set Up CI/CD

### GitHub Actions (Already Configured!)

Your repository includes `.github/workflows/ci.yml` which automatically:

✅ **On every push to main:**
- Runs linting
- Runs type checking
- Builds the app
- Runs tests (when implemented)
- Creates deployment artifacts

✅ **On every pull request:**
- Same checks as above
- Creates preview deployment info

### Viewing GitHub Actions

1. Go to your repository on GitHub
2. Click "Actions" tab
3. See all workflow runs
4. Click on any run to see details

---

## 🌐 Step 5: Deploy to Production

### Option 1: Vercel (Recommended)

**Why Vercel?**
- ✅ Perfect for React/Vite apps
- ✅ Automatic deployments
- ✅ Edge functions support
- ✅ Free SSL
- ✅ Global CDN

**Setup:**
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Import `NirmalPrinceJ/integratewise-live`
5. Configure:
   ```
   Framework: Vite
   Build Command: npm run build
   Output Directory: dist
   ```
6. Add environment variables (if needed)
7. Click "Deploy"

**Result:**
- Production: `https://integratewise-live.vercel.app`
- Auto-deploys on every push to `main`
- Preview deployments for every PR

### Option 2: Netlify

**Setup:**
1. Go to https://netlify.com
2. Sign in with GitHub
3. "Add new site" → "Import an existing project"
4. Choose `NirmalPrinceJ/integratewise-live`
5. Configure:
   ```
   Build command: npm run build
   Publish directory: dist
   ```
6. Click "Deploy site"

**Result:**
- Production: `https://[random-name].netlify.app`
- Auto-deploys on every push to `main`

### Option 3: GitHub Pages (Free)

**Setup:**
1. In your repo, go to Settings → Pages
2. Source: "GitHub Actions"
3. Uncomment the GitHub Pages step in `.github/workflows/ci.yml`
4. Push to main

**Result:**
- Production: `https://nirmalprincej.github.io/integratewise-live/`
- Free hosting via GitHub

See `/DEPLOYMENT.md` for complete deployment guide.

---

## 🔄 Step 6: Ongoing Workflow

### Daily Development

```bash
# Pull latest changes
git pull origin main

# Create feature branch
git checkout -b feature/your-feature

# Make changes...
# (edit files in your code editor)

# Add and commit
git add .
git commit -m "feat: add your feature description"

# Push to GitHub
git push origin feature/your-feature

# Create Pull Request on GitHub
```

### Creating Pull Requests

1. **Push your branch to GitHub**
2. **Go to repository on GitHub**
3. **Click "Compare & pull request"**
4. **Fill out PR template** (auto-populated)
5. **Request review**
6. **Wait for CI checks to pass**
7. **Merge when approved**

### Merging to Main

Once your PR is approved:
1. Click "Squash and merge" or "Merge pull request"
2. Delete the feature branch
3. GitHub Actions automatically:
   - Runs all checks
   - Builds the app
   - Deploys to production (if Vercel/Netlify connected)

---

## 📊 Step 7: Monitor Your App

### GitHub Insights

**View repository analytics:**
- Go to "Insights" tab
- See: Commits, Contributors, Traffic, etc.

### CI/CD Status

**Check build status:**
- "Actions" tab shows all workflow runs
- Green ✅ = passing
- Red ❌ = failing

### Deployment Status

**Vercel:**
- Dashboard: https://vercel.com/dashboard
- See all deployments
- View logs and analytics

**Netlify:**
- Dashboard: https://app.netlify.com
- See deployment history
- View logs

---

## 🛠️ Common Tasks

### Update Dependencies

```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Commit and push
git add package.json package-lock.json
git commit -m "chore: update dependencies"
git push
```

### Fix Build Errors

```bash
# Check TypeScript errors
npm run type-check

# Check linting errors
npm run lint

# Fix linting automatically
npm run lint -- --fix

# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Rollback Deployment

**Vercel:**
1. Go to Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

**Netlify:**
1. Go to Deploys
2. Find previous deploy
3. Click "Publish deploy"

**GitHub:**
```bash
# Revert last commit
git revert HEAD
git push origin main
```

---

## 🔐 Security Best Practices

### Secrets Management

**Never commit:**
- ❌ API keys
- ❌ Passwords
- ❌ Database credentials
- ❌ Private tokens

**Use environment variables:**
```bash
# Add to .env.local (gitignored)
VITE_API_KEY=your_secret_key

# Add to Vercel/Netlify dashboard
# Never commit to GitHub
```

### GitHub Secrets

For CI/CD workflows:
1. Repository Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add secret name and value
4. Use in workflows: `${{ secrets.SECRET_NAME }}`

---

## 📚 Resources Created

All files are ready in your repository:

| File | Purpose |
|------|---------|
| `README.md` | Repository overview |
| `CONTRIBUTING.md` | Contribution guidelines |
| `DEPLOYMENT.md` | Deployment instructions |
| `.gitignore` | Files to ignore |
| `.github/workflows/ci.yml` | CI/CD pipeline |
| `.github/ISSUE_TEMPLATE/*` | Issue templates |
| `.github/pull_request_template.md` | PR template |
| `/design-tokens/*` | Design system tokens |
| `Guidelines.md` | Development guidelines |
| `TESTING_GUIDE.md` | Testing instructions |

---

## ✅ Quick Start Checklist

### Setup (One-time)
- [ ] Export project from Figma Make
- [ ] Initialize Git repository
- [ ] Add GitHub remote
- [ ] Push code to GitHub
- [ ] Review all created files
- [ ] Set up CI/CD (GitHub Actions)
- [ ] Deploy to Vercel/Netlify
- [ ] Configure custom domain (optional)

### Daily Workflow
- [ ] Pull latest changes
- [ ] Create feature branch
- [ ] Make changes
- [ ] Test locally
- [ ] Commit and push
- [ ] Create pull request
- [ ] Wait for CI checks
- [ ] Merge when approved

### Maintenance
- [ ] Monitor CI/CD status
- [ ] Review pull requests
- [ ] Update dependencies monthly
- [ ] Check deployment logs
- [ ] Respond to issues

---

## 🆘 Troubleshooting

### "Permission denied" when pushing

**Fix:**
```bash
# Authenticate with GitHub
git remote set-url origin https://[USERNAME]@github.com/NirmalPrinceJ/integratewise-live.git

# Or use SSH
git remote set-url origin git@github.com:NirmalPrinceJ/integratewise-live.git
```

### "Build failed" on GitHub Actions

**Check:**
1. Go to Actions tab
2. Click failed workflow
3. Read error logs
4. Fix issue locally
5. Push fix

### "Nothing to commit"

**You haven't made changes yet:**
```bash
# Check status
git status

# If files are untracked, add them
git add .
git commit -m "Add files"
```

### Merge Conflicts

```bash
# Update your branch
git pull origin main

# Fix conflicts in your editor
# Look for <<<<<<< and >>>>>>>

# After fixing
git add .
git commit -m "Resolve merge conflicts"
git push
```

---

## 🎯 Next Steps

After setting up GitHub:

1. **Configure branch protection:**
   - Settings → Branches → Add rule
   - Require PR reviews before merging
   - Require status checks to pass

2. **Set up project board:**
   - Projects → New project
   - Track issues and PRs

3. **Enable Discussions:**
   - Settings → Features → Discussions
   - For community Q&A

4. **Add contributors:**
   - Settings → Collaborators
   - Invite team members

5. **Set up webhooks:**
   - Settings → Webhooks
   - Connect to Slack/Discord for notifications

---

## 📞 Support

**Need help?**
- **GitHub Docs:** https://docs.github.com
- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **Create an Issue:** https://github.com/NirmalPrinceJ/integratewise-live/issues

---

**Your repository is now fully set up and ready for production! 🚀**

All you need to do is:
1. Export your Figma Make app
2. Push to GitHub
3. Deploy to Vercel/Netlify
4. Start building!

---

**Version:** 3.7  
**Last Updated:** March 21, 2026  
**Repository:** https://github.com/NirmalPrinceJ/integratewise-live
