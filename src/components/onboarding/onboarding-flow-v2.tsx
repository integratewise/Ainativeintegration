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
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { LogoMark } from "../landing/logo";
import { ConnectorGrid } from "./connector-grid";
import { SchemaSelector } from "./schema-selector";
import type { SchemaRecommendation } from "./schema-registry";

interface OnboardingFlowV2Props {
  onComplete: (data: {
    useCase: "personal" | "work" | "business";
    industry: string;
    department: string;
    companySize: string;
    selectedEntities: string[];
    schemaRecommendation: SchemaRecommendation;
    primaryGoal: string;
    workspaceName: string;
    workspaceType: "company" | "department" | "client" | "project";
    connectors: string[];
  }) => void;
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
  "Other"
];

// 12 Departments from Guidelines (grouped by category)
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
    "IT/Technology",
  ],
  "Operations": [
    "Operations",
    "Supply Chain",
    "Service Operations",
    "Project Management",
  ],
  "Corporate": [
    "Finance/Accounting",
    "Legal",
    "HR/People",
  ],
};

const COMPANY_SIZES = [
  "Just me",
  "2-10 people",
  "11-50 people",
  "51-200 people",
  "201-500 people",
  "500+ people",
];

const PRIMARY_GOALS = [
  {
    id: "organize",
    label: "Organize knowledge",
    icon: Database,
    description: "Centralize and structure all company information"
  },
  {
    id: "insights",
    label: "Get insights",
    icon: Sparkles,
    description: "Discover patterns and opportunities from your data"
  },
  {
    id: "context",
    label: "Track context",
    icon: Target,
    description: "Keep full context across all projects and accounts"
  },
  {
    id: "team",
    label: "Improve team",
    icon: Users,
    description: "Enhance collaboration and team productivity"
  },
  {
    id: "automate",
    label: "Automate work",
    icon: Zap,
    description: "Streamline workflows and reduce manual tasks"
  },
];

