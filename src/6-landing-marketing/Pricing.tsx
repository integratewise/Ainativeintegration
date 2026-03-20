import { Check } from "lucide-react";

export function Pricing() {
  const tiers = [
    {
      name: "Starter",
      price: "$49",
      period: "user/month",
      desc: "Core integrations, basic intelligence, ideal for small CS teams.",
      features: [
        "Up to 5 integrations",
        "L0-L1 Truth Layer",
        "Basic health scoring",
        "Email support"
      ]
    },
    {
      name: "Growth",
      price: "$99",
      period: "user/month",
      desc: "Full L0–L3 intelligence, dual‑context metrics, edge correction engine.",
      popular: true,
      features: [
        "Unlimited integrations",
        "Full L0-L3 Architecture",
        "Dual-context intelligence",
        "Edge Correction Library",
        "Priority support"
      ]
    },
    {
      name: "Enterprise",
      price: "Contact",
      period: "for pricing",
      desc: "Custom integrations, advanced controls, and full‑company rollouts.",
      features: [
        "Custom deployment",
        "RBAC & SSO",
        "Dedicated CSM",
        "Custom L3 Intelligence rules",
        "24/7 SLA"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#4152A1] mb-4">Simple, value‑aligned pricing</h2>
          <p className="text-slate-600 text-lg">Scales with your success, not just your tool count.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {tiers.map((tier, i) => (
            <div key={i} className={`relative p-8 md:p-10 rounded-3xl bg-white border ${tier.popular ? 'border-[#4256AB] shadow-2xl md:scale-105' : 'border-slate-200 shadow-sm'} flex flex-col`}>
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#4256AB] text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{tier.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-black text-[#4152A1]">{tier.price}</span>
                <span className="text-slate-500 ml-1">/{tier.period}</span>
              </div>
              <p className="text-slate-600 mb-8 min-h-[60px]">{tier.desc}</p>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-slate-700 font-medium">
                    <Check className="w-5 h-5 text-[#EE4B75]" />
                    {f}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-bold transition-all ${tier.popular ? 'bg-[#EE4B75] text-white hover:bg-[#EE4B75]/90 shadow-lg shadow-[#EE4B75]/20' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                {tier.price === 'Contact' ? 'Talk to Sales' : 'Start with ' + tier.name}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-20 p-8 md:p-12 bg-[#4152A1] rounded-3xl text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">The window is open — for a limited time</h3>
          <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed">
            Incumbents will add AI layers. New tools will copy parts of the architecture. What they can’t copy quickly are years of dual‑context data, edge corrections, and customer trust.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#EE4B75] hover:bg-[#EE4B75]/90 text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-black/20 transition-all">
              Book a strategy session
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-bold transition-all">
              Start a pilot with your CSM team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}