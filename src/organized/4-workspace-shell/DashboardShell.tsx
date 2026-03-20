import React, { useState } from "react";
import { 
  Database, 
  BrainCircuit, 
  Settings, 
  Bell, 
  Search, 
  ChevronRight, 
  ShieldCheck, 
  ArrowUpRight,
  Zap,
  CheckCircle2,
  XCircle,
  LogOut,
  Layers,
  Activity,
  ShieldAlert,
  GitBranch,
  Eye,
  Menu,
  X
} from "lucide-react";
import { LayerAudit } from "./LayerAudit";
// ── Logo: import from single source of truth ──
import { logoSrc } from "./landing/logo";

type TabId = "overview" | "L0" | "L1" | "L2" | "L3";

export function DashboardShell() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabLabels: Record<TabId, string> = {
    overview: "Architecture Overview",
    L0: "L0 Reality Layer",
    L1: "L1 Truth Layer (Spine)",
    L2: "L2 Intelligence Layer",
    L3: "L3 Cognitive Layer"
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#4152A1] text-white flex flex-col shrink-0
        transform transition-transform duration-200 ease-in-out
        lg:relative lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-6 flex items-center justify-between">
          <img src={logoSrc} alt="IntegrateWise" className="h-10 w-auto brightness-0 invert" />
          <button className="lg:hidden text-white/70 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-grow p-4 space-y-1">
          <SidebarItem icon={<Eye size={20} />} label="Overview" active={activeTab === "overview"} onClick={() => { setActiveTab("overview"); setSidebarOpen(false); }} />
          <div className="pt-3 pb-2 px-4">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Architecture Layers</span>
          </div>
          <SidebarItem icon={<Activity size={20} />} label="L0 Reality" active={activeTab === "L0"} onClick={() => { setActiveTab("L0"); setSidebarOpen(false); }} badge="2" badgeColor="amber" />
          <SidebarItem icon={<Database size={20} />} label="L1 Truth (Spine)" active={activeTab === "L1"} onClick={() => { setActiveTab("L1"); setSidebarOpen(false); }} />
          <SidebarItem icon={<BrainCircuit size={20} />} label="L2 Intelligence" active={activeTab === "L2"} onClick={() => { setActiveTab("L2"); setSidebarOpen(false); }} badge="2" badgeColor="red" />
          <SidebarItem icon={<Settings size={20} />} label="L3 Cognitive" active={activeTab === "L3"} onClick={() => { setActiveTab("L3"); setSidebarOpen(false); }} badge="1" badgeColor="blue" />
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => window.location.hash = "app"}
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/10 transition-colors text-white/70 mb-1"
          >
            <Zap size={20} />
            <span className="font-medium">Open Workspace</span>
          </button>
          <button 
            onClick={() => window.location.hash = ""}
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/10 transition-colors text-white/70"
          >
            <LogOut size={20} />
            <span className="font-medium">Back to Site</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="h-14 lg:h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-3 lg:gap-4 min-w-0">
            <button className="lg:hidden text-slate-600 hover:text-slate-900 shrink-0" onClick={() => setSidebarOpen(true)}>
              <Menu size={22} />
            </button>
            <h1 className="text-sm lg:text-lg font-bold text-slate-800 truncate">{tabLabels[activeTab]}</h1>
            {activeTab !== "overview" && (
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                activeTab === "L0" ? "bg-amber-100 text-amber-700" :
                activeTab === "L1" ? "bg-emerald-100 text-emerald-700" :
                activeTab === "L2" ? "bg-red-100 text-red-700" :
                "bg-blue-100 text-blue-700"
              }`}>
                {activeTab === "L1" ? "Clean" : activeTab === "L2" ? "Leaks Detected" : "Monitoring"}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 lg:gap-4 shrink-0">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search canonical spine..." 
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#4256AB]/20 w-64"
              />
            </div>
            <button className="relative text-slate-500 hover:text-slate-800">
              <Bell size={18} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#EE4B75] rounded-full border-2 border-white" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#EE4B75] flex items-center justify-center text-xs font-bold text-white shadow-lg">JD</div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-grow overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === "overview" && <OverviewView />}
            {activeTab === "L0" && <L0View />}
            {activeTab === "L1" && <L1View />}
            {activeTab === "L2" && <L2View />}
            {activeTab === "L3" && <L3View />}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ─── Overview View ─── */
function OverviewView() {
  return (
    <>
      {/* Alert Bar */}
      <div className="bg-white border-l-4 border-[#EE4B75] p-4 rounded-xl shadow-sm mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-[#EE4B75]/10 text-[#EE4B75] rounded-lg">
            <ShieldCheck size={20} />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-800">Data Leak Detection Active</div>
            <p className="text-slate-500 text-xs">5 leaks detected across L0–L3. 2 critical items require immediate attention.</p>
          </div>
        </div>
        <button className="text-[#4256AB] font-bold text-xs flex items-center gap-1 hover:underline shrink-0">
          Review All <ChevronRight size={14} />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <StatCard title="Active Integrations" value="12" change="All syncing" icon={<Layers className="text-[#4256AB]" size={20} />} />
        <StatCard title="Spine Integrity" value="94.1%" change="−1.8% (schema drift)" icon={<GitBranch className="text-amber-500" size={20} />} changeColor="text-amber-500" />
        <StatCard title="AI Confidence" value="98.2%" change="+1.2% this week" icon={<BrainCircuit className="text-[#EE4B75]" size={20} />} />
        <StatCard title="NRR Impact" value="+$420k" change="+15% predicted" icon={<ArrowUpRight className="text-emerald-500" size={20} />} />
      </div>

      {/* Active Spines */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Active L0 Source Spines</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { name: "Salesforce", status: "ok" },
            { name: "HubSpot", status: "warning" },
            { name: "Zendesk", status: "ok" },
            { name: "Stripe", status: "danger" },
            { name: "Slack", status: "ok" },
            { name: "Jira", status: "ok" }
          ].map((platform) => (
            <div key={platform.name} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center gap-2 group hover:border-[#4256AB] transition-all cursor-pointer">
              <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#4256AB]/10 group-hover:text-[#4256AB]">
                <Database size={14} />
              </div>
              <span className="text-[10px] font-bold text-slate-600">{platform.name}</span>
              <div className={`w-full h-1 rounded-full ${
                platform.status === "danger" ? "bg-red-400" :
                platform.status === "warning" ? "bg-amber-400" :
                "bg-emerald-400"
              }`} />
            </div>
          ))}
        </div>
      </div>

      {/* Cross-Layer Audit */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <LayerAudit />
      </div>
    </>
  );
}

/* ─── L0 Reality View ─── */
function L0View() {
  return (
    <>
      <div className="mb-6">
        <p className="text-sm text-slate-500 mb-4">
          The Reality Layer ingests raw events from your connected tools. Leaks at L0 typically involve duplicate events, stale pipelines, or webhook failures.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard title="Events / min" value="1,247" change="Normal throughput" icon={<Activity className="text-[#4256AB]" size={20} />} />
          <StatCard title="Dedup Rate" value="99.7%" change="3 collisions caught today" icon={<ShieldCheck className="text-emerald-500" size={20} />} />
          <StatCard title="Pipeline Lag" value="47 min" change="HubSpot backpressure" icon={<ShieldAlert className="text-amber-500" size={20} />} changeColor="text-amber-500" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
        <h3 className="font-bold text-sm text-slate-800 mb-4">Source Pipeline Health</h3>
        <div className="space-y-3">
          {[
            { name: "Salesforce", events: "342/min", lag: "< 1s", status: "ok" },
            { name: "HubSpot", events: "89/min", lag: "47 min", status: "danger" },
            { name: "Zendesk", events: "156/min", lag: "< 2s", status: "ok" },
            { name: "Stripe", events: "421/min", lag: "< 1s", status: "warning" },
            { name: "Slack", events: "198/min", lag: "< 1s", status: "ok" },
            { name: "Jira", events: "41/min", lag: "< 3s", status: "ok" }
          ].map(s => (
            <div key={s.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  s.status === "danger" ? "bg-red-500 animate-pulse" :
                  s.status === "warning" ? "bg-amber-500" :
                  "bg-emerald-500"
                }`} />
                <span className="text-sm font-bold text-slate-700">{s.name}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-xs text-slate-400">{s.events}</span>
                <span className={`text-xs font-bold ${
                  s.status === "danger" ? "text-red-600" :
                  s.status === "warning" ? "text-amber-600" :
                  "text-emerald-600"
                }`}>{s.lag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <LayerAudit filterLayer="L0" />
      </div>
    </>
  );
}

