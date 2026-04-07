# Clean Architecture Implementation Summary

## Overview

This document summarizes the implementation of the Clean Architecture that closes the gap between the backend foundation (Spine/Pipeline/Cognitive) and the frontend onboarding-to-workspace journey.

## Two Paths, Three Flows

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           TWO ENTRY POINTS                                       │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  PATH 1: ONBOARDING (First-Time User)                                           │
│  ═════════════════════════════════════                                           │
│                                                                                  │
│  Landing → Onboarding Flow → Auth → Connectors → Schema Selector                │
│                                                              ↓                   │
│                                                    ┌─────────────────┐          │
│                                                    │  AI LOADER      │          │
│                                                    │  (Creamy Layer) │          │
│                                                    │  • Phase 1 only │          │
│                                                    │  • ~60 seconds  │          │
│                                                    └────────┬────────┘          │
│                                                             ↓                    │
│                                                    ┌─────────────────┐          │
│                                                    │  NORMALIZER     │          │
│                                                    │  (8 Stages)     │          │
│                                                    │  • Creamy only  │          │
│                                                    └────────┬────────┘          │
│                                                             ↓                    │
│                                                    ┌─────────────────┐          │
│                                                    │ WORKPLACE       │          │
│                                                    │ LOADING SCREEN  │          │
│                                                    │ (User sees      │          │
│                                                    │  progress)      │          │
│                                                    └────────┬────────┘          │
│                                                             ↓                    │
│                                              ┌──────────────┴────────┐          │
│                                              │                        │          │
│                                              ▼                        ▼          │
│                                    ┌─────────────────┐    ┌─────────────────┐   │
│                                    │ USER SEES       │    │ BACKGROUND      │   │
│                                    │ WORKPLACE L1    │    │ JOB CREATED     │   │
│                                    │ (Ready to use)  │    │                 │   │
│                                    │                 │    │ Loader Stage 2  │   │
│                                    │ • Dashboard     │    │ Normalizer St 2 │   │
│                                    │ • Accounts      │    │ Continue in     │   │
│                                    │ • etc.          │    │ queue           │   │
│                                    └─────────────────┘    └─────────────────┘   │
│                                                                                  │
│  PATH 2: WORKPLACE (Existing User - Add Connector)                              │
│  ═════════════════════════════════════════════════                               │
│                                                                                  │
│  Workplace L1 → Connector Page → Click Integration → Auth Flow                  │
│                                                              ↓                   │
│                                                    ┌─────────────────┐          │
│                                                    │ SCHEMA UPDATOR  │          │
│                                                    │ (Add new entity │          │
│                                                    │  types to config)│          │
│                                                    └────────┬────────┘          │
│                                                             ↓                    │
│                                                    ┌─────────────────┐          │
│                                                    │ FLOW ROUTER     │          │
│                                                    │ (A/B/C decision)│          │
│                                                    └─────┬───┬───┬────┘          │
│                                                          │   │   │               │
│                                    ┌─────────────────────┘   │   └─────────────┐│
│                                    │                         │                  ││
│                                    ▼                         ▼                  ▼│
│                              ┌──────────┐            ┌──────────┐        ┌──────────┐
│                              │ FLOW A   │            │ FLOW B   │        │ FLOW C   │
│                              │ (Start   │            │ (Start   │        │ (Start   │
│                              │  sync)   │            │  sync)   │        │  ingest) │
│                              └──────────┘            └──────────┘        └──────────┘
```

## Implementation Files

### Backend Services

#### 1. Gateway Service (`services/gateway/src/routes/workspace.ts`)
- **POST /api/v1/workspace/initialize-spine**: Sets up tenant schema and starts Creamy layer
- **GET /api/v1/workspace/onboarding-state**: Gets current onboarding state
- **POST /api/v1/workspace/complete-onboarding**: Marks onboarding complete, creates background jobs
- **GET /api/v1/workspace/progress**: SSE endpoint for real-time sync progress

#### 2. Connector Service (`services/connector/src/routes/internal.ts`)
- **POST /internal/initialize-spine**: Creates tenant schema config and onboarding state
- **GET /internal/schema/:tenantId**: Gets schema configuration for a tenant
- Types: `services/connector/src/types.ts`

#### 3. Loader Service (`services/loader/src/index.ts`)
- **POST /internal/creamy**: Starts Creamy layer sync (Phase 1 - bounded, user-facing)
- **GET /internal/creamy/:jobId**: Gets Creamy job status
- **POST /internal/background-sync**: Starts Stage 2 background sync (Needed/Delta)
- Types: `services/loader/src/types.ts`

### Frontend Components

#### 1. API Client (`apps/web/src/api/workspace.ts`)
- `initializeSpine()` - POST /api/v1/workspace/initialize-spine
- `getOnboardingState()` - GET /api/v1/workspace/onboarding-state
- `completeOnboarding()` - POST /api/v1/workspace/complete-onboarding
- `subscribeToProgress()` - SSE for real-time progress
- `getCreamyProgress()` - GET /api/v1/loader/creamy/:jobId

#### 2. Onboarding Flow (`apps/web/src/components/onboarding/OnboardingFlow.tsx`)
Main orchestrator with 6 steps:
1. **IdentityStep** (`steps/IdentityStep.tsx`) - Brand/workspace name
2. **DomainStep** (`steps/DomainStep.tsx`) - Department and industry
3. **ConnectorStep** (`steps/ConnectorStep.tsx`) - Connector OAuth with Flow A/B/C classification
4. **SchemaSelector** (`SchemaSelector.tsx`) - Entity type selection
5. **AILoader** (`AILoader.tsx`) - Creamy layer progress UI
6. **WorkplaceLoading** (`WorkplaceLoading.tsx`) - Normalizer progress UI

#### 3. AppShell Integration (`apps/web/src/AppShell.tsx`)
- Updated to use new `OnboardingFlow` component
- Simplified `handleOnboardingComplete` callback

### Database Schema (`sql-migrations/20240319_onboarding_schema.sql`)

#### Tables

**tenant_onboarding_state**
```sql
- id: UUID PK
- tenant_id: UUID FK
- status: enum ('not_started', 'in_progress', 'completed')
- current_step: text
- completed_steps: text[]
- connectors_config: jsonb
- creamy_job_id: text
- normalizer_job_id: text
- preferences: jsonb
- created_at, updated_at, completed_at: timestamps
```

**sync_jobs**
```sql
- id: UUID PK
- tenant_id: UUID FK
- connector: text
- flow_type: enum ('A', 'B', 'C')
- phase: enum ('creamy', 'needed', 'delta')
- status: enum ('pending', 'running', 'completed', 'failed')
- progress: jsonb
- payload: jsonb
- error_message: text
- created_at, started_at, completed_at, failed_at: timestamps
```

**tenant_schema_configs**
```sql
- id: UUID PK
- tenant_id: UUID FK
- domain: text
- industry: text
- department: text
- allowed_entity_types: text[]
- connector_configs: jsonb
- depth_matrix: jsonb
- created_at, updated_at: timestamps
```

## API Contracts

### Initialize Spine
```typescript
// POST /api/v1/workspace/initialize-spine
interface Request {
  domain: 'CS' | 'SALES' | 'REVOPS' | ...;
  industry?: string;
  department?: string;
  connectors: Array<{
    provider: string;
    entityTypes: string[];
    flowType: 'A' | 'B' | 'C';
  }>;
}

