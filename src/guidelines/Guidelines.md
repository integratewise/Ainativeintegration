# IntegrateWise — Development Guidelines

> **Canonical reference for architecture, brand messaging, data flows, and implementation standards**
> 
> Last updated: March 20, 2026 | Version: 3.7

---

## 1. Product Vision & Identity

### 1.1 Core Identity

**Product Name:** IntegrateWise OS — Universal Cognitive Operating System

**Primary Tagline:** AI Thinks in Context — and Waits for Approval

**Short Version:** Context-Aware AI. Approval-Controlled Work.

**Master Descriptor:**  
IntegrateWise is a Knowledge Workspace empowered by AI and the Spine — the unified intelligence layer that connects tools, context, and decisions.

### 1.2 Product Promise

**AI becomes useful only when it runs on connected truth.**

IntegrateWise gives teams:
- One connected view of the business
- One adaptive model across tools
- One place for signals, proposals, approvals, and action

### 1.3 What IntegrateWise Is NOT

❌ Not a CRM replacement  
❌ Not a BI dashboard  
❌ Not an ETL or migration product  
❌ Not a generic AI copilot  
❌ Not a chatbot layered on top of partial context  
❌ Not a "sync all your data" migration tool

### 1.4 The 12 × 11 Model

| Dimension | Count | Meaning |
|-----------|-------|---------|
| **Departments** | 12 | Sales, Marketing, RevOps, Customer Success, Support, Engineering, Product, Finance, Legal, HR, Supply Chain, Service Ops |
| **Industries** | 11 | SaaS/Tech, Professional Services, Healthcare, Education, Manufacturing, Automotive, Retail/Commerce, Financial Services, Logistics, Media, Public Sector |
| **Composition** | 12 × 11 | Department (Trait) × Industry (Resource Type). Example: Healthcare × Sales = Sales pipeline + Healthcare entities (Patient, Provider, Claim, HIPAA) |

**Schema Discovery:** Traits and Resource Types only (1:Many). One Resource Type (Industry base) has many Traits (Department behaviors).

---

## 2. Architecture Overview

