import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Users,
  Briefcase,
  Building2,
  Database,
  FileText,
  Bot,
  CheckCircle2,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
  ArrowRight,
  Server,
  Upload,
  Rocket,
  Shield,
  Loader2,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { LogoMark } from "../landing/logo";
import { ConnectorGrid } from "./connector-grid";
import { SchemaSelector } from "./schema-selector";
import type { SchemaRecommendation } from "./schema-registry";

/**
 * Complete 6-Step Onboarding Flow
 * Based on: /imports/pasted_text/user-journey-flow.md
 * 
 * STAGE 3: Onboarding (6 Steps)
 * 
 * Step 1: Identity - Create workspace foundation
 * Step 2: Domain Schema - Select business domain for adaptive schema  
 * Step 3: Role & Scope - RBAC configuration
 * Step 4: Tool Connections - Connector OAuth setup
 * Step 5: AI Loader - File uploads for Flow B (Optional)
 * Step 6: Activate - Foundation activation gate
 */

interface OnboardingData {
  // Step 1: Identity
  workspaceName: string;
  organizationName: string;
  userName: string;
  
  // Step 2: Domain Schema
  domain: string;
  industry: string;
  department: string;
  selectedEntities: string[];
  schemaRecommendation: SchemaRecommendation | null;
  
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
}

interface OnboardingFlowCompleteProps {
  onComplete: (data: OnboardingData) => void;
}

// 11 Industries from Guidelines
const INDUSTRIES = [
  "Technology / SaaS",
  "Professional Services",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Automotive / Mobility",
  "Retail / E-commerce",
  "Financial Services",
  "Logistics / Supply Chain",
  "Media / Entertainment",
  "Government / Public Sector",
];

// 12 Departments from Guidelines
const DEPARTMENTS = {
  "Revenue & Growth": [
    "Sales",
    "Marketing",
    "RevOps",
    "Customer Success",
  ],
  "Technology": [
    "Engineering",
    "Product Management",
  ],
  "Operations": [
    "Support",
    "Service Operations",
    "Supply Chain",
  ],
  "Corporate": [
    "Finance",
    "Legal",
    "HR",
  ],
};

// 9 Domains from user-journey-flow.md
const DOMAINS = [
  { value: "REVOPS", label: "Revenue Operations", icon: TrendingUp },
  { value: "CUSTOMER_SUCCESS", label: "Customer Success", icon: Users },
  { value: "SALES", label: "Sales", icon: Target },
  { value: "MARKETING", label: "Marketing", icon: Sparkles },
  { value: "PRODUCT_ENGINEERING", label: "Product & Engineering", icon: Server },
  { value: "BIZOPS", label: "Business Operations", icon: Briefcase },
  { value: "FINANCE", label: "Finance & Accounting", icon: Database },
  { value: "SERVICE", label: "Service Operations", icon: Shield },
  { value: "PROCUREMENT", label: "Procurement", icon: Building2 },
];

const TEAM_SIZES = [
  "Just me",
  "2-10 people",
  "11-50 people",
  "51-200 people",
  "201-500 people",
  "500+ people",
];

const ROLES = [
  { value: "admin", label: "Admin", description: "Full access to all features" },
  { value: "manager", label: "Manager", description: "Manage team and workflows" },
  { value: "user", label: "User", description: "Standard workspace access" },
];

