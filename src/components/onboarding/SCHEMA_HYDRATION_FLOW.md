# Schema-Driven Hydration Flow

## Overview

After Department + Industry selection in Step 2, the **Schema Selector** (Step 2.5) is the **master control** that drives EVERYTHING downstream in IntegrateWise:

```
Industry × Department → Schema Selection → Everything Hydrates
```

## The 12×11 Model in Action

### Formula
```
Resource Type (Industry) × Trait (Department) = Adaptive Schema
```

### Example: Healthcare × Customer Success
```
Industry: Healthcare
Department: Customer Success

↓ Schema Registry generates:

Core Entities:
- Accounts (base)
- Contacts (base)
- Activities (base)
- Documents (base)

Department Entities (CS-specific):
- Customer Accounts (enhanced with health_score, csm, arr)
- Health Scores (churn risk, engagement trends)
- Renewals (contract tracking)
- Usage Metrics (product adoption)

Industry Entities (Healthcare-specific):
- Patients (MRN, DOB, Provider linkage)
- Healthcare Providers (NPI, specialty, location)
- Insurance Claims (billing, reimbursement)

North Star Metric: Net Revenue Retention (NRR)
```

## What Schema Selection Controls

### 1. **Spine Configuration** (SSOT)

When user selects entities in Step 2.5:

```typescript
// Real-time upsert to tenant_spine_config
await supabase
  .from('tenant_spine_config')
  .upsert({
    tenant_id: tenantId,
    industry: "Healthcare",
    department: "Customer Success",
    enabled_entities: [
      "accounts",
      "contacts",
      "health_scores",
      "renewals",
      "patients",
      "providers"
    ],
    north_star_metric: "Net Revenue Retention",
    schema_version: "1.0",
    config_metadata: {
      recommended_connectors: ["salesforce", "zendesk", "epic"],
      ui_modules: ["health-scores", "renewals", "playbooks"],
      intelligence_focus: ["churn_prediction", "expansion_opportunity"]
    }
  });
```

### 2. **Connector Recommendations**

Schema automatically recommends connectors that can populate selected entities:

```typescript
// Healthcare × Customer Success connectors:
Recommended:
- Salesforce (Accounts, Contacts, Renewals)
- Zendesk (Support Tickets linked to Health Scores)
- Epic/Cerner (Patient data, Provider relationships)
- Stripe (Subscription/Revenue data for NRR)
- Mixpanel (Usage Metrics for product adoption)

Not Recommended:
- Shopify (no e-commerce need)
- LinkedIn (not relevant for healthcare CS)
```

### 3. **Connector Sync Scope**

Schema tells each connector **exactly what to sync**:

```typescript
// Salesforce connector sync configuration
const syncConfig = {
  connector: "salesforce",
  tenant_id: tenantId,
  enabled_entities: selectedEntities, // From schema selection
  
  sync_rules: {
    // Only sync if entity is selected in schema
    accounts: selectedEntities.includes("accounts"),
    contacts: selectedEntities.includes("contacts"),
    opportunities: selectedEntities.includes("deals"), // Map to "deals"
    cases: selectedEntities.includes("tickets"),
    
    // Custom objects based on industry
    ...(industry === "Healthcare" && {
      Patient__c: selectedEntities.includes("patients"),
      Provider__c: selectedEntities.includes("providers")
    })
  },
  
  // Phase 1: Creamy - only sync selected entity types
  creamy_config: {
    max_records_per_entity: 100,
    entities: selectedEntities,
    order: "most_recent_first"
  }
};
```

**Key Benefit:** If user doesn't select "deals", Salesforce connector **never syncs opportunities**. Massive performance and storage savings.

### 4. **UI Module Activation**

Workspace UI modules auto-configure based on schema:

```typescript
// Customer Success workspace for Healthcare
const activeModules = schemaRecommendation.modules;

// Only render modules for selected entities
<WorkspaceShell>
  {selectedEntities.includes("health_scores") && <HealthScoreDashboard />}
  {selectedEntities.includes("renewals") && <RenewalsPipeline />}
  {selectedEntities.includes("tickets") && <SupportQueue />}
  {selectedEntities.includes("usage_metrics") && <ProductAdoptionView />}
  
  {/* Industry-specific modules */}
  {industry === "Healthcare" && selectedEntities.includes("patients") && (
    <PatientJourneyMap />
  )}
</WorkspaceShell>
```

### 5. **Entity 360 Views**

Entity 360 assembles data **only from selected entity types**:

```typescript
// Account 360 view hydration
const account360 = await getEntity360("account", accountId, {
  includeEntities: selectedEntities,
  industry,
  department
});

// Result structure varies by schema:
{
  account: {...}, // Always included if "accounts" selected
  
  // Only if "health_scores" selected:
  health_score: {...},
  
  // Only if "renewals" selected:
  upcoming_renewals: [...],
  
  // Only if "patients" selected (Healthcare):
  linked_patients: [...],
  
  // Only if "tickets" selected:
  support_tickets: [...],
  
  // Only if "usage_metrics" selected:
  product_usage: {...}
}
```

### 6. **Intelligence Signals**

AI Twin focuses on **schema-selected entities** and **north star metric**:

```typescript
// Intelligence signals configuration
const intelligenceConfig = {
  focus_metric: recommendation.northStar, // "Net Revenue Retention"
  entity_scope: selectedEntities,
  
  signal_types: {
    // Only generate if entities exist
    churn_risk: selectedEntities.includes("health_scores"),
    expansion_opportunity: selectedEntities.includes("usage_metrics"),
    renewal_risk: selectedEntities.includes("renewals"),
    
    // Industry-specific signals
    ...(industry === "Healthcare" && {
      patient_outcome_correlation: selectedEntities.includes("patients"),
      provider_satisfaction: selectedEntities.includes("providers")
    })
  }
};

// AI analyzes ONLY selected entity types
const signals = await intelligenceEngine.analyze({
  account_id: accountId,
  entities: account360, // Pre-filtered by schema
  north_star: "NRR",
  context: { industry, department }
});
```

### 7. **Search & Discovery**

Global search scope limited to selected entities:

```typescript
// Search only indexes selected entity types
const searchIndex = {
  tenant_id: tenantId,
  indexed_entities: selectedEntities.map(entityType => ({
    type: entityType,
    fields: getSearchableFields(entityType, industry)
  }))
};

// Example: If "deals" not selected, deal records never appear in search
```

### 8. **API Permissions**

API access automatically scoped to schema:

```typescript
// API middleware checks schema
app.get('/api/v1/spine/:entity_type/:id', async (req, res) => {
  const { entity_type } = req.params;
  const { tenant_id } = req.user;
  
  // Check if entity type is enabled in tenant's schema
  const config = await getTenantSpineConfig(tenant_id);
  
  if (!config.enabled_entities.includes(entity_type)) {
    return res.status(403).json({
      error: "Entity type not enabled in your schema",
      message: "Add this entity in Settings → Schema to access it"
    });
  }
  
  // Proceed with query
  const entity = await getEntity(entity_type, req.params.id, tenant_id);
  res.json(entity);
});
```

## Real-World Example: Two Customers, Different Schemas

### Customer A: SaaS × Sales

**Selected Entities:**
- Accounts
- Contacts
- Deals
- Activities
- Campaigns
- Features (SaaS-specific)

**Result:**
- Salesforce syncs: Accounts, Contacts, Opportunities, Tasks
- HubSpot syncs: Companies, Contacts, Deals, Marketing Events
- Mixpanel syncs: Feature usage events
- North Star: ARR Growth
- UI Modules: Pipeline, Forecasting, Deal Coach
- Intelligence: Deal scoring, next-best-action
- **NO** health scores, renewals, or support data synced

---

### Customer B: Healthcare × Customer Success

**Selected Entities:**
- Customer Accounts
- Health Scores
- Renewals
- Tickets
- Patients (Healthcare-specific)
- Providers (Healthcare-specific)

**Result:**
- Salesforce syncs: Accounts, Cases, Patient/Provider custom objects
- Zendesk syncs: Tickets, Customer satisfaction
- Epic syncs: Patient records, Provider relationships
- North Star: Net Revenue Retention
- UI Modules: Health Scores, Renewals, Playbooks, Patient Journey
- Intelligence: Churn prediction, expansion signals
- **NO** deals, campaigns, or lead data synced

---

## Schema Evolution

### Adding Entities Later

User can expand schema post-onboarding:

```typescript
// Settings → Schema → Add Entity Type
await updateTenantSchema(tenantId, {
  action: "add_entity",
  entity_type: "tickets",
  trigger_backfill: true // Sync historical data
});

// Results in:
1. tenant_spine_config updated
2. Connected connectors re-sync for new entity type
3. UI modules auto-activate
4. Intelligence expands signal scope
5. Search index rebuilds
```

### Removing Entities

