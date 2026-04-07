/**
 * Schema Registry for IntegrateWise 12×11 Model
 * 
 * Maps Industry (Resource Type) × Department (Trait) to available entities
 * This drives:
 * - Spine schema configuration
 * - Connector recommendations
 * - UI module activation
 * - Entity 360 views
 * - Intelligence signals
 */

export interface EntityDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "core" | "extended" | "industry-specific";
  recommended: boolean;
  requiredFor?: string[]; // Which other entities depend on this
  fields?: string[]; // Key fields for preview
}

export interface SchemaRecommendation {
  entities: EntityDefinition[];
  connectors: string[]; // Recommended connector IDs
  modules: string[]; // UI modules to activate
  northStar: string; // Primary metric focus
}

// Core entities available across all combinations
const CORE_ENTITIES: EntityDefinition[] = [
  {
    id: "accounts",
    name: "Accounts",
    description: "Companies/Organizations",
    icon: "🏢",
    category: "core",
    recommended: true,
    fields: ["name", "industry", "revenue", "status"],
  },
  {
    id: "contacts",
    name: "Contacts",
    description: "People/Relationships",
    icon: "👤",
    category: "core",
    recommended: true,
    fields: ["name", "email", "title", "account"],
  },
  {
    id: "activities",
    name: "Activities",
    description: "Emails, Calls, Meetings",
    icon: "📅",
    category: "core",
    recommended: true,
    fields: ["type", "subject", "date", "participants"],
  },
  {
    id: "tasks",
    name: "Tasks",
    description: "To-dos and Action Items",
    icon: "✓",
    category: "core",
    recommended: true,
    fields: ["title", "status", "due_date", "assignee"],
  },
  {
    id: "documents",
    name: "Documents",
    description: "Files and Knowledge",
    icon: "📄",
    category: "core",
    recommended: true,
    fields: ["title", "type", "url", "created_date"],
  },
];

