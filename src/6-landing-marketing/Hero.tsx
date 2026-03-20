import React from "react";
import { motion } from "motion/react";
import {
  ArrowRight, Play, Zap, Database, BrainCircuit, ShieldCheck,
  Activity, BarChart3, Users, Building2, CheckCircle2, TrendingUp
} from "lucide-react";
import { Logo } from "./logo";

/* ─── CSS-rendered Product Dashboard Mockup ───────────────────────────────── */

function DashboardMockup() {
  return (
    <div className="w-full bg-[#1E2A4A] rounded-xl overflow-hidden text-white font-sans select-none" style={{ fontSize: "10px" }}>
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#162038] border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F54476]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#D4883E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#3D8B6E]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-white/5 rounded-md px-8 py-1 text-[9px] text-white/40 font-mono">app.integratewise.io</div>
        </div>
      </div>

      <div className="flex h-[320px] sm:h-[380px]">
        {/* Sidebar mini */}
        <div className="hidden sm:flex w-12 bg-[#162038] border-r border-white/5 flex-col items-center py-3 gap-3 shrink-0">
          <Logo width={20} className="mb-2 opacity-80" />
          <div className="w-6 h-6 rounded-md bg-[#3F5185] flex items-center justify-center"><Activity className="w-3 h-3" /></div>
          <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-white/40"><Building2 className="w-3 h-3" /></div>
          <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-white/40"><Users className="w-3 h-3" /></div>
          <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-white/40"><BarChart3 className="w-3 h-3" /></div>
          <div className="mt-auto w-6 h-6 rounded-md bg-[#F54476]/20 flex items-center justify-center text-[#F54476]"><Zap className="w-3 h-3" /></div>
        </div>

        {/* Main area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-[#1E2A4A]">
            <div className="flex items-center gap-2">
              <span className="text-white/30 text-[9px]">Workspace</span>
              <span className="text-white/20">›</span>
              <span className="text-[9px] font-bold">Growth Overview</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-white/5 rounded px-2 py-0.5 text-[8px] text-white/30">⌘K</div>
              <div className="w-5 h-5 rounded-full bg-[#3F5185] flex items-center justify-center text-[7px] font-bold">AK</div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 overflow-hidden">
            {/* KPI Row */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              {[
                { label: "ARR", value: "$1.42M", trend: "+12.5%", color: "text-emerald-400" },
                { label: "Net Retention", value: "118%", trend: "+3.2%", color: "text-emerald-400" },
                { label: "Health Score", value: "84", trend: "+1.8%", color: "text-emerald-400" },
                { label: "AI Confidence", value: "98.2%", trend: "+0.4%", color: "text-emerald-400" },
              ].map((kpi, i) => (
                <div key={i} className="bg-white/[0.03] rounded-lg p-2 border border-white/5">
                  <div className="text-[8px] text-white/30 uppercase font-bold mb-1">{kpi.label}</div>
                  <div className="text-sm font-bold">{kpi.value}</div>
                  <div className={`text-[8px] font-bold ${kpi.color}`}>{kpi.trend}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 flex-1">
              {/* Chart area */}
              <div className="flex-1 bg-white/[0.03] rounded-lg border border-white/5 p-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[9px] font-bold">Strategic Goal Alignment</div>
                  <div className="text-[7px] bg-[#3F5185]/30 text-[#7B9BFF] px-1.5 py-0.5 rounded font-bold">GOAL_ANCHORED</div>
                </div>
                <div className="space-y-2.5">
                  {[
                    { name: "Product-Led Growth", pct: 78, color: "bg-[#3F5185]" },
                    { name: "Customer Retention", pct: 91, color: "bg-[#3D8B6E]" },
                    { name: "Revenue Expansion", pct: 64, color: "bg-[#D4883E]" },
                    { name: "Feature Adoption", pct: 85, color: "bg-[#7B5EA7]" },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-[8px] mb-0.5">
                        <span className="text-white/50">{item.name}</span>
                        <span className="font-bold">{item.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Mini bar chart */}
                <div className="flex items-end gap-1 mt-4 h-12">
                  {[40, 55, 45, 68, 52, 75, 60, 82, 70, 88, 76, 92].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-sm ${i === 11 ? "bg-[#F54476]" : "bg-[#3F5185]/60"}`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Intelligence panel */}
              <div className="hidden md:flex w-44 flex-col gap-2">
                {/* Integration Status */}
                <div className="bg-[#3F5185] rounded-lg p-2.5 border border-[#4A60A0]">
                  <div className="text-[8px] text-white/50 uppercase font-bold mb-1">Integrations</div>
                  <div className="text-[10px] font-bold mb-1">12 Tools Connected</div>
                  <div className="h-1 bg-[#1E2A4A] rounded-full overflow-hidden">
                    <div className="h-full bg-white/80 rounded-full" style={{ width: "93%" }} />
                  </div>
                  <div className="text-[7px] text-white/40 mt-1">93% data coverage</div>
                </div>

                {/* Intelligence Feed */}
                <div className="flex-1 bg-white/[0.03] rounded-lg border border-white/5 p-2.5">
                  <div className="flex items-center gap-1 mb-2">
                    <Zap className="w-2.5 h-2.5 text-[#F54476]" />
                    <span className="text-[8px] font-bold">Intelligence Feed</span>
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { text: "Acme Corp expansion signal detected", type: "success" },
                      { text: "Prism Cloud: renewal risk flagged", type: "warning" },
                      { text: "Stripe schema drift corrected", type: "info" },
                    ].map((item, i) => (
                      <div key={i} className="bg-white/[0.03] rounded p-1.5 border border-white/5">
                        <div className="flex items-start gap-1">
                          <div className={`w-1 h-1 rounded-full mt-1 shrink-0 ${
                            item.type === "success" ? "bg-emerald-400" :
                            item.type === "warning" ? "bg-amber-400" :
                            "bg-[#7B9BFF]"
                          }`} />
                          <span className="text-[7px] text-white/50 leading-tight">{item.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connected Sources */}
                <div className="bg-white/[0.03] rounded-lg border border-white/5 p-2.5">
                  <div className="text-[8px] font-bold mb-2">Connected Sources</div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {["SF", "HS", "ZD", "ST", "SL", "JR"].map((s, i) => (
                      <div key={i} className="flex items-center justify-center bg-white/5 rounded py-1 text-[7px] font-bold text-white/40">{s}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Hero Section ────────────────────────────────────────────────────────── */

export function Hero() {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-[#3F5185]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-[#F54476]/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-4 rounded-full bg-[#3F5185]/10 text-[#3F5185] text-sm font-bold tracking-wide uppercase mb-6">
              Enterprise Integration
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-[#1E2A4A] leading-tight mb-6 md:mb-8">
              The AI-Native{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3F5185] to-[#F54476]">
                Integration Intelligence
              </span>{" "}
              Platform
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-slate-600 mb-8 md:mb-10 leading-relaxed">
              Don't just connect your tools. Turn your entire stack into an intelligent operating system that learns from your work — while humans stay in control.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => { window.location.hash = "app"; }}
                className="w-full sm:w-auto px-8 py-4 bg-[#F54476] hover:bg-[#E03A66] text-white rounded-full font-bold text-lg shadow-lg shadow-[#F54476]/30 transition-all flex items-center justify-center gap-2 group"
              >
                Start Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => { window.location.hash = "technical"; }}
                className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-200 hover:border-[#3F5185] text-slate-700 hover:text-[#3F5185] rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5 fill-current" /> See architecture
              </button>
            </div>
          </motion.div>
        </div>

        {/* Product Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#1E2A4A]/20 border border-slate-200/50 bg-white p-1.5">
            <DashboardMockup />

            {/* Floating Element — Health Score */}
            <div className="absolute top-1/4 -left-4 sm:-left-10 hidden lg:block bg-white p-3 rounded-xl shadow-xl border border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase">Spine Health</div>
                  <div className="text-base font-black text-emerald-600">94.1%</div>
                </div>
              </div>
            </div>

            {/* Floating Element — AI Intelligence */}
            <div className="absolute bottom-1/4 -right-4 sm:-right-10 hidden lg:block bg-white p-3 rounded-xl shadow-xl border border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#F54476]/10 flex items-center justify-center text-[#F54476]">
                  <BrainCircuit className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase">AI Confidence</div>
                  <div className="text-base font-black text-[#1E2A4A]">98.2%</div>
                </div>
              </div>
            </div>

            {/* Floating Element — Integration Count */}
            <div className="absolute -top-3 right-1/4 hidden lg:block bg-[#3F5185] text-white px-3 py-1.5 rounded-lg shadow-lg text-[10px] font-bold">
              12 tools connected
            </div>
          </div>
        </motion.div>

        {/* Social Proof Strip */}
        <div className="mt-16 md:mt-24 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Unifying data from world-class platforms</p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-16 opacity-40 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0">
            {["Salesforce", "HubSpot", "Zendesk", "Stripe", "Slack", "Jira"].map(name => (
              <div key={name} className="flex items-center gap-2 text-base md:text-xl font-bold text-[#1E2A4A]">{name}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}