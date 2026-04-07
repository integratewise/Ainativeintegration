# IntegrateWise OS - Final Architecture Summary

> Target-state architecture summary. Use `docs/AGENT_WORK_CONSOLIDATED_TODO.md` as the implementation tracker until each flow is verified in code and end-to-end.

## Complete System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER JOURNEY                                    │
│                                                                              │
│   LANDING → SIGNUP → ONBOARDING → L1 WORKSPACE → L2 INTELLIGENCE            │
│      ↓        ↓         ↓            ↓              ↓                       │
│   Marketing  Auth    Foundation   Department-    Universal AI               │
│   Site     (PKCE)    Setup      Specific UI    (⌘J to open)               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                            FRONTEND (apps/web)                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                         L1: WORKSPACE LAYER                            │ │
│  │                    (Department-Specific)                               │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │                                                                        │ │
│  │  CUSTOMER SUCCESS     SALES           REVOPS          PRODUCT         │ │
│  │  ├─ Home              ├─ Pipeline     ├─ Command      ├─ Roadmap     │ │
│  │  ├─ Accounts          ├─ Deals        ├─ Data Quality ├─ Features    │ │
│  │  ├─ Contacts          ├─ Contacts     ├─ Routing      ├─ Bugs        │ │
│  │  ├─ Risks             ├─ Forecast     ├─ Attribution  ├─ Sprints     │ │
│  │  ├─ Expansion         ├─ Activities   ├─ Territory    ├─ Releases    │ │
│  │  └─ Analytics         └─ Analytics    └─ Quotas       └─ Analytics   │ │
│  │                                                                        │ │
│  │  UNIVERSAL ELEMENTS (All L1s):                                        │ │
│  │  ├─ Personal Dashboard  ├─ Tasks        ├─ Calendar     ├─ Meetings   │ │
│  │  ├─ Docs                ├─ Projects     ├─ Settings     ├─ AI Chat    │ │
│  │  └─ Intelligence ⌘J     └─ Integrations └─ Subscriptions               │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                    │                                        │
│                                    ↓ ⌘J                                     │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                         L2: COGNITIVE LAYER                            │ │
│  │                      (Universal - All Departments)                     │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │                                                                        │ │
│  │  [Truth] [Context] [IQ Hub] [Evidence] [Signals] [Think Engine]       │ │
│  │  [Act] [Approval] [Governance] [Adjust] [Loop] [Audit] [Agents] [Twin]│ │
│  │                                                                        │ │
│  │  Context-Aware: Shows different content based on L1 view              │ │
│  │  • CS Accounts → Churn risk, health signals                           │ │
│  │  • Sales Deals → Deal coaching, next steps                            │ │
│  │  • RevOps Data → Schema drift, sync issues                            │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                           BACKEND (services)                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                         GATEWAY (Router)                                ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│       │              │              │              │              │         │
│       ↓              ↓              ↓              ↓              ↓         │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐      │
│  │CONNECTOR│   │PIPELINE │   │INTELLIGENCE│ │KNOWLEDGE│   │   BFF   │      │
│  │         │   │         │   │            │ │         │   │         │      │
│  │• OAuth  │   │• 8-Stage│   │• Think    │ │• Search │   │• BFF    │      │
│  │• Sync   │   │• Spine  │   │• Govern   │ │• IQ Hub │   │• HITL   │      │
│  │• Webhook│   │• Normal │   │• Act      │ │• Triage │   │• WS/SSE │      │
│  └────┬────┘   └────┬────┘   └─────┬─────┘ └────┬────┘   └────┬────┘      │
│       │              │              │              │              │         │
│       └──────────────┴──────────────┴──────────────┴──────────────┘         │
│                                    │                                        │
│                                    ↓                                        │
│                           ┌─────────────────┐                               │
│                           │    DATABASES    │                               │
│                           ├─────────────────┤                               │
│                           │  Supabase (PG)  │ ← Spine SSOT                  │
│                           │  • entities     │                               │
│                           │  • schema_reg   │                               │
│                           │  • actions      │                               │
│                           │  • signals      │                               │
│                           ├─────────────────┤                               │
│                           │  Cloudflare D1  │ ← Edge cache                  │
│                           │  • entity360    │                               │
│                           │  • triage       │                               │
│                           ├─────────────────┤                               │
│                           │  R2 Storage     │ ← Files                       │
│                           └─────────────────┘                               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              DATA FLOWS                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  FLOW A (Structured)        FLOW B (Unstructured)      FLOW C (AI)         │
│  ───────────────────        ─────────────────────      ───────────         │
│                                                                              │
│  CRM/Support → Pipeline    Documents → Chunk/Embed    AI Sessions → D1     │
│       ↓                           ↓                        ↓               │
│  8-Stage Pipeline          Spine + pgVector           Triage Bot           │
│       ↓                           ↓                        ↓               │
│  Spine SSOT                  Knowledge Store          User Approval        │
│       ↓                                                ↓                   │
│  Signal Queue (B5-B7)                            Memory Consolidator       │
│       ↓                                                ↓                   │
│  Python Intelligence                              Knowledge Library      │
│       ↓                                                ↓                   │
│  Dashboard (L1/L2)                               Entity 360 (optional)     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                         COGNITIVE LOOP (L2)                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Signal → Python → Think → Govern → HITL → Act → Adjust → (Loop)           │
│    ↑                                                        │               │
│    └────────────────────────────────────────────────────────┘               │
│                                                                              │
│  • Signal: Entity reaches B5-B7 maturity                                   │
│  • Python: AI analysis (churn, expansion, health)                          │
│  • Think: Reasoning and action proposal                                    │
│  • Govern: Policy compliance check                                         │
│  • HITL: Human approval (L2 Approval tab)                                  │
│  • Act: Execute approved action                                            │
│  • Adjust: Learn from outcomes                                             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Department-Specific Configurations