// Department-specific entities (Traits)
const DEPARTMENT_ENTITIES: Record<string, EntityDefinition[]> = {
  // Sales
  "Sales": [
    {
      id: "deals",
      name: "Deals/Opportunities",
      description: "Sales pipeline",
      icon: "💰",
      category: "core",
      recommended: true,
      fields: ["name", "amount", "stage", "close_date"],
    },
    {
      id: "quotes",
      name: "Quotes",
      description: "Proposals and Pricing",
      icon: "📋",
      category: "extended",
      recommended: false,
      fields: ["quote_number", "amount", "status", "deal"],
    },
    {
      id: "leads",
      name: "Leads",
      description: "Unqualified prospects",
      icon: "🎯",
      category: "core",
      recommended: true,
      fields: ["name", "source", "status", "score"],
    },
  ],
  
  // Marketing
  "Marketing": [
    {
      id: "campaigns",
      name: "Campaigns",
      description: "Marketing initiatives",
      icon: "📣",
      category: "core",
      recommended: true,
      fields: ["name", "type", "status", "budget"],
    },
    {
      id: "leads",
      name: "Leads",
      description: "Marketing qualified leads",
      icon: "🎯",
      category: "core",
      recommended: true,
      fields: ["name", "source", "status", "score"],
    },
    {
      id: "events",
      name: "Events",
      description: "User behavior events",
      icon: "📊",
      category: "extended",
      recommended: false,
      fields: ["event_name", "user", "timestamp", "properties"],
    },
  ],
  
  // Customer Success
  "Customer Success": [
    {
      id: "accounts",
      name: "Customer Accounts",
      description: "Active customers",
      icon: "🏢",
      category: "core",
      recommended: true,
      requiredFor: ["health_scores", "renewals"],
      fields: ["name", "arr", "health_score", "csm"],
    },
    {
      id: "health_scores",
      name: "Health Scores",
      description: "Account health metrics",
      icon: "💚",
      category: "core",
      recommended: true,
      fields: ["account", "score", "trend", "factors"],
    },
    {
      id: "renewals",
      name: "Renewals",
      description: "Contract renewals",
      icon: "🔄",
      category: "core",
      recommended: true,
      fields: ["account", "renewal_date", "arr", "risk"],
    },
    {
      id: "tickets",
      name: "Support Tickets",
      description: "Customer issues",
      icon: "🎫",
      category: "extended",
      recommended: false,
      fields: ["ticket_id", "account", "status", "priority"],
    },
    {
      id: "usage_metrics",
      name: "Product Usage",
      description: "Feature adoption",
      icon: "📈",
      category: "extended",
      recommended: true,
      fields: ["account", "dau", "feature", "engagement"],
    },
  ],
  
  // RevOps
  "RevOps": [
    {
      id: "deals",
      name: "Pipeline",
      description: "Revenue pipeline",
      icon: "💰",
      category: "core",
      recommended: true,
      fields: ["name", "amount", "stage", "close_date"],
    },
    {
      id: "forecasts",
      name: "Forecasts",
      description: "Revenue forecasting",
      icon: "📊",
      category: "core",
      recommended: true,
      fields: ["period", "commit", "pipeline", "closed"],
    },
    {
      id: "attribution",
      name: "Attribution",
      description: "Touch point tracking",
      icon: "🔗",
      category: "extended",
      recommended: false,
      fields: ["contact", "campaign", "deal", "influence"],
    },
    {
      id: "data_quality",
      name: "Data Quality Metrics",
      description: "Spine health monitoring",
      icon: "🎯",
      category: "core",
      recommended: true,
      fields: ["entity", "completeness", "accuracy", "freshness"],
    },
  ],
  
  // Engineering
  "Engineering": [
    {
      id: "issues",
      name: "Issues",
      description: "Bugs and tasks",
      icon: "🐛",
      category: "core",
      recommended: true,
      fields: ["key", "title", "status", "assignee"],
    },
    {
      id: "pull_requests",
      name: "Pull Requests",
      description: "Code reviews",
      icon: "🔀",
      category: "core",
      recommended: true,
      fields: ["title", "author", "status", "repo"],
    },
    {
      id: "deployments",
      name: "Deployments",
      description: "Release tracking",
      icon: "🚀",
      category: "extended",
      recommended: false,
      fields: ["version", "environment", "status", "timestamp"],
    },
    {
      id: "incidents",
      name: "Incidents",
      description: "Production issues",
      icon: "🚨",
      category: "extended",
      recommended: false,
      fields: ["title", "severity", "status", "resolved_at"],
    },
  ],
  
  // Product Management
  "Product Management": [
    {
      id: "features",
      name: "Features",
      description: "Product features",
      icon: "✨",
      category: "core",
      recommended: true,
      fields: ["name", "status", "priority", "release"],
    },
    {
      id: "feedback",
      name: "Customer Feedback",
      description: "User requests",
      icon: "💬",
      category: "core",
      recommended: true,
      fields: ["title", "customer", "votes", "status"],
    },
    {
      id: "roadmap_items",
      name: "Roadmap",
      description: "Strategic initiatives",
      icon: "🗺️",
      category: "core",
      recommended: true,
      fields: ["title", "quarter", "status", "owner"],
    },
  ],
  
  // Finance/Accounting
  "Finance/Accounting": [
    {
      id: "invoices",
      name: "Invoices",
      description: "Billing documents",
      icon: "🧾",
      category: "core",
      recommended: true,
      fields: ["number", "customer", "amount", "status"],
    },
    {
      id: "payments",
      name: "Payments",
      description: "Received payments",
      icon: "💳",
      category: "core",
      recommended: true,
      fields: ["amount", "invoice", "date", "method"],
    },
    {
      id: "subscriptions",
      name: "Subscriptions",
      description: "Recurring revenue",
      icon: "🔄",
      category: "core",
      recommended: true,
      fields: ["customer", "mrr", "status", "renewal_date"],
    },
    {
      id: "expenses",
      name: "Expenses",
      description: "Company spending",
      icon: "💸",
      category: "extended",
      recommended: false,
      fields: ["amount", "category", "date", "vendor"],
    },
  ],
  
  // HR/People
  "HR/People": [
    {
      id: "employees",
      name: "Employees",
      description: "Team members",
      icon: "👥",
      category: "core",
      recommended: true,
      fields: ["name", "department", "role", "start_date"],
    },
    {
      id: "candidates",
      name: "Candidates",
      description: "Hiring pipeline",
      icon: "🎯",
      category: "core",
      recommended: true,
      fields: ["name", "position", "stage", "score"],
    },
    {
      id: "performance_reviews",
      name: "Performance Reviews",
      description: "Employee evaluations",
      icon: "⭐",
      category: "extended",
      recommended: false,
      fields: ["employee", "period", "rating", "goals"],
    },
  ],
  
  // Legal
  "Legal": [
    {
      id: "contracts",
      name: "Contracts",
      description: "Legal agreements",
      icon: "📜",
      category: "core",
      recommended: true,
      fields: ["title", "party", "value", "expiry_date"],
    },
    {
      id: "compliance_items",
      name: "Compliance",
      description: "Regulatory tracking",
      icon: "✓",
      category: "core",
      recommended: true,
      fields: ["regulation", "status", "due_date", "owner"],
    },
  ],
  
  // Supply Chain
  "Supply Chain": [
    {
      id: "inventory_items",
      name: "Inventory",
      description: "Stock items",
      icon: "📦",
      category: "core",
      recommended: true,
      fields: ["sku", "quantity", "location", "value"],
    },
    {
      id: "purchase_orders",
      name: "Purchase Orders",
      description: "Procurement",
      icon: "🛒",
      category: "core",
      recommended: true,
      fields: ["po_number", "vendor", "amount", "status"],
    },
    {
      id: "shipments",
      name: "Shipments",
      description: "Logistics tracking",
      icon: "🚚",
      category: "extended",
      recommended: false,
      fields: ["tracking", "destination", "status", "eta"],
    },
  ],
  
  // Operations
  "Operations": [
    {
      id: "projects",
      name: "Projects",
      description: "Initiatives",
      icon: "📁",
      category: "core",
      recommended: true,
      fields: ["name", "status", "budget", "deadline"],
    },
    {
      id: "workflows",
      name: "Workflows",
      description: "Process automation",
      icon: "⚙️",
      category: "extended",
      recommended: false,
      fields: ["name", "trigger", "status", "runs"],
    },
  ],
  
  // Service Operations
  "Service Operations": [
    {
      id: "service_requests",
      name: "Service Requests",
      description: "Customer requests",
      icon: "🎫",
      category: "core",
      recommended: true,
      fields: ["request_id", "customer", "type", "status"],
    },
    {
      id: "sla_metrics",
      name: "SLA Metrics",
      description: "Service levels",
      icon: "⏱️",
      category: "core",
      recommended: true,
      fields: ["metric", "target", "actual", "compliance"],
    },
  ],
};

