# IntegrateWise OS — Product Blueprint

**Purpose:** Single-page product blueprint: vision, model, engine, phases, and outcomes. Aligned with codebase and [AGENTS.md](../AGENTS.md) phases.

**References:** [PRODUCT_ARCHITECTURE.md](PRODUCT_ARCHITECTURE.md), [FEATURE_LIST.md](FEATURE_LIST.md), [INTEGRATIONS_SUPPORT.md](INTEGRATIONS_SUPPORT.md), [SPINE_AS_FOUNDATION_ARCHITECTURE.md](SPINE_AS_FOUNDATION_ARCHITECTURE.md).

---

## 1. Vision

| Item           | Statement                                                                                                                    |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Product**    | IntegrateWise OS — Universal Cognitive Operating System                                                                      |
| **Tagline**    | AI Thinks in Context — and Waits for Approval                                                                                |
| **Philosophy** | AI That Thinks in Context, Waits for Approvals                                                                               |
| **Promise**    | Context-Aware AI. Approval-Controlled Work.                                                                                   |

**Descriptor:** A Knowledge Workspace empowered by AI and the Spine — the unified intelligence layer that connects tools, context, and decisions.

---

## 2. Model: 12 × 11

| Axis            | Count   | Meaning                                                                                                                                                                                                                                  |
| --------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Departments** | 12      | Functional layer: Sales, Marketing, RevOps, Customer Success, Support, Engineering, Product, Finance, Legal, HR, Supply Chain, Service Ops. Each has workspace modules, connectors, and governance.                                      |
| **Industries**  | 11      | Vertical schema: SaaS/Tech, Professional Services, Healthcare, Education, Manufacturing, Automotive, Retail/Commerce, Financial Services, Logistics, Media, Public Sector. Each extends the spine with industry entities and compliance. |
| **Composition** | 12 × 11 | Department (trait) × Industry (resource type). Example: Healthcare × Sales = Sales pipeline + Healthcare entities (Patient, Provider, Claim, HIPAA).                                                                                     |

**Schema discovery:** Traits and Resource Types only (1:Many). One Resource Type (e.g. Industry base) has many Traits (e.g. Department behaviours). See [SCHEMA_DISCOVERY.md](SCHEMA_DISCOVERY.md).

---

## 3. Engine loop

```
LOAD → NORMALIZE → STORE → THINK → REVIEW & APPROVE (GOVERN) → ACT → REPEAT
```

- **LOAD:** Connectors (Flow A) and document ingest (Flow B) feed the pipeline. Flow C (AI chat) never writes to the spine.
- **NORMALIZE:** 8-stage pipeline (Analyzer → Classifier → Filter → Refiner → Extractor → Validator → Sanity Scan → Sectorizer); tenant-scoped; Spine-shaped only.
- **STORE:** Spine (Supabase) + Knowledge (embeddings, sessions). Single source of truth = Spine.
- **THINK:** Entity 360 (Spine + Knowledge + Signals) → action proposals. Evidence and audit trail.
- **GOVERN:** Hard gate. No token = no execution. HITL queue (Pending / Approved / Rejected).
- **ACT:** Approved actions execute via connectors; re-ingest to pipeline. Denials → ADJUST (decision memory).
- **REPEAT:** Updated spine feeds next THINK cycle.

---

## 4. Phases (execution order)

| Phase | Name                     | Outcome                                                                                                                                     |
| ----- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **1** | Upgrade fallback domains | 1–2 real modules per fallback domain (e.g. Incident Queue, Invoice Approvals); nav and content wired; DESIGN_SOURCES_INTEGRATION updated.   |
| **2** | Flagship Work experience | One department (RevOps or Customer Success) end-to-end: real data, Flow A/B/C, AI recommendation → review → action → audit.                 |
| **3** | Real flows               | One CRM/ERP path (auth → sync → spine → Work) + health UI; one doc type (e.g. PDF) ingest → Knowledge/analytics; AI signals → spine → Work. |
| **4** | Governance UI            | Approval queues (Pending/Approved/Rejected), role/domain routing, audit log view.                                                           |
| **5** | Onboarding drives Work   | Who/Why + domain → initial domain, recommended connectors, first Work modules; Getting Started → hydrated Work view.                        |

Wiring per phase: [HARDENING_AND_WIRING.md](HARDENING_AND_WIRING.md) § Phases.

---

## 5. Outcomes (what “done” looks like)

| Outcome                                   | Description                                                                                                                                   |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Working, data-backed Work experiences** | Each chosen department has real modules, real connectors, and real spine data; AI recommendations and approvals are actionable and auditable. |
| **Single source of truth**                | All value flows through the Spine. No parallel schemas; Loader and Normalizer enforce Resource Type + Traits (1:Many).                        |
| **Governance everywhere**                 | Approve/reject before execution; full audit trail; role and domain-scoped queues.                                                             |
| **Onboarding → first value**              | New tenant: domain + connectors → spine hydrated → first Work view with signals and approval queue.                                           |
| **No migration / no “sync everything”**   | Connectors and pipeline serve cognitive value (context, signals, decisions). Spine and UI get what is needed for the journey.                 |

---

## 6. Out of scope (hard rules)

- **Not a migration or ETL product.** We do not position as “sync all your data into one place.”
- **Spine UI is separate.** Workspace and domain UIs show journey-relevant data only; full schema lives in Spine UI.
- **Flow C does not directly create Spine truth rows or Entity 360 base truth.** AI chat and MCP follow a knowledge-first path; truth updates require approved actions routed through Act + pipeline.

---

_Blueprint version aligned with AGENTS.md and HARDENING_AND_WIRING phases. For detailed architecture and features, see PRODUCT_ARCHITECTURE.md and FEATURE_LIST.md._
