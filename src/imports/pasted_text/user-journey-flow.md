# Complete User Journey: Landing → Workspace → Data Flow

> **End-to-End Flow Documentation**  
> From first website visit to AI-powered insights
>
> This document describes the intended journey. It should not be treated as fully shipped wiring until onboarding, connector OAuth, file loader, activation, and L2 API contracts are verified against the live repo implementation.

---

## 🎯 Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         USER JOURNEY MAP                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   LANDING        AUTH           ONBOARDING           WORKSPACE             │
│   ───────        ────           ──────────           ─────────             │
│                                                                             │
│   HomePage    →  Signup  →   6-Step Flow   →    WorkspaceShell            │
│      ↓             ↓            ↓                    ↓                     │
│   Marketing     Auth          Foundation          L1 + L2                  │
│   Content      (PKCE)          Setup            + Cognitive                 │
│                                                      ↓                     │
│                                               Connectors → Pipeline        │
│                                                      ↓                     │
│                                                    Spine                   │
│                                                      ↓                     │
│                                               AI Intelligence              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📍 STAGE 1: Landing (Marketing)

### Entry Point
- **URL**: `/`
- **Component**: `HomePage` (Anti-Gravity Design)
- **Purpose**: Convert visitors to users

### Key Elements
| Element | Purpose | CTA Action |
|---------|---------|------------|
| Hero Section | Value prop | "Get Started" → `/signup` |
| Use Cases | Domain selection | Pre-selects domain in onboarding |
| Features | Capabilities | Educational |
| Social Proof | Trust building | Conversion support |

### URL Parameters
```
/?domain=REVOPS          # Pre-selects Revenue Operations
/?domain=CUSTOMER_SUCCESS # Pre-selects Customer Success
/?ref=linkedin           # Attribution tracking
```

### Technical Details
```typescript
// apps/web/src/routes.tsx
{ index: true, Component: HomePage }

// Navigation
{ path: "signup", Component: SignupPage }
```

---

## 📍 STAGE 2: Authentication (PKCE)

### Entry Point
- **URL**: `/signup` or `/app` (redirects if not auth)
- **Components**: `SignupPage` → `LoginPage`
- **Method**: Supabase PKCE (Proof Key for Code Exchange)

### Auth Flow
```
┌─────────────┐    ┌──────────────┐    ┌──────────────┐    ┌─────────────┐
│   Signup    │───→│   Supabase   │───→│   Callback   │───→│   /app      │
│   Form      │    │   Auth       │    │   Handler    │    │   Entry     │
└─────────────┘    └──────────────┘    └──────────────┘    └─────────────┘
      │
      ├──→ Email/Password
      ├──→ Google OAuth
      └──→ GitHub OAuth
```

### Onboarding Flag Check
```typescript
// After auth, check user metadata
interface OnboardingMetadata {
  onboarding_complete: boolean;
  onboarding_step: number;
  workspace_name?: string;
  domain?: Domain;
}

// If onboarding_complete === false → Show OnboardingFlowNew
// If onboarding_complete === true → Show WorkspaceShell
```

### API Calls
```typescript
// 1. Sign up
POST /auth/v1/signup
{ email, password }

// 2. Get session
GET /auth/v1/session

// 3. Check tenant config
GET /api/v1/workspace/tenant-config
Headers: x-tenant-id: <user_id>
```

---

## 📍 STAGE 3: Onboarding (6 Steps)

### Entry Point
- **URL**: `/app` (within AppShell)
- **Component**: `OnboardingFlowNew`
- **Condition**: `onboarding_complete === false`

### Step-by-Step Flow

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

### Step 1: Identity
- **Purpose**: Create workspace foundation
- **Fields**:
  - Workspace name
  - Organization name
  - User name
- **API Call**:
```typescript
POST /api/v1/workspace/initialize
{
  workspace_name: string,
  organization_name: string,
  user_name: string
}
```

