# Complete User Journey: Landing → Workspace → AI

**IntegrateWise OS — From First Visit to AI-Powered Insights**

Based on: `/imports/pasted_text/user-journey-flow.md`

---

## 🎯 Journey Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER JOURNEY MAP                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   LANDING    →    AUTH    →  ONBOARDING  →    WORKSPACE         │
│   ───────         ────       ──────────       ─────────         │
│      ↓             ↓             ↓                ↓             │
│   Marketing     Signup        6 Steps          L1 + L2          │
│   Content      (PKCE)        Foundation       Cognitive         │
│                                                   ↓             │
│                                             Intelligence        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Time to Value:** ~90 seconds from signup to first workspace view

---

## 📍 STAGE 1: Landing Page

### Entry Point
- **URL**: `/` or `https://integratewise.com`
- **Component**: `HomePage` (Anti-Gravity Design)
- **Purpose**: Convert visitors to users

### Key Elements

| Section | Purpose | CTA Action |
|---------|---------|------------|
| **Hero** | Value proposition | "Get Started" → `/signup` |
| **Problem** | Pain points | Educational |
| **Pillars** | Core features (The Spine, L1, L2) | Educational |
| **Use Cases** | Domain examples | Pre-selects domain |
| **Pricing** | Transparent pricing | "Start Free" → `/signup` |
| **Footer** | Trust & navigation | Links |

### URL Parameters (Marketing Attribution)

```typescript
// Pre-select domain
/?domain=REVOPS              // Revenue Operations
/?domain=CUSTOMER_SUCCESS    // Customer Success
/?domain=SALES               // Sales

// Attribution tracking
/?ref=linkedin               // LinkedIn campaign
/?ref=productHunt            // Product Hunt
/?utm_source=google&utm_medium=cpc
```

### Conversion Triggers

**Primary CTA:**
- Large "Get Started" button in hero
- Fixed header CTA (sticky on scroll)
- Section-specific CTAs

**Secondary Actions:**
- "Learn More" → Scroll to features
- "View Demo" → Video/interactive demo
- "Contact Sales" → Sales form

---

## 📍 STAGE 2: Authentication

### Entry Point
- **URL**: `/signup` or `/login` → redirected to `/#app`
- **Method**: Supabase PKCE (Proof Key for Code Exchange)
- **Components**: `LoginPageNew` (new split-panel design)

### Design

**Split Panel Layout:**
- **Left Panel (50%)**: Brand & marketing
  - IntegrateWise logo and tagline
  - Value proposition: "Unify your tools. Amplify your growth."
  - Connector icons (50+ integrations)
  - Large IL avatar
  - Gradient background with animations

- **Right Panel (50%)**: Login form
  - "Welcome back" heading
  - Email + password inputs
  - "Forgot password?" link
  - Sign in button
  - Social login (Google, SSO)
  - "Start free trial" link

### Auth Flow

```
Landing Page (/)
    ↓
Click "Get Started" or navigate to /#app
    ↓
┌─────────────┐    ┌──────────────┐    ┌──────────────┐
│   Login     │───→│   Validate   │───→│  Onboarding  │
│   Page      │    │   (Demo)     │    │   6 Steps    │
└─────────────┘    └──────────────┘    └──────────────┘
      │
      ├──→ Email/Password (demo: accepts any)
      ├──→ Google OAuth (TODO)
      └──→ SSO (TODO)
```

### Auth Methods

1. **Email/Password** (Demo Mode)
   - Currently accepts any email/password
   - Shows loading state for 1 second
   - Auto-redirects to onboarding
   - TODO: Replace with real Supabase auth

2. **Google OAuth** (Placeholder)
   - Button present, functionality pending
   - TODO: Implement Google OAuth flow

3. **SSO** (Placeholder)
   - Button present with Sparkles icon
   - TODO: Implement SSO flow

### Post-Auth Flow

```typescript
// After successful login:
setAuthState("onboarding")  // Goes to 6-step onboarding
                            // NOT directly to workspace
```

**Key Change:** Login → Onboarding → Workspace  
(Previously was: Login → Workspace, skipping onboarding)

