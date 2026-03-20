import React from "react";
import { Audience } from "./Audience";
import { Layout } from "./Layout";

export function AudiencePage() {
  return (
    <Layout>
      <div className="pt-16 md:pt-20">
        <Audience />
        <div className="py-16 md:py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4">
                <h3 className="text-2xl md:text-3xl font-bold text-[#4152A1] text-center mb-8 md:mb-12">Built for the modern Revenue Stack</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {[
                      { name: "Salesforce", desc: "CRM & Revenue" },
                      { name: "HubSpot", desc: "Marketing & CRM" },
                      { name: "Zendesk", desc: "Customer Support" },
                      { name: "Stripe", desc: "Billing & Payments" },
                      { name: "Slack", desc: "Team Communication" },
                      { name: "Jira", desc: "Project Tracking" },
                      { name: "Mixpanel", desc: "Product Analytics" },
                      { name: "Segment", desc: "Data Pipeline" }
                    ].map((tool) => (
                      <div key={tool.name} className="bg-white rounded-2xl p-6 border border-slate-200 text-center hover:shadow-lg hover:border-[#4256AB]/30 transition-all">
                        <div className="w-12 h-12 rounded-xl bg-[#4256AB]/10 flex items-center justify-center mx-auto mb-3">
                          <span className="text-[#4256AB] font-black text-lg">{tool.name[0]}</span>
                        </div>
                        <div className="font-bold text-slate-800 text-sm">{tool.name}</div>
                        <div className="text-xs text-slate-400 mt-1">{tool.desc}</div>
                      </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </Layout>
  );
}