export function OnboardingFlowComplete({ onComplete }: OnboardingFlowCompleteProps) {
  const [step, setStep] = useState(0);
  
  // Step 1: Identity
  const [workspaceName, setWorkspaceName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [userName, setUserName] = useState("");
  
  // Step 2: Domain Schema
  const [domain, setDomain] = useState("");
  const [industry, setIndustry] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
  const [schemaRecommendation, setSchemaRecommendation] = useState<SchemaRecommendation | null>(null);
  
  // Step 3: Role & Scope
  const [role, setRole] = useState<"admin" | "manager" | "user">("admin");
  const [teamSize, setTeamSize] = useState("51-200 people");
  
  // Step 4: Tool Connections
  const [selectedConnectors, setSelectedConnectors] = useState<string[]>([]);
  
  // Step 5: AI Loader
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  // Step 6: Preferences
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [enableAI, setEnableAI] = useState(true);
  const [enableRealtime, setEnableRealtime] = useState(true);
  
  // Loading state for activation
  const [isActivating, setIsActivating] = useState(false);

  const progress = ((step + 1) / 6) * 100;

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Step 6: Activate - Complete onboarding
      handleActivate();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleActivate = async () => {
    setIsActivating(true);
    
    // Simulate API call for activation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (schemaRecommendation) {
      onComplete({
        // Step 1
        workspaceName,
        organizationName,
        userName,
        
        // Step 2
        domain,
        industry,
        department,
        selectedEntities,
        schemaRecommendation,
        
        // Step 3
        role,
        teamSize,
        
        // Step 4
        connectors: selectedConnectors,
        
        // Step 5
        uploadedFiles,
        
        // Step 6
        preferences: {
          enableNotifications,
          enableAI,
          enableRealtime,
        },
      });
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0: // Step 1: Identity
        return workspaceName.trim().length > 0 && organizationName.trim().length > 0;
      case 1: // Step 2: Domain Schema
        return domain && industry && department && selectedEntities.length > 0;
      case 2: // Step 3: Role & Scope
        return role && teamSize;
      case 3: // Step 4: Tool Connections
        return true; // Can skip connectors
      case 4: // Step 5: AI Loader
        return true; // Can skip file uploads
      case 5: // Step 6: Activate
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F6FA] via-white to-[#F5F6FA] flex flex-col">
      {/* Header with Logo and Progress */}
      <div className="w-full border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <LogoMark size={32} />
              <div>
                <div className="font-bold text-sm">IntegrateWise</div>
                <div className="text-[10px] text-muted-foreground">
                  AI Thinks in Context — and Waits for Approval
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Step {step + 1} of 6
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#3F5185] to-[#F54476]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {/* STEP 1: Identity - Create workspace foundation */}
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {step === 0 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-xl border p-8 md:p-12"
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#3F5185] to-[#F54476] mb-4">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">
                    Create Your Workspace
                  </h1>
                  <p className="text-muted-foreground">
                    Let's set up your knowledge workspace foundation
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Workspace Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="e.g., Acme Revenue Operations"
                      value={workspaceName}
                      onChange={(e) => setWorkspaceName(e.target.value)}
                      className="h-12"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      This is how your workspace will be identified
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Organization Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="e.g., Acme Corporation"
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <Input
                      placeholder="e.g., John Smith"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-900">
                    <strong>Next:</strong> We'll configure your workspace based on your industry and department
                  </p>
                </div>
              </motion.div>
            )}

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {/* STEP 2: Domain Schema - Select business domain */}
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {step === 1 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-xl border p-8 md:p-12"
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#3F5185] to-[#F54476] mb-4">
                    <Database className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">
                    Configure Your Domain
                  </h1>
                  <p className="text-muted-foreground">
                    The Spine adapts to your industry and department — this powers the 12 × 11 model
                  </p>
                </div>

                <div className="space-y-6 mb-6">
                  {/* Domain Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Select Your Domain <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {DOMAINS.map((d) => {
                        const Icon = d.icon;
                        return (
                          <button
                            key={d.value}
                            onClick={() => setDomain(d.value)}
                            className={`p-4 rounded-xl border-2 transition-all text-left ${
                              domain === d.value
                                ? "border-[#3F5185] bg-[#3F5185]/5"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <Icon className={`w-5 h-5 mb-2 ${domain === d.value ? "text-[#3F5185]" : "text-gray-400"}`} />
                            <div className="text-sm font-medium">{d.label}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Industry Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Industry <span className="text-red-500">*</span>
                    </label>
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDUSTRIES.map((ind) => (
                          <SelectItem key={ind} value={ind}>
                            {ind}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Department Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Department <span className="text-red-500">*</span>
                    </label>
                    <Select value={department} onValueChange={setDepartment}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your department" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(DEPARTMENTS).map(([category, depts]) => (
                          <div key={category}>
                            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                              {category}
                            </div>
                            {depts.map((dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Schema Selector */}
                {domain && industry && department && (
                  <div className="mt-6">
                    <SchemaSelector
                      industry={industry}
                      department={department}
                      onSchemaChange={(entities, recommendation) => {
                        setSelectedEntities(entities);
                        setSchemaRecommendation(recommendation);
                      }}
                    />
                  </div>
                )}

                <div className="mt-8 p-4 bg-purple-50 border border-purple-200 rounded-xl">
                  <p className="text-sm text-purple-900">
                    <strong>The Spine:</strong> Your selections create an adaptive schema that evolves with your business
                  </p>
                </div>
              </motion.div>
            )}

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {/* STEP 3: Role & Scope - RBAC configuration */}
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {step === 2 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-xl border p-8 md:p-12"
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#3F5185] to-[#F54476] mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">
                    Role & Permissions
                  </h1>
                  <p className="text-muted-foreground">
                    Configure your access level and team structure
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Role Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Your Role <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      {ROLES.map((r) => (
                        <button
                          key={r.value}
                          onClick={() => setRole(r.value as any)}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            role === r.value
                              ? "border-[#3F5185] bg-[#3F5185]/5"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{r.label}</div>
                              <div className="text-sm text-muted-foreground">{r.description}</div>
                            </div>
                            {role === r.value && (
                              <CheckCircle2 className="w-5 h-5 text-[#3F5185]" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Team Size */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Team Size <span className="text-red-500">*</span>
                    </label>
                    <Select value={teamSize} onValueChange={setTeamSize}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select team size" />
                      </SelectTrigger>
                      <SelectContent>
                        {TEAM_SIZES.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <p className="text-sm text-amber-900">
                    <strong>RBAC:</strong> Role-based access control ensures proper data security and governance
                  </p>
                </div>
              </motion.div>
            )}

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {/* STEP 4: Tool Connections - Connector OAuth setup */}
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {step === 3 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-xl border p-8 md:p-12"
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#3F5185] to-[#F54476] mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">
                    Connect Your Tools
                  </h1>
                  <p className="text-muted-foreground">
                    Select connectors to start syncing data — classified into Flow A, B, and C
                  </p>
                </div>

                <ConnectorGrid
                  domain={domain}
                  department={department}
                  selectedConnectors={selectedConnectors}
                  onConnectorToggle={(connectorId) => {
                    setSelectedConnectors((prev) =>
                      prev.includes(connectorId)
                        ? prev.filter((id) => id !== connectorId)
                        : [...prev, connectorId]
                    );
                  }}
                />

                {selectedConnectors.length > 0 && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-sm text-green-900">
                      <strong>{selectedConnectors.length} connector{selectedConnectors.length > 1 ? 's' : ''} selected</strong> — OAuth will start after activation
                    </p>
                  </div>
                )}

                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-900">
                    You can skip this step and connect tools later from Settings
                  </p>
                </div>
              </motion.div>
            )}

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {/* STEP 5: AI Loader - File uploads for Flow B (Optional) */}
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {step === 4 && (
              <motion.div
                key="step-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-xl border p-8 md:p-12"
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#3F5185] to-[#F54476] mb-4">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">
                    Upload Documents
                  </h1>
                  <p className="text-muted-foreground">
                    Add files for Flow B: unstructured content processing (Optional)
                  </p>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-[#3F5185] transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="font-medium mb-2">Drag & drop files here</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    or click to browse
                  </p>
                  <Button variant="outline" className="mx-auto">
                    <FileText className="w-4 h-4 mr-2" />
                    Choose Files
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4">
                    Supported: PDF, DOCX, CSV, TXT, MD (Max 10MB each)
                  </p>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-6 space-y-2">
                    {uploadedFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium">{file.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {(file.size / 1024).toFixed(1)} KB
                            </div>
                          </div>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-8 p-4 bg-purple-50 border border-purple-200 rounded-xl">
                  <p className="text-sm text-purple-900">
                    <strong>Flow B:</strong> Documents go through: R2 Storage → Pipeline → Spine + Knowledge (pgVector)
                  </p>
                </div>
              </motion.div>
            )}

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {/* STEP 6: Activate - Foundation activation gate */}
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {step === 5 && (
              <motion.div
                key="step-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-xl border p-8 md:p-12"
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#3F5185] to-[#F54476] mb-4">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">
                    Ready to Activate
                  </h1>
                  <p className="text-muted-foreground">
                    Your workspace is configured — let's bring it to life
                  </p>
                </div>

                {/* Configuration Summary */}
                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-xs text-muted-foreground mb-1">Workspace</div>
                    <div className="font-medium">{workspaceName || "Not set"}</div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-xs text-muted-foreground mb-1">Domain Configuration</div>
                    <div className="font-medium">
                      {domain ? DOMAINS.find(d => d.value === domain)?.label : "Not set"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {industry} · {department}
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-xs text-muted-foreground mb-1">Entities Selected</div>
                    <div className="font-medium">{selectedEntities.length} entity types</div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-xs text-muted-foreground mb-1">Connectors</div>
                    <div className="font-medium">
                      {selectedConnectors.length > 0 
                        ? `${selectedConnectors.length} connector${selectedConnectors.length > 1 ? 's' : ''} ready` 
                        : "None selected (can add later)"}
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Workspace Preferences</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer">
                      <div>
                        <div className="font-medium">Enable AI Intelligence</div>
                        <div className="text-sm text-muted-foreground">
                          AI Twin, signals, and cognitive features
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={enableAI}
                        onChange={(e) => setEnableAI(e.target.checked)}
                        className="w-5 h-5"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer">
                      <div>
                        <div className="font-medium">Real-time Updates</div>
                        <div className="text-sm text-muted-foreground">
                          Live data sync and WebSocket connection
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={enableRealtime}
                        onChange={(e) => setEnableRealtime(e.target.checked)}
                        className="w-5 h-5"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer">
                      <div>
                        <div className="font-medium">Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Alerts for signals and HITL approvals
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={enableNotifications}
                        onChange={(e) => setEnableNotifications(e.target.checked)}
                        className="w-5 h-5"
                      />
                    </label>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-[#3F5185]/10 to-[#F54476]/10 border border-[#3F5185]/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#3F5185] mt-0.5" />
                    <div className="text-sm">
                      <div className="font-semibold mb-1">What happens next?</div>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Mark onboarding_complete = true</li>
                        <li>• Trigger initial sync (Creamy phase ~60s)</li>
                        <li>• Initialize Spine with your schema</li>
                        <li>• Redirect to workspace</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="w-full border-t bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 0 || isActivating}
          >
            Back
          </Button>

          <div className="flex items-center gap-2">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className={`h-2 w-2 rounded-full transition-all ${
                  idx === step
                    ? "w-8 bg-[#3F5185]"
                    : idx < step
                    ? "bg-[#3F5185]"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            disabled={!canProceed() || isActivating}
            className="bg-gradient-to-r from-[#3F5185] to-[#F54476] text-white"
          >
            {isActivating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Activating...
              </>
            ) : step === 5 ? (
              <>
                Activate Workspace
                <Rocket className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