// Industry-specific entities (Resource Types)
const INDUSTRY_ENTITIES: Record<string, EntityDefinition[]> = {
  "Healthcare": [
    {
      id: "patients",
      name: "Patients",
      description: "Patient records",
      icon: "🏥",
      category: "industry-specific",
      recommended: true,
      fields: ["name", "mrn", "dob", "provider"],
    },
    {
      id: "providers",
      name: "Healthcare Providers",
      description: "Doctors, clinics",
      icon: "👨‍⚕️",
      category: "industry-specific",
      recommended: true,
      fields: ["name", "specialty", "npi", "location"],
    },
    {
      id: "claims",
      name: "Insurance Claims",
      description: "Billing claims",
      icon: "📋",
      category: "industry-specific",
      recommended: false,
      fields: ["claim_id", "patient", "amount", "status"],
    },
  ],
  
  "Technology / SaaS": [
    {
      id: "features",
      name: "Product Features",
      description: "Platform capabilities",
      icon: "✨",
      category: "industry-specific",
      recommended: true,
      fields: ["name", "adoption_rate", "status", "category"],
    },
    {
      id: "usage_events",
      name: "Usage Events",
      description: "Product analytics",
      icon: "📊",
      category: "industry-specific",
      recommended: true,
      fields: ["event", "user", "timestamp", "properties"],
    },
    {
      id: "api_usage",
      name: "API Usage",
      description: "API consumption",
      icon: "🔌",
      category: "industry-specific",
      recommended: false,
      fields: ["endpoint", "calls", "latency", "errors"],
    },
  ],
  
  "Financial Services": [
    {
      id: "transactions",
      name: "Transactions",
      description: "Financial transactions",
      icon: "💳",
      category: "industry-specific",
      recommended: true,
      fields: ["txn_id", "amount", "type", "timestamp"],
    },
    {
      id: "portfolios",
      name: "Portfolios",
      description: "Investment portfolios",
      icon: "📈",
      category: "industry-specific",
      recommended: false,
      fields: ["name", "value", "performance", "risk"],
    },
    {
      id: "compliance_records",
      name: "Compliance Records",
      description: "Regulatory compliance",
      icon: "✓",
      category: "industry-specific",
      recommended: true,
      fields: ["regulation", "status", "audit_date", "result"],
    },
  ],
  
  "Automotive / Mobility": [
    {
      id: "vehicles",
      name: "Vehicles",
      description: "Fleet/inventory",
      icon: "🚗",
      category: "industry-specific",
      recommended: true,
      fields: ["vin", "make", "model", "status"],
    },
    {
      id: "service_appointments",
      name: "Service Appointments",
      description: "Maintenance schedules",
      icon: "🔧",
      category: "industry-specific",
      recommended: true,
      fields: ["vehicle", "type", "date", "status"],
    },
  ],
  
  "Retail / E-commerce": [
    {
      id: "products",
      name: "Products",
      description: "Catalog items",
      icon: "🛍️",
      category: "industry-specific",
      recommended: true,
      fields: ["sku", "name", "price", "inventory"],
    },
    {
      id: "orders",
      name: "Orders",
      description: "Customer orders",
      icon: "📦",
      category: "industry-specific",
      recommended: true,
      fields: ["order_id", "customer", "total", "status"],
    },
    {
      id: "returns",
      name: "Returns",
      description: "Product returns",
      icon: "↩️",
      category: "industry-specific",
      recommended: false,
      fields: ["return_id", "order", "reason", "status"],
    },
  ],
  
  "Manufacturing": [
    {
      id: "production_runs",
      name: "Production Runs",
      description: "Manufacturing batches",
      icon: "🏭",
      category: "industry-specific",
      recommended: true,
      fields: ["run_id", "product", "quantity", "status"],
    },
    {
      id: "quality_checks",
      name: "Quality Checks",
      description: "QA inspections",
      icon: "✓",
      category: "industry-specific",
      recommended: true,
      fields: ["check_id", "batch", "result", "inspector"],
    },
  ],
  
  "Education": [
    {
      id: "students",
      name: "Students",
      description: "Enrolled learners",
      icon: "🎓",
      category: "industry-specific",
      recommended: true,
      fields: ["student_id", "name", "program", "status"],
    },
    {
      id: "courses",
      name: "Courses",
      description: "Course catalog",
      icon: "📚",
      category: "industry-specific",
      recommended: true,
      fields: ["course_id", "title", "instructor", "enrollment"],
    },
  ],
  
  "Professional Services": [
    {
      id: "engagements",
      name: "Client Engagements",
      description: "Service projects",
      icon: "💼",
      category: "industry-specific",
      recommended: true,
      fields: ["name", "client", "value", "status"],
    },
    {
      id: "timesheets",
      name: "Timesheets",
      description: "Billable hours",
      icon: "⏰",
      category: "industry-specific",
      recommended: true,
      fields: ["consultant", "engagement", "hours", "rate"],
    },
  ],
};

