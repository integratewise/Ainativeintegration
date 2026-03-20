import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

// ── Landing Pages ──
import { Navbar } from "../6-landing-marketing/Navbar";
import { Hero } from "../6-landing-marketing/Hero";
import { Problem } from "../6-landing-marketing/Problem";
import { Pillars } from "../6-landing-marketing/Pillars";
import { Audience } from "../6-landing-marketing/Audience";
import { Comparison } from "../6-landing-marketing/Comparison";
import { Differentiators } from "../6-landing-marketing/Differentiators";
import { Integrations } from "../6-landing-marketing/Integrations";
import { Pricing } from "../6-landing-marketing/Pricing";
import { Footer } from "../6-landing-marketing/Footer";
import { TechnicalPage } from "../6-landing-marketing/TechnicalPage";
import { ProblemPage } from "../6-landing-marketing/ProblemPage";
import { AudiencePage } from "../6-landing-marketing/AudiencePage";
import { PricingPage } from "../6-landing-marketing/PricingPage";

// ── Auth ──
import { LoginPage } from "../10-auth-onboarding/login-page";

// ── Full Workspace System ──
import { SpineProvider, useSpine } from "../3-spine-core/spine-client";
import { GoalProvider } from "../3-spine-core/goal-context";
import { OnboardingFlow } from "../10-auth-onboarding/onboarding-flow";
import { WorkspaceShell } from "../4-workspace-shell/workspace-shell";
import type { CTXEnum, OrgType } from "../3-spine-core/types";

// ── Page types ──
type Page = "home" | "technical" | "problem" | "audience" | "pricing" | "app";

// ─── Workspace App (Login → Onboarding → Workspace) ─────────────────────────

function WorkspaceApp() {
  const spine = useSpine();
  const [authState, setAuthState] = useState<"login" | "onboarding" | "workspace">("login");
  const [orgType, setOrgType] = useState<OrgType>("PRODUCT");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const handleLogin = useCallback(async (email: string, password: string) => {
    setLoginLoading(true);
    setLoginError("");
    // Demo login — accepts any credentials
    await new Promise(r => setTimeout(r, 800));
    setLoginLoading(false);
    setAuthState("onboarding");
  }, []);

  const handleOnboardingComplete = useCallback(async (data: {
    userName: string;
    role: string;
    activeCtx: CTXEnum;
    connectedApps: string[];
    orgType: OrgType;
  }) => {
    setOrgType(data.orgType);
    try {
      await spine.initialize({
        connectedApps: data.connectedApps,
        userName: data.userName,
        role: data.role,
      });
    } catch (err) {
      console.error("[WorkspaceApp] Spine initialization failed:", err);
    }
    setAuthState("workspace");
  }, [spine]);

  if (authState === "login") {
    return (
      <LoginPage
        onLogin={handleLogin}
        onSignUp={() => setAuthState("onboarding")}
        onForgotPassword={() => {}}
        error={loginError}
        loading={loginLoading}
      />
    );
  }

  if (authState === "onboarding") {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <GoalProvider initialOrgType={orgType}>
      <WorkspaceShell />
    </GoalProvider>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  // Hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "technical") setCurrentPage("technical");
      else if (hash === "problem") setCurrentPage("problem");
      else if (hash === "audience") setCurrentPage("audience");
      else if (hash === "pricing") setCurrentPage("pricing");
      else if (hash === "app") setCurrentPage("app");
      else setCurrentPage("home");
      window.scrollTo(0, 0);
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // ── Full Workspace ──
  if (currentPage === "app") {
    return (
      <SpineProvider>
        <WorkspaceApp />
      </SpineProvider>
    );
  }

  // ── Marketing Site ──
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#EE4B75]/30">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      
      <AnimatePresence mode="wait">
        {currentPage === "home" && (
          <motion.main key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Hero />
            <Problem />
            <Pillars />
            <Audience />
            <Comparison />
            <Integrations />
            <Differentiators />
            <Pricing />
            <Footer />
          </motion.main>
        )}
        {currentPage === "technical" && (
          <motion.main key="technical" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <TechnicalPage />
            <Footer />
          </motion.main>
        )}
        {currentPage === "problem" && (
          <motion.main key="problem" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <ProblemPage />
            <Footer />
          </motion.main>
        )}
        {currentPage === "audience" && (
          <motion.main key="audience" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <AudiencePage />
            <Footer />
          </motion.main>
        )}
        {currentPage === "pricing" && (
          <motion.main key="pricing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <PricingPage />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