---

## 📍 STAGE 3: Onboarding (6 Steps)

### Overview

**Component**: `OnboardingFlowComplete`  
**Location**: `/components/onboarding/onboarding-flow-complete.tsx`  
**Duration**: ~2-3 minutes  
**Progress Bar**: Visual 6-step indicator  

```
┌─────────────────────────────────────────────────────────────────┐
│                    ONBOARDING FLOW (L0)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐         │
│  │ Step 1  │ → │ Step 2  │ → │ Step 3  │ → │ Step 4  │ → ...   │
│  │Identity │   │ Schema  │   │  Scope  │   │Connect  │         │
│  └────┬────┘   └────┬────┘   └────┬────┘   └────┬────┘         │
│       │             │             │             │               │
│       ↓             ↓             ↓             ↓               │
│   ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐            │
│   │Tenant │    │Spine  │    │RBAC   │    │OAuth  │            │
│   │Create │    │Config │    │Setup  │    │Init   │            │
│   └───────┘    └───────┘    └───────┘    └───────┘            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### Step 1: Identity — Create Workspace Foundation

**Purpose**: Create workspace foundation  
**Duration**: ~15 seconds  
**Required**: ✅ Yes  

#### Fields

```typescript
{
  workspaceName: string;      // "Acme Revenue Operations"
  organizationName: string;   // "Acme Corporation"
  userName?: string;          // "John Smith" (optional)
}
```

#### API Call

```typescript
POST /api/v1/workspace/initialize
{
  workspace_name: "Acme Revenue Operations",
  organization_name: "Acme Corporation",
  user_name: "John Smith"
}

// Response
{
  success: true,
  tenant_id: "uuid-here",
  workspace_name: "Acme Revenue Operations"
}
```

#### Next Step
✅ Sets up tenant record  
✅ Creates initial workspace configuration  
→ Proceeds to Step 2: Domain Schema  

---

### Step 2: Domain Schema — Adaptive Spine Configuration

**Purpose**: Select business domain for adaptive schema (12 × 11 model)  
**Duration**: ~30 seconds  
**Required**: ✅ Yes  

#### Selections

**1. Domain (9 options)**
- REVOPS (Revenue Operations)
- CUSTOMER_SUCCESS
- SALES
- MARKETING
- PRODUCT_ENGINEERING
- BIZOPS (Business Operations)
- FINANCE
- SERVICE
- PROCUREMENT

**2. Industry (11 options)**
- Technology / SaaS
- Professional Services
- Healthcare
- Education
- Manufacturing
- Automotive / Mobility
- Retail / E-commerce
- Financial Services
- Logistics / Supply Chain
- Media / Entertainment
- Government / Public Sector

**3. Department (12 options, grouped)**
- Revenue & Growth: Sales, Marketing, RevOps, Customer Success
- Technology: Engineering, Product Management
- Operations: Support, Service Ops, Supply Chain
- Corporate: Finance, Legal, HR

**4. Schema Entities**
- Component: `SchemaSelector`
- Shows recommended entities based on industry × department
- User can select/deselect entity types
- Example: Healthcare × Sales = Accounts, Contacts, Patients, Providers

#### API Call

```typescript
POST /api/v1/workspace/initialize-spine
{
  domain: "REVOPS",
  industry: "Technology / SaaS",
  department: "Customer Success",
  selected_entities: [
    "accounts",
    "contacts",
    "opportunities",
    "activities"
  ]
}

// Response
{
  success: true,
  schema_config: {
    enabled_entities: [...],
    domain: "REVOPS",
    industry: "Technology / SaaS"
  }
}
```

#### The 12 × 11 Model

```
12 Departments × 11 Industries = 132 configurations
Each configuration has unique entity recommendations
```

Example combinations:
- Healthcare × Sales → Patient, Provider, Claim entities
- SaaS × Customer Success → Account, Contact, Ticket entities
- Manufacturing × Supply Chain → Supplier, Order, Shipment entities

---

### Step 3: Role & Scope — RBAC Configuration

**Purpose**: Configure access control and team structure  
**Duration**: ~15 seconds  
**Required**: ✅ Yes  

#### Fields

**1. Role**
- Admin: Full access to all features
- Manager: Manage team and workflows
- User: Standard workspace access

**2. Team Size**
- Just me
- 2-10 people
- 11-50 people
- 51-200 people
- 201-500 people
- 500+ people

#### API Call

```typescript
POST /api/v1/workspace/configure-rbac
{
  role: "admin",
  team_size: "51-200 people",
  department: "Customer Success"
}

