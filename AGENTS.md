# IntegrateWise — AI Coding Agent Guide

> **Project:** IntegrateWise OS — Universal Cognitive Operating System  
> **Type:** React + TypeScript SPA with Supabase Backend  
> **Last Updated:** March 20, 2026

---

## 1. Project Overview

IntegrateWise is a **Knowledge Workspace empowered by AI and the Spine** — a unified intelligence layer that connects tools, context, and decisions across departments.

### Core Value Proposition
- **AI Thinks in Context — and Waits for Approval**
- One connected view of the business
- One adaptive model across tools  
- One place for signals, proposals, approvals, and action

### What This Project Is NOT
- Not a CRM replacement
- Not a BI dashboard
- Not an ETL or migration product
- Not a generic AI copilot
- Not a "sync all your data" migration tool

### The 12 × 11 Model
| Dimension | Count | Description |
|-----------|-------|-------------|
| **Departments** | 12 | Sales, Marketing, RevOps, CS, Support, Engineering, Product, Finance, Legal, HR, Supply Chain, Service Ops |
| **Industries** | 11 | SaaS/Tech, Professional Services, Healthcare, Education, Manufacturing, Automotive, Retail, Financial Services, Logistics, Media, Public Sector |

---

## 2. Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI framework |
| **TypeScript** | ^5.0 | Type safety |
| **Vite** | 6.3.5 | Build tool & dev server |
| **Tailwind CSS** | 4.1.12 | Styling |
| **Motion** | * | Animations (Framer Motion successor) |
| **Recharts** | 2.15.2 | Data visualization |
| **Lucide React** | 0.487.0 | Icons |

### Backend
| Technology | Purpose |
|------------|---------|
| **Supabase** | PostgreSQL + Auth + Edge Functions |
| **Cloudflare Workers** | Edge runtime for serverless functions |
| **Hono** | Lightweight server framework |
| **pgVector** | Vector embeddings for knowledge search |

### UI Components
- **shadcn/ui** — 40+ accessible, composable components
- **Radix UI** — Headless UI primitives
- **Custom components** — Domain-specific workspace modules

---

## 3. Project Structure

```
/Users/nirmal/Downloads/AI-NATIVE INTEGRATION/
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Build configuration with path aliases
├── index.html             # Entry HTML
├── src/
│   ├── main.tsx           # React app entry point
│   ├── App.tsx            # Root component with routing
│   ├── index.css          # Tailwind imports
│   ├── styles/
│   │   └── globals.css    # Design tokens and base styles
│   ├── components/
│   │   ├── ui/            # shadcn/ui components (40+)
│   │   ├── landing/       # Marketing site sections
│   │   ├── auth/          # Login page
│   │   ├── onboarding/    # 6-step onboarding flow
│   │   ├── domains/       # L1 workspace contexts
│   │   │   ├── account-success/   # Customer Success domain
│   │   │   ├── salesops/          # Sales domain
│   │   │   ├── revops/            # RevOps domain
│   │   │   ├── personal/          # Personal workspace
│   │   │   └── ...
│   │   ├── spine/         # SSOT client and data layer
│   │   ├── goal-framework/# Goal alignment system
│   │   ├── admin/         # RBAC, tenant management
│   │   ├── business-ops/  # Business operations modules
│   │   ├── marketing/     # Marketing modules
│   │   ├── sales/         # Sales modules
│   │   └── ...
│   ├── guidelines/
│   │   └── Guidelines.md  # Comprehensive architecture guide
│   ├── imports/           # Architecture documentation
│   ├── supabase/
│   │   └── functions/     # Edge function implementations
│   └── utils/
│       └── supabase/      # Supabase configuration
└── build/                 # Production build output
```

---

## 4. Build & Development Commands

```bash
# Install dependencies
npm install

# Start development server (port 3000)
npm run dev

# Build for production
npm run build
```

### Development Server
- **Port:** 3000
- **Auto-open:** Enabled
- **Build target:** ESNext
- **Output directory:** `build/`

---

## 5. Architecture Overview

### Two-Layer UI Architecture

```
┌─────────────────────────────────────────────────────┐
│  L1 WORKSPACE (Department-Specific)                  │
│  - Different UI for each department's daily work    │
│  - Contexts: CS, Sales, RevOps, Marketing, etc.     │
│  - Reads from Spine (SSOT)                          │
├─────────────────────────────────────────────────────┤
│  L2 COGNITIVE LAYER (Universal AI)                  │
│  - Same AI layer, contextualized to L1 view         │
│  - Accessed via ⌘J from anywhere                    │
│  - Tabs: Truth, Context, IQ Hub, Evidence, etc.     │
└─────────────────────────────────────────────────────┘
```