export function OnboardingFlowV2({ onComplete }: OnboardingFlowV2Props) {
  const [step, setStep] = useState(0);
  
  // Step 1: Use Case
  const [useCase, setUseCase] = useState<"personal" | "work" | "business">("work");
  
  // Step 2: Domain (Industry + Department + Size)
  const [industry, setIndustry] = useState("");
  const [department, setDepartment] = useState("");
  const [companySize, setCompanySize] = useState("51-200 people");
  
  // Step 2.5: Schema Selection (NEW)
  const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
  const [schemaRecommendation, setSchemaRecommendation] = useState<SchemaRecommendation | null>(null);
  
  // Step 3: Goals & Workspace
  const [primaryGoal, setPrimaryGoal] = useState("organize");
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceType, setWorkspaceType] = useState<"company" | "department" | "client" | "project">("client");
  
  // Step 4: Connectors
  const [selectedConnectors, setSelectedConnectors] = useState<string[]>([]);

  const progress = ((step + 1) / 5) * 100; // Now 5 steps instead of 4

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      if (schemaRecommendation) {
        onComplete({
          useCase,
          industry,
          department,
          companySize,
          selectedEntities,
          schemaRecommendation,
          primaryGoal,
          workspaceName,
          workspaceType,
          connectors: selectedConnectors,
        });
      }
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return true; // Use case always selected
      case 1:
        return industry && department;
      case 2:
        return selectedEntities.length > 0; // Must select at least one entity
      case 3:
        return workspaceName.trim().length > 0;
      case 4:
        return true; // Can skip connectors
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
                <div className="text-[10px] text-muted-foreground">Knowledge Workspace</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Step {step + 1} of 5 <span className="ml-2 text-[10px]">~{Math.max(15, (5 - step) * 15)}s</span>
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
            {/* STEP 1: Use Case Selection */}
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
                  <LogoMark size={80} className="mx-auto mb-6" />
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">
                    Welcome to IntegrateWise
                  </h1>
                  <p className="text-muted-foreground">
                    Your adaptive knowledge operating system
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-center font-semibold mb-6">
                    How will you use IntegrateWise?
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        id: "personal" as const,
                        icon: Users,
                        label: "Personal",
                        description: "Organize personal work",
                        color: "from-purple-500 to-purple-600"
                      },
                      {
                        id: "work" as const,
                        icon: Briefcase,
                        label: "Work",
                        description: "Professional workflow",
                        color: "from-blue-500 to-blue-600"
                      },
                      {
                        id: "business" as const,
                        icon: Building2,
                        label: "Business",
                        description: "Company data & workflows",
                        color: "from-emerald-500 to-emerald-600"
                      },
                    ].map((option) => {
                      const Icon = option.icon;
                      const isSelected = useCase === option.id;
                      
                      return (
                        <button
                          key={option.id}
                          onClick={() => setUseCase(option.id)}
                          className={`
                            relative p-6 rounded-2xl border-2 transition-all duration-200
                            ${isSelected 
                              ? "border-[#3F5185] bg-[#3F5185]/5 shadow-lg scale-105" 
                              : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                            }
                          `}
                        >
                          <div className={`
                            w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4
                            bg-gradient-to-br ${option.color} text-white
                          `}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <h3 className="font-bold mb-1">{option.label}</h3>
                          <p className="text-sm text-muted-foreground">
                            {option.description}
                          </p>
                          
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-3 right-3"
                            >
                              <CheckCircle2 className="w-5 h-5 text-[#3F5185]" />
                            </motion.div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Button
                  onClick={handleNext}
                  className="w-full h-12 bg-gradient-to-r from-[#3F5185] to-[#4256AB] hover:opacity-90 transition-opacity"
                  size="lg"
                >
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )}

            {/* STEP 2: Tell us about yourself (Domain Configuration) */}
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
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">
                    Tell us about yourself
                  </h1>
                  <p className="text-muted-foreground">
                    This configures your adaptive Spine schema
                  </p>
                </div>

                {/* BFF Message */}
                <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-xl">
                  <div className="flex items-start gap-2 text-xs text-purple-700">
                    <Server className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">BFF upserts tenant_spine_config</span> in real-time as you make selections (industry + department + entities + schema)
                    </div>
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  {/* Industry */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Industry
                    </label>
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select..." />
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

                  {/* Department */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Department
                    </label>
                    <Select value={department} onValueChange={setDepartment}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select..." />
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

                  {/* Company Size */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Company Size
                    </label>
                    <Select value={companySize} onValueChange={setCompanySize}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {COMPANY_SIZES.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="h-12 px-8"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="flex-1 h-12 bg-gradient-to-r from-[#3F5185] to-[#4256AB] hover:opacity-90"
                  >
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={handleNext}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Skip for now
                  </button>
                </div>

                <div className="mt-8 text-center text-xs text-muted-foreground">
                  Optimized 4-screen flow (43% reduction from 7 screens) · ~3-4 min completion · L0 Onboarding
                </div>
              </motion.div>
            )}

            {/* STEP 2.5: Schema Selection (NEW) */}
            {step === 2 && (
              <motion.div
                key="step-2-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-xl border p-8 md:p-12"
              >
                <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">
                    Choose your schema
                  </h1>
                  <p className="text-muted-foreground">
                    Based on <strong>{industry} × {department}</strong>, select the data types you want to track
                  </p>
                </div>

                <SchemaSelector
                  industry={industry}
                  department={department}
                  onSelectionChange={(entities, recommendation) => {
                    setSelectedEntities(entities);
                    setSchemaRecommendation(recommendation);
                  }}
                />

                <div className="flex gap-3 mt-8">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="h-12 px-8"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="flex-1 h-12 bg-gradient-to-r from-[#3F5185] to-[#4256AB] hover:opacity-90"
                  >
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                <div className="mt-6 text-center text-xs text-muted-foreground">
                  Schema drives connector sync, UI modules, and intelligence signals
                </div>
              </motion.div>
            )}

            {/* STEP 3: Set Goals & Workspace */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-xl border p-8 md:p-12"
              >
                <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">
                    Set your goals & workspace
                  </h1>
                  <p className="text-muted-foreground">
                    Choose your primary goal and create your first workspace
                  </p>
                </div>

                {/* Primary Goal Selection */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">
                    What would you like help with first?
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {PRIMARY_GOALS.map((goal) => {
                      const Icon = goal.icon;
                      const isSelected = primaryGoal === goal.id;
                      
                      return (
                        <button
                          key={goal.id}
                          onClick={() => setPrimaryGoal(goal.id)}
                          className={`
                            relative p-4 rounded-xl border-2 transition-all duration-200
                            ${isSelected 
                              ? "border-[#3F5185] bg-[#3F5185]/5 shadow-md" 
                              : "border-gray-200 hover:border-gray-300"
                            }
                          `}
                        >
                          <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? "text-[#3F5185]" : "text-muted-foreground"}`} />
                          <div className="text-sm font-medium text-center">
                            {goal.label}
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-[#3F5185] absolute top-2 right-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Workspace Creation */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">
                    Create your first workspace
                  </h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">
                      Workspace Name
                    </label>
                    <Input
                      value={workspaceName}
                      onChange={(e) => setWorkspaceName(e.target.value)}
                      placeholder="Acme Corp"
                      className="h-12"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: "company" as const, label: "Company" },
                      { id: "department" as const, label: "Department" },
                      { id: "client" as const, label: "Client" },
                      { id: "project" as const, label: "Project" },
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setWorkspaceType(type.id)}
                        className={`
                          p-3 rounded-xl border-2 text-sm font-medium transition-all
                          ${workspaceType === type.id 
                            ? "border-[#3F5185] bg-[#3F5185]/5 text-[#3F5185]" 
                            : "border-gray-200 hover:border-gray-300"
                          }
                        `}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="h-12 px-8"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="flex-1 h-12 bg-gradient-to-r from-[#3F5185] to-[#4256AB] hover:opacity-90"
                  >
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Connect Data Sources */}
            {step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-xl border p-8 md:p-12"
              >
                <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">
                    Connect your data sources
                  </h1>
                  <p className="text-muted-foreground">
                    Select tools to integrate (you can add more later)
                  </p>
                </div>

                <ConnectorGrid
                  selectedConnectors={selectedConnectors}
                  onToggleConnector={(connectorId) => {
                    setSelectedConnectors(prev =>
                      prev.includes(connectorId)
                        ? prev.filter(id => id !== connectorId)
                        : [...prev, connectorId]
                    );
                  }}
                />

                {selectedConnectors.length > 0 && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-center gap-2 text-sm text-blue-700">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>
                        <strong>{selectedConnectors.length} connectors selected</strong> — OAuth authentication and initial sync will begin after setup
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-8">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="h-12 px-8"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="flex-1 h-12 bg-gradient-to-r from-[#F54476] to-[#EE4B75] hover:opacity-90"
                  >
                    Launch Workspace <TrendingUp className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={handleNext}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Skip — I'll connect tools later
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}