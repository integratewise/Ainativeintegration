# Quick Start Guide

**IntegrateWise OS — Get Up and Running in 5 Minutes**

---

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/NirmalPrinceJ/integratewise-live.git
cd integratewise-live

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at: **http://localhost:5173**

---

## 🎯 Quick Navigation

### Marketing Site
```
http://localhost:5173/               → Landing page
http://localhost:5173/#technical     → Technical page
http://localhost:5173/#problem       → Problem page
http://localhost:5173/#audience      → Audience page
http://localhost:5173/#pricing       → Pricing page
```

### Application
```
http://localhost:5173/#app           → Onboarding (6 steps)
                                       → Then Workspace
```

---

## 📋 Test the Complete Flow

### 1. Open the App
```
http://localhost:5173/#app
```

### 2. Complete Onboarding (6 Steps)

**Step 1: Identity**
- Workspace: "Acme Revenue Operations"
- Organization: "Acme Corporation"
- Your Name: "John Smith"
- Click → Continue

**Step 2: Domain Schema**
- Domain: "REVOPS"
- Industry: "Technology / SaaS"
- Department: "Customer Success"
- Select entities: Check recommended boxes
- Click → Continue

**Step 3: Role & Scope**
- Role: "Admin"
- Team Size: "51-200 people"
- Click → Continue

**Step 4: Tool Connections**
- Select connectors (optional)
- Click → Continue

**Step 5: AI Loader**
- Upload files (optional)
- Click → Continue

**Step 6: Activate**
- Review configuration
- Toggle preferences
- Click → "Activate Workspace"
- **Wait ~2 seconds**
- ✅ Workspace loads!

---

## 🔍 What to Check

### Browser Console
Look for these logs:
```
[ONBOARDING COMPLETE - 6 STEPS] { ... }
[SPINE INITIALIZED] { ... }
```

### UI Features
- ✅ Progress bar animates through 6 steps
- ✅ Each step has validation
- ✅ Back button works
- ✅ Schema changes based on industry × department
- ✅ Connector grid filters by domain
- ✅ Summary shows all selections
- ✅ Loading spinner on activation
- ✅ Smooth redirect to workspace

---

## 📁 Project Structure

```
/
├── components/
│   ├── onboarding/
│   │   ├── onboarding-flow-complete.tsx    ← 6-step flow
│   │   ├── connector-grid.tsx              ← Step 4
│   │   ├── schema-selector.tsx             ← Step 2
│   │   └── schema-registry.ts              ← 12×11 model
│   ├── workspace-shell.tsx                 ← Main workspace
│   ├── landing/                            ← Marketing pages
│   └── ui/                                 ← UI components
├── api/
│   └── onboarding-api.ts                   ← API client
├── design-tokens/                          ← Design system
├── imports/
│   └── pasted_text/
│       └── user-journey-flow.md            ← Spec
├── App.tsx                                 ← Main entry
├── USER_JOURNEY.md                         ← Complete docs
├── IMPLEMENTATION_SUMMARY.md               ← What was built
├── QUICK_START.md                          ← This file
└── Guidelines.md                           ← v3.7 rules
```

---

## 🎨 Key Features

### 12 × 11 Model
```
12 Departments × 11 Industries = 132 configurations

Example:
- Healthcare × Sales → Patient, Provider, Claim entities
- SaaS × Customer Success → Account, Contact, Ticket entities
```

### Data Flows
```
Flow A (Blue):     Structured data (CRM, billing)
Flow B (Purple):   Unstructured data (docs, files)
Flow C (Emerald):  AI-generated content
```

### Architecture Layers
```
1. Experience Layer    → UI
2. Gateway Layer       → Routing
3. Workspace Runtime   → Orchestration
4. External Connectivity → Connectors
5. Data Plane          → Pipeline
6. SSOT / Spine        → Truth
7. Cognitive Layer     → AI
8. AI Providers        → LLMs
```

---

## 🛠️ Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## 📝 Modify Onboarding

### Change Step Content
Edit: `/components/onboarding/onboarding-flow-complete.tsx`

### Add/Remove Industries
Edit the `INDUSTRIES` array:
```typescript
const INDUSTRIES = [
  "Technology / SaaS",
  "Healthcare",
  // Add more...
];
```

### Add/Remove Departments
Edit the `DEPARTMENTS` object:
```typescript
const DEPARTMENTS = {
  "Revenue & Growth": [
    "Sales",
    "Marketing",
    // Add more...
  ],
};
```

### Add/Remove Domains
Edit the `DOMAINS` array:
```typescript
const DOMAINS = [
  { value: "REVOPS", label: "Revenue Operations", icon: TrendingUp },
  // Add more...
];
```

---

## 🔗 Connect to Backend