/**
 * Get schema recommendation based on Industry + Department
 */
export function getSchemaRecommendation(
  industry: string,
  department: string
): SchemaRecommendation {
  const entities: EntityDefinition[] = [
    ...CORE_ENTITIES,
    ...(DEPARTMENT_ENTITIES[department] || []),
    ...(INDUSTRY_ENTITIES[industry] || []),
  ];

  // Remove duplicates (prefer department-specific over core)
  const uniqueEntities = entities.reduce((acc, entity) => {
    const existing = acc.find(e => e.id === entity.id);
    if (!existing) {
      acc.push(entity);
    } else if (entity.category !== "core" && existing.category === "core") {
      // Replace core with more specific version
      const index = acc.indexOf(existing);
      acc[index] = entity;
    }
    return acc;
  }, [] as EntityDefinition[]);

  // Get connector recommendations based on industry + department
  const connectors = getRecommendedConnectors(industry, department);

  // Get UI modules to activate
  const modules = getRecommendedModules(department);

  // Get north star metric
  const northStar = getNorthStarMetric(industry, department);

  return {
    entities: uniqueEntities,
    connectors,
    modules,
    northStar,
  };
}

/**
 * Get recommended connectors based on schema
 */
function getRecommendedConnectors(industry: string, department: string): string[] {
  const recommendations: Record<string, string[]> = {
    // Department-based
    "Sales": ["salesforce", "hubspot", "linkedin"],
    "Marketing": ["hubspot", "google-analytics", "mailchimp"],
    "Customer Success": ["zendesk", "intercom", "gainsight"],
    "RevOps": ["salesforce", "hubspot", "stripe"],
    "Engineering": ["jira", "github", "linear"],
    "Product Management": ["jira", "productboard", "amplitude"],
    "Finance/Accounting": ["stripe", "quickbooks", "netsuite"],
    "HR/People": ["bamboohr", "greenhouse", "lever"],
    
    // Industry-based
    "Healthcare": ["epic", "cerner", "athenahealth"],
    "Technology / SaaS": ["stripe", "mixpanel", "segment"],
    "Financial Services": ["plaid", "stripe", "quickbooks"],
    "Retail / E-commerce": ["shopify", "amazon", "square"],
  };

  const deptConnectors = recommendations[department] || [];
  const industryConnectors = recommendations[industry] || [];

  return [...new Set([...deptConnectors, ...industryConnectors])];
}