### 2.1 Complete System Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                           USER JOURNEY                                │
│                                                                       │
│  LANDING → SIGNUP → ONBOARDING → L1 WORKSPACE → L2 INTELLIGENCE      │
│     ↓        ↓         ↓            ↓              ↓                 │
│  Marketing  Auth    Foundation   Department-    Universal AI          │
│  Site     (PKCE)    Setup      Specific UI    (⌘J to open)          │
└──────────────────────────────────────────────────────────────────────┘
```

### 2.2 Eight-Layer Architecture

The clean architectural order follows this official sequence:

1. **Experience Layer** → UI, user intent
2. **Gateway / Edge Layer** → JWT verification, routing, rate limiting
3. **Workspace Runtime** → Orchestration, approvals, HITL, realtime state
4. **External Connectivity** → Connectors, OAuth, webhooks, MCP
5. **Data Plane** → Queues, pipeline, normalizer
6. **SSOT / Spine** → Canonical entities in Supabase
7. **Cognitive Layer** → Think, Govern, Act, Intelligence
8. **AI Providers** → OpenRouter, OpenAI, Workers AI

**Trust Boundaries:**
- **Gateway:** JWT and tenant resolution
- **External Connectivity:** OAuth, installation binding
- **Pipeline / Spine:** Canonical data boundary
- **Cognitive:** Reasoning boundary
- **Workflow:** User / HITL boundary

### 2.3 The Engine Loop (Core Cycle)

```
LOAD → NORMALIZE → STORE → THINK → REVIEW & APPROVE → ACT → REPEAT
```

**On denial:** ADJUST records the decision and the loop continues.

| Stage | Description |
|-------|-------------|
| **LOAD** | Connectors (Flow A) and documents (Flow B) feed the pipeline. Flow C (AI chat) never writes to Spine directly. |
| **NORMALIZE** | 8-stage pipeline: Analyze → Classify → Filter → Refine → Extract → Validate → Sanity → Sectorize |
| **STORE** | Spine (Supabase) + Knowledge (embeddings, sessions). Single source of truth = Spine. |
| **THINK** | Entity 360 (Spine + Knowledge + Signals) → action proposals with evidence and audit trail. |
| **GOVERN** | Hard gate. No approval token = no execution. HITL queue (Pending / Approved / Rejected). |
| **ACT** | Approved actions execute via connectors; re-ingest to pipeline. |
| **REPEAT** | Updated Spine feeds next THINK cycle. |

---

## 3. Data Flows (Flow A, B, C)

### 3.1 Three Flows Overview

| Flow | Type | Landing Point | Truth Updates |
|------|------|---------------|---------------|
| **Flow A** | Structured data (CRM, billing, support, productivity) | Spine → Dashboard / Entity 360 | Direct |
| **Flow B** | Unstructured data (docs, mail, PDFs, images) | Spine + Knowledge → Context UI / Entity 360 | Direct (dual write) |
| **Flow C** | AI-generated content (chat, MCP, Slack) | D1 → Triage → Compounding Space | Indirect (via approved actions only) |

### 3.2 Flow A — Structured Data

**Path:** Connection Success → connector-sync → Connector/Loader → PIPELINE_QUEUE → Normalizer (8 stages) → Spine → Entity 360

**Sync Phases (No Full Sync):**

| Phase | Goal | When |
|-------|------|------|
| **Creamy** | First value in ~60s | Right after connect; capped, high-value subset |
| **Needed** | Only needed data | After Phase 1; selective per tenant schema; chunked, cursor-based |
| **Delta** | Incremental | After initial; cron or on-demand; only since `since` timestamp |

**Webhook Join Point:** Webhooks join at the same `PIPELINE_QUEUE` boundary and follow the same Normalizer → Spine flow.

### 3.3 Flow B — Unstructured Data

**Path:** Docs/Mail/PDF → Ingest/Connector → Loader/Pipeline → Text Extraction + Classification → Entity Linking → Dual Write:
1. Spine References (context_extractions, files)
2. Knowledge Chunks + Embeddings (pgVector)

**Result:** Context UI, Evidence surfaces, Entity 360 with linked documents

### 3.4 Flow C — AI-Generated Content

**Path:** AI Chat/MCP/Slack → D1 ingest → Triage space → User approval → Memory Consolidator → Compounding Space (No-Hallucination Library)

**Key Rule:** Flow C never writes to Spine directly. Truth updates from Flow C require approved actions that route back through Act → connector write-back → pipeline re-ingestion → Spine.

**Compounding Space Benefit:** When `link_knowledge_ui_to_entity360` is true, Entity 360 includes approved Flow C content, creating a compounding knowledge layer that grows with user-approved insights.

---

## 4. The Spine (SSOT)

### 4.1 What is the Spine?

The Spine is:
- The **single source of truth and unified intelligence layer**
- The **identity layer** across systems
- The **memory layer** across time
- The **adaptive schema** that grows with the tenant
- The **canonical data model** that all L1 workspaces read from

### 4.2 Approved Spine Naming

Use these forms depending on the surface:

- **The Spine (SSOT)** — when brevity matters
- **The Spine — Unified Intelligence Layer** — in sales and marketing storytelling
- **The Spine — Single Source of Truth and Unified Intelligence Layer** — in strategy, product, and investor docs

### 4.3 Spine Components

**Canonical Entities:**
- Accounts, Contacts, Deals, Tickets, Activities, Leads, Campaigns, Pages, Projects, Goals

**Goal-Anchored Architecture:**
- Every entity can be linked to strategic goals via `goal_refs`
- Enables goal-driven workflows and alignment tracking

**Schema Registry:**
- Tenant-specific schema configuration (`tenant_spine_config`)
- Adaptive schema observations during writes
- Industry + Department driven schema seeding

---

## 5. L1 Workspace Layer (Department-Specific)

### 5.1 Department Contexts (CTX)

The platform supports 12 department-specific workspace contexts:

| Context | L1 Views | Key Metrics |
|---------|----------|-------------|
| **CTX_CS** | Home, Accounts, Contacts, Risks, Expansion, Analytics | Health Score, NRR, Renewals, At-Risk Accounts |
| **CTX_SALES** | Pipeline, Deals, Contacts, Forecast, Activities | Pipeline Value, Win Rate, Avg Deal Size, Sales Cycle |
| **CTX_REVOPS** | Command Center, Data Quality, Routing, Attribution | Data Quality %, Sync Status, Routing Accuracy |
| **CTX_PRODUCT** | Roadmap, Features, Bugs, Sprints, Releases | Sprint Velocity, Bug Resolution, Feature Adoption |
| **CTX_MARKETING** | Home, Analytics, Contacts, Docs, Calendar | Campaign ROI, Lead Gen, Attribution |
| **CTX_SUPPORT** | Home, Accounts, Contacts, Tasks, Knowledge Space | Ticket Volume, CSAT, Response Time |
| **CTX_TECH** | Home, Projects, Tasks, Docs, Knowledge Space | Deployment Frequency, Incident Count |
| **CTX_HR** | Home, Team, Tasks, Docs, Meetings | Headcount, Turnover, Satisfaction |
| **CTX_FINANCE** | Home, Accounts, Docs, Analytics | Revenue, Expenses, Cash Flow |
| **CTX_LEGAL** | Home, Docs, Tasks, Analytics | Contract Status, Risk Level |
| **CTX_SUPPLY_CHAIN** | Home, Accounts, Tasks, Analytics | Inventory Levels, Lead Time |
| **CTX_SERVICE_OPS** | Home, Analytics | Service Level, Uptime |

### 5.2 Universal Elements (All L1s)

Available across all department contexts:
- Personal Dashboard
- Tasks
- Calendar
- Meetings
- Docs
- Projects
- Settings
- AI Chat
- Intelligence (⌘J)
- Integrations
- Subscriptions

---

## 6. L2 Cognitive Layer (Universal AI)

### 6.1 L2 Overview

**Universal AI layer accessible via ⌘J from any L1 workspace.**

Context-aware: Shows different content based on L1 view:
- CS Accounts → Churn risk, health signals
- Sales Deals → Deal coaching, next steps
- RevOps Data → Schema drift, sync issues

### 6.2 L2 Tabs

```
[Truth] [Context] [IQ Hub] [Evidence] [Signals] [Think Engine]
[Act] [Approval] [Governance] [Adjust] [Loop] [Audit] [Agents] [Twin]
```

### 6.3 The Twin Agent

**Product Name:** AI Twin

The platform has **one single AI agent** — the Twin Agent. There are no other agents.

**Twin Capabilities:**
- Reads Entity 360 (Spine + Knowledge + Signals)
- Proposes actions based on context
- Waits for human approval before execution
- Learns from approval/rejection patterns (Adjust)

### 6.4 Cognitive Loop

```
Signal → Python → Think → Govern → HITL → Act → Adjust → (Loop)
```

| Stage | Description |
|-------|-------------|
| **Signal** | Entity reaches B5-B7 maturity |
| **Python** | AI analysis (churn, expansion, health) |
| **Think** | Reasoning and action proposal |
| **Govern** | Policy compliance check |
| **HITL** | Human approval (L2 Approval tab) |
| **Act** | Execute approved action |
| **Adjust** | Learn from outcomes (on denial, record decision) |

---

## 7. Onboarding Flow (6 Steps)

### 7.1 Onboarding Steps

```
Landing → Signup (Auth PKCE) → Onboarding → Workspace
```

| Step | Name | Purpose |
|------|------|---------|
| **1** | Identity | Brand/workspace name, user details |
| **2** | Domain | Department + Industry selection (12 × 11) |
| **3** | Connector | OAuth + Flow A/B/C classification |
| **4** | Schema Selector | Entity type selection (12×11 driven) |
| **5** | AI Loader | Creamy layer progress UI (~60s) |
| **6** | Workplace Loading | Normalizer progress → First workspace view |

### 7.2 Post-Onboarding Flow

**On Success:**
1. Connector state persisted
2. `connected_connectors` synced
3. Phase 1 Creamy job triggered
4. Initial Workspace becomes usable
5. Phase 2 Needed + Phase 3 Delta continue in background

**Intelligence Activation Gate:**
Intelligence layer should activate only after:
- Creamy phase complete
- At least 2-3 meaningful connectors loaded

---

## 8. RBAC & Governance

### 8.1 Multi-Tenancy

- Tenant isolation via `tenantId` scoping
- Org type classification: PRODUCT, SERVICES, HYBRID, MEDIA
- JWT-based tenant resolution at Gateway

### 8.2 RBAC (Role-Based Access Control)

**Module-Level Permissions:**
- View
- Create
- Edit
- Delete
- Admin

**Field-Level Access:**
- Revenue fields (full/masked/read/hidden)
- Contact PII protection
- API key security
- Audit log access
- Billing information

**Cross-Cutting Capabilities:**
- Intelligence Overlay
- Manage Integrations
- Create/Execute Workflows
- Configure AI Agents
- Manage BYOM
- Export Data
- Bulk Actions
- API Access
- Manage Webhooks

### 8.3 Approval Workflows

**HITL Queue States:**
- Pending
- Approved
- Rejected

**Approval Flow:**
1. Intelligence identifies action opportunity
2. Action record written to SSOT as pending
3. Workflow creates HITL task
4. User approves/rejects in UI
5. On approval: intelligence-act queue receives approved action
6. Validation + govern checks
7. Connector executes external mutation
8. Result re-enqueued to pipeline
9. Pipeline updates SSOT
10. Workspace UI reflects final state

---

## 9. Brand & Messaging Standards

### 9.1 Messaging Guardrails

**Always emphasize:**
- The workspace
- The Spine as the unified intelligence layer
- AI operating on top of context
- Human approval before action

**Never reduce IntegrateWise to:**
- A chatbot
- An automation engine
- A data migration product
- A warehouse or dashboard
- A Customer Success-only product

### 9.2 Approved Copy by Asset

| Asset | Copy |
|-------|------|
| **Letterhead** | IntegrateWise LLP · Knowledge Workspace Empowered by AI and the Spine |
| **Invoice Footer** | IntegrateWise — AI Thinks in Context and Works Through Approvals |
| **Business Card** | Knowledge Workspace Empowered by AI and the Spine |
| **Profile Headline** | The Knowledge Workspace Where AI Thinks in Context |
| **Brochure Headline** | Bring Work, Knowledge, and Decisions Together Through the Spine |
| **Marketing Headline** | Work Becomes Smarter When AI Understands Context |
| **Deck Cover Subtitle** | Universal Workspace that adapts to everyone, Proactive AI providing Signals and Insights and Where AI Thinks in Context and Waits for Action |

### 9.3 Brand Motifs

**Spine Node Line:**
- Connected circles and lines inspired by the logo
- Use for: subtle backgrounds, dividers, topology metaphors

**Approval Checkpoint:**
- Small rounded rectangle as approval stage marker
- Represents: HITL, approval gates, governed action

**Context Card:**
- Soft-edged box for structured knowledge
- Use for: entity summaries, evidence cards, workspace previews

**Layer Bands:**
- Subtle layered strips suggesting workspace, intelligence, and governance layers

---

## 10. Technical Stack

### 10.1 Frontend

- **Framework:** React 18 + TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Motion (Framer Motion)
- **Charts:** Recharts
- **Icons:** Lucide React
- **State Management:** React Context (SpineProvider, GoalProvider)
- **Routing:** Hash-based navigation for marketing; React Router Data mode for workspace

### 10.2 Backend

- **Edge Runtime:** Cloudflare Workers
- **Server Framework:** Hono
- **Database:** Supabase (PostgreSQL + pgVector)
- **Edge Cache:** Cloudflare D1
- **Storage:** Cloudflare R2
- **Queues:** Cloudflare Queues
- **Auth:** Supabase Auth (PKCE flow)

### 10.3 AI & ML

- **Inference:** OpenRouter, OpenAI
- **Embeddings:** OpenAI embeddings via pgVector
- **Workers AI:** Cloudflare Workers AI for edge inference

---

## 11. Implementation Standards

### 11.1 API Contracts

**L1 APIs (Department-Specific):**
```
GET  /api/v1/workspace/dashboard?domain=CS
GET  /api/v1/spine/accounts
GET  /api/v1/spine/opportunities
GET  /api/v1/workspace/data-quality
```

**L2 APIs (Universal):**
```
GET  /api/v1/cognitive/signals
GET  /api/v1/cognitive/think/analyze
GET  /api/v1/knowledge/search
GET  /api/v1/cognitive/hitl/queue
POST /api/v1/cognitive/act/execute
```

### 11.2 Request Headers

**Required Headers:**
- `Authorization: Bearer <JWT>` — Supabase session token
- `x-tenant-id: <id>` — Tenant identifier (injected by Gateway after JWT verification)
- `x-user-id: <id>` — User identifier (injected by Gateway)
- `x-user-role: <role>` — User role (injected by Gateway)

**Optional Headers:**
- `x-view-context: <CTX>` — Current workspace context (CS, SALES, etc.)
- `x-idempotency-key: <uuid>` — For idempotent operations
- `x-approval-token: <token>` — For approved action execution

### 11.3 File Organization

```
/apps/web/                  # Frontend application
  /src/
    /api/                   # API client functions
    /components/
      /onboarding/          # 6-step onboarding flow
      /workspace/           # L1 workspace shells
      /cognitive/           # L2 cognitive layer UI
      /landing/             # Marketing site
      /ui/                  # Shared UI components
    /hooks/                 # React hooks
    /lib/                   # Utilities

