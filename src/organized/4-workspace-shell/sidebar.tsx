import { useState } from "react";
import {
  LayoutDashboard, Building2, GitBranch, CheckSquare, FileText,
  Calendar, BarChart3, Users, Target, DollarSign, TrendingUp,
  ClipboardList, Activity, Settings, ShieldCheck, UserCog, Landmark,
  ChevronsUpDown, BookOpen, MessageSquare, Brain, AlertTriangle,
  Zap, StickyNote, Home, Briefcase, Factory, LogOut, Plug, Bot,
  CreditCard, User, Blocks, RefreshCw, ChevronDown, ChevronRight
} from "lucide-react";
import { type CTXEnum, type L1Module } from "./spine/types";
import { useSpine } from "./spine/spine-client";
import { useGoalsSafe } from "./goal-framework/goal-context";
import { Logo, LogoMark } from "./landing/logo";

interface SidebarProps {
  activeModule: L1Module;
  onModuleChange: (module: L1Module) => void;
  activeCtx: CTXEnum;
  onCtxChange: (ctx: CTXEnum) => void;
  modules: L1Module[];
  darkMode: boolean;
  collapsed: boolean;
  onToggleDarkMode: () => void;
  onToggleCollapse: () => void;
  onOpenCommandPalette: () => void;
  onOpenIntelligence: () => void;
}

const MODULE_ICONS: Record<string, any> = {
  "Home": Home, "Projects": Briefcase, "Accounts": Building2,
  "Contacts": Users, "Meetings": MessageSquare, "Docs": FileText,
  "Tasks": CheckSquare, "Calendar": Calendar, "Notes": StickyNote,
  "Knowledge Space": Brain, "Team": Users, "Pipeline": DollarSign,
  "Risks": AlertTriangle, "Expansion": TrendingUp, "Analytics": BarChart3,
  "Integrations": Plug, "AI Chat": Bot, "Settings": Settings,
  "Subscriptions": CreditCard, "Profile": User,
};

const CTX_CONFIG: Record<CTXEnum, { label: string; icon: string; color: string }> = {
  CTX_CS: { label: "Customer Success", icon: "💚", color: "bg-[#3D8B6E]" },
  CTX_SALES: { label: "Sales Operations", icon: "🎯", color: "bg-[#3F5185]" },
  CTX_SUPPORT: { label: "Customer Support", icon: "🎧", color: "bg-[#5A6FC0]" },
  CTX_PM: { label: "Project Management", icon: "📁", color: "bg-[#7B5EA7]" },
  CTX_MARKETING: { label: "Marketing", icon: "📣", color: "bg-[#F54476]" },
  CTX_BIZOPS: { label: "Business Operations", icon: "🌏", color: "bg-[#1E2A4A]" },
  CTX_TECH: { label: "Engineering", icon: "💻", color: "bg-[#4A5568]" },
  CTX_HR: { label: "People & Culture", icon: "👥", color: "bg-[#D4883E]" },
  CTX_FINANCE: { label: "Finance", icon: "💰", color: "bg-[#3D8B6E]" },
  CTX_LEGAL: { label: "Legal", icon: "⚖️", color: "bg-[#4A5568]" },
};

const SYSTEM_MODULES: L1Module[] = ["Integrations", "AI Chat", "Settings", "Subscriptions", "Profile"];

