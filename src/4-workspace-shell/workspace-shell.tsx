import { useState, useEffect, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";
import { IntelligenceOverlay } from "./intelligence-overlay-new";
import { CommandPalette } from "./command-palette";
import { type CTXEnum, type L1Module, type ViewContext, type IntelligenceAlert } from "./spine/types";
import { useSpine } from "./spine/spine-client";
import { L1ModuleContent } from "./l1-module-content";
import { IntegrationsHub } from "./integrations-hub";
import { SettingsPage } from "./settings-page";
import { SubscriptionsPage } from "./subscriptions-page";
import { ProfilePage } from "./profile-page";
import { AIChat } from "./ai-chat";
import { AlertTriangle, X, Zap, ChevronRight } from "lucide-react";

// Module mapping for CTX
const CTX_MODULES: Record<CTXEnum, L1Module[]> = {
  CTX_CS: ["Home", "Accounts", "Contacts", "Meetings", "Docs", "Tasks", "Calendar", "Risks", "Expansion", "Analytics"],
  CTX_SALES: ["Home", "Pipeline", "Accounts", "Contacts", "Meetings", "Tasks", "Calendar", "Docs", "Analytics"],
  CTX_SUPPORT: ["Home", "Accounts", "Contacts", "Tasks", "Calendar", "Knowledge Space", "Analytics"],
  CTX_PM: ["Home", "Projects", "Tasks", "Docs", "Meetings", "Calendar", "Knowledge Space", "Analytics"],
  CTX_MARKETING: ["Home", "Analytics", "Contacts", "Docs", "Calendar"],
  CTX_BIZOPS: ["Home", "Projects", "Accounts", "Contacts", "Meetings", "Docs", "Tasks", "Calendar", "Notes", "Knowledge Space", "Team", "Pipeline", "Risks", "Expansion", "Analytics"],
  CTX_TECH: ["Home", "Projects", "Tasks", "Docs", "Knowledge Space", "Analytics"],
  CTX_HR: ["Home", "Team", "Tasks", "Docs", "Meetings", "Analytics"],
  CTX_FINANCE: ["Home", "Accounts", "Docs", "Analytics"],
  CTX_LEGAL: ["Home", "Docs", "Tasks", "Analytics"],
};

// Simulated intelligence alerts
const DEMO_ALERTS: IntelligenceAlert[] = [
  {
    id: "a1", severity: "critical",
    title: "Renewal Risk — FinanceFlow Solutions",
    message: "3 P1 tickets, champion silent for 12 days, payment failed twice. Renewal in 29 days.",
    source: "Salesforce + Zendesk + Stripe",
    timestamp: "2 min ago", actionLabel: "View Account",
  },
  {
    id: "a2", severity: "warning",
    title: "Schema Drift Detected — Jira Integration",
    message: "2 fields changed upstream. Auto-correction proposed and ready for review.",
    source: "Jira → Data Spine",
    timestamp: "8 min ago", actionLabel: "Review",
  },
];

function IntelligenceAlertBanner({ alerts, onDismiss, onAction }: {
  alerts: IntelligenceAlert[];
  onDismiss: (id: string) => void;
  onAction: (alert: IntelligenceAlert) => void;
}) {
  const activeAlerts = alerts.filter(a => !a.dismissed);
  if (activeAlerts.length === 0) return null;

  const alert = activeAlerts[0];
  const colors = {
    critical: { bg: "bg-red-50 border-red-200", text: "text-red-800", icon: "text-red-500", badge: "bg-red-500" },
    warning: { bg: "bg-amber-50 border-amber-200", text: "text-amber-800", icon: "text-amber-500", badge: "bg-amber-500" },
    info: { bg: "bg-blue-50 border-blue-200", text: "text-blue-800", icon: "text-blue-500", badge: "bg-blue-500" },
  };
  const c = colors[alert.severity];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className={`${c.bg} border-b ${c.text} px-4 py-2 flex items-center gap-3 shrink-0`}
      >
        <div className="flex items-center gap-2 shrink-0">
          <div className={`w-2 h-2 rounded-full ${c.badge} animate-pulse`} />
          <AlertTriangle className={`w-3.5 h-3.5 ${c.icon}`} />
        </div>
        <div className="flex-1 min-w-0 flex items-center gap-3">
          <span className="text-xs font-bold truncate">{alert.title}</span>
          <span className="hidden sm:inline text-[10px] opacity-70 truncate">{alert.message}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[9px] opacity-50">{alert.timestamp}</span>
          {activeAlerts.length > 1 && (
            <span className="text-[9px] font-bold opacity-60">+{activeAlerts.length - 1} more</span>
          )}
          {alert.actionLabel && (
            <button
              onClick={() => onAction(alert)}
              className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/60 hover:bg-white/80 transition-all flex items-center gap-1"
            >
              {alert.actionLabel} <ChevronRight className="w-2.5 h-2.5" />
            </button>
          )}
          <button onClick={() => onDismiss(alert.id)} className="p-0.5 rounded hover:bg-white/40">
            <X className="w-3 h-3" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

interface WorkspaceShellProps {
  children?: ReactNode;
}

export function WorkspaceShell({ children }: WorkspaceShellProps) {
  const spine = useSpine();
  const [activeCtx, setActiveCtx] = useState<CTXEnum>("CTX_BIZOPS");
  const [activeModule, setActiveModule] = useState<L1Module>("Home");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [intelligenceOpen, setIntelligenceOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [alerts, setAlerts] = useState(DEMO_ALERTS);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setCommandPaletteOpen(true); }
      if ((e.metaKey || e.ctrlKey) && e.key === "j") { e.preventDefault(); setIntelligenceOpen(prev => !prev); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentModules = CTX_MODULES[activeCtx] || CTX_MODULES.CTX_BIZOPS;

  const dismissAlert = (id: string) => setAlerts(prev => prev.map(a => a.id === id ? { ...a, dismissed: true } : a));
  const handleAlertAction = (alert: IntelligenceAlert) => {
    if (alert.title.includes("FinanceFlow")) setActiveModule("Accounts");
    else setIntelligenceOpen(true);
    dismissAlert(alert.id);
  };

  // Route to correct view
  const renderContent = () => {
    switch (activeModule) {
      case "Integrations": return <IntegrationsHub />;
      case "Settings": return <SettingsPage />;
      case "Subscriptions": return <SubscriptionsPage />;
      case "Profile": return <ProfilePage />;
      case "AI Chat": return <AIChat activeCtx={activeCtx} />;
      default: return children || <L1ModuleContent module={activeModule} activeCtx={activeCtx} />;
    }
  };

  return (
    <div className={`h-screen w-screen flex overflow-hidden font-sans ${darkMode ? "dark" : ""} bg-background text-foreground`}>
      <Sidebar
        activeModule={activeModule}
        onModuleChange={(m) => setActiveModule(m as L1Module)}
        activeCtx={activeCtx}
        onCtxChange={(ctx) => { setActiveCtx(ctx); setActiveModule("Home"); }}
        modules={currentModules}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenIntelligence={() => setIntelligenceOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <TopBar
          activeModule={activeModule as any}
          activeView={"" as any}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onNavigate={(m) => setActiveModule(m as L1Module)}
        />

        {/* Intelligence Alert Banner */}
        <IntelligenceAlertBanner alerts={alerts} onDismiss={dismissAlert} onAction={handleAlertAction} />
        
        <main className="flex-1 overflow-hidden relative">
          {renderContent()}
          <IntelligenceOverlay 
            isOpen={intelligenceOpen} 
            onClose={() => setIntelligenceOpen(false)} 
            activeCtx={activeCtx}
          />
        </main>
      </div>

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={(m) => setActiveModule(m as L1Module)}
      />
    </div>
  );
}
