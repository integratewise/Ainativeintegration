Here's the organized file structure grouped by functionality:

```
📁 INTEGRATEWISE — PROJECT STRUCTURE
═══════════════════════════════════════════════════════════════════

🔧 ENTRY & CONFIG
├── index.html                    # HTML entry point
├── src/main.tsx                  # React DOM mounting
├── src/App.tsx                   # Root component with routing
├── src/index.css                 # Tailwind imports
├── package.json                  # Dependencies & scripts
├── vite.config.ts                # Build configuration
└── .npmrc                        # npm configuration

═══════════════════════════════════════════════════════════════════

🎨 DESIGN SYSTEM (globals.css tokens + shadcn/ui 40+ components)
src/styles/
└── globals.css                   # Design tokens, brand colors, typography

src/components/ui/                # shadcn/ui components (alphabetical)
├── button.tsx, card.tsx, dialog.tsx, form.tsx, input.tsx
├── table.tsx, tabs.tsx, select.tsx, dropdown-menu.tsx
├── sidebar.tsx, sheet.tsx, tooltip.tsx, popover.tsx
├── badge.tsx, avatar.tsx, alert.tsx, skeleton.tsx
├── chart.tsx, calendar.tsx, carousel.tsx, command.tsx
├── accordion.tsx, breadcrumb.tsx, checkbox.tsx, collapsible.tsx
├── context-menu.tsx, drawer.tsx, hover-card.tsx, label.tsx
├── menubar.tsx, navigation-menu.tsx, pagination.tsx, progress.tsx
├── radio-group.tsx, resizable.tsx, scroll-area.tsx, separator.tsx
├── slider.tsx, sonner.tsx, switch.tsx, textarea.tsx, toggle.tsx
├── toggle-group.tsx, alert-dialog.tsx, input-otp.tsx, use-mobile.ts
└── utils.ts                      # cn() helper for Tailwind

═══════════════════════════════════════════════════════════════════

🏢 L1 WORKSPACE DOMAINS (Department-Specific UIs)
src/components/domains/

📂 account-success/               # Customer Success (Most Comprehensive)
│   ├── shell.tsx                 # Domain shell wrapper
│   ├── dashboard.tsx             # Main dashboard
│   ├── csm-calendar.tsx          # Calendar view
│   ├── csm-data.ts               # Mock data
│   ├── csm-intelligence-data.ts  # AI intelligence data
│   ├── accounts-view.tsx         # Account list view
│   ├── contacts-view.tsx         # Contacts management
│   ├── documents-view.tsx        # Document center
│   ├── meetings-view.tsx         # Meetings scheduler
│   ├── projects-view.tsx         # Projects tracker
│   ├── tasks-view.tsx            # Task management
│   └── views/                    # Specialized views (16 files)
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

📂 salesops/                      # Sales Operations
│   ├── shell.tsx
│   ├── dashboard.tsx
│   └── salesops-views.tsx

📂 revops/                        # Revenue Operations
│   ├── shell.tsx
│   ├── dashboard.tsx
│   └── revops-views.tsx

📂 personal/                      # Personal Workspace
│   ├── shell.tsx
│   ├── dashboard.tsx
│   └── personal-views.tsx

🧩 Domain Shared
├── domain-sidebar.tsx            # Navigation sidebar
├── domain-types.ts               # Domain TypeScript types
└── spine-projection.ts           # Spine data projection

═══════════════════════════════════════════════════════════════════

🧠 CORE ARCHITECTURE (The Spine + Goal Framework)
src/components/spine/             # SSOT — Single Source of Truth
├── spine-client.tsx              # Data client + React hooks
├── types.ts                      # Core TypeScript contracts
├── readiness-bar.tsx             # Data readiness indicator
└── domain-data-registry.ts       # Domain registry

src/components/goal-framework/    # Goal Alignment System
├── goal-context.tsx              # Goal context provider
├── goal-schema.ts                # Goal data schema
└── goal-alignment-bar.tsx        # UI component

═══════════════════════════════════════════════════════════════════

🌐 LANDING & MARKETING (Public Site)
src/components/landing/
├── Layout.tsx                    # Landing page layout
├── Navbar.tsx, Footer.tsx        # Navigation
├── Hero.tsx                      # Hero section
├── Problem.tsx, ProblemPage.tsx  # Problem statement
├── Audience.tsx, AudiencePage.tsx # Target audience
├── Pricing.tsx, PricingPage.tsx  # Pricing pages
├── TechnicalPage.tsx             # Technical details
├── Differentiators.tsx           # Key differentiators
├── Comparison.tsx                # Competitive comparison
├── Pillars.tsx                   # Product pillars
├── Integrations.tsx              # Integration showcase
├── logo.tsx                      # Logo component
└── scenes/
    └── ProductScenes.tsx         # Product scene animations

═══════════════════════════════════════════════════════════════════

📊 BUSINESS MODULES
src/components/sales/             # Sales Module
├── dashboard.tsx, deals.tsx, pipeline.tsx
├── activities.tsx, contacts.tsx
├── quotes.tsx, forecasting.tsx

src/components/marketing/         # Marketing Module
├── dashboard.tsx, campaigns.tsx
├── email-studio.tsx, social.tsx
├── forms.tsx, attribution.tsx

src/components/business-ops/      # Business Operations
├── dashboard.tsx, workflows.tsx
├── workflow-canvas.tsx, tasks.tsx
├── documents.tsx, accounts.tsx
├── analytics-view.tsx, calendar-view.tsx
└── integrations.tsx

src/components/website/           # Website Management
├── dashboard.tsx, pages.tsx
├── blog.tsx, media.tsx
├── seo.tsx, theme.tsx

═══════════════════════════════════════════════════════════════════

⚙️ ADMIN & SETTINGS
src/components/admin/             # RBAC & Tenant Management
├── tenant-manager.tsx            # Multi-tenant management
├── user-management.tsx           # User administration
├── rbac-manager.tsx              # Role-based access control
├── approval-workflows.tsx        # Approval workflow config
├── types.ts, mock-data.ts

src/components/
├── settings-page.tsx             # User settings
├── profile-page.tsx              # User profile
├── subscriptions-page.tsx        # Subscription management
├── notifications/                # Notification center
│   └── notification-center.tsx
└── document-storage/             # Document management
    ├── document-storage.tsx
    ├── types.ts, mock-data.ts

═══════════════════════════════════════════════════════════════════

🤖 AI & COGNITIVE LAYER (L2)
src/components/
├── ai-chat.tsx                   # AI chat interface
├── command-palette.tsx           # ⌘J command palette
├── intelligence-drawer.tsx       # Intelligence sidebar
├── intelligence-overlay-new.tsx  # New overlay component
└── figma/
    └── ImageWithFallback.tsx     # Figma asset component

═══════════════════════════════════════════════════════════════════

🔐 AUTHENTICATION & ONBOARDING
src/components/
├── auth/login-page.tsx           # Login screen
└── onboarding/
    └── onboarding-flow.tsx       # 6-step onboarding

═══════════════════════════════════════════════════════════════════

🖥️ WORKSPACE SHELL
src/components/
├── workspace-shell.tsx           # Main workspace container
├── DashboardShell.tsx            # Dashboard wrapper
├── sidebar.tsx, top-bar.tsx      # Navigation chrome
├── integrations-hub.tsx          # Integration connector UI
├── l1-module-content.tsx         # L1 content loader
├── placeholder-view.tsx          # Empty state placeholder
└── shared/analytics-shell.tsx    # Analytics wrapper

═══════════════════════════════════════════════════════════════════

⚡ BACKEND (Supabase Edge Functions)
src/supabase/functions/server/
├── index.tsx                     # Main server entry
├── gateway.tsx                   # API gateway (JWT/tenant)
├── spine.tsx                     # Spine data endpoints
├── domains.tsx                   # Domain operations
├── intelligence.tsx              # AI intelligence APIs
├── pipeline.tsx                  # Data pipeline
└── kv_store.tsx                  # Key-value store

src/utils/supabase/
└── info.tsx                      # Supabase configuration

═══════════════════════════════════════════════════════════════════

📚 DOCUMENTATION & GUIDELINES
src/guidelines/
└── Guidelines.md                 # Comprehensive architecture guide

src/imports/                      # Architecture documentation
├── PRODUCT_BLUEPRINT-1.md        # Product vision & model
├── FINAL_ARCHITECTURE_SUMMARY.md # Target-state architecture
├── FULL_DATA_FLOW_SPEC.md        # Complete data flows
├── BRAND_MESSAGING_SYSTEM-1.md   # Brand standards
├── POSITIONING_AND_GTM-1.md      # Go-to-market strategy
├── IMPLEMENTATION_FINAL-1.md     # Implementation plan
├── IMPLEMENTATION_CLEAN_ARCHITECTURE-1.md
├── AGENT_WORK_CONSOLIDATED_TODO-1.md
├── FINAL_ARCHITECTURE_SUMMARY-2.md
├── IntegrateWiseBusinessOperationsDesign.tsx
└── svg-2lgkn3q2mv.ts

src/Attributions.md               # Asset attributions

═══════════════════════════════════════════════════════════════════

🔢 SUMMARY
───────────────────────────────────────────────────────────────────
Total Directories: 26
Total Files: ~190+
───────────────────────────────────────────────────────────────────
shadcn/ui Components: 40+
Domain Views: 4 domains (CS: 26 files, SalesOps: 3, RevOps: 3, Personal: 3)
CS Domain Views: 16 specialized views
Business Modules: 4 (Sales, Marketing, BizOps, Website)
Architecture Docs: 10 markdown files
───────────────────────────────────────────────────────────────────
```

This organization reflects your **Two-Layer Architecture**:
- **L1 Workspace**: Domain-specific UIs under `domains/`
- **L2 Cognitive**: AI components + Spine integration
- **Shared Infrastructure**: UI components, auth, admin, docs