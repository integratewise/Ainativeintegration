import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import faviconSrc from "figma:asset/bcaf13c3a18bdb4dbfd3ccee1dd81293eb966a9a.png";

// ── Landing Pages ──
import { Navbar } from "./components/landing/Navbar";
import { Hero } from "./components/landing/Hero";
import { Problem } from "./components/landing/Problem";
import { Pillars } from "./components/landing/Pillars";
import { Audience } from "./components/landing/Audience";
import { Comparison } from "./components/landing/Comparison";
import { Differentiators } from "./components/landing/Differentiators";
import { Integrations } from "./components/landing/Integrations";
import { Pricing } from "./components/landing/Pricing";
import { Footer } from "./components/landing/Footer";
import { TechnicalPage } from "./components/landing/TechnicalPage";
import { ProblemPage } from "./components/landing/ProblemPage";
import { AudiencePage } from "./components/landing/AudiencePage";
import { PricingPage } from "./components/landing/PricingPage";

// ── Auth ──
import { LoginPageNew } from "./components/auth/login-page-new";

// ── Full Workspace System ──
import { SpineProvider, useSpine } from "./components/spine/spine-client";
import { GoalProvider } from "./components/goal-framework/goal-context";
import { OnboardingFlowComplete } from "./components/onboarding/onboarding-flow-complete";
import { WorkspaceShell } from "./components/workspace-shell";
import type { CTXEnum, OrgType } from "./components/spine/types";

// ── Debug (temporary) ──
import { RouteDebug } from "./components/debug/route-debug";

// ── Page types ──
type Page = "home" | "technical" | "problem" | "audience" | "pricing" | "app";

// ─── Workspace App (Login → Onboarding → Workspace) ─────────────────────────

function WorkspaceApp() {
  const spine = useSpine();
  // ENABLED AUTH: Login → Onboarding → Workspace
  const [authState, setAuthState] = useState<"login" | "onboarding" | "workspace">("login");
  const [orgType, setOrgType] = useState<OrgType>("PRODUCT");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const handleLogin = useCallback(async (email: string, password: string) => {
    setLoginLoading(true);
    setLoginError("");
    
    try {
      // Demo login — accepts any credentials for now
      // TODO: Replace with real Supabase auth
      await new Promise(r => setTimeout(r, 1000));
      
      console.log("[AUTH] Login successful:", email);
      setAuthState("onboarding");
    } catch (err) {
      console.error("[AUTH] Login failed:", err);
      setLoginError("Invalid email or password. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  }, []);

  const handleOnboardingComplete = useCallback(async (data: {
    // Step 1: Identity
    workspaceName: string;
    organizationName: string;
    userName: string;
    
    // Step 2: Domain Schema
    domain: string;
    industry: string;
    department: string;
    selectedEntities: string[];
    schemaRecommendation: any;
    
    // Step 3: Role & Scope
    role: "admin" | "manager" | "user";
    teamSize: string;
    
    // Step 4: Tool Connections
    connectors: string[];
    
    // Step 5: AI Loader
    uploadedFiles: File[];
    
    // Step 6: Preferences
    preferences: {
      enableNotifications: boolean;
      enableAI: boolean;
      enableRealtime: boolean;
    };
  }) => {
    // Log the complete onboarding data
    console.log("[ONBOARDING COMPLETE - 6 STEPS]", data);
    
    // Determine orgType based on domain
    const orgTypeMapping: Record<string, OrgType> = {
      REVOPS: "PRODUCT",
      CUSTOMER_SUCCESS: "PRODUCT",
      SALES: "PRODUCT",
      MARKETING: "PRODUCT",
      PRODUCT_ENGINEERING: "PRODUCT",
      BIZOPS: "PRODUCT",
      FINANCE: "PRODUCT",
      SERVICE: "SERVICES",
      PROCUREMENT: "PRODUCT",
    };
    setOrgType(orgTypeMapping[data.domain] || "PRODUCT");
    
    try {
      // Initialize spine with new onboarding data
      await spine.initialize({
        connectedApps: data.connectors,
        userName: data.workspaceName,
        role: data.department,
      });
      
      console.log("[SPINE INITIALIZED]", {
        workspace: data.workspaceName,
        organization: data.organizationName,
        domain: data.domain,
        industry: data.industry,
        department: data.department,
        entities: data.selectedEntities,
        role: data.role,
        teamSize: data.teamSize,
        preferences: data.preferences,
      });
    } catch (err) {
      console.error("[WorkspaceApp] Spine initialization failed:", err);
    }
    
    setAuthState("workspace");
  }, [spine]);

  // Show login page first
  if (authState === "login") {
    return (
      <LoginPageNew
        onLogin={handleLogin}
        onSignUp={() => setAuthState("onboarding")}
        onForgotPassword={() => {
          console.log("[AUTH] Forgot password clicked");
          // TODO: Implement forgot password flow
        }}
        error={loginError}
        loading={loginLoading}
      />
    );
  }

  if (authState === "onboarding") {
    return <OnboardingFlowComplete onComplete={handleOnboardingComplete} />;
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

  // Set favicon
  useEffect(() => {
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement
      || document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    link.href = faviconSrc;
    document.head.appendChild(link);
  }, []);

  // Hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      console.log("[ROUTING] Hash changed to:", hash);
      
      if (hash === "technical") setCurrentPage("technical");
      else if (hash === "problem") setCurrentPage("problem");
      else if (hash === "audience") setCurrentPage("audience");
      else if (hash === "pricing") setCurrentPage("pricing");
      else if (hash === "app") {
        console.log("[ROUTING] Setting page to 'app'");
        setCurrentPage("app");
      }
      else setCurrentPage("home");
      
      console.log("[ROUTING] Current page will be:", hash || "home");
      window.scrollTo(0, 0);
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Run immediately on mount

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Debug log when page changes
  useEffect(() => {
    console.log("[APP] Current page state:", currentPage);
  }, [currentPage]);

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
      {/* Debug Component - Remove in production */}
      <RouteDebug />
      
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