### Navigation Structure

```typescript
const DEPARTMENT_CONFIGS = {
  CUSTOMER_SUCCESS: {
    l1_views: ['Home', 'Accounts', 'Contacts', 'Risks', 'Expansion', 'Analytics'],
    metrics: ['Health Score', 'NRR', 'Renewals', 'At-Risk Accounts'],
    connectors: ['salesforce', 'hubspot', 'zendesk', 'stripe'],
    l2_context: 'CS',
  },
  SALES: {
    l1_views: ['Pipeline', 'Deals', 'Contacts', 'Forecast', 'Activities'],
    metrics: ['Pipeline Value', 'Win Rate', 'Avg Deal Size', 'Sales Cycle'],
    connectors: ['salesforce', 'hubspot', 'linkedin', 'zoominfo'],
    l2_context: 'SALES',
  },
  REVOPS: {
    l1_views: ['Command Center', 'Data Quality', 'Routing', 'Attribution', 'Territory'],
    metrics: ['Data Quality %', 'Sync Status', 'Routing Accuracy', 'Attribution %'],
    connectors: ['salesforce', 'hubspot', 'stripe', 'netsuite', 'workato'],
    l2_context: 'REVOPS',
  },
  PRODUCT: {
    l1_views: ['Roadmap', 'Features', 'Bugs', 'Sprints', 'Releases', 'Feedback'],
    metrics: ['Sprint Velocity', 'Bug Resolution', 'Feature Adoption'],
    connectors: ['jira', 'github', 'linear', 'figma', 'intercom'],
    l2_context: 'PRODUCT',
  },
  // ... more departments
};
```

---

## API Endpoints by Layer

### L1 APIs (Department-Specific)
```
GET  /api/v1/workspace/dashboard?domain=CS
GET  /api/v1/spine/accounts                    # CS
GET  /api/v1/spine/opportunities               # Sales
GET  /api/v1/workspace/data-quality            # RevOps
GET  /api/v1/spine/features                    # Product
```

### L2 APIs (Universal)
```
GET  /api/v1/cognitive/signals
GET  /api/v1/cognitive/think/analyze
GET  /api/v1/knowledge/search
GET  /api/v1/cognitive/hitl/queue
POST /api/v1/cognitive/act/execute
```

---

## Key Insights

1. **L1 is the workplace** - Different for each department's daily work
2. **L2 is the brain** - Same AI layer, contextualized to L1 view
3. **Spine is the truth** - Single source for all L1s
4. **Cognitive loop runs in L2** - But affects L1 via signals and actions
5. **⌘J is the universal shortcut** - Opens L2 from anywhere in L1

---

**Status**: Target architecture documented; repo wiring alignment still in progress