/services/
  /gateway/                 # Edge gateway (routing, auth, rate limiting)
  /workflow/                # BFF and workspace orchestration
  /connector/               # Connector framework
  /loader/                  # Data loading and sync
  /normalizer/              # 8-stage pipeline
  /intelligence/            # Cognitive layer
  /knowledge/               # Knowledge management

/packages/
  /connectors/              # 50+ connector implementations
  /shared/                  # Shared types and utilities

/supabase/
  /migrations/              # Database migrations
```

### 11.4 Naming Conventions

**React Components:** PascalCase with descriptive names
- ✅ `OnboardingFlow.tsx`
- ✅ `AccountSuccessDashboard.tsx`
- ❌ `onboarding.tsx`
- ❌ `asd.tsx`

**API Endpoints:** kebab-case with versioning
- ✅ `/api/v1/workspace/initialize-spine`
- ✅ `/api/v1/cognitive/hitl/queue`
- ❌ `/api/initializeSpine`
- ❌ `/workspace_initialize`

**Database Tables:** snake_case with prefixes
- ✅ `tenant_spine_config`
- ✅ `sync_jobs`
- ✅ `context_extractions`
- ❌ `TenantConfig`
- ❌ `syncJobs`

**Service Bindings:** SCREAMING_SNAKE_CASE
- ✅ `PIPELINE_QUEUE`
- ✅ `CONNECTOR_KV`
- ❌ `pipelineQueue`
- ❌ `connector-kv`

---

## 12. Design System

### 12.1 Color System

**Primary Colors:**
- Navy Blue: `#3F5185` (Primary)
- Pink/Magenta: `#F54476` (Accent)
- Dark backgrounds: `#1E2A4A`, `#162038`

