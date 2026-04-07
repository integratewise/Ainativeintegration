# Deployment Guide

Complete guide for deploying IntegrateWise to production.

---

## 🎯 Deployment Options

### Option 1: Vercel (Recommended)
Best for: React/Vite apps, automatic deployments, edge functions

### Option 2: Netlify
Best for: Simplicity, form handling, serverless functions

### Option 3: GitHub Pages
Best for: Static sites, free hosting, GitHub integration

### Option 4: Cloudflare Pages
Best for: Edge deployment, global CDN, Workers integration

---

## 🚀 Deploy to Vercel

### Method A: Via Vercel Dashboard (Easiest)

1. **Go to Vercel**
   - Visit https://vercel.com
   - Sign in with GitHub

2. **Import Repository**
   - Click "Add New..." → "Project"
   - Select `NirmalPrinceJ/integratewise-live`
   - Click "Import"

3. **Configure Project**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Environment Variables**
   - Add any required environment variables
   - See "Environment Variables" section below

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://[project-name].vercel.app`

### Method B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Automatic Deployments

Vercel automatically deploys:
- **Production:** Every push to `main` branch
- **Preview:** Every pull request
- **Branch Preview:** Every push to any branch

---

## 🌐 Deploy to Netlify

### Method A: Via Netlify Dashboard

1. **Go to Netlify**
   - Visit https://netlify.com
   - Sign in with GitHub

2. **Import Repository**
   - Click "Add new site" → "Import an existing project"
   - Select GitHub
   - Choose `NirmalPrinceJ/integratewise-live`

3. **Build Settings**
   ```
   Base directory: (leave empty)
   Build command: npm run build
   Publish directory: dist
   ```

4. **Environment Variables**
   - Go to Site settings → Environment variables
   - Add required variables (see below)

5. **Deploy**
   - Click "Deploy site"
   - Your app will be live at `https://[random-name].netlify.app`

### Method B: Via Netlify CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

---

## 📄 Deploy to GitHub Pages

### Method A: Via GitHub Actions (Automated)

1. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: "GitHub Actions"

2. **Workflow Already Created**
   - File: `.github/workflows/ci.yml`
   - Uncomment the "Deploy to GitHub Pages" step

3. **Configure Base Path** (if needed)
   
   Update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/integratewise-live/',  // Your repo name
     // ... rest of config
   })
   ```

4. **Push to Main**
   - Every push to `main` automatically deploys
   - Live at: `https://nirmalPrinceJ.github.io/integratewise-live/`

### Method B: Manual Deployment

```bash
# Build
npm run build

# Install gh-pages
npm install -g gh-pages

# Deploy
gh-pages -d dist
```

---

## ☁️ Deploy to Cloudflare Pages

### Via Cloudflare Dashboard

1. **Go to Cloudflare Pages**
   - Visit https://pages.cloudflare.com
   - Sign in

2. **Connect Repository**
   - Click "Create a project"
   - Connect GitHub account
   - Select `NirmalPrinceJ/integratewise-live`

3. **Build Configuration**
   ```
   Framework preset: Vite
   Build command: npm run build
   Build output directory: dist
   ```

4. **Deploy**
   - Click "Save and Deploy"
   - Live at: `https://[project-name].pages.dev`

---

## 🔐 Environment Variables

### Required Variables

```env
# API Base URL (when backend is implemented)
VITE_API_BASE_URL=https://api.integratewise.com

# Supabase (when implemented)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key

# Feature Flags
VITE_ENABLE_AUTH=true
VITE_ENABLE_ANALYTICS=true
```

### Optional Variables

```env
# Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
VITE_POSTHOG_KEY=your_posthog_key

# Error Tracking
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx

# External APIs
VITE_STRIPE_PUBLIC_KEY=pk_live_xxx
VITE_MAPBOX_TOKEN=pk.xxx
```

### Setting Environment Variables

**Vercel:**
- Dashboard → Settings → Environment Variables
- Add variables for Production, Preview, and Development

**Netlify:**
- Site settings → Environment variables
- Add key-value pairs

**GitHub Actions:**
- Repository Settings → Secrets and variables → Actions
- Add as repository secrets

**Local Development:**
```bash
# Create .env.local file
cp .env.example .env.local

# Add your variables
VITE_API_BASE_URL=http://localhost:3000
```

---

## 📊 Build Optimization

### Vite Build Configuration

Update `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable in production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router'],
          ui: ['motion/react', 'lucide-react'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
```

### Bundle Size Analysis

```bash
# Install analyzer
npm install -D rollup-plugin-visualizer

# Build and analyze
npm run build
npx vite-bundle-visualizer
```

