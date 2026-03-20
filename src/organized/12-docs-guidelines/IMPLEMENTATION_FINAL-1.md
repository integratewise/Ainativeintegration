# Clean Architecture Implementation - FINAL

## Complete Wiring Summary

### Frontend → Cloudflare → Backend Flow

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    COMPLETE SYSTEM WIRING                                    │
└─────────────────────────────────────────────────────────────────────────────────────────────┘

FRONTEND (React SPA in Browser)
│
│  HTTP Request: POST /api/v1/workspace/initialize-spine
│  Headers: Authorization: Bearer <JWT>, x-tenant-id: <id>
│
▼
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│  CLOUDFLARE GATEWAY (services/gateway/src/index.ts)                                         │
│  • Verify JWT with Supabase                                                                 │
│  • Rate limiting per IP/user                                                                │
│  • CORS handling                                                                             │
│  • Route matching: /api/v1/workspace/* → BFF (env.BFF.fetch())                              │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
│
│  Service Binding (internal Worker-to-Worker)
│
▼
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│  BFF / WORKFLOW (services/workflow/src/index.ts)                                            │
│  Routes:                                                                                    │
│  • /api/v1/workspace/initialize-spine → initializeAdaptiveSpine()                           │
│  • /api/v1/workspace/onboarding-state → getOnboardingState()                                │
│  • /api/v1/workspace/complete-onboarding → completeOnboarding()                             │
│  • /api/v1/workspace/progress → getSyncProgressSSE() (SSE stream)                          │
│                                                                                             │
│  Direct Supabase access for tenant data                                                     │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
│
│  Service Binding (for Creamy layer progress)
│
▼
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│  CONNECTOR / LOADER (services/connector/src/index.ts → services/loader/src/index.ts)        │
│  Routes:                                                                                    │
│  • /api/v1/loader/creamy → Start Creamy layer sync                                          │
│  • /api/v1/loader/creamy/:jobId → Get Creamy job progress                                   │
│                                                                                             │
│  Service Bindings:                                                                          │
│  • env.PIPELINE_QUEUE → Send records to Pipeline                                            │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
│
│  Queue Message
│
▼
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│  PIPELINE / NORMALIZER (services/pipeline/src/index.ts or services/normalizer/src/index.ts) │
│  • 8-stage processing: Analyze → Classify → Filter → Refine → Extract → Validate → Sanity → │
│  • Write to Spine (Supabase)                                                                │
│  • Broadcast to UI via SSE                                                                  │
│  • Send B5-B7 signals to Intelligence                                                       │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

## Implementation Files

### 1. Frontend (apps/web/src/)

| File | Purpose |
|------|---------|
| `api/workspace.ts` | API client for workspace endpoints |
| `components/onboarding/OnboardingFlow.tsx` | Main 6-step onboarding orchestrator |
| `components/onboarding/AILoader.tsx` | Step 5 - Creamy layer progress UI |
| `components/onboarding/WorkplaceLoading.tsx` | Step 6 - Normalizer progress UI |
| `components/onboarding/SchemaSelector.tsx` | Step 4 - Entity type selection |
| `components/onboarding/steps/IdentityStep.tsx` | Step 1 - Brand/workspace name |
| `components/onboarding/steps/DomainStep.tsx` | Step 2 - Department/industry |
| `components/onboarding/steps/ConnectorStep.tsx` | Step 3 - Connector OAuth + Flow A/B/C |

### 2. Gateway (services/gateway/src/)

| File | Purpose |
|------|---------|
| `index.ts` | Main router - routes `/api/v1/workspace/*` to BFF, `/api/v1/loader/*` to CONNECTOR |

**Route Table** (line 63-98):
```typescript
[
  ["/api/v1/workspace", "BFF"],        // ← Onboarding routes
  ["/api/v1/loader", "CONNECTOR"],     // ← Creamy layer routes
  ["/api/v1/connectors", "CONNECTOR"], // ← Connector OAuth
  // ... other routes
]
```

### 3. BFF / Workflow (services/workflow/src/)

| File | Purpose |
|------|---------|
| `index.ts` | Workspace route handlers (lines 184-187, 2108-2260) |

**New Functions Added**:
- `initializeAdaptiveSpine()` - Sets up tenant schema
- `getOnboardingState()` - Gets onboarding progress from Supabase
- `completeOnboarding()` - Marks onboarding complete, creates background jobs
- `getSyncProgressSSE()` - SSE stream for real-time sync progress

### 4. Connector / Loader (services/connector/src/, services/loader/src/)

| File | Purpose |
|------|---------|
| `connector/src/index.ts` | Routes to loaderWorker for loader routes |
| `connector/src/routes/internal.ts` | Internal routes: initialize-spine schema setup |
| `connector/src/types.ts` | TypeScript types |
| `loader/src/index.ts` | Creamy layer and Stage 2 background sync |
| `loader/src/types.ts` | TypeScript types |

### 5. Database (sql-migrations/)

| File | Purpose |
|------|---------|
| `20240319_onboarding_schema.sql` | New tables: tenant_onboarding_state, sync_jobs, tenant_schema_configs |

## API Contracts

### Initialize Spine
```
POST /api/v1/workspace/initialize-spine
→ Gateway → BFF → Supabase

Request:
{
  domain: "CS" | "SALES" | "REVOPS" | ...,
  industry?: string,
  department?: string,
  connectors: [{ provider, entityTypes, flowType }]
}

Response:
{
  tenantConfig: { id, domain, allowedEntityTypes, connectors },
  syncJobs: [{ jobId, connector, status }]
}
```

### Get Onboarding State
```
GET /api/v1/workspace/onboarding-state
→ Gateway → BFF → Supabase

Response:
{
  onboarding: {
    status: "not_started" | "in_progress" | "completed",
    currentStep: string,
    completedSteps: string[],
    connectorsConfig: [...],
    creamyJobId?: string
  }
}
```

### Complete Onboarding
```
POST /api/v1/workspace/complete-onboarding
→ Gateway → BFF → Supabase

Response:
{
  success: true,
  redirectUrl: "/app",
  backgroundJobs: [{ jobId, type, status }]
}
```

### Sync Progress (SSE)
```
GET /api/v1/workspace/progress
→ Gateway → BFF → SSE Stream

Events:
data: { type: "sync_progress", jobs: [...] }
```

### Creamy Progress
```
GET /api/v1/loader/creamy/:jobId
→ Gateway → CONNECTOR → loaderWorker

Response:
{
  jobId: string,
  status: "running" | "completed" | "failed",
  progress: { total, processed, percentage },
  extractedCount: number
}
```

## Data Flow: Onboarding

```
Step 1: Identity (Frontend)
  → User enters workspace name
  → Next → Step 2

Step 2: Domain (Frontend)
  → User selects department/industry
  → Next → Step 3

Step 3: Connectors (Frontend)
  → User selects connectors, OAuth flow
  → Next → Step 4

Step 4: Schema Selector (Frontend)
  → User selects entity types
  → Continue → API: initialize-spine
    
    POST /api/v1/workspace/initialize-spine
    → Gateway (verify JWT)
    → BFF (initializeAdaptiveSpine)
      → Supabase: INSERT tenant_schema_configs
      → Supabase: INSERT/UPDATE tenant_onboarding_state
      → Start Creamy layer (if Flow A connectors)
    → Response: { tenantConfig, syncJobs }
    
  → Creamy job ID received
  → Next → Step 5

Step 5: AI Loader (Frontend)
  → Shows Creamy layer progress
  → Polls: GET /api/v1/loader/creamy/:jobId
    
    Every 2 seconds:
    GET /api/v1/loader/creamy/:jobId
    → Gateway → CONNECTOR → loaderWorker
      → In-memory jobStore
    → Response: { progress, extractedCount }
    
  → When Creamy completes:
    → Loader sends to PIPELINE_QUEUE
    → Next → Step 6

Step 6: Workplace Loading (Frontend)
  → Shows Normalizer progress
  → SSE: GET /api/v1/workspace/progress
    
    SSE Connection:
    GET /api/v1/workspace/progress
    → Gateway → BFF (getSyncProgressSSE)
      → Every 2s: SELECT * FROM sync_jobs
      → Send SSE event
    → Stream: data: { jobs: [...] }
    
  → When Normalizer completes:
    → API: complete-onboarding
      
      POST /api/v1/workspace/complete-onboarding
      → Gateway → BFF (completeOnboarding)
        → Supabase: UPDATE tenant_onboarding_state SET status = "completed"
        → Supabase: UPDATE tenant_profiles SET onboarding_completed = true
        → Supabase: INSERT sync_jobs (Stage 2 - Needed/Delta)
      → Response: { success: true, redirectUrl: "/app", backgroundJobs }
      
    → Redirect to /app (Workplace L1)
```

## Service Bindings Required

### Gateway wrangler.toml
```toml
[env.production.services]
CONNECTOR = { service = "integratewise-connector" }
PIPELINE = { service = "integratewise-pipeline" }
INTELLIGENCE = { service = "integratewise-intelligence" }
KNOWLEDGE = { service = "integratewise-knowledge" }
BFF = { service = "integratewise-bff" }
L2 = { service = "integratewise-l2" }
WEBHOOK_INGRESS = { service = "integratewise-webhook-ingress" }
```

### BFF (Workflow) wrangler.toml
```toml
[env.production.services]
SPINE = { service = "integratewise-pipeline" }
KNOWLEDGE = { service = "integratewise-knowledge" }
THINK = { service = "integratewise-intelligence" }
```

### Connector wrangler.toml
```toml
[env.production.services]
SPINE = { service = "integratewise-pipeline" }
```

### Connector Queues
```toml
[[env.production.queues.producers]]
binding = "PIPELINE_QUEUE"
queue = "pipeline-queue"

[[env.production.queues.producers]]
binding = "LOADER_QUEUE"
queue = "loader-queue"
```

## Next Steps to Deploy

1. **Run Database Migrations**
   ```bash
   psql -f sql-migrations/20240319_onboarding_schema.sql
   ```

2. **Deploy Services** (in order)
   ```bash
   # 1. Deploy Loader (part of Connector)
   ./scripts/cloudflare-deploy-worker.sh loader production
   
   # 2. Deploy Connector (includes Loader)
   ./scripts/cloudflare-deploy-worker.sh connector production
   
   # 3. Deploy BFF (Workflow)
   ./scripts/cloudflare-deploy-worker.sh bff production
   
   # 4. Deploy Gateway
   ./scripts/cloudflare-deploy-worker.sh gateway production
   ```

3. **Verify Service Bindings**
   - Check wrangler.toml for each service
   - Verify bindings in Cloudflare Dashboard

4. **Test End-to-End**
   ```bash
   # Start frontend
   pnpm --filter @integratewise/web dev
   
   # Test onboarding flow
   # 1. Sign up
   # 2. Complete 6-step onboarding
   # 3. Verify redirect to Workplace
   ```

---

**Implementation Status**: ✅ COMPLETE
- Backend routes: ✅
- Frontend components: ✅
- Database schema: ✅
- Service bindings: ✅
- API contracts: ✅
- Documentation: ✅