// Response
{
  success: true,
  rbac_config: {
    role: "admin",
    permissions: [...]
  }
}
```

#### RBAC Rules Applied

Based on role selection:
- **Admin**: Can configure workspace, manage users, access all modules
- **Manager**: Can manage team, approve actions, view analytics
- **User**: Can view data, create tasks, limited editing

---

### Step 4: Tool Connections — Connector OAuth

**Purpose**: Select connectors to sync data (Flow A, B, C classification)  
**Duration**: ~30 seconds  
**Required**: ❌ Optional (can skip)  

#### Connector Grid

**Component**: `ConnectorGrid`  
**Filtered by**: Domain + Department  
**Displayed**: Flow type badges (A, B, C)  

#### Flow Classification

**Flow A — Structured Data (Blue)**
- CRM: Salesforce, HubSpot, Pipedrive
- Support: Zendesk, Intercom, Freshdesk
- Project: Jira, Linear, Asana
- Billing: Stripe, QuickBooks, Xero

**Flow B — Unstructured Data (Purple)**
- Docs: Notion, Confluence, SharePoint
- Files: Google Drive, Dropbox, Box
- Email: Gmail, Outlook
- Communication: Slack, Teams

**Flow C — AI Content (Emerald)**
- AI Chat: ChatGPT, Claude, Gemini
- Custom: MCP servers, Slack AI

#### API Calls

```typescript
// Get available connectors
GET /api/v1/connectors?domain=REVOPS&department=sales

// Response
[
  {
    id: "salesforce",
    name: "Salesforce",
    provider: "salesforce",
    flow_type: "A",
    category: "CRM",
    auth_type: "oauth2",
    status: "available"
  },
  // ...more connectors
]

// Initiate OAuth (opens new window)
GET /oauth/:provider/authorize?tenant_id=<tenant_id>

// OAuth callback (handled by OAuth handler)
GET /oauth/callback/:provider?code=xxx&state=xxx
```

#### Sync Phases (After OAuth)

```
Phase 1: CREAMY (Initial, ~60s)
  ↓
Phase 2: NEEDED (Selective expansion)
  ↓
Phase 3: DELTA (Continuous, webhooks/polling)
```

---

### Step 5: AI Loader — File Upload (Optional)

**Purpose**: Upload documents for Flow B processing  
**Duration**: ~30 seconds  
**Required**: ❌ Optional  

#### Features

- **Drag & drop**: Multi-file upload
- **Supported formats**: PDF, DOCX, CSV, TXT, MD
- **Max size**: 10MB per file
- **Storage**: Cloudflare R2
- **Processing**: Pipeline → Spine + Knowledge

#### Flow B Path

```
PDF Upload
   ↓
R2 Storage
   ↓
Pipeline (file metadata)
   ↓
├─→ Spine (context_extractions, files)
└─→ KNOWLEDGE_QUEUE
   ↓
Chunking + Embedding
   ↓
knowledge_chunks (pgVector)
```

#### API Call

```typescript
POST /api/v1/workspace/upload-files
Content-Type: multipart/form-data

FormData: {
  files: [File, File, ...]
}

