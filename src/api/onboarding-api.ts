/**
 * Onboarding API Client
 * Based on: /imports/pasted_text/user-journey-flow.md
 * 
 * Complete API Call Sequence:
 * 1. Landing → Signup
 * 2. Signup → Auth
 * 3. Onboarding (6 steps)
 * 4. Workspace
 * 5. Data Operations
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface OnboardingMetadata {
  onboarding_complete: boolean;
  onboarding_step: number;
  workspace_name?: string;
  domain?: string;
}

export interface TenantConfig {
  tenant_id: string;
  workspace_name: string;
  organization_name: string;
  domain: string;
  industry: string;
  department: string;
  role: string;
  team_size: string;
  schema_config: {
    enabled_entities: string[];
    custom_fields: Record<string, any>;
  };
  connected_connectors: string[];
  preferences: {
    enable_notifications: boolean;
    enable_ai: boolean;
    enable_realtime: boolean;
  };
  lifecycle_stage: "onboarding" | "active" | "churned";
  created_at: string;
  updated_at: string;
}

export interface Connector {
  id: string;
  name: string;
  provider: string;
  flow_type: "A" | "B" | "C";
  category: string;
  auth_type: "oauth2" | "api_key" | "basic";
  status: "available" | "connected" | "error";
  logo_url?: string;
}

export interface ReadinessStatus {
  tenant_id: string;
  overall_readiness: number;
  buckets: {
    B0_B1: number;
    B2_B3: number;
    B4: number;
    B5_B7: number;
  };
  connector_sync_status: {
    [connector: string]: {
      phase: "creamy" | "needed" | "delta";
      progress: number;
      last_sync: string;
    };
  };
  intelligence_ready: boolean;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// API Base Configuration
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

/**
 * Get auth headers with session token
 */
function getAuthHeaders(): HeadersInit {
  // TODO: Get from Supabase session
  const token = "mock-token"; // Replace with real token
  const tenantId = "mock-tenant-id"; // Replace with real tenant ID
  
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    "x-tenant-id": tenantId,
  };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. Auth APIs
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Step 2: Auth - Signup
 * POST /auth/v1/signup
 */
export async function signup(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    throw new Error("Signup failed");
  }
  
  return response.json();
}

/**
 * Get current session
 * GET /auth/v1/session
 */