/**
 * Get recommended UI modules based on department
 */
function getRecommendedModules(department: string): string[] {
  const moduleMap: Record<string, string[]> = {
    "Sales": ["pipeline", "deals", "forecasting", "activities"],
    "Marketing": ["campaigns", "analytics", "email-studio", "attribution"],
    "Customer Success": ["health-scores", "renewals", "playbooks", "success-plans"],
    "RevOps": ["data-quality", "attribution", "forecasting", "routing"],
    "Engineering": ["issues", "sprints", "deployments", "incidents"],
    "Product Management": ["roadmap", "feedback", "features", "analytics"],
    "Finance/Accounting": ["invoices", "payments", "revenue-recognition"],
    "HR/People": ["employees", "recruiting", "performance"],
    "Operations": ["projects", "workflows", "tasks"],
  };

  return moduleMap[department] || ["dashboard", "tasks", "documents"];
}

/**
 * Get north star metric based on industry + department
 */
function getNorthStarMetric(industry: string, department: string): string {
  // Product-based industries
  if (industry === "Technology / SaaS") {
    if (department === "Sales") return "ARR Growth";
    if (department === "Customer Success") return "Net Revenue Retention";
    if (department === "Product Management") return "DAU/MAU Ratio";
    if (department === "Engineering") return "Deployment Frequency";
    return "ARR";
  }

  // Services-based industries
  if (industry === "Professional Services") {
    if (department === "Sales") return "Revenue per Engagement";
    if (department === "Customer Success") return "Client Outcome Score";
    return "Billable Utilization";
  }

  // Default by department
  const defaults: Record<string, string> = {
    "Sales": "Pipeline Value",
    "Marketing": "Lead Generation",
    "Customer Success": "Customer Health",
    "RevOps": "Revenue Efficiency",
    "Engineering": "Sprint Velocity",
    "Finance/Accounting": "Revenue",
  };

  return defaults[department] || "Business Growth";
}