export function Sidebar({
  activeModule, onModuleChange, activeCtx, onCtxChange,
  modules, collapsed, onOpenCommandPalette, onOpenIntelligence,
}: SidebarProps) {
  const [ctxDropdownOpen, setCtxDropdownOpen] = useState(false);
  const [workspaceExpanded, setWorkspaceExpanded] = useState(true);
  const [connectExpanded, setConnectExpanded] = useState(true);
  const [systemExpanded, setSystemExpanded] = useState(false);
  const spine = useSpine();
  const goalsCtx = useGoalsSafe();
  const ctxInfo = CTX_CONFIG[activeCtx];

  const NavItem = ({ mod, icon: Icon }: { mod: L1Module; icon: any }) => {
    const isActive = activeModule === mod;
    return (
      <button
        onClick={() => onModuleChange(mod)}
        className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[13px] transition-all ${
          isActive ? "bg-[#3F5185] text-white font-semibold shadow-sm" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
        } ${collapsed ? "justify-center px-0" : ""}`}
      >
        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-white" : ""}`} />
        {!collapsed && <span className="truncate">{mod}</span>}
      </button>
    );
  };

  const SectionHeader = ({ label, expanded, onToggle }: { label: string; expanded: boolean; onToggle: () => void }) => {
    if (collapsed) return null;
    return (
      <button onClick={onToggle} className="flex items-center justify-between w-full px-2.5 pt-4 pb-1 group">
        <span className="text-[9px] text-muted-foreground uppercase tracking-[0.12em] font-bold">{label}</span>
        {expanded ? <ChevronDown className="w-2.5 h-2.5 text-muted-foreground" /> : <ChevronRight className="w-2.5 h-2.5 text-muted-foreground" />}
      </button>
    );
  };

  return (
    <div className={`h-full flex flex-col border-r border-border bg-card transition-all duration-300 ${collapsed ? "w-[56px]" : "w-[220px]"}`}>
      {/* Brand */}
      <div className={`flex items-center border-b border-border shrink-0 ${collapsed ? "justify-center py-2.5" : "px-3 py-2.5 gap-2"}`}>
        {collapsed ? <LogoMark size={24} /> : (
          <>
            <Logo width={24} />
            <span className="text-sm font-bold tracking-tight text-[#1E2A4A]">
              Integrate<span className="text-[#F54476]">Wise</span>
            </span>
          </>
        )}
      </div>

      {/* Context Switcher */}
      <div className="p-2 border-b border-border shrink-0">
        <div className="relative">
          <button
            onClick={() => !collapsed && setCtxDropdownOpen(!ctxDropdownOpen)}
            className="w-full flex items-center gap-2 hover:bg-secondary/50 rounded-md p-1.5 transition-colors"
          >
            <div className={`w-7 h-7 rounded-lg ${ctxInfo.color} flex items-center justify-center flex-shrink-0 text-white text-xs shadow-sm`}>
              {ctxInfo.icon}
            </div>
            {!collapsed && (
              <>
                <div className="overflow-hidden flex-1 text-left">
                  <div className="text-xs font-semibold truncate">{ctxInfo.label}</div>
                  <div className="text-[8px] text-muted-foreground truncate uppercase tracking-tighter flex items-center gap-0.5">
                    {goalsCtx?.orgType === "PRODUCT" ? <Factory className="w-2 h-2" /> : <Briefcase className="w-2 h-2" />}
                    {goalsCtx?.orgType || "PRODUCT"} Org
                  </div>
                </div>
                <ChevronsUpDown className="w-3 h-3 text-muted-foreground flex-shrink-0" />
              </>
            )}
          </button>
          {ctxDropdownOpen && !collapsed && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setCtxDropdownOpen(false)} />
              <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-card border border-border rounded-lg shadow-xl overflow-hidden py-1 max-h-[300px] overflow-y-auto">
                {(Object.keys(CTX_CONFIG) as CTXEnum[]).map((key) => {
                  const cfg = CTX_CONFIG[key];
                  return (
                    <button
                      key={key}
                      onClick={() => { onCtxChange(key); setCtxDropdownOpen(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-secondary transition-colors ${key === activeCtx ? "bg-primary/5" : ""}`}
                    >
                      <span className="text-sm">{cfg.icon}</span>
                      <span className="text-xs font-medium">{cfg.label}</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-2 scrollbar-none">
        {/* Workspace Modules */}
        <SectionHeader label="Workspace" expanded={workspaceExpanded} onToggle={() => setWorkspaceExpanded(!workspaceExpanded)} />
        {(workspaceExpanded || collapsed) && (
          <nav className="space-y-0.5">
            {modules.filter(m => !SYSTEM_MODULES.includes(m)).map((mod) => (
              <NavItem key={mod} mod={mod} icon={MODULE_ICONS[mod] || Home} />
            ))}
          </nav>
        )}

        {/* Connect & Intelligence */}
        <SectionHeader label="Connect" expanded={connectExpanded} onToggle={() => setConnectExpanded(!connectExpanded)} />
        {(connectExpanded || collapsed) && (
          <nav className="space-y-0.5">
            <NavItem mod="Integrations" icon={Plug} />
            <NavItem mod="AI Chat" icon={Bot} />
          </nav>
        )}

        {/* System */}
        <SectionHeader label="System" expanded={systemExpanded} onToggle={() => setSystemExpanded(!systemExpanded)} />
        {(systemExpanded || collapsed) && (
          <nav className="space-y-0.5">
            <NavItem mod="Settings" icon={Settings} />
            <NavItem mod="Subscriptions" icon={CreditCard} />
            <NavItem mod="Profile" icon={User} />
          </nav>
        )}
      </div>

      {/* Bottom */}
      <div className="p-2 border-t border-border space-y-1 shrink-0">
        <button
          onClick={onOpenIntelligence}
          className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[12px] text-[#F54476] font-semibold bg-[#F54476]/5 hover:bg-[#F54476]/10 transition-all ${collapsed ? "justify-center px-0" : ""}`}
        >
          <Zap className="w-3.5 h-3.5" />
          {!collapsed && <span>Intelligence ⌘J</span>}
        </button>

        <button
          onClick={() => onModuleChange("Profile")}
          className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 ${collapsed ? "justify-center px-0" : ""}`}
        >
          <div className="w-6 h-6 rounded-full bg-[#3F5185] flex items-center justify-center text-white text-[9px] font-bold shrink-0">
            {spine.userName?.charAt(0) || "U"}
          </div>
          {!collapsed && (
            <div className="overflow-hidden flex-1 text-left">
              <div className="text-[11px] font-semibold truncate">{spine.userName}</div>
              <div className="text-[9px] text-muted-foreground truncate uppercase">{spine.role}</div>
            </div>
          )}
        </button>

        <button
          onClick={() => { window.location.hash = ""; }}
          className={`w-full flex items-center gap-2.5 px-2.5 py-1 rounded-lg text-[10px] text-muted-foreground hover:text-foreground transition-all ${collapsed ? "justify-center px-0" : ""}`}
        >
          <LogOut className="w-3 h-3" />
          {!collapsed && <span>Back to Site</span>}
        </button>
      </div>
    </div>
  );
}
