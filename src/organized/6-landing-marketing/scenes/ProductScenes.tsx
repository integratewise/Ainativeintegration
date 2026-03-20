import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Database, Layers, BrainCircuit, ShieldCheck, Zap, Activity, Repeat, ArrowRight, Server, Box, Globe, Lock, PlayCircle, PauseCircle } from "lucide-react";

// --- Types ---
type SceneProps = { isActive: boolean };

// --- 1. Connector Ingest Scene ---
export function ConnectorIngestScene({ isActive }: SceneProps) {
  const prefersReducedMotion = useReducedMotion();
  const tools = [
    { name: "Salesforce", color: "bg-blue-500", delay: 0 },
    { name: "HubSpot", color: "bg-orange-500", delay: 0.2 },
    { name: "Zendesk", color: "bg-green-600", delay: 0.4 },
    { name: "Stripe", color: "bg-indigo-500", delay: 0.6 },
  ];

  return (
    <div className="relative w-full h-64 bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center p-6 border border-slate-800">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#3F5185]/20 via-slate-900 to-slate-900"></div>
      
      <div className="relative z-10 flex w-full justify-between items-center max-w-md">
        {/* Source Tools */}
        <div className="flex flex-col gap-3">
          {tools.map((t, i) => (
            <motion.div
              key={t.name}
              initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: t.delay, duration: 0.5 }}
              className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2"
            >
              <div className={`w-3 h-3 rounded-full ${t.color}`} />
              <span className="text-xs text-slate-300 font-medium">{t.name}</span>
            </motion.div>
          ))}
        </div>

        {/* Streaming Data */}
        <div className="flex-1 h-32 relative mx-4">
          {isActive && !prefersReducedMotion && (
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              {[0.2, 0.5, 0.8].map((yOffset, i) => (
                <motion.path
                  key={i}
                  d={`M 0 ${32 * yOffset * 4} C 50 ${32 * yOffset * 4}, 50 64, 100 64`}
                  fill="transparent"
                  stroke="#3F5185"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
            </svg>
          )}
        </div>

        {/* Gateway Pipeline */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          className="w-32 h-32 rounded-xl bg-[#1E2A4A] border-2 border-[#3F5185] flex flex-col items-center justify-center shadow-[0_0_30px_rgba(63,81,133,0.4)]"
        >
          <Database className="w-8 h-8 text-[#7B9BFF] mb-2" />
          <div className="text-xs font-bold text-white tracking-widest uppercase">Pipeline</div>
          <div className="text-[9px] text-[#7B9BFF] mt-1">Normalizing...</div>
        </motion.div>
      </div>
    </div>
  );
}

// --- 2. Spine Assembly Scene ---
export function SpineAssemblyScene({ isActive }: SceneProps) {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className="relative w-full h-64 bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center p-6 border border-slate-800">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        <div className="flex gap-4 mb-8 w-full justify-center">
           {[
             { icon: <Database size={14}/>, label: "CRM", val: "Acme Corp" },
             { icon: <Activity size={14}/>, label: "Usage", val: "94% Health" },
             { icon: <Zap size={14}/>, label: "Billing", val: "$12k ARR" }
           ].map((item, i) => (
             <motion.div
               key={i}
               initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
               animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
               transition={{ delay: i * 0.2 }}
               className="bg-slate-800 border border-slate-700 rounded-lg p-2 flex flex-col items-center min-w-[80px]"
             >
               <div className="text-slate-400 mb-1">{item.icon}</div>
               <div className="text-[9px] text-slate-500 uppercase">{item.label}</div>
               <div className="text-xs text-slate-300 font-semibold">{item.val}</div>
             </motion.div>
           ))}
        </div>
        
        {/* The Spine Canonical Entity */}
        <motion.div
           initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { scale: 0.8, opacity: 0 }}
           animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
           transition={{ delay: 0.6, type: "spring" }}
           className="w-64 bg-[#1E2A4A] border-l-4 border-l-[#3F5185] rounded-r-xl p-4 shadow-xl"
        >
           <div className="flex justify-between items-center mb-3">
             <div className="flex items-center gap-2">
               <Layers className="w-4 h-4 text-[#7B9BFF]" />
               <span className="text-sm font-bold text-white">Canonical Spine Entity</span>
             </div>
             <span className="text-[9px] px-1.5 py-0.5 bg-[#3F5185] text-white rounded font-mono">B7</span>
           </div>
           
           <div className="space-y-1.5">
             <div className="flex justify-between text-xs">
               <span className="text-slate-400">Account</span>
               <span className="text-white font-medium">Acme Corp</span>
             </div>
             <div className="flex justify-between text-xs">
               <span className="text-slate-400">ARR</span>
               <span className="text-white font-medium">$12,000</span>
             </div>
             <div className="flex justify-between text-xs">
               <span className="text-slate-400">Health</span>
               <span className="text-emerald-400 font-medium">94%</span>
             </div>
           </div>
        </motion.div>
      </div>
    </div>
  );
}

