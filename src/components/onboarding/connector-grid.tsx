import { CheckCircle2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { motion } from "motion/react";
import { initiateOAuth, requiresOAuth } from "./oauth-handler";

// Real connector configurations with OAuth endpoints
export const CONNECTORS = {
  // Flow A: Structured Data
  flowA: [
    {
      id: "hubspot",
      name: "HubSpot",
      logo: "🎯",
      description: "CRM, Contacts, Deals, Companies",
      oauthUrl: "/api/oauth/hubspot/authorize",
      scopes: ["crm.objects.contacts.read", "crm.objects.companies.read", "crm.objects.deals.read"],
    },
    {
      id: "salesforce",
      name: "Salesforce",
      logo: "☁️",
      description: "Accounts, Opportunities, Contacts",
      oauthUrl: "/api/oauth/salesforce/authorize",
      scopes: ["api", "refresh_token", "full"],
    },
    {
      id: "jira",
      name: "Jira",
      logo: "🔵",
      description: "Issues, Projects, Sprints",
      oauthUrl: "/api/oauth/jira/authorize",
      scopes: ["read:jira-work", "read:jira-user"],
    },
    {
      id: "airtable",
      name: "Airtable",
      logo: "📊",
      description: "Tables, Records, Bases",
      oauthUrl: "/api/oauth/airtable/authorize",
      scopes: ["data.records:read", "schema.bases:read"],
    },
    {
      id: "postgresql",
      name: "PostgreSQL",
      logo: "🐘",
      description: "Direct database connection",
      oauthUrl: "/api/connectors/postgresql/configure",
      scopes: [],
    },
    {
      id: "mysql",
      name: "MySQL",
      logo: "🐬",
      description: "Direct database connection",
      oauthUrl: "/api/connectors/mysql/configure",
      scopes: [],
    },
  ],
  
  // Flow B: Unstructured Data
  flowB: [
    {
      id: "notion",
      name: "Notion",
      logo: "📝",
      description: "Pages, Databases, Wikis",
      oauthUrl: "/api/oauth/notion/authorize",
      scopes: ["read_content", "read_user"],
    },
    {
      id: "google-drive",
      name: "Google Drive",
      logo: "📁",
      description: "Documents, Spreadsheets, Files",
      oauthUrl: "/api/oauth/google-drive/authorize",
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    },
    {
      id: "confluence",
      name: "Confluence",
      logo: "🌐",
      description: "Pages, Spaces, Knowledge Base",
      oauthUrl: "/api/oauth/confluence/authorize",
      scopes: ["read:confluence-content.all"],
    },
    {
      id: "gmail",
      name: "Gmail",
      logo: "📧",
      description: "Email threads, Contacts",
      oauthUrl: "/api/oauth/gmail/authorize",
      scopes: ["https://www.googleapis.com/auth/gmail.readonly"],
    },
    {
      id: "slack",
      name: "Slack",
      logo: "💬",
      description: "Messages, Channels, Threads",
      oauthUrl: "/api/oauth/slack/authorize",
      scopes: ["channels:history", "channels:read", "users:read"],
    },
    {
      id: "sharepoint",
      name: "SharePoint",
      logo: "📑",
      description: "Documents, Sites, Lists",
      oauthUrl: "/api/oauth/sharepoint/authorize",
      scopes: ["Sites.Read.All", "Files.Read.All"],
    },
  ],
  
  // Flow C: AI Chats
  flowC: [
    {
      id: "chatgpt",
      name: "ChatGPT",
      logo: "🤖",
      description: "OpenAI conversations",
      oauthUrl: "/api/oauth/openai/authorize",
      scopes: [],
    },
    {
      id: "claude",
      name: "Claude",
      logo: "🧠",
      description: "Anthropic conversations",
      oauthUrl: "/api/oauth/anthropic/authorize",
      scopes: [],
    },
    {
      id: "gemini",
      name: "Gemini",
      logo: "✨",
      description: "Google AI conversations",
      oauthUrl: "/api/oauth/gemini/authorize",
      scopes: [],
    },
  ],
};

interface ConnectorGridProps {
  selectedConnectors: string[];
  onToggleConnector: (connectorId: string) => void;
  enableOAuth?: boolean; // If true, clicking will initiate OAuth
  tenantId?: string; // Required for OAuth
}

export function ConnectorGrid({ 
  selectedConnectors, 
  onToggleConnector,
  enableOAuth = false,
  tenantId 
}: ConnectorGridProps) {
  
  const handleConnectorClick = (connectorId: string) => {
    if (enableOAuth && tenantId && requiresOAuth(connectorId)) {
      // Initiate OAuth flow
      initiateOAuth(connectorId, tenantId);
    } else {
      // Just toggle selection (for onboarding preview)
      onToggleConnector(connectorId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Flow A: Structured Data */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">📊 Structured Data</span>
            <Badge variant="secondary" className="text-[10px] bg-blue-100 text-blue-700">
              Flow A
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {CONNECTORS.flowA.map((connector) => {
            const isSelected = selectedConnectors.includes(connector.id);
            
            return (
              <motion.button
                key={connector.id}
                onClick={() => handleConnectorClick(connector.id)}
                className={`
                  relative p-4 rounded-xl border-2 text-left transition-all duration-200
                  ${isSelected 
                    ? "border-[#3F5185] bg-[#3F5185]/5 shadow-md" 
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{connector.logo}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm truncate">
                        {connector.name}
                      </h4>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-[#3F5185] shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {connector.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Flow B: Unstructured Data */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">📄 Unstructured Data</span>
            <Badge variant="secondary" className="text-[10px] bg-purple-100 text-purple-700">
              Flow B
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {CONNECTORS.flowB.map((connector) => {
            const isSelected = selectedConnectors.includes(connector.id);
            
            return (
              <motion.button
                key={connector.id}
                onClick={() => handleConnectorClick(connector.id)}
                className={`
                  relative p-4 rounded-xl border-2 text-left transition-all duration-200
                  ${isSelected 
                    ? "border-purple-500 bg-purple-50 shadow-md" 
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{connector.logo}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm truncate">
                        {connector.name}
                      </h4>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {connector.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Flow C: AI Chats */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">🤖 AI Chats</span>
            <Badge variant="secondary" className="text-[10px] bg-emerald-100 text-emerald-700">
              Flow C
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {CONNECTORS.flowC.map((connector) => {
            const isSelected = selectedConnectors.includes(connector.id);
            
            return (
              <motion.button
                key={connector.id}
                onClick={() => handleConnectorClick(connector.id)}
                className={`
                  relative p-4 rounded-xl border-2 text-left transition-all duration-200
                  ${isSelected 
                    ? "border-emerald-500 bg-emerald-50 shadow-md" 
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{connector.logo}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm truncate">
                        {connector.name}
                      </h4>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {connector.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}