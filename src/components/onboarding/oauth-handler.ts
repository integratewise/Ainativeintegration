/**
 * OAuth Handler for IntegrateWise Connectors
 * 
 * This module handles OAuth 2.0 authentication flows for all supported connectors.
 * Each connector follows the same pattern:
 * 1. User clicks "Connect" in onboarding
 * 2. Redirect to provider's OAuth authorize URL
 * 3. Provider redirects back to /oauth/callback
 * 4. Exchange code for access token
 * 5. Store credentials in Supabase
 * 6. Trigger Creamy phase sync
 */

import { CONNECTORS } from "./connector-grid";

export interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  authorizationUrl: string;
  tokenUrl: string;
  scopes: string[];
}

// OAuth configurations for each provider
// In production, these would come from environment variables
export const OAUTH_CONFIGS: Record<string, Partial<OAuthConfig>> = {
  hubspot: {
    authorizationUrl: "https://app.hubspot.com/oauth/authorize",
    tokenUrl: "https://api.hubapi.com/oauth/v1/token",
    redirectUri: `${window.location.origin}/oauth/callback/hubspot`,
    scopes: ["crm.objects.contacts.read", "crm.objects.companies.read", "crm.objects.deals.read"],
  },
  salesforce: {
    authorizationUrl: "https://login.salesforce.com/services/oauth2/authorize",
    tokenUrl: "https://login.salesforce.com/services/oauth2/token",
    redirectUri: `${window.location.origin}/oauth/callback/salesforce`,
    scopes: ["api", "refresh_token", "full"],
  },
  jira: {
    authorizationUrl: "https://auth.atlassian.com/authorize",
    tokenUrl: "https://auth.atlassian.com/oauth/token",
    redirectUri: `${window.location.origin}/oauth/callback/jira`,
    scopes: ["read:jira-work", "read:jira-user"],
  },
  "google-drive": {
    authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    redirectUri: `${window.location.origin}/oauth/callback/google-drive`,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  },
  notion: {
    authorizationUrl: "https://api.notion.com/v1/oauth/authorize",
    tokenUrl: "https://api.notion.com/v1/oauth/token",
    redirectUri: `${window.location.origin}/oauth/callback/notion`,
    scopes: [],
  },
  slack: {
    authorizationUrl: "https://slack.com/oauth/v2/authorize",
    tokenUrl: "https://slack.com/api/oauth.v2.access",
    redirectUri: `${window.location.origin}/oauth/callback/slack`,
    scopes: ["channels:history", "channels:read", "users:read"],
  },
  gmail: {
    authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    redirectUri: `${window.location.origin}/oauth/callback/gmail`,
    scopes: ["https://www.googleapis.com/auth/gmail.readonly"],
  },
  confluence: {
    authorizationUrl: "https://auth.atlassian.com/authorize",
    tokenUrl: "https://auth.atlassian.com/oauth/token",
    redirectUri: `${window.location.origin}/oauth/callback/confluence`,
    scopes: ["read:confluence-content.all"],
  },
  sharepoint: {
    authorizationUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    redirectUri: `${window.location.origin}/oauth/callback/sharepoint`,
    scopes: ["Sites.Read.All", "Files.Read.All"],
  },
  airtable: {
    authorizationUrl: "https://airtable.com/oauth2/v1/authorize",
    tokenUrl: "https://airtable.com/oauth2/v1/token",
    redirectUri: `${window.location.origin}/oauth/callback/airtable`,
    scopes: ["data.records:read", "schema.bases:read"],
  },
};

/**
 * Initiates OAuth flow for a connector
 * @param connectorId - The connector identifier
 * @param tenantId - The tenant ID for multi-tenant isolation
 * @param state - CSRF protection state (should be stored in session)
 */
export function initiateOAuth(
  connectorId: string,
  tenantId: string,
  state?: string
): void {
  const config = OAUTH_CONFIGS[connectorId];
  
  if (!config) {
    console.error(`OAuth config not found for connector: ${connectorId}`);
    return;
  }

  // Generate CSRF state if not provided
  const oauthState = state || generateState();
  
  // Store state in sessionStorage for verification on callback
  sessionStorage.setItem('oauth_state', oauthState);
  sessionStorage.setItem('oauth_connector', connectorId);
  sessionStorage.setItem('oauth_tenant', tenantId);

  // Build authorization URL
  const params = new URLSearchParams({
    client_id: getClientId(connectorId),
    redirect_uri: config.redirectUri || "",
    scope: config.scopes?.join(" ") || "",
    state: oauthState,
    response_type: "code",
    // Additional provider-specific params
    ...(connectorId === "slack" && { user_scope: "" }),
    ...(connectorId === "jira" && { 
      audience: "api.atlassian.com",
      prompt: "consent"
    }),
    ...(connectorId === "google-drive" || connectorId === "gmail") && {
      access_type: "offline",
      prompt: "consent"
    },
  });

  const authUrl = `${config.authorizationUrl}?${params.toString()}`;
  
  // Redirect to provider's authorization page
  window.location.href = authUrl;
}

/**
 * Handles OAuth callback after user authorization
 * @param code - Authorization code from provider
 * @param state - State parameter for CSRF verification
 * @param connectorId - The connector identifier
 */