/* ─── L1 Truth View ─── */
function L1View() {
  return (
    <>
      <div className="mb-6">
        <p className="text-sm text-slate-500 mb-4">
          The Truth Layer maintains the Canonical Spine — a single source of truth for entities across all tools. When L1 is clean, every downstream layer can trust the data.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard title="Spine Entities" value="2,847" change="Accounts, Contacts, Deals" icon={<Database className="text-[#4256AB]" size={20} />} />
          <StatCard title="Cross-Tool Match Rate" value="99.4%" change="+0.3% after last correction" icon={<CheckCircle2 className="text-emerald-500" size={20} />} />
          <StatCard title="Orphan Records" value="12" change="Pending auto-match" icon={<GitBranch className="text-amber-500" size={20} />} changeColor="text-amber-500" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
        <h3 className="font-bold text-sm text-slate-800 mb-4">Recent Spine Resolutions</h3>
        <div className="space-y-3">
          {[
            { entity: "Acme Corp", tools: "Salesforce + Stripe + Zendesk", id: "#STR_992", status: "Matched" },
            { entity: "Prism Cloud", tools: "Salesforce + Zendesk", id: "#STR_1047", status: "Matched" },
            { entity: "NovaTech", tools: "HubSpot + Stripe", id: "#STR_1103", status: "Matched" },
            { entity: "alice@cybernt.io", tools: "Slack + Zendesk", id: "#CON_4421", status: "Orphan" }
          ].map(r => (
            <div key={r.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${r.status === "Orphan" ? "bg-amber-500" : "bg-emerald-500"}`} />
                <div>
                  <span className="text-sm font-bold text-slate-700">{r.entity}</span>
                  <span className="text-xs text-slate-400 ml-2">{r.id}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-400">{r.tools}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  r.status === "Orphan" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                }`}>{r.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <LayerAudit filterLayer="L1" />
      </div>
    </>
  );
}

/* ─── L2 Intelligence View ─── */
function L2View() {
  return (
    <>
      <div className="mb-6">
        <p className="text-sm text-slate-500 mb-4">
          The Intelligence Layer applies AI reasoning to Spine data. Leaks here mean the AI is working with stale schemas, mismatched contexts, or deprecated fields — leading to incorrect calculations that propagate to L3.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard title="Edge Corrections" value="847" change="Cumulative library" icon={<BrainCircuit className="text-[#4256AB]" size={20} />} />
          <StatCard title="Schema Health" value="91.3%" change="Stripe drift detected" icon={<ShieldAlert className="text-red-500" size={20} />} changeColor="text-red-500" />
          <StatCard title="Dual-Context Score" value="88%" change="1 mismatch active" icon={<Layers className="text-amber-500" size={20} />} changeColor="text-amber-500" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
        <h3 className="font-bold text-sm text-slate-800 mb-1">Intelligence Feed — Edge Corrections</h3>
        <p className="text-xs text-slate-400 mb-4">AI-proposed corrections awaiting human approval</p>
        <div className="divide-y divide-slate-100">
          <IntelligenceRow 
            account="Prism Cloud"
            action="Adjust Renewal Propensity"
            reason="Dual-context mismatch: Vendor CRM marks 'Closed-Won' but client ticket system shows 3 critical P1 bugs unresolved. Renewal confidence inflated."
            confidence="94%"
            layer="L2"
          />
          <IntelligenceRow 
            account="Stellar SaaS"
            action="Fix ARR Calculation"
            reason="Schema drift in Stripe API v2024.11: deprecated 'amount' field returns gross instead of net. Affects ARR by +$12k across 4 accounts."
            confidence="99%"
            layer="L2"
          />
          <IntelligenceRow 
            account="CyberNet"
            action="Flag Attrition Risk"
            reason="L0 activity events ceased for power-user 'Alice Wang' 14 days ago, following a P1 support ticket escalation that remains unresolved."
            confidence="87%"
            layer="L2"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <LayerAudit filterLayer="L2" />
      </div>
    </>
  );
}

/* ─── L3 Cognitive View ─── */
function L3View() {
  return (
    <>
      <div className="mb-6">
        <p className="text-sm text-slate-500 mb-4">
          The Cognitive Layer translates intelligence into actionable work items — but only after human approval. Leaks at L3 mean an AI agent attempted to act without proper gating.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard title="Gated Actions" value="23" change="Pending human review" icon={<ShieldCheck className="text-blue-500" size={20} />} />
          <StatCard title="Auto-blocked" value="7" change="This week" icon={<XCircle className="text-red-500" size={20} />} />
          <StatCard title="Approved & Executed" value="156" change="Last 30 days" icon={<CheckCircle2 className="text-emerald-500" size={20} />} />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
        <h3 className="font-bold text-sm text-slate-800 mb-1">Human-in-the-Loop Gate</h3>
        <p className="text-xs text-slate-400 mb-4">AI-proposed actions blocked for human review before reaching work surfaces</p>
        <div className="space-y-3">
          {[
            { 
              action: "Auto-adjust renewal probability for CyberNet (88% → 62%)", 
              trigger: "Champion silence pattern detected across Slack + Zendesk",
              target: "Salesforce Opportunity field",
              risk: "High"
            },
            { 
              action: "Send expansion nudge to Acme Corp stakeholder", 
              trigger: "90% product adoption milestone achieved 3 months early",
              target: "Slack DM to assigned CSM",
              risk: "Medium"
            },
            { 
              action: "Create churn-risk task for NovaTech", 
              trigger: "Payment failed twice + support tickets trending up",
              target: "Jira board + Salesforce task",
              risk: "Low"
            }
          ].map((item, i) => (
            <div key={i} className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm font-bold text-slate-800">{item.action}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                  item.risk === "High" ? "bg-red-100 text-red-700" :
                  item.risk === "Medium" ? "bg-amber-100 text-amber-700" :
                  "bg-emerald-100 text-emerald-700"
                }`}>{item.risk} Risk</span>
              </div>
              <div className="text-xs text-slate-500 mb-1"><span className="font-bold text-slate-400">Trigger:</span> {item.trigger}</div>
              <div className="text-xs text-slate-500 mb-3"><span className="font-bold text-slate-400">Target:</span> {item.target}</div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-colors">
                  <CheckCircle2 size={12} /> Approve
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-500 text-xs font-bold rounded-lg border border-slate-200 transition-colors">
                  <XCircle size={12} /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <LayerAudit filterLayer="L3" />
      </div>
    </>
  );
}

/* ─── Shared Components ─── */

function SidebarItem({ icon, label, active, onClick, badge, badgeColor }: { 
  icon: any; label: string; active?: boolean; onClick: () => void; badge?: string; badgeColor?: string 
}) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all font-medium text-sm ${
        active ? "bg-white text-[#4152A1] shadow-lg" : "text-white/70 hover:bg-white/10 hover:text-white"
      }`}
    >
      <span className="flex items-center gap-3">{icon}<span>{label}</span></span>
      {badge && !active && (
        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
          badgeColor === "red" ? "bg-red-500 text-white" :
          badgeColor === "amber" ? "bg-amber-500 text-white" :
          badgeColor === "blue" ? "bg-blue-500 text-white" :
          "bg-white/20 text-white"
        }`}>{badge}</span>
      )}
    </button>
  );
}

function StatCard({ title, value, change, icon, changeColor }: { 
  title: string; value: string; change: string; icon: React.ReactNode; changeColor?: string 
}) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 bg-slate-50 rounded-lg flex items-center justify-center">{icon}</div>
      </div>
      <div className="text-xs text-slate-500 font-medium mb-1">{title}</div>
      <div className="text-xl font-black text-slate-900 mb-1">{value}</div>
      <div className={`text-[11px] font-bold ${changeColor || "text-emerald-500"}`}>{change}</div>
    </div>
  );
}

function IntelligenceRow({ account, action, reason, confidence, layer }: { 
  account: string; action: string; reason: string; confidence: string; layer: string 
}) {
  return (
    <div className="p-5 hover:bg-slate-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
            <Zap size={18} className="text-[#4256AB]" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-sm text-slate-800">{account}</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-slate-200 text-slate-600 rounded font-medium">{layer}</span>
            </div>
            <div className="text-xs font-bold text-[#EE4B75] mb-1">{action}</div>
            <p className="text-xs text-slate-500 max-w-xl leading-relaxed">{reason}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0 ml-4">
          <div className="text-right">
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Confidence</div>
            <div className="text-sm font-black text-slate-800">{confidence}</div>
          </div>
          <div className="flex gap-1.5">
            <button className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all">
              <CheckCircle2 size={14} />
            </button>
            <button className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all">
              <XCircle size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}