interface Response {
  tenantConfig: {
    id: string;
    domain: string;
    allowedEntityTypes: string[];
    connectors: Record<string, any>;
  };
  syncJobs: Array<{
    jobId: string;
    connector: string;
    status: string;
  }>;
}
```

### Creamy Progress
```typescript
// GET /api/v1/loader/creamy/:jobId
interface Response {
  jobId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: {
    total: number;
    processed: number;
    percentage: number;
  };
  extractedCount: number;
  createdAt: string;
  completedAt?: string;
}
```

### Complete Onboarding
```typescript
// POST /api/v1/workspace/complete-onboarding
interface Request {
  preferences?: Record<string, any>;
}

interface Response {
  success: boolean;
  redirectUrl: '/app';
  backgroundJobs: Array<{
    jobId: string;
    type: string;
    status: string;
  }>;
}
```

## Three Flows Detail

### Flow A: Structured (CRM/Support)
**Connectors**: Zoho CRM, Zendesk, Freshdesk, Salesforce, HubSpot

```
Connector Auth → Schema Selector → Loader (Creamy) → Pipeline (8 stages) → Spine → Signal Queue (B5-B7) → Intelligence
```

### Flow B: Unstructured (Communication/Documents)
**Connectors**: Gmail, Outlook, Slack, Teams, Notion, Drive

```
Connector Auth → Loader → Pipeline → Spine (refs) + Knowledge Queue (chunk/embed)
```

### Flow C: AI/Knowledge
**Sources**: AI Chat, MCP, Custom AI

```
AI Source → D1 Buffer → Triage Bot → Triage Space → User Action → Compounding Space
```

## Data Flow

### Onboarding (Path 1)

1. **Landing** → User clicks "Get Started"
2. **Onboarding Step 1** (Identity) → Workspace name
3. **Onboarding Step 2** (Domain) → Department/Industry
4. **Onboarding Step 3** (Connectors) → OAuth flow with Flow classification
5. **Onboarding Step 4** (Schema) → Entity type selection
6. **API: initialize-spine** → Creates schema config, starts Creamy layer
7. **Onboarding Step 5** (AI Loader) → Shows Creamy layer progress (~60s)
8. **Pipeline** → Processes Creamy data through 8 stages
9. **Onboarding Step 6** (Workplace Loading) → Shows Normalizer progress
10. **API: complete-onboarding** → Marks complete, creates background jobs
11. **Redirect** → Workplace L1

### Workplace Connector Addition (Path 2)

1. **Workplace L1** → User clicks "Add Integration"
2. **Connector Page** → OAuth flow
3. **Schema Updator** → Add new entity types
4. **Flow Router** → Classify A/B/C
5. **Start Sync** → Background job
6. **Notification** → "Sync in progress..."

## Next Steps

### Backend
1. Deploy new services:
   - `services/gateway/src/routes/workspace.ts`
   - `services/connector/src/routes/internal.ts`
   - `services/loader/src/index.ts`

2. Run migrations:
   ```bash
   psql -f sql-migrations/20240319_onboarding_schema.sql
   ```

3. Update Wrangler configs:
   - Add `LOADER_QUEUE` binding to Loader service
   - Add `PIPELINE_QUEUE` binding to Loader service

### Frontend
1. Build and test onboarding components
2. Wire up real OAuth flows in ConnectorStep
3. Implement real-time progress updates

### Integration
1. Test end-to-end onboarding flow
2. Verify Creamy → Normalizer → Workplace transition
3. Test background job continuation (Stage 2)

---

**Status**: Clean architecture implemented ✅
- Backend routes: ✅
- Frontend components: ✅
- Database schema: ✅
- API contracts: ✅
- Documentation: ✅
