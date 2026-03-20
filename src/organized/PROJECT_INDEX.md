# IntegrateWise — Organized Project Structure

> **Reorganized:** March 20, 2026  
> **Total Files:** 196  
> **Architecture:** Two-Layer (L1 Workspace + L2 Cognitive)

---

## 📁 Directory Overview

| # | Folder | Purpose | Files |
|---|--------|---------|-------|
| 1 | `1-core/` | React entry points | 3 |
| 2 | `2-ui-system/` | shadcn/ui + design tokens | 49 |
| 3 | `3-spine-core/` | SSOT + Goal Framework | 7 |
| 4 | `4-workspace-shell/` | Navigation & layout | 9 |
| 5 | `5-ai-cognitive-layer/` | AI intelligence (L2) | 5 |
| 6 | `6-landing-marketing/` | Public marketing site | 18 |
| 7 | `7-business-modules/` | Feature modules | 28 |
| 8 | `8-domain-workspaces/` | Department UIs (L1) | 41 |
| 9 | `9-admin-settings/` | Admin & configuration | 13 |
| 10 | `10-auth-onboarding/` | Auth flows | 2 |
| 11 | `11-backend/` | Supabase + Edge Functions | 8 |
| 12 | `12-docs-guidelines/` | Documentation | 13 |

---

## 🗂️ Detailed Structure

### 1-CORE — Entry Points
```
1-core/
├── main.tsx          # React DOM mounting
├── App.tsx           # Root component + routing
└── index.css         # Tailwind imports
```

### 2-UI-SYSTEM — Design System
```
2-ui-system/
├── globals.css       # Design tokens, brand colors
├── utils.ts          # cn() helper
├── use-mobile.ts     # Mobile detection hook
└── [49 shadcn/ui components...]
    ├── button.tsx, card.tsx, dialog.tsx
    ├── form.tsx, input.tsx, table.tsx
    ├── sidebar.tsx, tabs.tsx, select.tsx
    └── ...
```

### 3-SPINE-CORE — The SSOT
```
3-spine-core/
├── spine-client.tsx          # Data client + React hooks
├── types.ts                  # Core TypeScript contracts
├── readiness-bar.tsx         # Data readiness indicator
├── domain-data-registry.ts   # Domain registry
├── goal-context.tsx          # Goal alignment provider
├── goal-schema.ts            # Goal data schema
└── goal-alignment-bar.tsx    # Goal UI component
```

### 4-WORKSPACE-SHELL — Navigation & Layout
```
4-workspace-shell/
├── workspace-shell.tsx       # Main workspace container
├── DashboardShell.tsx        # Dashboard wrapper
├── sidebar.tsx               # Navigation sidebar
├── top-bar.tsx               # Top navigation bar
├── integrations-hub.tsx      # Integration connector
├── l1-module-content.tsx     # L1 content loader
├── placeholder-view.tsx      # Empty state
├── LayerAudit.tsx            # Architecture audit tool
└── analytics-shell.tsx       # Analytics wrapper
```

### 5-AI-COGNITIVE-LAYER — L2 Intelligence
```
5-ai-cognitive-layer/
├── ai-chat.tsx               # AI chat interface
├── command-palette.tsx       # ⌘J command palette
├── intelligence-drawer.tsx   # Intelligence sidebar
├── intelligence-overlay-new.tsx
└── figma/
    └── ImageWithFallback.tsx
```

### 6-LANDING-MARKETING — Public Site
```
6-landing-marketing/
├── Layout.tsx                # Landing page layout
├── Navbar.tsx, Footer.tsx    # Navigation
├── Hero.tsx                  # Hero section
├── Problem.tsx, ProblemPage.tsx
├── Audience.tsx, AudiencePage.tsx
├── Pricing.tsx, PricingPage.tsx
├── TechnicalPage.tsx
├── Differentiators.tsx, DifferentiatorsDetail.tsx
├── Comparison.tsx, Pillars.tsx
├── Integrations.tsx, logo.tsx
└── scenes/
    └── ProductScenes.tsx
```

### 7-BUSINESS-MODULES — Feature Modules
```
7-business-modules/
├── sales/
│   ├── dashboard.tsx, deals.tsx, pipeline.tsx
│   ├── activities.tsx, contacts.tsx
│   └── quotes.tsx, forecasting.tsx
├── marketing/
│   ├── dashboard.tsx, campaigns.tsx
│   ├── email-studio.tsx, social.tsx
│   └── forms.tsx, attribution.tsx
├── business-ops/
│   ├── dashboard.tsx, workflows.tsx
│   ├── workflow-canvas.tsx, tasks.tsx
│   ├── documents.tsx, accounts.tsx
│   ├── analytics-view.tsx, calendar-view.tsx
│   └── integrations.tsx
└── website/
    ├── dashboard.tsx, pages.tsx
    ├── blog.tsx, media.tsx
    └── seo.tsx, theme.tsx
```