### Step 2: Domain Schema
- **Purpose**: Select business domain for adaptive schema
- **Options**:
  - REVOPS (Revenue Operations)
  - CUSTOMER_SUCCESS
  - SALES
  - MARKETING
  - PRODUCT_ENGINEERING
  - BIZOPS
  - FINANCE
  - SERVICE
  - PROCUREMENT
- **API Call**:
```typescript
POST /api/v1/workspace/initialize-spine
{
  domain: Domain,
  industry?: string,
  department?: string
}
```

### Step 3: Role & Scope
- **Purpose**: RBAC configuration
- **Fields**:
  - Role (admin, manager, user)
  - Team size
  - Department
- **Storage**: `tenant_spine_config` table

### Step 4: Tool Connections
- **Purpose**: Connector OAuth setup
- **UI**: Connector selection grid
- **Classification**: Each connector classified into Flow A/B/C
- **API**:
```typescript
// Get available connectors
GET /api/v1/connectors?domain=REVOPS&department=sales

// Initiate OAuth
GET /oauth/:provider/authorize?tenant_id=xxx
```

### Step 5: AI Loader (Optional)
- **Purpose**: File uploads for Flow B
- **Features**:
  - Drag & drop files
  - CSV imports
  - Document uploads (PDF, DOCX)
- **Storage**: R2 (Cloudflare object storage)

### Step 6: Activate
- **Purpose**: Foundation activation gate
- **Actions**:
  1. Mark `onboarding_complete = true`
  2. Trigger initial sync for connected connectors
  3. Redirect to Workspace

### Completion API
```typescript
POST /api/v1/workspace/complete-onboarding
{
  tenant_id: string,
  onboarding_data: {
    domain: Domain,
    connectors: string[],
    preferences: object
  }
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
│                              ↓                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                     L2 COGNITIVE                         │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │   │
│  │  │   Think     │  │   Signals   │  │    Actions      │  │   │
│  │  │  (Analysis) │  │  (Alerts)   │  │   (HITL)        │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### L1: Workspace Shell
- **Navigation**: Domain-specific menu based on selected domain
- **Content Router**: Lazy-loaded modules
  - `/app/dashboard`
  - `/app/accounts`
  - `/app/contacts`
  - `/app/pipeline`
  - `/app/tasks`
  - `/app/knowledge`
  - `/app/settings`

### L2: Cognitive Layer
- **Trigger**: Event-driven (⌘J or UI button)
- **Components**:
  - Signals Panel (alerts from Python Intelligence)
  - Think Panel (AI analysis results)
  - Actions Panel (HITL approval queue)
  - Evidence Drawer (source citations)

### Data Fetching
```typescript
// Initial workspace load
GET /api/v1/workspace/dashboard
GET /api/v1/workspace/tenant-config
GET /api/v1/workspace/readiness

// Real-time updates
WebSocket: /ws?tenant_id=xxx
SSE: /stream/events
```

---

## 📍 STAGE 5: Data Flow (Backend)

### Connector Sync Trigger
After onboarding, connectors start syncing:

```
┌─────────────────────────────────────────────────────────────────┐
│                    DATA FLOW TRIGGER                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Onboarding Complete                                            │
│       ↓                                                         │
│  Tenant Lifecycle Update                                        │
│       ↓                                                         │
│  connector-sync (cron every 5 min)                              │
│       ↓                                                         │
│  For each connected connector:                                  │
│       ↓                                                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                     SYNC PHASES                         │   │
│  │                                                         │   │
│  │  Phase 1: CREAMY (initial, ~60s)                       │   │
│  │     ↓                                                   │   │
│  │  Phase 2: NEEDED (selective expansion)                 │   │
│  │     ↓                                                   │   │
│  │  Phase 3: DELTA (continuous, webhooks/polling)         │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
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
PDF Upload (Step 5 of onboarding)
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
  User Approval
       ↓
  Act Execution
       ↓
  Connector Write-Back → Pipeline → Spine