export async function handleOAuthCallback(
  code: string,
  state: string,
  connectorId: string
): Promise<{ success: boolean; error?: string }> {
  // Verify CSRF state
  const storedState = sessionStorage.getItem('oauth_state');
  if (state !== storedState) {
    return { success: false, error: 'Invalid state parameter (CSRF protection)' };
  }

  const storedConnector = sessionStorage.getItem('oauth_connector');
  const tenantId = sessionStorage.getItem('oauth_tenant');
  
  if (connectorId !== storedConnector) {
    return { success: false, error: 'Connector mismatch' };
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await exchangeCodeForToken(connectorId, code);
    
    if (!tokenResponse.access_token) {
      return { success: false, error: 'Failed to obtain access token' };
    }

    // Store credentials securely in Supabase
    await storeConnectorCredentials(connectorId, tenantId!, tokenResponse);

    // Trigger Creamy phase sync (Phase 1: First value in ~60s)
    await triggerCreamySync(connectorId, tenantId!);

    // Clean up session storage
    sessionStorage.removeItem('oauth_state');
    sessionStorage.removeItem('oauth_connector');
    sessionStorage.removeItem('oauth_tenant');

    return { success: true };
  } catch (error) {
    console.error('OAuth callback error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Exchange authorization code for access token
 */
async function exchangeCodeForToken(
  connectorId: string,
  code: string
): Promise<any> {
  const config = OAUTH_CONFIGS[connectorId];
  
  const response = await fetch(config.tokenUrl!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: getClientId(connectorId),
      client_secret: getClientSecret(connectorId),
      redirect_uri: config.redirectUri!,
    }),
  });

  if (!response.ok) {
    throw new Error(`Token exchange failed: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Store connector credentials in Supabase
 */
async function storeConnectorCredentials(
  connectorId: string,
  tenantId: string,
  tokenResponse: any
): Promise<void> {
  // This would call your backend API to securely store credentials
  // For now, we'll use a mock endpoint
  const response = await fetch('/api/connectors/credentials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tenant_id: tenantId,
      connector_id: connectorId,
      access_token: tokenResponse.access_token,
      refresh_token: tokenResponse.refresh_token,
      expires_at: tokenResponse.expires_in 
        ? new Date(Date.now() + tokenResponse.expires_in * 1000).toISOString()
        : null,
      scope: tokenResponse.scope,
      metadata: {
        // Provider-specific metadata
        ...(tokenResponse.team_id && { team_id: tokenResponse.team_id }),
        ...(tokenResponse.user_id && { user_id: tokenResponse.user_id }),
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to store credentials');
  }
}

/**
 * Trigger Creamy phase sync (Phase 1: First value in ~60s)
 */
async function triggerCreamySync(
  connectorId: string,
  tenantId: string
): Promise<void> {
  const response = await fetch('/api/sync/creamy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tenant_id: tenantId,
      connector_id: connectorId,
      phase: 'creamy', // Phase 1: Creamy layer
      priority: 'high',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to trigger sync');
  }
}

/**
 * Generate random state for CSRF protection
 */
function generateState(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Get client ID for a connector
 * In production, this would come from environment variables
 */
function getClientId(connectorId: string): string {
  // Mock client IDs - in production, use env vars
  const clientIds: Record<string, string> = {
    hubspot: process.env.HUBSPOT_CLIENT_ID || 'YOUR_HUBSPOT_CLIENT_ID',
    salesforce: process.env.SALESFORCE_CLIENT_ID || 'YOUR_SALESFORCE_CLIENT_ID',
    jira: process.env.JIRA_CLIENT_ID || 'YOUR_JIRA_CLIENT_ID',
    'google-drive': process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
    notion: process.env.NOTION_CLIENT_ID || 'YOUR_NOTION_CLIENT_ID',
    slack: process.env.SLACK_CLIENT_ID || 'YOUR_SLACK_CLIENT_ID',
    gmail: process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
    confluence: process.env.CONFLUENCE_CLIENT_ID || 'YOUR_CONFLUENCE_CLIENT_ID',
    sharepoint: process.env.MICROSOFT_CLIENT_ID || 'YOUR_MICROSOFT_CLIENT_ID',
    airtable: process.env.AIRTABLE_CLIENT_ID || 'YOUR_AIRTABLE_CLIENT_ID',
  };
  
  return clientIds[connectorId] || '';
}

/**
 * Get client secret for a connector
 * In production, this should NEVER be exposed to the frontend
 * Instead, the token exchange should happen on the backend
 */
function getClientSecret(connectorId: string): string {
  // This is a security risk in production!
  // Client secrets should only be used server-side
  console.warn('Client secrets should only be used server-side');
  return '';
}

/**
 * Get all available connectors organized by flow
 */
export function getAllConnectors() {
  return CONNECTORS;
}

/**
 * Get connector by ID
 */
export function getConnectorById(connectorId: string) {
  const allConnectors = [
    ...CONNECTORS.flowA,
    ...CONNECTORS.flowB,
    ...CONNECTORS.flowC,
  ];
  
  return allConnectors.find(c => c.id === connectorId);
}

/**
 * Check if a connector requires OAuth
 */
export function requiresOAuth(connectorId: string): boolean {
  // Database connectors use credentials, not OAuth
  return !['postgresql', 'mysql'].includes(connectorId);
}