### Update API Base URL
Edit: `/api/onboarding-api.ts`

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
```

### Set Environment Variables
Create `.env.local`:

```env
VITE_API_BASE_URL=https://api.integratewise.com
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_key
```

### Enable Real API Calls
The API client is ready! Just implement backend endpoints:

```
POST /api/v1/workspace/initialize
POST /api/v1/workspace/initialize-spine
POST /api/v1/workspace/configure-rbac
GET  /api/v1/connectors
POST /api/v1/workspace/complete-onboarding
```

---

## 🧪 Testing Scenarios

### Test Different Domains
1. Try **REVOPS** → See RevOps-specific connectors
2. Try **CUSTOMER_SUCCESS** → See CS-specific entities
3. Try **SALES** → See sales pipeline entities

### Test Different Industries
1. **Healthcare** → Patient, Provider entities
2. **SaaS** → Account, Subscription entities
3. **Manufacturing** → Supplier, Order entities

### Test Validation
1. Try clicking "Continue" without filling fields → Disabled
2. Try going back → Works from any step
3. Try selecting 0 entities in Step 2 → Cannot proceed

### Test Optional Steps
1. Skip connectors in Step 4 → Should work
2. Skip files in Step 5 → Should work
3. Must complete Steps 1, 2, 3, 6 → Required

---

## 📚 Documentation

### Essential Reading
1. **`/USER_JOURNEY.md`** — Complete user journey flow
2. **`/IMPLEMENTATION_SUMMARY.md`** — What was built
3. **`/Guidelines.md`** — Development rules v3.7
4. **`/imports/pasted_text/user-journey-flow.md`** — Original spec

### API Reference
- **`/api/onboarding-api.ts`** — All API functions with TypeScript types

### Design System
- **`/design-tokens/README.md`** — Complete token documentation
- **`/design-tokens/tokens.ts`** — TypeScript constants
- **`/design-tokens/tokens.css`** — CSS custom properties

---

## 🎯 Common Tasks

### Change Onboarding Steps
Edit: `/components/onboarding/onboarding-flow-complete.tsx`

**To add a step:**
1. Increment total steps (currently 6)
2. Add new step JSX in AnimatePresence
3. Update `canProceed()` validation
4. Update progress calculation

**To remove a step:**
1. Decrement total steps
2. Remove step JSX
3. Update validation
4. Update API data structure

### Change Workspace Behavior
Edit: `/App.tsx`

```typescript
const handleOnboardingComplete = useCallback(async (data) => {
  // Your custom logic here
  console.log("Onboarding data:", data);
  
  // Initialize systems
  await spine.initialize({ ... });
  
  // Redirect or set state
  setAuthState("workspace");
}, [spine]);
```

### Enable Authentication
Edit: `/App.tsx`

Uncomment the login page:
```typescript
// Change this line:
const [authState, setAuthState] = useState("onboarding");

// To this:
const [authState, setAuthState] = useState("login");

// And uncomment:
if (authState === "login") {
  return (
    <LoginPage
      onLogin={handleLogin}
      onSignUp={() => setAuthState("onboarding")}
      // ...
    />
  );
}
```

---

## 🐛 Troubleshooting

### App not loading?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### TypeScript errors?
```bash
# Run type check
npm run type-check

# If errors, check imports and types
```

### Console errors?
- Open browser DevTools (F12)
- Check Console tab
- Look for red errors
- Check Network tab for failed requests

### Onboarding not progressing?
- Check if required fields are filled
- Check console for validation errors
- Verify `canProceed()` function logic

---

## 🎨 Design Tokens

### Colors
```typescript
import { colors } from './design-tokens/tokens';

// Brand
colors.brand.primary    // #3F5185
colors.brand.accent     // #F54476

// Semantic
colors.semantic.success // #00C853
colors.semantic.warning // #FF9800
colors.semantic.danger  // #F54476
```

### Spacing
```typescript
import { spacing } from './design-tokens/tokens';

spacing[0]   // 0px
spacing[1]   // 4px
spacing[2]   // 8px
spacing[3]   // 12px
spacing[4]   // 16px
spacing[6]   // 24px
spacing[8]   // 32px
spacing[12]  // 48px
```

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

See `/DEPLOYMENT.md` for complete deployment guide.

---

## 📞 Support

**Need help?**
- **Documentation**: See `/USER_JOURNEY.md`
- **Architecture**: See `/Guidelines.md`
- **API Reference**: See `/api/onboarding-api.ts`
- **Issues**: GitHub Issues

---

## ✅ Quick Checklist

### First Time Setup
- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Open `http://localhost:5173`
- [ ] Test landing page
- [ ] Navigate to `/#app`
- [ ] Complete 6-step onboarding
- [ ] Check console logs
- [ ] Verify workspace loads

### Before Committing
- [ ] Run `npm run type-check`
- [ ] Run `npm run lint`
- [ ] Test all 6 onboarding steps
- [ ] Check for console errors
- [ ] Test responsive design
- [ ] Verify design tokens usage

---

**Happy coding! 🎉**

Start by testing the onboarding flow at: **http://localhost:5173/#app**

---

**Version:** 3.7  
**Last Updated:** March 21, 2026  
**Status:** Ready for development