```typescript
// Settings → Schema → Remove Entity Type
await updateTenantSchema(tenantId, {
  action: "remove_entity",
  entity_type: "campaigns",
  archive_data: true // Keep data but hide from UI
});

// Results in:
1. Entity hidden from all UIs
2. Connectors stop syncing this type
3. Search index updated
4. Intelligence ignores archived entity
5. Data preserved in Spine (soft delete)
```

## Benefits of Schema-Driven Architecture

### 1. **Performance**
- Only sync what's needed
- Smaller search indexes
- Faster API responses
- Reduced storage costs

### 2. **Clarity**
- Users see only relevant data
- No clutter from unused entity types
- UI adapts automatically

### 3. **Compliance**
- Don't sync PII if not needed
- Industry-specific data handling (HIPAA, GDPR)
- Audit trail of schema changes

### 4. **Scalability**
- 12 × 11 = 132 possible combinations
- Each tenant gets custom schema
- No "one size fits all" bloat

### 5. **Intelligence Quality**
- AI focuses on relevant signals
- North star metric alignment
- Better recommendations

## Technical Implementation

### Database Schema

```sql
-- Tenant spine configuration table
CREATE TABLE tenant_spine_config (
  tenant_id UUID PRIMARY KEY REFERENCES tenants(id),
  industry TEXT NOT NULL,
  department TEXT NOT NULL,
  enabled_entities TEXT[] NOT NULL, -- Selected entity types
  north_star_metric TEXT NOT NULL,
  schema_version TEXT NOT NULL DEFAULT '1.0',
  config_metadata JSONB, -- Recommendations, modules, etc.
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Entity type registry (master list)
CREATE TABLE entity_type_registry (
  entity_type TEXT PRIMARY KEY,
  category TEXT NOT NULL, -- core | extended | industry-specific
  display_name TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  required_for TEXT[], -- Dependencies
  available_for_industries TEXT[],
  available_for_departments TEXT[]
);

-- Connector entity mappings
CREATE TABLE connector_entity_mappings (
  connector_id TEXT NOT NULL,
  entity_type TEXT NOT NULL REFERENCES entity_type_registry(entity_type),
  external_object_name TEXT NOT NULL, -- e.g., "Opportunity" in Salesforce
  field_mappings JSONB NOT NULL,
  PRIMARY KEY (connector_id, entity_type)
);
```

### BFF Endpoint

```typescript
// POST /api/v1/onboarding/configure-schema
export async function configureSchema(req, res) {
  const { tenant_id, industry, department, selected_entities } = req.body;
  
  // 1. Get schema recommendation
  const recommendation = getSchemaRecommendation(industry, department);
  
  // 2. Validate selected entities
  const validEntities = recommendation.entities
    .map(e => e.id)
    .filter(id => selected_entities.includes(id));
  
  // 3. Upsert tenant_spine_config
  const config = await supabase
    .from('tenant_spine_config')
    .upsert({
      tenant_id,
      industry,
      department,
      enabled_entities: validEntities,
      north_star_metric: recommendation.northStar,
      config_metadata: {
        recommended_connectors: recommendation.connectors,
        ui_modules: recommendation.modules,
        schema_timestamp: new Date().toISOString()
      }
    })
    .select()
    .single();
  
  // 4. Create entity tables dynamically (if needed)
  for (const entityType of validEntities) {
    await ensureEntityTable(tenant_id, entityType);
  }
  
  // 5. Configure connector sync rules
  const connectedConnectors = await getConnectedConnectors(tenant_id);
  for (const connector of connectedConnectors) {
    await updateConnectorSyncConfig(connector.id, validEntities);
  }
  
  return res.json({
    success: true,
    config,
    next_steps: {
      connect_tools: recommendation.connectors,
      ui_modules_activated: recommendation.modules
    }
  });
}
```

---

## Summary: Schema is the Source of Truth

```
┌─────────────────────────────────────────────────────────────┐
│                    SCHEMA SELECTION                          │
│         (Industry × Department × Entity Types)               │
└──────────────────┬──────────────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
┌───────────────┐    ┌────────────────┐
│ SPINE CONFIG  │    │   CONNECTORS   │
│  (Supabase)   │    │  (Sync Rules)  │
└───────┬───────┘    └────────┬───────┘
        │                     │
        └──────────┬──────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
┌──────────────┐    ┌────────────────┐
│  UI MODULES  │    │  INTELLIGENCE  │
│  (Workspace) │    │   (AI Twin)    │
└──────────────┘    └────────────────┘
```

**Everything downstream reads from `tenant_spine_config`.**

The schema is not just configuration—it's the **adaptive DNA** of each tenant's IntegrateWise instance.