### The Spine (SSOT)
The **Spine** is the single source of truth and unified intelligence layer:
- Identity layer across systems
- Memory layer across time
- Adaptive schema that grows with tenant
- All L1 workspaces read exclusively from Spine

### Data Flows
| Flow | Type | Path |
|------|------|------|
| **Flow A** | Structured data | Connector → Pipeline → Spine → Dashboard |
| **Flow B** | Unstructured docs | Docs → Extraction → Spine + Knowledge → Context UI |
| **Flow C** | AI-generated content | Chat → D1 → Triage → Approval → Compounding Space |

### The Engine Loop
```
LOAD → NORMALIZE → STORE → THINK → REVIEW & APPROVE → ACT → REPEAT
```

---

## 6. Key Source Files

### Entry Points
| File | Purpose |
|------|---------|
| `src/main.tsx` | React DOM mounting |
| `src/App.tsx` | Root component, hash routing, providers |
| `src/index.css` | Tailwind + globals imports |

### Core Architecture
| File | Purpose |
|------|---------|
| `src/components/spine/spine-client.tsx` | Spine data client + React hooks |
| `src/components/spine/types.ts` | Core TypeScript contracts |
| `src/components/goal-framework/goal-context.tsx` | Goal alignment provider |
| `src/components/workspace-shell.tsx` | Main workspace container |

### Routing (Hash-Based)
```
#home        → Marketing homepage
#technical   → Technical details page
#problem     → Problem statement page
#audience    → Audience page
#pricing     → Pricing page
#app         → Workspace application (login → onboarding → workspace)
```

---

## 7. Code Style Guidelines

### Naming Conventions

**React Components:** PascalCase
```typescript
// ✅ Good
OnboardingFlow.tsx
AccountSuccessDashboard.tsx

// ❌ Bad
onboarding.tsx
asd.tsx
```

**Files & Directories:** kebab-case for non-component files
```
// ✅ Good
user-management.tsx
rbac-manager.tsx

// ❌ Bad
userManagement.tsx
RbacManager.ts
```

**TypeScript Interfaces:** PascalCase
```typescript
interface SpineEntity { }
interface HITLProposal { }
type CTXEnum = "CTX_CS" | "CTX_SALES";
```

**API Endpoints:** kebab-case with versioning
```
GET /api/v1/spine/projection/{department}
POST /api/v1/cognitive/act/execute
```

### Component Structure
```typescript
// Imports grouped: React → Third-party → Internal → Types
import React, { useState, useCallback } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import type { CTXEnum } from "@/components/spine/types";

// Props interface
interface ComponentProps {
  activeCtx: CTXEnum;
  onComplete: (data: ResultType) => void;
}

// Component
export function ComponentName({ activeCtx, onComplete }: ComponentProps) {
  // Implementation
}
```

### Styling Conventions
- **DO** use Tailwind utility classes
- **DO NOT** use Tailwind typography classes (`text-2xl`, `font-bold`) unless specifically requested
- **DO** rely on base styles in `globals.css` for typography
- **DO** use CSS variables for brand colors (defined in `globals.css`)

---

## 8. Key Dependencies

### Runtime Dependencies
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "motion": "*",              // Animation library
  "hono": "*",                // Server framework
  "@radix-ui/*": "^1.x",      // UI primitives (many packages)
  "tailwind-merge": "*",      // Tailwind class merging
  "clsx": "*",                // Conditional classes
  "class-variance-authority": "^0.7.1",
  "lucide-react": "^0.487.0", // Icons
  "recharts": "^2.15.2",      // Charts
  "@jsr/supabase__supabase-js": "^2.49.8"
}
```

### Dev Dependencies
```json
{
  "vite": "6.3.5",
  "tailwindcss": "4.1.12",
  "@tailwindcss/vite": "4.1.12",
  "@vitejs/plugin-react": "^4.7.0"
}
```

---

## 9. Spine Client API

### React Hooks
```typescript
// Fetch department projection
const { data, loading, error, refetch } = useSpineProjection(department);

// Fetch readiness scores
const { data: readiness } = useSpineReadiness();

// Fetch entities by type
const { data: entities, provenance } = useSpineEntities("accounts");

// Fetch domain table
const { data, loading, error, refetch } = useDomainTable(domain, table);
```

### Direct API Functions
```typescript
// Initialize spine for user
await initializeSpine({ connectedApps, userName, role });

// Fetch projection
const data = await fetchProjection(department, tenantId);

