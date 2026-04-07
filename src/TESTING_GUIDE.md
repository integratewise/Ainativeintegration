# Testing Guide - IntegrateWise Onboarding

## 🚀 Quick Start

**Authentication is currently DISABLED for testing.**

### How to Access Onboarding

1. Navigate to the app: `http://localhost:5173/#app` (or your dev URL + `#app`)
2. You'll skip login and go **directly to the onboarding flow**

---

## 🧪 Testing the 5-Step Onboarding Flow

### Step 1: Use Case Selection (~15s)
**What to test:**
- [ ] All 3 cards render (Personal, Work, Business)
- [ ] Clicking a card selects it (border + checkmark)
- [ ] Gradient icons display correctly
- [ ] Continue button enabled
- [ ] Proceed to Step 2

**Expected behavior:**
- Default selection: "Work"
- Animation on card selection
- Smooth transition to next step

---

### Step 2: Tell us about yourself (~30s)
**What to test:**
- [ ] Industry dropdown shows 11+ industries
- [ ] Department dropdown grouped by 4 categories
- [ ] Company size defaults to "51-200 people"
- [ ] Purple BFF message displays
- [ ] Back button returns to Step 1
- [ ] Continue requires both industry + department
- [ ] Skip option works

**Test combinations:**
```
Try these to see different schemas in Step 2.5:

1. Healthcare × Customer Success
2. Technology/SaaS × Sales
3. Financial Services × Finance
4. Retail/E-commerce × Marketing
5. Professional Services × Customer Success
```

---

### Step 2.5: Choose Your Schema (~45s) **NEW**
**What to test:**
- [ ] North Star metric displays based on industry × department
- [ ] Purple gradient card with metric
- [ ] Core entities pre-selected (blue badges)
- [ ] Industry-specific entities show (purple badges)
- [ ] Extended options visible with "Show All"
- [ ] Entity cards show key fields
- [ ] Selection counter updates ("12 of 24 selected")
- [ ] Recommended connectors preview (blue info box)
- [ ] "What happens next" explanation box
- [ ] Back button returns to Step 2
- [ ] Continue requires at least 1 entity selected

**Expected schemas by combination:**

**Healthcare × Customer Success:**
```
North Star: Net Revenue Retention

Entities:
✅ Customer Accounts
✅ Health Scores
✅ Renewals
✅ Patients (Healthcare-specific)
✅ Providers (Healthcare-specific)
✅ Insurance Claims

Recommended Connectors:
- salesforce
- epic
- cerner
- zendesk
```

**SaaS × Sales:**
```
North Star: ARR Growth

Entities:
✅ Accounts
✅ Contacts
✅ Deals
✅ Leads
✅ Features (SaaS-specific)
✅ Usage Events (SaaS-specific)

Recommended Connectors:
- salesforce
- hubspot
- mixpanel
```

**Things to verify:**
1. Different industry × department = different entities
2. Entity icons and descriptions are clear
3. Scrollable list works (400px height)
4. Toggle selection updates UI instantly
5. Dependencies show ("Required for: renewals")

---

### Step 3: Set Goals & Workspace (~25s)
**What to test:**
- [ ] All 5 primary goals display with icons
- [ ] Goal selection toggles correctly
- [ ] Workspace name input works
- [ ] All 4 workspace types selectable
- [ ] Back button returns to Step 2.5
- [ ] Continue requires workspace name

**Goal options:**
- 📊 Organize knowledge
- ✨ Get insights
- 🎯 Track context
- 👥 Improve team
- ⚡ Automate work

**Workspace types:**
- Company
- Department
- Client
- Project

---

### Step 4: Connect Data Sources (~45s)
**What to test:**
- [ ] All 3 flow sections render (A, B, C)
- [ ] Flow A: 6 connectors (Structured Data, blue)
- [ ] Flow B: 6 connectors (Unstructured Data, purple)
- [ ] Flow C: 3 connectors (AI Chats, green)
- [ ] Connector selection toggles
- [ ] Selection counter in blue info box
- [ ] Skip option works
- [ ] Launch button visible
- [ ] Back button returns to Step 3

**Connector counts:**
```
📊 Flow A (Structured): 6
  - HubSpot 🎯
  - Salesforce ☁️
  - Jira 🔵
  - Airtable 📊
  - PostgreSQL 🐘
  - MySQL 🐬

📄 Flow B (Unstructured): 6
  - Notion 📝
  - Google Drive 📁
  - Confluence 🌐
  - Gmail 📧
  - Slack 💬
  - SharePoint 📑

🤖 Flow C (AI Chats): 3
  - ChatGPT 🤖
  - Claude 🧠
  - Gemini ✨
```

**Note:** OAuth is NOT active yet (just selection for now)

---

### Step 5: Launch Workspace
**What to test:**
- [ ] Console shows "[ONBOARDING COMPLETE]" with all data
- [ ] Console shows "[SPINE INITIALIZED]" with schema details
- [ ] Transitions to workspace
- [ ] No errors in console