// Response
{
  success: true,
  uploaded: [
    {
      filename: "document.pdf",
      size: 1024000,
      r2_key: "tenant-xxx/document.pdf",
      status: "processing"
    }
  ]
}
```

---

### Step 6: Activate — Foundation Activation

**Purpose**: Complete onboarding and activate workspace  
**Duration**: ~10 seconds  
**Required**: ✅ Yes  

#### Summary Display

Shows configuration summary:
- Workspace name
- Domain configuration (domain + industry + department)
- Entities selected (count)
- Connectors (count)
- Files uploaded (count)

#### Preferences

```typescript
{
  enableAI: boolean;              // AI Twin, signals, cognitive features
  enableRealtime: boolean;        // WebSocket, live updates
  enableNotifications: boolean;   // Alerts for signals, HITL
}
```

#### Activation Actions

When user clicks "Activate Workspace":

1. **Mark Complete**
   ```typescript
   onboarding_complete = true
   ```

2. **Trigger Initial Sync**
   - Start Creamy phase for connected connectors
   - Expected completion: ~60 seconds

3. **Initialize Spine**
   - Create schema tables based on selections
   - Seed with empty state

4. **Redirect to Workspace**
   ```typescript
   window.location.href = "/app"
   ```

#### API Call

```typescript
POST /api/v1/workspace/complete-onboarding
{
  tenant_id: "uuid-here",
  onboarding_data: {
    domain: "REVOPS",
    connectors: ["salesforce", "hubspot"],
    preferences: {
      enable_notifications: true,
      enable_ai: true,
      enable_realtime: true
    }
  }
}

// Response
{
  success: true,
  onboarding_complete: true,
  redirect_url: "/app",
  sync_jobs: [
    {
      connector: "salesforce",
      phase: "creamy",
      status: "queued"
    }
  ]
}
```

---

## 📍 STAGE 4: Workspace (L1 + L2)

### Entry Point
- **URL**: `/app`
- **Component**: `WorkspaceShellNew`
- **Condition**: `onboarding_complete === true`

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    WORKSPACE ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                     L1 WORKSPACE                         │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │   │
│  │  │ Navigation  │  │  Content    │  │  Context Panel  │  │   │
│  │  │  (Shell)    │  │  (Modules)  │  │   (Details)     │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ↓  (⌘J to open)                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                     L2 COGNITIVE                         │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌────────────────��┐  │   │
│  │  │   Think     │  │   Signals   │  │    Actions      │  │   │
│  │  │  (Analysis) │  │  (Alerts)   │  │   (HITL)        │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### L1: Department Workspace

**Domain-Specific Navigation** (based on Step 2 selection)

Example: Customer Success (CTX_CS)
- Home Dashboard
- Accounts
- Contacts
- Health Scores
- Renewals
- Expansion Opportunities
- Analytics
- Tasks
- Calendar
- Knowledge Space
- Settings

**Initial Load APIs**

```typescript
// Dashboard data
GET /api/v1/workspace/dashboard
{
  domain: "CUSTOMER_SUCCESS",
  metrics: { ... },
  recent_activities: [ ... ]
}

// Tenant config
GET /api/v1/workspace/tenant-config
{
  workspace_name: "...",
  domain: "...",
  schema_config: { ... }
}

// Readiness status
GET /api/v1/workspace/readiness
{
  overall_readiness: 45,
  buckets: {
    B0_B1: 30,  // Empty/Minimal
    B2_B3: 50,  // Partial
    B4: 15,     // Good
    B5_B7: 5    // Rich (Intelligence-ready)
  },
  connector_sync_status: {
    salesforce: {
      phase: "creamy",
      progress: 80,
      last_sync: "2026-03-21T10:30:00Z"
    }
  }
}
```

### L2: Cognitive Layer

**Activation**: Press ⌘J or click Intelligence button  
**Display**: Sliding panel or modal overlay  
**Context-Aware**: Shows different content based on L1 view  

#### L2 Tabs

```
[Truth] [Context] [IQ Hub] [Evidence] [Signals] [Think Engine]
[Act] [Approval] [Governance] [Adjust] [Loop] [Audit] [Agents] [Twin]
```

#### Example: Customer Success View

When viewing an account in L1:
- **Signals**: Churn risk alerts, health score changes
- **Think**: AI analysis of account health
- **Actions**: Recommended next steps (HITL approval required)
- **Evidence**: Source citations from Spine + Knowledge

#### L2 APIs

```typescript
// Get signals
GET /api/v1/cognitive/signals?entity_type=account&entity_id=123

// Get HITL queue
GET /api/v1/cognitive/hitl/queue