// Domain operations
await fetchDomainTable(domain, table);
await createDomainRecord(domain, table, record);
await updateDomainRecord(domain, table, id, fields);
await deleteDomainRecord(domain, table, id);
```

---

## 10. Design System

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--iw-blue` | `#4256AB` | Primary brand color |
| `--iw-pink` | `#EE4B75` | Accent/CTA color |
| `--iw-success` | `#3D8B6E` | Success states |
| `--iw-warning` | `#D4883E` | Warning states |
| `--iw-danger` | `#DC4A4A` | Error/danger states |

### Typography
- **Font Family:** Inter (sans-serif), JetBrains Mono (monospace)
- **Base Size:** 14px
- **Headings:** H1-H6 have default styling in globals.css
- **Avoid:** Explicit `text-2xl`, `font-bold` classes

---

## 11. Testing & Quality

### Pre-Commit Checklist
- [ ] No TypeScript errors
- [ ] No `console.error` (debug `console.log` is OK)
- [ ] All API calls have error handling
- [ ] Loading states implemented
- [ ] Empty states implemented
- [ ] Responsive design verified

### Critical Paths to Verify
1. Onboarding → Workspace (6-step flow)
2. Connector → Sync → Spine → Dashboard
3. Entity 360 view (Spine + Knowledge + Signals)
4. Intelligence proposal → HITL → Approval → Act
5. Tenant isolation (multi-tenant data)

---

## 12. Security Considerations

### Hard Architecture Rules
1. **Gateway resolves tenant from JWT** — Never trust external tenant headers
2. **Connector/loader do not directly write business data** — Must go through pipeline
3. **Raw external events do not bypass normalization** — All data through 8-stage pipeline
4. **Intelligence does not act without approval** — Hard HITL (Human-in-the-Loop) gate
5. **Flow C never writes to Spine directly** — Truth updates require approved actions

### RBAC Levels
- Module-level: View, Create, Edit, Delete, Admin
- Field-level: Revenue fields (full/masked/read/hidden), PII protection
- Cross-cutting: Intelligence, Integrations, Workflows, Agents

---

## 13. References

### Internal Documentation
| File | Content |
|------|---------|
| `src/guidelines/Guidelines.md` | Comprehensive architecture & brand guide |
| `src/imports/FINAL_ARCHITECTURE_SUMMARY.md` | Target-state architecture |
| `src/imports/FULL_DATA_FLOW_SPEC.md` | Complete data flow specification |
| `src/imports/PRODUCT_BLUEPRINT-1.md` | Product vision and model |
| `src/imports/BRAND_MESSAGING_SYSTEM-1.md` | Brand and messaging standards |

### External Links (Figma — use both)
| File | URL | Use for |
|------|-----|---------|
| **AI-NATIVE-INTEGRATION** (landing & brand) | https://www.figma.com/make/HIgld0ReGFWf4pK8g3TXgw/AI-NATIVE-INTEGRATION | Public marketing site: `src/components/landing/*`, homepage sections, pricing/audience/technical pages |
| **Workspace-Live** (app) | https://www.figma.com/make/pnwJsfafZHLDCzcCT6OGeY/Workspace-Live | Authenticated workspace: shell, L1 domains, intelligence, post-login UI |
| **Legacy design URL** (same landing file) | https://www.figma.com/design/HIgld0ReGFWf4pK8g3TXgw/AI-NATIVE-INTEGRATION | Alternate link format; same file key `HIgld0ReGFWf4pK8g3TXgw` |
| **Login (split-screen)** | https://www.figma.com/design/yJbtdwqRACffdMAXxB7fmU/Untitled?node-id=1-2 | Implemented in `src/components/auth/login-page.tsx`; file key `yJbtdwqRACffdMAXxB7fmU` |

Cursor agents: see `.cursor/rules/figma-design-system.mdc` for MCP workflow and when to use which file.

- **Source repository:** https://github.com/integratewise/Ainativeintegration
- **shadcn/ui:** https://ui.shadcn.com/

---

## 14. Common Tasks

### Adding a New Domain
1. Create directory in `src/components/domains/{domain-name}/`
2. Create `shell.tsx` and `dashboard.tsx`
3. Add views in `views/` subdirectory
4. Register in domain registry
5. Add spine projection endpoint

### Adding a New UI Component
1. Check if shadcn/ui has it first: `src/components/ui/`
2. If custom: Create in appropriate domain directory
3. Use existing components as templates
4. Follow naming conventions

### Adding an API Endpoint
1. Add server function in `src/supabase/functions/server/`
2. Add client function in `src/components/spine/spine-client.tsx`
3. Create React hook if needed
4. Update types in `src/components/spine/types.ts`

---

_This document serves as the canonical reference for AI coding agents working on IntegrateWise. When in doubt, refer to `src/guidelines/Guidelines.md` for detailed architecture information._