**Semantic Colors:**
- Success: `#00C853` (Emerald)
- Warning: `#FF9800` (Amber)
- Danger: `#F54476` (Pink)
- Info: `#7B9BFF` (Blue)

**CSS Variables (globals.css):**
```css
:root {
  --iw-primary: #3F5185;
  --iw-accent: #F54476;
  --iw-success: #00C853;
  --iw-warning: #FF9800;
  --iw-danger: #F54476;
  --iw-blue: #7B9BFF;
}
```

### 12.2 Typography

**Do NOT use Tailwind font size/weight classes** unless specifically requested:
- ❌ `text-2xl`, `font-bold`, `leading-none`
- ✅ Let base styles in `/styles/globals.css` define typography
- ✅ Override only when user requests specific styling

**Hierarchy:**
- H1-H6 have default styling in globals.css
- Body text inherits base font settings
- Code/mono uses font-mono

### 12.3 Component Library

**UI Components:** Full shadcn/ui library (40+ components)
- Located in `/components/ui/`
- All styled with Tailwind v4
- Includes: Button, Card, Dialog, Dropdown, Input, Select, Table, Tabs, Toast, etc.

---

## 13. Development Workflow

### 13.1 Code Review Standards

**Before committing:**
- [ ] No TypeScript errors
- [ ] No console.errors (console.log for debugging is OK)
- [ ] All API calls have error handling
- [ ] Loading states implemented
- [ ] Empty states implemented
- [ ] Responsive design tested
- [ ] RBAC permissions checked
- [ ] Tenant isolation verified