---

## 🔍 Pre-Deployment Checklist

### Code Quality
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No linting errors (`npm run lint`)
- [ ] No console errors in browser
- [ ] All tests pass (`npm test`)

### Performance
- [ ] Images are optimized
- [ ] Bundle size is acceptable (< 500KB gzipped)
- [ ] Lazy loading implemented where needed
- [ ] No memory leaks

### Security
- [ ] No hardcoded secrets
- [ ] Environment variables configured
- [ ] API keys are secure
- [ ] CORS configured correctly
- [ ] Content Security Policy set

### SEO & Metadata
- [ ] Page titles are set
- [ ] Meta descriptions added
- [ ] Open Graph tags configured
- [ ] Favicon is set
- [ ] robots.txt configured
- [ ] sitemap.xml generated

### Accessibility
- [ ] WCAG AA compliance
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] Color contrast checked
- [ ] Focus indicators visible

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

### Responsive Design
- [ ] Mobile (375px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px+)
- [ ] Large desktop (1920px+)

---

## 📈 Post-Deployment

### Monitoring

**Set up monitoring:**
- [ ] Error tracking (Sentry)
- [ ] Analytics (Google Analytics, PostHog)
- [ ] Performance monitoring (Web Vitals)
- [ ] Uptime monitoring (UptimeRobot)

**Key Metrics:**
- First Contentful Paint (FCP) < 1.8s
- Largest Contentful Paint (LCP) < 2.5s
- Time to Interactive (TTI) < 3.8s
- Cumulative Layout Shift (CLS) < 0.1

### Performance Optimization

```bash
# Lighthouse CI
npx lighthouse https://your-site.com --view

# Check bundle size
npm run build
ls -lh dist/assets/
```

### Health Checks

Create `/health` endpoint:
```typescript
// pages/health.ts
export default function Health() {
  return {
    status: 'ok',
    version: '3.7',
    timestamp: new Date().toISOString(),
  };
}
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions (Already Configured)

File: `.github/workflows/ci.yml`

**Pipeline stages:**
1. Lint & Type Check
2. Build
3. Test
4. Deploy Preview (PRs)
5. Deploy Production (main)

### Deployment Triggers

```yaml
# Deploy on push to main
on:
  push:
    branches: [ main ]

# Deploy on pull request
on:
  pull_request:
    branches: [ main ]

# Deploy on release
on:
  release:
    types: [ published ]
```

---

## 🌍 Custom Domain Setup

### Vercel

1. Go to Project Settings → Domains
2. Add your domain: `app.integratewise.com`
3. Configure DNS:
   ```
   Type: CNAME
   Name: app
   Value: cname.vercel-dns.com
   ```
4. Wait for DNS propagation (5-10 minutes)

### Netlify

1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS:
   ```
   Type: CNAME
   Name: app
   Value: [your-site].netlify.app
   ```

### SSL/TLS

Both Vercel and Netlify provide free SSL certificates via Let's Encrypt.

---

## 🔧 Troubleshooting

### Build Fails

**Check:**
- Node version (should be 18+)
- Dependencies are installed
- Environment variables are set
- No TypeScript errors

**Fix:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### 404 on Routes

**Fix for SPA routing:**

**Vercel:** Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Netlify:** Create `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Environment Variables Not Working

**Check:**
- Variables start with `VITE_`
- Variables are set in deployment platform
- Build was triggered after adding variables

**Fix:**
```bash
# Redeploy
vercel --prod --force
# or
netlify deploy --prod
```

---

## 📚 Additional Resources

- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **Vite Deploy Guide:** https://vitejs.dev/guide/static-deploy.html
- **React Production Build:** https://react.dev/learn/start-a-new-react-project

---

## 🎯 Deployment Checklist

### Pre-Deploy
- [ ] Code reviewed and tested
- [ ] Environment variables configured
- [ ] Build succeeds locally
- [ ] No console errors
- [ ] Performance optimized

### Deploy
- [ ] Choose deployment platform
- [ ] Connect repository
- [ ] Configure build settings
- [ ] Add environment variables
- [ ] Deploy!

### Post-Deploy
- [ ] Verify deployment URL
- [ ] Test all major features
- [ ] Check analytics setup
- [ ] Monitor error logs
- [ ] Set up custom domain (optional)
- [ ] Configure SSL/TLS
- [ ] Test on multiple devices/browsers

---

**Version:** 3.7  
**Last Updated:** March 21, 2026  
**Recommended Platform:** Vercel (for React/Vite apps)