// --- 3. Signal Approval Scene ---
export function SignalApprovalScene({ isActive }: SceneProps) {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className="relative w-full h-64 bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center p-6 border border-slate-800">
      <div className="relative z-10 flex gap-6 w-full max-w-lg items-center">
        {/* Signal */}
        <motion.div
           initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
           animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
           className="flex-1 bg-slate-800/80 border border-amber-500/30 rounded-xl p-3"
        >
           <div className="flex items-center gap-2 text-amber-400 mb-2">
             <BrainCircuit className="w-4 h-4" />
             <span className="text-xs font-bold uppercase tracking-wide">AI Brief</span>
           </div>
           <p className="text-xs text-slate-300 mb-2">Renewal risk detected: Usage dropped 40% in 7 days.</p>
           <div className="bg-slate-900 rounded p-2 text-[10px] text-slate-400">
             Proposed: Create Jira Escalation & Notify CS Slack
           </div>
        </motion.div>
        
        <ArrowRight className="w-5 h-5 text-slate-600 shrink-0" />
        
        {/* Governance / HITL */}
        <motion.div
           initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
           animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
           transition={{ delay: 0.4 }}
           className="flex-1 bg-[#1E2A4A] border border-[#3F5185] rounded-xl p-3 shadow-lg"
        >
           <div className="flex items-center gap-2 text-white mb-2">
             <ShieldCheck className="w-4 h-4 text-[#7B9BFF]" />
             <span className="text-xs font-bold uppercase tracking-wide">Human Gate</span>
           </div>
           <div className="flex gap-2 mt-4">
             <div className="flex-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded py-1.5 text-center text-xs font-bold cursor-pointer hover:bg-emerald-500/30">
               Approve
             </div>
             <div className="flex-1 bg-slate-800 text-slate-400 border border-slate-700 rounded py-1.5 text-center text-xs font-bold cursor-pointer hover:bg-slate-700">
               Deny
             </div>
           </div>
        </motion.div>
      </div>
    </div>
  );
}

// --- 4. Service Engine Scene (Architecture/Engine Map) ---
export function ServiceEngineScene({ isActive }: SceneProps) {
  const prefersReducedMotion = useReducedMotion();
  
  const nodes = [
    { id: "Gateway", icon: <Globe size={16}/>, x: "10%", y: "50%" },
    { id: "Connectors", icon: <Box size={16}/>, x: "30%", y: "20%" },
    { id: "Pipeline", icon: <Activity size={16}/>, x: "30%", y: "80%" },
    { id: "Spine SSOT", icon: <Database size={16}/>, x: "50%", y: "50%" },
    { id: "Intelligence", icon: <BrainCircuit size={16}/>, x: "70%", y: "20%" },
    { id: "Governance", icon: <ShieldCheck size={16}/>, x: "70%", y: "80%" },
    { id: "Execution", icon: <Zap size={16}/>, x: "90%", y: "50%" },
  ];

  return (
    <div className="relative w-full h-80 bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 p-4">
       {/* Background grid */}
       <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:16px_16px]" />
       
       <div className="relative w-full h-full">
         {/* Edges */}
         {isActive && !prefersReducedMotion && (
           <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
             <motion.path d="M 10% 50% L 30% 20% L 50% 50% L 70% 20% L 90% 50%" fill="none" stroke="#3F5185" strokeWidth="2" strokeDasharray="4 4"
               initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
             />
             <motion.path d="M 10% 50% L 30% 80% L 50% 50% L 70% 80% L 90% 50%" fill="none" stroke="#F54476" strokeWidth="2" strokeDasharray="4 4"
               initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5 }}
             />
           </svg>
         )}

         {/* Nodes */}
         {nodes.map((n, i) => (
           <motion.div
             key={n.id}
             className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
             style={{ left: n.x, top: n.y, zIndex: 10 }}
             initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
             animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
             transition={{ delay: i * 0.15 }}
           >
             <div className="w-10 h-10 bg-[#1E2A4A] border border-[#3F5185] rounded-xl flex items-center justify-center text-white shadow-lg">
               {n.icon}
             </div>
             <div className="text-[10px] font-bold text-slate-300 bg-slate-900/80 px-1.5 rounded">{n.id}</div>
           </motion.div>
         ))}
       </div>
    </div>
  );
}

// --- Orchestrator Component ---
export function ProductStoryViewer() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const steps = [
    { title: "Connect", desc: "Ingest from tools", component: ConnectorIngestScene },
    { title: "Unify", desc: "Assemble the Spine", component: SpineAssemblyScene },
    { title: "Govern", desc: "Signal & Approval", component: SignalApprovalScene },
  ];

  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, steps.length, prefersReducedMotion]);

  const ActiveComponent = steps[activeStep].component;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Scene Area */}
      <div className="w-full mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <ActiveComponent isActive={true} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-slate-400 hover:text-[#3F5185] transition-colors p-2"
          aria-label={isPlaying ? "Pause animation" : "Play animation"}
        >
          {isPlaying ? <PauseCircle className="w-6 h-6" /> : <PlayCircle className="w-6 h-6" />}
        </button>
        
        <div className="flex gap-2">
          {steps.map((step, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveStep(i);
                setIsPlaying(false);
              }}
              className={`px-4 py-2 rounded-xl text-left transition-all min-w-[140px] ${
                activeStep === i 
                  ? "bg-[#3F5185] text-white shadow-md" 
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              <div className="text-[10px] font-black uppercase tracking-wider opacity-80 mb-0.5">Step 0{i + 1}</div>
              <div className="text-sm font-bold">{step.title}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
