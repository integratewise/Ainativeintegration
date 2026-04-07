import React from "react";
import { ArrowRight, Code2, Network, GitBranch, Database, ShieldCheck, Zap } from "lucide-react";

export function Differentiators() {
  const items = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "L0–L3 Cognitive Architecture",
      desc: "From raw reality (L0) to actionable intelligence (L3)."
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: "MCP‑Native by Design",
      desc: "AI agents can discover and use IntegrateWise as a tool from day one."
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: "Integration Intelligence Graph",
      desc: "Cross‑tool patterns and relationships learned over time."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Dual‑Write Linkage",
      desc: "Self‑healing schemas stay consistent even as tools change."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Approval‑Only Agents",
      desc: "Guardrails for AI; humans always stay in control."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Edge Correction Library",
      desc: "A defensible moat of human-verified intelligence."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#4152A1] mb-6">Built on 16 deep differentiators</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            We've built a technical moat that incumbents can't copy. Our architecture is designed for the AI age, not bolted onto legacy code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#4256AB]/10 text-[#4256AB] flex items-center justify-center mb-6 group-hover:bg-[#4256AB] group-hover:text-white transition-all">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-slate-600 mb-4">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-500 mb-4">These are just 6 of our 16 deep technical differentiators.</p>
          <a href="#technical" className="inline-flex items-center gap-2 text-[#4256AB] font-bold hover:gap-4 transition-all">
            Explore the full architecture <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}