```

---

## 🔗 Complete API Call Sequence

### 1. Landing → Signup
```
GET /                    → HomePage (marketing)
GET /signup              → SignupPage
```

### 2. Signup → Auth
```
POST /auth/v1/signup     → Supabase auth
GET  /auth/v1/callback   → OAuth callback
GET  /app                → AppShell
```

### 3. Onboarding
```
POST /api/v1/workspace/initialize          → Step 1
POST /api/v1/workspace/initialize-spine    → Step 2
GET  /api/v1/connectors?domain=xxx         → Step 4
GET  /oauth/:provider/authorize            → OAuth start
GET  /oauth/callback/:provider             → OAuth complete
POST /api/v1/workspace/complete-onboarding → Step 6
```

### 4. Workspace
```
GET  /api/v1/workspace/dashboard           → Dashboard data
GET  /api/v1/workspace/tenant-config       → Schema config
GET  /api/v1/workspace/readiness           → Hydration status
GET  /api/v1/cognitive/hitl/queue          → HITL tasks
GET  /v1/knowledge/inbox                   → Triage inbox
WS   /ws?tenant_id=xxx                     → Real-time updates
```

### 5. Data Operations
```
GET  /api/v1/workspace/entities            → List entities
GET  /api/v1/spine/:entity_type            → Spine read
POST /api/v1/pipeline/write                → Spine write (via pipeline)
POST /knowledge/search                     → Semantic search
PATCH /v1/knowledge/triage/:id             → Approve/Discard
```

---

## 📊 State Management

### Frontend State (React)
```typescript
// AuthProvider
{ user, session, onboardingComplete }

// SpineProvider
{ tenantConfig, schema, entityCache }

// GoalProvider
{ goals, metrics, outcomes }

// HydrationFabric
{ readiness, hydrationBuckets, syncStatus }
```

### Backend State (Supabase)
```sql
-- Core Tables
tenant_spine_config    -- Onboarding state, schema config
entities               -- SSOT entity data
spine_schema_registry  -- Adaptive schema observations
connector_sync_state   -- Sync cursors, phases
actions                -- HITL queue
triage_results         -- Flow C buffer (D1 also)
signals                -- AI-generated alerts
```

---

## 🎯 Key User Milestones

| Milestone | Trigger | Backend Action |
|-----------|---------|----------------|
| **Landing Visit** | `/` | Analytics event |
| **Signup Start** | `/signup` | Page view |
| **Account Created** | Supabase auth | Create tenant record |
| **Step 1 Complete** | Identity form | `POST /initialize` |
| **Step 2 Complete** | Domain select | `POST /initialize-spine` |
| **Step 4 Complete** | OAuth success | Store tokens, trigger sync |
| **Onboarding Done** | Activation | `onboarding_complete = true` |
| **First Data** | Creamy sync | Dashboard populated |
| **First Signal** | B5-B7 analysis | Alert shown |
| **First Action** | HITL approval | External write-back |

---

## 🚀 Deployment Checklist

### Frontend (apps/web)
- [ ] Landing page responsive
- [ ] Signup flow working
- [ ] Onboarding 6 steps complete
- [ ] Workspace shell loads
- [ ] WebSocket connects

### Backend (services)
- [ ] Gateway routing
- [ ] Connector OAuth
- [ ] Pipeline 8-stage
- [ ] Spine writes
- [ ] Python Intelligence
- [ ] Knowledge search

### Integration
- [ ] Landing → Signup → Onboarding → Workspace flow works
- [ ] Connector OAuth completes
- [ ] Initial sync populates dashboard
- [ ] Real-time updates arrive
- [ ] AI signals generate

---

## 📈 Success Metrics

| Metric | Target | Tracking |
|--------|--------|----------|
| Landing → Signup | > 15% | Analytics |
| Signup → Onboarding Complete | > 70% | `onboarding_complete` flag |
| Onboarding → First Connector | > 50% | `connected_connectors` count |
| First Sync → Dashboard View | < 60s | Time to first data |
| Daily Active Users | Growth | Session tracking |

---

**Base Entry**: Landing Page (`/`)
**End State**: AI-Powered Workspace with live data