**Console output to verify:**
```javascript
[ONBOARDING COMPLETE] {
  useCase: "work",
  industry: "Healthcare",
  department: "Customer Success",
  companySize: "51-200 people",
  selectedEntities: ["accounts", "health_scores", "renewals", "patients"],
  schemaRecommendation: {
    northStar: "Net Revenue Retention",
    connectors: ["salesforce", "zendesk", "epic"],
    modules: ["health-scores", "renewals", "playbooks"]
  },
  primaryGoal: "organize",
  workspaceName: "Acme Corp",
  workspaceType: "client",
  connectors: ["salesforce", "zendesk"]
}

[SPINE INITIALIZED] {
  industry: "Healthcare",
  department: "Customer Success",
  entities: ["accounts", "health_scores", "renewals", "patients"],
  northStar: "Net Revenue Retention"
}
```

---

## 🎯 Key Testing Scenarios

### Scenario 1: Healthcare CS Manager
```
Step 1: Business
Step 2: Healthcare × Customer Success
Step 2.5: Select Accounts, Health Scores, Renewals, Patients
Step 3: "Track context" + "Acme Health" (Client)
Step 4: Select Salesforce, Zendesk, Epic
→ Launch
```

### Scenario 2: SaaS Sales Rep
```
Step 1: Work
Step 2: Technology/SaaS × Sales
Step 2.5: Select Accounts, Contacts, Deals, Features
Step 3: "Get insights" + "Sales Dashboard" (Department)
Step 4: Select HubSpot, Salesforce, Mixpanel
→ Launch
```

### Scenario 3: Finance Professional
```
Step 1: Business
Step 2: Financial Services × Finance/Accounting
Step 2.5: Select Invoices, Payments, Transactions
Step 3: "Organize knowledge" + "Finance Hub" (Company)
Step 4: Select Stripe, QuickBooks
→ Launch
```

---

## 🐛 Common Issues & Fixes

### Issue: Onboarding doesn't start
**Fix:** Make sure you're at `/#app` route

### Issue: Schema selector is empty
**Fix:** Make sure you selected both Industry AND Department in Step 2

### Issue: Can't proceed from Step 2.5
**Fix:** Select at least one entity (core entities should be pre-selected)

### Issue: Console errors about missing components
**Fix:** Check that all imports are correct:
```typescript
import { OnboardingFlowV2 } from "./components/onboarding/onboarding-flow-v2";
import { SchemaSelector } from "./components/onboarding/schema-selector";
import { getSchemaRecommendation } from "./components/onboarding/schema-registry";
```

---

## 📊 What to Look For

### Visual Quality
- [ ] Smooth animations between steps
- [ ] No layout shifts
- [ ] Proper color coding (blue/purple/green for flows)
- [ ] Responsive on mobile and desktop
- [ ] Progress bar updates correctly

### Data Quality
- [ ] Schema changes based on industry × department
- [ ] North Star metric is relevant
- [ ] Recommended connectors make sense
- [ ] Entity descriptions are clear
- [ ] Field previews show relevant fields

### UX Quality
- [ ] Can navigate back/forward
- [ ] Skip options work where available
- [ ] Form validation prevents invalid states
- [ ] Loading states (if any) are clear
- [ ] Success state feels complete

---

## 🔄 Re-enable Authentication Later

When ready to re-enable auth, edit `/App.tsx`:

```typescript
// Change this line (around line 40):
const [authState, setAuthState] = useState<"login" | "onboarding" | "workspace">("onboarding");

// To:
const [authState, setAuthState] = useState<"login" | "onboarding" | "workspace">("login");

// And uncomment the login page block (around line 73):
if (authState === "login") {
  return (
    <LoginPage
      onLogin={handleLogin}
      onSignUp={() => setAuthState("onboarding")}
      onForgotPassword={() => {}}
      error={loginError}
      loading={loginLoading}
    />
  );
}
```

---

## 📝 Test Checklist

### Critical Path
- [ ] Can complete all 5 steps without errors
- [ ] Schema changes based on selections
- [ ] Data logged to console correctly
- [ ] Transitions to workspace successfully

### Edge Cases
- [ ] Back button works from every step
- [ ] Skip options don't break flow
- [ ] Can select/deselect entities
- [ ] Can select/deselect connectors
- [ ] Empty workspace name validation

### Performance
- [ ] No lag between steps
- [ ] Animations are smooth
- [ ] No console errors or warnings
- [ ] Progress bar animates correctly

---

## 🎨 Design Verification

### Colors
- Primary: `#3F5185` (Navy Blue)
- Accent: `#F54476` (Pink)
- Flow A: Blue (#3F5185)
- Flow B: Purple (#7B5EA7)
- Flow C: Emerald (#00C853)

### Typography
- Follows globals.css standards
- No manual font-size classes
- Proper heading hierarchy

### Spacing
- Consistent padding/margins
- 4px grid system
- Proper card spacing

---

**Happy Testing!** 🚀

For issues or questions, check:
- `/components/onboarding/README.md`
- `/components/onboarding/SCHEMA_HYDRATION_FLOW.md`
- `/guidelines/Guidelines.md`