### 13.2 Testing Standards

**Critical Paths to Verify:**
1. Onboarding → Workspace (full 6-step flow)
2. Connector OAuth → Sync → Spine → Dashboard
3. Entity 360 view (Spine + Knowledge + Signals)
4. Intelligence proposal → HITL → Approval → Act
5. Flow A, B, C boundary points
6. Tenant isolation (multi-tenant data)
7. RBAC permission gates

### 13.3 Performance Standards

**Key Metrics:**
- Creamy layer: Complete in ~60 seconds
- Initial workspace: Usable within 90 seconds of connector auth
- Entity 360 load: < 2 seconds
- L2 Intelligence drawer: < 1 second to open
- Dashboard refresh: < 3 seconds

---

## 14. Out of Scope (Hard Rules)

### 14.1 What We DO NOT Build

❌ **Not a migration product:** We do not position as "sync all your data"  
❌ **Not a data warehouse:** We are not Snowflake or BigQuery  
❌ **Not a direct connector replacement:** We enhance, not replace  
❌ **Not a full CRM:** We unify across CRMs, not replace them  
❌ **Flow C never writes to Spine directly:** Truth updates require approved actions  

### 14.2 Architecture Hard Rules

1. **Gateway resolves tenant from JWT** — Never trust external tenant headers
2. **Connector/loader do not directly write business data** — Must go through pipeline
3. **Raw external events do not bypass normalization** — All data goes through 8-stage pipeline
4. **Intelligence does not act without approval** — Hard HITL gate
5. **Cognitive services reason over canonical data** — Not raw external payloads
6. **Flow C follows knowledge-first path** — D1 → Triage → Approval → Compounding Space