// Get knowledge inbox (Flow C triage)
GET /v1/knowledge/inbox
```

### Real-Time Updates

```typescript
// WebSocket connection
const ws = new WebSocket("ws://api.../ws?tenant_id=xxx");

ws.onmessage = (event) => {
  const update = JSON.parse(event.data);
  // Update UI with new data
};

// Server-Sent Events (alternative)
const eventSource = new EventSource("/stream/events?tenant_id=xxx");

eventSource.onmessage = (event) => {
  const update = JSON.parse(event.data);
  // Update UI
};
```

---

## 📍 STAGE 5: Data Flow (Backend)

### Connector Sync Trigger

After onboarding complete:

```
Onboarding Complete
   ↓
Tenant Lifecycle Update (lifecycle_stage = "active")
   ↓
connector-sync (cron every 5 min)
   ↓
For each connected connector:
   ↓
┌─────────────────────────────────────────────────────────┐
│                     SYNC PHASES                         │
│                                                         │
│  Phase 1: CREAMY (initial, ~60s)                       │
│     ↓                                                   │
│  Phase 2: NEEDED (selective expansion)                 │
│     ↓                                                   │
│  Phase 3: DELTA (continuous, webhooks/polling)         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Flow A: Structured Data

```
HubSpot/Salesforce
   ↓
Webhook/Poll
   ↓
Gateway (/webhooks/:provider)
   ↓
Connector Service
   ↓
Loader (handleSync)
   ↓
PIPELINE_QUEUE (stage: "analyze")
   ↓
Normalizer (8 stages)
   ↓
Spine Write (SSOT)
   ↓
├─→ Signal Queue (if B5-B7)
└─→ Real-time Broadcast
```

### Flow B: Unstructured Content

```
PDF Upload (Step 5)
   ↓
R2 Storage
   ↓
Pipeline (with file metadata)
   ↓
├─→ Spine (context_extractions, files)
└─→ KNOWLEDGE_QUEUE
   ↓
Chunking + Embedding
   ↓
knowledge_chunks (pgVector)
```

### Flow C: AI Sessions

```
AI Twin / MCP / Slack
   ↓
D1 Buffer (triage_results)
   ↓
Triage Bot Evaluation
   ↓
Inbox UI (awaiting_approval)
   ↓
User Approval (PATCH /v1/knowledge/triage/:id)
   ↓
Memory Consolidator
   ↓
knowledge_library (compounding)
```

### Cognitive Loop

```
Entity Matures (B5-B7)
   ↓
SIGNAL_QUEUE
   ↓
Intelligence Consumer
   ↓
Python Intelligence (analyze)
   ↓
Store Signal (Supabase)
   ↓
├─→ Think Engine (reasoning)
├─→ Govern (policy check)
└─→ HITL (if requires_approval)
   ↓
User Approval (in L2 Approval tab)
   ↓
Act Execution
   ↓
Connector Write-Back → Pipeline → Spine
```

---

## 🎯 Key User Milestones

| Milestone | Trigger | Backend Action | Time to Reach |
|-----------|---------|----------------|---------------|
| **Landing Visit** | `/` | Analytics event | 0s |
| **Signup Start** | `/signup` | Page view | +5s |
| **Account Created** | Supabase auth | Create tenant record | +20s |
| **Step 1 Complete** | Identity form | `POST /initialize` | +35s |
| **Step 2 Complete** | Domain select | `POST /initialize-spine` | +65s |
| **Step 3 Complete** | Role select | `POST /configure-rbac` | +80s |
| **Step 4 Complete** | OAuth success | Store tokens, trigger sync | +110s |
| **Step 5 Complete** | File upload | Upload to R2 | +140s |
| **Step 6 Complete** | Activation | `onboarding_complete = true` | +150s |
| **First Data** | Creamy sync | Dashboard populated | +210s (3.5 min) |
| **First Signal** | B5-B7 analysis | Alert shown in L2 | +300s (5 min) |
| **First Action** | HITL approval | External write-back | Variable |

---

## 📊 Success Metrics

