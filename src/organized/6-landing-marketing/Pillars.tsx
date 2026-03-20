import { Layout, Users, BarChart3, Database, BrainCircuit, ShieldCheck, Zap, ArrowRight, Layers } from "lucide-react";
import { Logo } from "./logo";

function ArchitectureDiagram() {
  return (
    <div className="bg-[#1E2A4A] rounded-2xl p-6 md:p-8 text-white">
      <div className="flex items-center gap-2 mb-6">
        <Logo width={24} />
        <span className="text-xs font-bold text-white/50 uppercase tracking-widest">Architecture Flow</span>
      </div>
      <div className="space-y-3">
        {[
          {
            layer: "01",
            label: "Reality Layer",
            desc: "Raw events from connected tools",
            icon: <Database className="w-3.5 h-3.5" />,
            color: "bg-[#D4883E]",
            textColor: "text-[#D4883E]",
            items: ["Salesforce", "HubSpot", "Slack", "Stripe", "Zendesk", "Jira"]
          },
          {
            layer: "02",
            label: "Truth Layer — Canonical Spine",
            desc: "Single source of truth, deduplicated & normalized",
            icon: <Layers className="w-3.5 h-3.5" />,
            color: "bg-[#3F5185]",
            textColor: "text-[#6B8FFF]",
            items: ["Accounts", "Contacts", "Deals", "Activities", "Tickets"]
          },
          {
            layer: "03",
            label: "Intelligence Layer",
            desc: "AI reasoning with human-in-the-loop governance",
            icon: <BrainCircuit className="w-3.5 h-3.5" />,
            color: "bg-[#7B5EA7]",
            textColor: "text-[#B89CDE]",
            items: ["Edge Corrections", "Dual-Context", "Goal Alignment", "Signals"]
          },
          {
            layer: "04",
            label: "Cognitive Layer",
            desc: "Actionable insights, gated by human approval",
            icon: <ShieldCheck className="w-3.5 h-3.5" />,
            color: "bg-[#3D8B6E]",
            textColor: "text-[#5FC99B]",
            items: ["Proposals", "Approvals", "Work Items", "Audit Trail"]
          },
        ].map((l, i) => (
          <div key={i} className="group">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all">
              <div className={`w-8 h-8 ${l.color} rounded-lg flex items-center justify-center shrink-0 text-white`}>
                {l.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-[10px] font-black ${l.textColor}`}>{l.layer}</span>
                  <span className="text-xs font-bold">{l.label}</span>
                </div>
                <p className="text-[10px] text-white/40 mb-2">{l.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {l.items.map((item, j) => (
                    <span key={j} className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 text-white/30 font-medium">{item}</span>
                  ))}
                </div>
              </div>
            </div>
            {i < 3 && (
              <div className="flex justify-center py-1">
                <div className="w-px h-3 bg-white/10" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Pillars() {
  const pillars = [
    {
      icon: <Layout className="w-10 h-10 text-[#3F5185]" />,
      title: "Preserved Work Layer",
      description: "Your team keeps using the tools they know. IntegrateWise runs in the background, enriching data and surfacing intelligence without disrupting workflows.",
      color: "border-[#3F5185]/20 hover:border-[#3F5185]/40"
    },
    {
      icon: <Users className="w-10 h-10 text-[#3F5185]" />,
      title: "Human-Approved AI",
      description: "AI proposes. Humans approve. Every accepted or rejected action makes the system smarter, building a defensible edge correction library.",
      color: "border-[#7B5EA7]/20 hover:border-[#7B5EA7]/40"
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-[#3F5185]" />,
      title: "Dual-Context Intelligence",
      description: "Every metric is tied to both your company's growth (ARR, NRR, retention) and your customers' outcomes (ROI, efficiency, goal attainment).",
      color: "border-[#F54476]/20 hover:border-[#F54476]/40"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E2A4A] mb-6">An AI-Native Integration Intelligence OS</h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Three architectural principles that make IntegrateWise fundamentally different from any tool you've used before.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Pillar Cards */}
          <div className="space-y-6">
            {pillars.map((pillar, i) => (
              <div key={i} className={`p-6 md:p-8 rounded-2xl bg-white border ${pillar.color} shadow-sm hover:shadow-xl transition-all group text-left`}>
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 bg-[#F3F4F6] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1E2A4A] mb-2">{pillar.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Architecture Diagram */}
          <div className="lg:sticky lg:top-28">
            <ArchitectureDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}