---

## 15. Current Implementation Status

### 15.1 Completed (✅)

- ✅ Marketing site (landing, hero, problem, pillars, pricing)
- ✅ 6-step onboarding flow
- ✅ Workspace shell and navigation
- ✅ L1 department contexts (12 departments)
- ✅ L2 cognitive layer framework
- ✅ Spine SSOT (Supabase)
- ✅ 8-stage pipeline
- ✅ RBAC system
- ✅ Gateway routing and JWT verification
- ✅ Flow A structured data path
- ✅ Flow B unstructured data path
- ✅ Flow C AI content path
- ✅ HITL approval workflows
- ✅ Entity 360 read-time fusion
- ✅ Readiness scoring system
- ✅ Intelligence overlay
- ✅ Command palette (⌘K)

### 15.2 Partial Implementation (⚠️)

- ⚠️ Connector catalog (50+ planned, core set implemented)
- ⚠️ Real OAuth for all connectors
- ⚠️ Creamy → Needed → Delta sync phases
- ⚠️ Flagship department (Customer Success) end-to-end verification
- ⚠️ Role & scope persistence from onboarding
- ⚠️ Live intelligence activation after connector threshold
- ⚠️ Full governance UI (approval queues)

### 15.3 Pending (⏳)

- ⏳ Automotive industry expansion
- ⏳ 11 industry schemas fully implemented
- ⏳ All 12 departments with real modules
- ⏳ Background sync (Phase 2 Needed, Phase 3 Delta)
- ⏳ Intelligence learning (Adjust phase)
- ⏳ Multi-tenant production deployment
- ⏳ Advanced analytics and reporting

---

## 16. Next Steps & Priorities

### 16.1 Architecture Reconciliation Priorities

These close the gap between target-state architecture and current implementation:

| Priority | Action |
|----------|--------|
| **P0** | Onboarding API sequence: Wire real 6-step path with backend persistence |
| **P0** | Role & scope persistence: Connect onboarding choices to real RBAC setup |
| **P1** | Connector OAuth: Replace local state with real `/oauth/:provider/authorize` |
| **P1** | AI loader / file ingest: Unify upload endpoints across services |
| **P2** | Activation and readiness: Backend completion path triggers initial sync |
| **P2** | Workspace routing consistency: Align docs, redirects, shell routes |
| **P3** | L2 API contracts: Align frontend hooks with backend envelopes |
| **P3** | Flagship verification: One domain end-to-end (preferably Customer Success) |

### 16.2 Phase Execution Order (from AGENTS.md)

| Phase | Name | Outcome |
|-------|------|---------|
| **1** | Upgrade fallback domains | 1–2 real modules per fallback domain (Incident Queue, Invoice Approvals) |
| **2** | Flagship Work experience | RevOps or Customer Success end-to-end with real data |
| **3** | Real flows | One CRM/ERP path + health UI; one doc type ingest; AI signals |
| **4** | Governance UI | Approval queues, role/domain routing, audit log view |
| **5** | Onboarding drives Work | Domain selection → recommended connectors → first Work modules |

---

## 17. Reference Documentation

### 17.1 Architecture Documents

- `/imports/FINAL_ARCHITECTURE_SUMMARY.md` — Target-state architecture
- `/imports/FULL_DATA_FLOW_SPEC.md` — Complete data flow specification
- `/imports/IMPLEMENTATION_FINAL-1.md` — Implementation wiring summary
- `/imports/IMPLEMENTATION_CLEAN_ARCHITECTURE-1.md` — Clean architecture details

### 17.2 Product Documents

- `/imports/PRODUCT_BLUEPRINT-1.md` — Product vision and model
- `/imports/BRAND_MESSAGING_SYSTEM-1.md` — Brand and messaging standards
- `/imports/POSITIONING_AND_GTM-1.md` — Positioning and go-to-market

### 17.3 Implementation Tracker

- `/imports/AGENT_WORK_CONSOLIDATED_TODO-1.md` — Consolidated implementation tracker

---

## 18. Key Architectural Insights

### 18.1 Five Core Principles

1. **L1 is the workplace** — Different for each department's daily work
2. **L2 is the brain** — Same AI layer, contextualized to L1 view
3. **Spine is the truth** — Single source for all L1s
4. **Cognitive loop runs in L2** — But affects L1 via signals and actions
5. **⌘J is the universal shortcut** — Opens L2 from anywhere in L1

### 18.2 Three-Layer Summary

| Layer | Components | Purpose |
|-------|------------|---------|
| **Experience** | Experience Layer + Gateway + Workspace Runtime | Real work and orchestration; user intent and approvals |
| **Cognitive** | Cognitive Layer + AI Providers | Reasoning, governance, knowledge, agents; no durable write without approval |
| **Backend** | External Connectivity + Data Plane + SSOT | Integration, queue/pipeline, Spine/Knowledge; canonical ingest and persist |

### 18.3 Data Flow Summary

**Flow:** Experience → Gateway → Runtime/Connectivity → Queue/Pipeline → Spine/SSOT → Cognitive → Action Loop → Pipeline → Workspace Refresh

**Result:** Compounding knowledge workspace where approved AI insights enrich Entity 360 views over time.

---

## 19. Contact & Support

For questions about these guidelines:
- **Architecture questions:** Reference FINAL_ARCHITECTURE_SUMMARY.md
- **Brand questions:** Reference BRAND_MESSAGING_SYSTEM-1.md
- **Implementation questions:** Reference AGENT_WORK_CONSOLIDATED_TODO-1.md
- **Data flow questions:** Reference FULL_DATA_FLOW_SPEC.md

---

**Version History:**
- v3.7 (March 20, 2026): Consolidated guidelines from all architecture and brand documents
- v3.6 (March 19, 2026): Added Flow C details and compounding space
- v3.5 (March 18, 2026): Updated RBAC and governance sections
- v3.0 (March 15, 2026): Clean architecture implementation

---

_These guidelines are the canonical reference for all development work on IntegrateWise. When in doubt, refer back to this document and the linked architecture specifications._
