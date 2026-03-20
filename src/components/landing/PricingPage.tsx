import React from "react";
import { Pricing } from "./Pricing";
import { Layout } from "./Layout";

export function PricingPage() {
  return (
    <Layout>
      <div className="pt-16 md:pt-20">
        <Pricing />
      </div>
    </Layout>
  );
}