export async function getSession() {
  const response = await fetch(`${API_BASE_URL}/auth/v1/session`, {
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    throw new Error("Failed to get session");
  }
  
  return response.json();
}

/**
 * Check tenant config to determine onboarding status
 * GET /api/v1/workspace/tenant-config
 */
export async function getTenantConfig(): Promise<TenantConfig> {
  const response = await fetch(`${API_BASE_URL}/api/v1/workspace/tenant-config`, {
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    throw new Error("Failed to get tenant config");
  }
  
  return response.json();
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. Onboarding APIs (6 Steps)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Step 1: Identity - Create workspace foundation
 * POST /api/v1/workspace/initialize
 */
export async function initializeWorkspace(data: {
  workspace_name: string;
  organization_name: string;
  user_name: string;
}) {
  const response = await fetch(`${API_BASE_URL}/api/v1/workspace/initialize`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error("Failed to initialize workspace");
  }
  
  return response.json();
}

/**
 * Step 2: Domain Schema - Initialize Spine
 * POST /api/v1/workspace/initialize-spine
 */
export async function initializeSpine(data: {
  domain: string;
  industry: string;
  department: string;
  selected_entities: string[];
}) {
  const response = await fetch(`${API_BASE_URL}/api/v1/workspace/initialize-spine`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error("Failed to initialize Spine");
  }
  
  return response.json();
}

/**
 * Step 3: Role & Scope - Configure RBAC
 * POST /api/v1/workspace/configure-rbac
 */
export async function configureRBAC(data: {
  role: "admin" | "manager" | "user";
  team_size: string;
  department: string;
}) {
  const response = await fetch(`${API_BASE_URL}/api/v1/workspace/configure-rbac`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error("Failed to configure RBAC");
  }
  
  return response.json();
}

/**
 * Step 4: Tool Connections - Get available connectors
 * GET /api/v1/connectors?domain=xxx&department=xxx
 */
export async function getAvailableConnectors(
  domain: string,
  department: string
): Promise<Connector[]> {
  const params = new URLSearchParams({ domain, department });
  const response = await fetch(
    `${API_BASE_URL}/api/v1/connectors?${params}`,
    { headers: getAuthHeaders() }
  );
  
  if (!response.ok) {
    throw new Error("Failed to get connectors");
  }
  
  return response.json();
}

/**
 * Step 4: Tool Connections - Initiate OAuth
 * GET /oauth/:provider/authorize?tenant_id=xxx
 */
export function initiateOAuth(provider: string, tenantId: string): string {
  return `${API_BASE_URL}/oauth/${provider}/authorize?tenant_id=${tenantId}`;
}

/**
 * Step 5: AI Loader - Upload files for Flow B
 * POST /api/v1/workspace/upload-files
 */
export async function uploadFiles(files: File[]) {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });
  
  const response = await fetch(`${API_BASE_URL}/api/v1/workspace/upload-files`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error("Failed to upload files");
  }
  
  return response.json();
}

/**
 * Step 6: Activate - Complete onboarding
 * POST /api/v1/workspace/complete-onboarding
 */
export async function completeOnboarding(data: {
  tenant_id: string;
  onboarding_data: {
    domain: string;
    connectors: string[];
    preferences: {
      enable_notifications: boolean;
      enable_ai: boolean;
      enable_realtime: boolean;
    };
  };
}) {
  const response = await fetch(`${API_BASE_URL}/api/v1/workspace/complete-onboarding`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error("Failed to complete onboarding");
  }
  
  return response.json();
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. Workspace APIs
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Get dashboard data
 * GET /api/v1/workspace/dashboard
 */
export async function getDashboardData() {
  const response = await fetch(`${API_BASE_URL}/api/v1/workspace/dashboard`, {
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    throw new Error("Failed to get dashboard data");
  }
  
  return response.json();
}

/**
 * Get readiness/hydration status
 * GET /api/v1/workspace/readiness
 */
export async function getReadinessStatus(): Promise<ReadinessStatus> {
  const response = await fetch(`${API_BASE_URL}/api/v1/workspace/readiness`, {
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    throw new Error("Failed to get readiness status");
  }
  
  return response.json();
}

/**
 * Get HITL approval queue
 * GET /api/v1/cognitive/hitl/queue
 */
export async function getHITLQueue() {
  const response = await fetch(`${API_BASE_URL}/api/v1/cognitive/hitl/queue`, {
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    throw new Error("Failed to get HITL queue");
  }
  
  return response.json();
}

/**
 * Get knowledge inbox (Flow C triage)
 * GET /v1/knowledge/inbox
 */
export async function getKnowledgeInbox() {
  const response = await fetch(`${API_BASE_URL}/v1/knowledge/inbox`, {
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    throw new Error("Failed to get knowledge inbox");
  }
  
  return response.json();
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. Data Operations
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * List entities by type
 * GET /api/v1/workspace/entities?type=accounts
 */
export async function getEntities(entityType: string) {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/workspace/entities?type=${entityType}`,
    { headers: getAuthHeaders() }
  );
  
  if (!response.ok) {
    throw new Error("Failed to get entities");
  }
  
  return response.json();
}

/**
 * Read from Spine
 * GET /api/v1/spine/:entity_type
 */
export async function getSpineData(entityType: string) {
  const response = await fetch(`${API_BASE_URL}/api/v1/spine/${entityType}`, {
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    throw new Error("Failed to get Spine data");
  }
  
  return response.json();
}

/**
 * Write to Spine via Pipeline
 * POST /api/v1/pipeline/write
 */
export async function writeToSpine(data: {
  entity_type: string;
  data: any;
  source: string;
}) {
  const response = await fetch(`${API_BASE_URL}/api/v1/pipeline/write`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error("Failed to write to Spine");
  }
  
  return response.json();
}

/**
 * Semantic search in knowledge
 * POST /knowledge/search
 */
export async function searchKnowledge(query: string) {
  const response = await fetch(`${API_BASE_URL}/knowledge/search`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ query }),
  });
  
  if (!response.ok) {
    throw new Error("Failed to search knowledge");
  }
  
  return response.json();
}

/**
 * Approve/discard triage item (Flow C)
 * PATCH /v1/knowledge/triage/:id
 */
export async function updateTriageItem(
  id: string,
  action: "approve" | "discard"
) {
  const response = await fetch(`${API_BASE_URL}/v1/knowledge/triage/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ action }),
  });
  
  if (!response.ok) {
    throw new Error("Failed to update triage item");
  }
  
  return response.json();
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. Real-time APIs
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Create WebSocket connection for real-time updates
 * WS /ws?tenant_id=xxx
 */
export function createWebSocketConnection(tenantId: string): WebSocket {
  const wsUrl = API_BASE_URL.replace("http", "ws");
  return new WebSocket(`${wsUrl}/ws?tenant_id=${tenantId}`);
}

/**
 * Create SSE connection for event stream
 * SSE /stream/events
 */
export function createEventSource(tenantId: string): EventSource {
  return new EventSource(
    `${API_BASE_URL}/stream/events?tenant_id=${tenantId}`
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. Helper Functions
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Complete onboarding flow execution
 * Orchestrates all 6 steps in sequence
 */
export async function executeOnboardingFlow(data: {
  // Step 1
  workspaceName: string;
  organizationName: string;
  userName: string;
  
  // Step 2
  domain: string;
  industry: string;
  department: string;
  selectedEntities: string[];
  
  // Step 3
  role: "admin" | "manager" | "user";
  teamSize: string;
  
  // Step 4
  connectors: string[];
  
  // Step 5
  files: File[];
  
  // Step 6
  preferences: {
    enableNotifications: boolean;
    enableAI: boolean;
    enableRealtime: boolean;
  };
}) {
  try {
    // Step 1: Initialize workspace
    const workspaceResult = await initializeWorkspace({
      workspace_name: data.workspaceName,
      organization_name: data.organizationName,
      user_name: data.userName,
    });
    
    console.log("✅ Step 1: Workspace initialized", workspaceResult);
    
    // Step 2: Initialize Spine
    const spineResult = await initializeSpine({
      domain: data.domain,
      industry: data.industry,
      department: data.department,
      selected_entities: data.selectedEntities,
    });
    
    console.log("✅ Step 2: Spine initialized", spineResult);
    
    // Step 3: Configure RBAC
    const rbacResult = await configureRBAC({
      role: data.role,
      team_size: data.teamSize,
      department: data.department,
    });
    
    console.log("✅ Step 3: RBAC configured", rbacResult);
    
    // Step 4: Connectors (OAuth will happen separately)
    console.log("✅ Step 4: Connectors selected", data.connectors);
    
    // Step 5: Upload files (if any)
    if (data.files.length > 0) {
      const uploadResult = await uploadFiles(data.files);
      console.log("✅ Step 5: Files uploaded", uploadResult);
    } else {
      console.log("⏭️  Step 5: Skipped (no files)");
    }
    
    // Step 6: Complete onboarding
    const completionResult = await completeOnboarding({
      tenant_id: workspaceResult.tenant_id,
      onboarding_data: {
        domain: data.domain,
        connectors: data.connectors,
        preferences: {
          enable_notifications: data.preferences.enableNotifications,
          enable_ai: data.preferences.enableAI,
          enable_realtime: data.preferences.enableRealtime,
        },
      },
    });
    
    console.log("✅ Step 6: Onboarding complete!", completionResult);
    
    return {
      success: true,
      tenant_id: workspaceResult.tenant_id,
      ...completionResult,
    };
    
  } catch (error) {
    console.error("❌ Onboarding flow failed:", error);
    throw error;
  }
}

/**
 * Mock implementation for development
 * Returns simulated API responses when backend is not available
 */
export const mockOnboardingAPI = {
  initializeWorkspace: async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      success: true,
      tenant_id: "mock-tenant-" + Math.random().toString(36).substr(2, 9),
      workspace_name: data.workspace_name,
    };
  },
  
  initializeSpine: async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      success: true,
      schema_config: {
        enabled_entities: data.selected_entities,
        domain: data.domain,
        industry: data.industry,
        department: data.department,
      },
    };
  },
  
  completeOnboarding: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      success: true,
      onboarding_complete: true,
      redirect_url: "/app",
    };
  },
};