### 8-DOMAIN-WORKSPACES — L1 Department UIs
```
8-domain-workspaces/
├── domain-sidebar.tsx        # Domain navigation
├── domain-types.ts           # Domain types
├── spine-projection.ts       # Spine projections
│
├── account-success/          # Customer Success (Most Comprehensive)
│   ├── shell.tsx
│   ├── dashboard.tsx
│   ├── csm-calendar.tsx
│   ├── csm-data.ts
│   ├── csm-intelligence-data.ts
│   ├── accounts-view.tsx
│   ├── contacts-view.tsx
│   ├── documents-view.tsx
│   ├── meetings-view.tsx
│   ├── projects-view.tsx
│   ├── tasks-view.tsx
│   └── views/                # 16 specialized views
│       ├── account-master-view.tsx
│       ├── business-context-view.tsx
│       ├── company-growth-view.tsx
│       ├── engagement-log-view.tsx
│       ├── insights-view.tsx
│       ├── people-team-view.tsx
│       ├── platform-health-view.tsx
│       ├── product-client-view.tsx
│       ├── risk-register-view.tsx
│       ├── stakeholder-outcomes-view.tsx
│       ├── strategic-objectives-view.tsx
│       ├── success-plans-view.tsx
│       ├── task-manager-view.tsx
│       ├── value-streams-view.tsx
│       ├── api-portfolio-view.tsx
│       ├── capabilities-view.tsx
│       └── initiatives-view.tsx
│
├── salesops/                 # Sales Operations
│   ├── shell.tsx
│   ├── dashboard.tsx
│   └── salesops-views.tsx
│
├── revops/                   # Revenue Operations
│   ├── shell.tsx
│   ├── dashboard.tsx
│   └── revops-views.tsx
│
└── personal/                 # Personal Workspace
    ├── shell.tsx
    ├── dashboard.tsx
    └── personal-views.tsx
```

### 9-ADMIN-SETTINGS — Administration
```
9-admin-settings/
├── admin/                    # RBAC & Tenant
│   ├── tenant-manager.tsx
│   ├── user-management.tsx
│   ├── rbac-manager.tsx
│   ├── approval-workflows.tsx
│   ├── types.ts
│   └── mock-data.ts
├── notifications/
│   └── notification-center.tsx
├── document-storage/
│   ├── document-storage.tsx
│   ├── types.ts
│   └── mock-data.ts
├── settings-page.tsx
├── profile-page.tsx
└── subscriptions-page.tsx
```

### 10-AUTH-ONBOARDING — Authentication
```
10-auth-onboarding/
├── login-page.tsx            # Login screen
└── onboarding-flow.tsx       # 6-step onboarding
```

### 11-BACKEND — Supabase & Edge Functions
```
11-backend/
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx     # Main server entry
│           ├── gateway.tsx   # API gateway
│           ├── spine.tsx     # Spine endpoints
│           ├── domains.tsx   # Domain operations
│           ├── intelligence.tsx
│           ├── pipeline.tsx
│           └── kv_store.tsx
└── supabase/
    └── info.tsx              # Supabase config
```

### 12-DOCS-GUIDELINES — Documentation
```
12-docs-guidelines/
├── Guidelines.md             # Architecture guide
├── Attributions.md           # Asset attributions
├── PRODUCT_BLUEPRINT-1.md
├── FINAL_ARCHITECTURE_SUMMARY.md
├── FINAL_ARCHITECTURE_SUMMARY-2.md
├── FULL_DATA_FLOW_SPEC.md
├── BRAND_MESSAGING_SYSTEM-1.md
├── POSITIONING_AND_GTM-1.md
├── IMPLEMENTATION_FINAL-1.md
├── IMPLEMENTATION_CLEAN_ARCHITECTURE-1.md
├── AGENT_WORK_CONSOLIDATED_TODO-1.md
├── IntegrateWiseBusinessOperationsDesign.tsx
└── svg-2lgkn3q2mv.ts
```

---

## 🔄 Import Path Updates

When moving to this structure, update imports from:

```typescript
// OLD (flat components/ structure)
import { Button } from "@/components/ui/button";
import { useSpineProjection } from "@/components/spine/spine-client";
import { Hero } from "@/components/landing/Hero";

// NEW (organized structure)
import { Button } from "@/1-core/../2-ui-system/button";
import { useSpineProjection } from "@/3-spine-core/spine-client";
import { Hero } from "@/6-landing-marketing/Hero";
```

Or update `vite.config.ts` path aliases:

```typescript
// vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      "@/core": path.resolve(__dirname, "./src/organized/1-core"),
      "@/ui": path.resolve(__dirname, "./src/organized/2-ui-system"),
      "@/spine": path.resolve(__dirname, "./src/organized/3-spine-core"),
      "@/shell": path.resolve(__dirname, "./src/organized/4-workspace-shell"),
      "@/ai": path.resolve(__dirname, "./src/organized/5-ai-cognitive-layer"),
      "@/landing": path.resolve(__dirname, "./src/organized/6-landing-marketing"),
      "@/modules": path.resolve(__dirname, "./src/organized/7-business-modules"),
      "@/domains": path.resolve(__dirname, "./src/organized/8-domain-workspaces"),
      "@/admin": path.resolve(__dirname, "./src/organized/9-admin-settings"),
      "@/auth": path.resolve(__dirname, "./src/organized/10-auth-onboarding"),
      "@/backend": path.resolve(__dirname, "./src/organized/11-backend"),
    },
  },
});
```

---

## ✅ Next Steps

1. **Review** this structure with the team
2. **Update** `vite.config.ts` with new path aliases
3. **Replace** old `src/components/` with organized structure
4. **Update** all import statements
5. **Test** the build: `npm run build`
6. **Update** AGENTS.md with new structure

---

*Generated: March 20, 2026*