| Metric | Target | Tracking Method |
|--------|--------|-----------------|
| **Landing → Signup** | > 15% | Analytics conversion funnel |
| **Signup → Onboarding Start** | > 90% | Auth completion rate |
| **Onboarding → Complete** | > 70% | `onboarding_complete` flag |
| **Onboarding → First Connector** | > 50% | `connected_connectors` count |
| **First Sync → Dashboard View** | < 60s | Time to first data |
| **Daily Active Users** | Growth | Session tracking |
| **Connector Retention** | > 80% | 30-day connector usage |
| **Intelligence Adoption** | > 40% | L2 tab interactions |

---

## 🔗 Complete API Call Sequence

### 1. Landing → Signup
```
GET  /                           → HomePage (marketing)
GET  /signup                     → SignupPage
```

### 2. Signup → Auth
```
POST /auth/v1/signup             → Supabase auth
GET  /auth/v1/callback           → OAuth callback
GET  /app                        → AppShell (checks onboarding)
```

### 3. Onboarding (6 Steps)
```
POST /api/v1/workspace/initialize              → Step 1: Identity
POST /api/v1/workspace/initialize-spine        → Step 2: Domain
POST /api/v1/workspace/configure-rbac          → Step 3: Role
GET  /api/v1/connectors?domain=xxx             → Step 4: Connectors
GET  /oauth/:provider/authorize                → Step 4: OAuth start
GET  /oauth/callback/:provider                 → Step 4: OAuth complete
POST /api/v1/workspace/upload-files            → Step 5: Files
POST /api/v1/workspace/complete-onboarding     → Step 6: Activate
```

### 4. Workspace
```
GET  /api/v1/workspace/dashboard               → Dashboard data
GET  /api/v1/workspace/tenant-config           → Schema config
GET  /api/v1/workspace/readiness               → Hydration status
GET  /api/v1/cognitive/hitl/queue              → HITL tasks
GET  /v1/knowledge/inbox                       → Triage inbox
WS   /ws?tenant_id=xxx                         → Real-time updates
```

### 5. Data Operations
```
GET  /api/v1/workspace/entities                → List entities
GET  /api/v1/spine/:entity_type                → Spine read
POST /api/v1/pipeline/write                    → Spine write (via pipeline)
POST /knowledge/search                         → Semantic search
PATCH /v1/knowledge/triage/:id                 → Approve/Discard
```

---

## 🚀 Implementation Status

### ✅ Completed
- [x] Landing page with anti-gravity design
- [x] Auth flow (disabled for testing)
- [x] 6-step onboarding UI
- [x] Workspace shell structure
- [x] L1 navigation templates
- [x] L2 cognitive layer framework
- [x] Design tokens system
- [x] Connector grid component
- [x] Schema selector component

### 🚧 In Progress
- [ ] Real OAuth integration
- [ ] Backend API endpoints
- [ ] Creamy → Needed → Delta sync phases
- [ ] Real-time WebSocket connection
- [ ] Intelligence activation

### ⏳ Planned
- [ ] File upload Flow B processing
- [ ] Knowledge search implementation
- [ ] HITL approval workflows UI
- [ ] Signal detection and display
- [ ] AI Twin implementation

---

## 📚 Files Reference

### Components
```
/components/onboarding/onboarding-flow-complete.tsx  ✅ 6-step flow
/components/onboarding/connector-grid.tsx            ✅ Connector selection
/components/onboarding/schema-selector.tsx           ✅ Entity selection
/components/workspace/workspace-shell-new.tsx        ✅ L1 + L2 shell
/components/landing/HomePage.tsx                     ✅ Landing page
```

### API
```
/api/onboarding-api.ts                               ✅ API client
```

### Documentation
```
/imports/pasted_text/user-journey-flow.md            📖 Source spec
/USER_JOURNEY.md                                     📖 This file
/Guidelines.md                                       📖 Development rules
/TESTING_GUIDE.md                                    📖 Testing scenarios
```

---

**Base Entry**: Landing Page (`/`)  
**End State**: AI-Powered Workspace with live data and intelligence  
**Time to Value**: ~3-5 minutes from first visit  

---

**Version**: 3.7  
**Last Updated**: March 21, 2026  
**Status**: Implementation in progress