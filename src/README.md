# IntegrateWise OS

**Universal Cognitive Operating System — AI Thinks in Context & Waits for Approval**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8.svg)](https://tailwindcss.com/)

---

## 🌟 What is IntegrateWise?

IntegrateWise is a **Knowledge Workspace empowered by AI and the Spine** — the unified intelligence layer that connects tools, context, and decisions.

**The Spine (SSOT)** is the single source of truth and unified intelligence layer that adapts to your business.

### Core Promise

> **AI becomes useful only when it runs on connected truth.**

IntegrateWise gives teams:
- ✅ One connected view of the business
- ✅ One adaptive model across tools
- ✅ One place for signals, proposals, approvals, and action

---

## 🎯 Key Features

### 📊 **The Spine — Unified Intelligence Layer**
- Single source of truth across all connected systems
- Adaptive schema that grows with your business
- Identity layer across all tools
- Memory layer across time

### 🧠 **L2 Cognitive Layer (Universal AI)**
- Context-aware AI accessible via ⌘J from anywhere
- Entity 360 view (Spine + Knowledge + Signals)
- AI Twin Agent — one intelligent assistant
- Human-in-the-loop (HITL) approval gates

### 🏢 **L1 Workspace Layer (12 Department Contexts)**
- Customer Success (CTX_CS)
- Sales (CTX_SALES)
- Revenue Operations (CTX_REVOPS)
- Product Management (CTX_PRODUCT)
- Marketing (CTX_MARKETING)
- Support (CTX_SUPPORT)
- Engineering (CTX_TECH)
- HR (CTX_HR)
- Finance (CTX_FINANCE)
- Legal (CTX_LEGAL)
- Supply Chain (CTX_SUPPLY_CHAIN)
- Service Operations (CTX_SERVICE_OPS)

### 🔄 **Three Data Flows**
- **Flow A:** Structured data (CRM, billing, support)
- **Flow B:** Unstructured data (docs, mail, PDFs)
- **Flow C:** AI-generated content (chat, MCP, Slack)

### 🎨 **12 × 11 Model**
- **12 Departments** × **11 Industries** = 132 domain-specific configurations
- Adaptive schema based on department + industry selection
- Industry-specific entities and workflows

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/NirmalPrinceJ/integratewise-live.git

# Navigate to directory
cd integratewise-live

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🏗️ Project Structure

```
integratewise-live/
├── src/
│   ├── App.tsx                    # Main application entry
│   ├── components/
│   │   ├── onboarding/            # 5-step onboarding flow
│   │   │   ├── onboarding-flow-v2.tsx
│   │   │   ├── schema-selector.tsx
│   │   │   ├── schema-registry.ts
│   │   │   └── oauth-handler.ts
│   │   ├── workspace/             # L1 workspace shells
│   │   ├── cognitive/             # L2 intelligence layer
│   │   ├── landing/               # Marketing site
│   │   └── ui/                    # shadcn/ui components
│   ├── styles/
│   │   └── globals.css            # Tailwind + design tokens
│   └── ...
│
├── design-tokens/                 # Design system tokens
│   ├── tokens.json                # W3C standard format
│   ├── tokens.ts                  # TypeScript constants
│   ├── tokens.css                 # CSS custom properties
│   ├── figma-tokens.json          # Figma integration
│   └── README.md                  # Token documentation
│
├── imports/                       # Architecture docs
│   ├── FINAL_ARCHITECTURE_SUMMARY.md
│   ├── FULL_DATA_FLOW_SPEC.md
│   └── ...
│
├── Guidelines.md                  # Development guidelines v3.7
├── TESTING_GUIDE.md              # Testing instructions
├── package.json
└── README.md                     # This file
```

---

## 🎨 Design System

Complete design tokens exported in 4 formats:
- **JSON** (W3C standard)
- **TypeScript** (type-safe)
- **CSS** (custom properties)
- **Figma Tokens** (design-code sync)

See `/design-tokens/README.md` for complete documentation.

### Brand Colors
```
Primary:  #3F5185  (Navy Blue)
Accent:   #F54476  (Pink/Magenta)
Success:  #00C853  (Emerald)
Warning:  #FF9800  (Amber)
```

---

## 🧪 Development

### Running Tests
```bash
# Run tests (when implemented)
npm test

# Run linter
npm run lint

# Type checking
npm run type-check
```

### Testing Onboarding Flow

**Authentication is currently DISABLED for testing.**

1. Navigate to: `http://localhost:5173/#app`
2. You'll go directly to the 5-step onboarding flow
3. Test different industry × department combinations
4. See `/TESTING_GUIDE.md` for complete testing scenarios

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

---

## 🏗️ Architecture

### Eight-Layer Architecture

1. **Experience Layer** → UI, user intent
2. **Gateway / Edge Layer** → JWT, routing, rate limiting
3. **Workspace Runtime** → Orchestration, approvals, HITL
4. **External Connectivity** → Connectors, OAuth, webhooks
5. **Data Plane** → Queues, pipeline, normalizer
6. **SSOT / Spine** → Canonical entities (Supabase)
7. **Cognitive Layer** → Think, Govern, Act
8. **AI Providers** → OpenRouter, OpenAI

### The Engine Loop

```
LOAD → NORMALIZE → STORE → THINK → REVIEW & APPROVE → ACT → REPEAT
```

See `/imports/FINAL_ARCHITECTURE_SUMMARY.md` for complete details.

---

## 🔗 Integrations

### Supported Connectors (50+)

**Flow A (Structured Data):**
- Salesforce, HubSpot, Pipedrive
- Zendesk, Intercom, Freshdesk
- Jira, Linear, Asana
- Stripe, QuickBooks, Xero
- PostgreSQL, MySQL, MongoDB

**Flow B (Unstructured Data):**
- Notion, Confluence, SharePoint
- Google Drive, Dropbox, Box
- Gmail, Outlook, Slack
- OneDrive, Teams

**Flow C (AI Chats):**
- ChatGPT, Claude, Gemini
- Custom MCP servers
- Slack AI, Teams AI

---

## 📚 Documentation

- **Guidelines:** `/Guidelines.md` (v3.7) — Development standards
- **Architecture:** `/imports/FINAL_ARCHITECTURE_SUMMARY.md`
- **Data Flows:** `/imports/FULL_DATA_FLOW_SPEC.md`
- **Design Tokens:** `/design-tokens/README.md`
- **Testing:** `/TESTING_GUIDE.md`
- **Onboarding:** `/components/onboarding/README.md`

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel:
1. Go to https://vercel.com
2. Import `NirmalPrinceJ/integratewise-live`
3. Configure build settings (auto-detected for Vite)
4. Deploy!

### Deploy to Netlify

1. Go to https://netlify.com
2. Import from GitHub
3. Build settings:
   ```
   Build command: npm run build
   Publish directory: dist
   ```
4. Deploy!

### Environment Variables

Create `.env` file:

```env
# Supabase (when implemented)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key

# API URLs
VITE_API_BASE_URL=your_api_url

# Feature Flags
VITE_ENABLE_AUTH=false  # Currently disabled for testing
```

---

## 🤝 Contributing

We welcome contributions! Please see `CONTRIBUTING.md` for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow the Guidelines.md (v3.7)
- Use TypeScript for all new code
- Follow existing component patterns
- No Tailwind font classes unless specifically needed
- 4px spacing grid system
- Test in both light and dark modes

---

## 📋 Roadmap

### Phase 1: Foundation (✅ Complete)
- [x] Marketing site
- [x] 6-step onboarding flow
- [x] Workspace shell
- [x] Design system & tokens
- [x] Schema-driven architecture

### Phase 2: Connectors (🚧 In Progress)
- [ ] Real OAuth for all 50+ connectors
- [ ] Creamy → Needed → Delta sync phases
- [ ] Webhook integration
- [ ] Background sync jobs

### Phase 3: Intelligence (⏳ Planned)
- [ ] Entity 360 views
- [ ] AI Twin implementation
- [ ] HITL approval workflows
- [ ] Signal detection

### Phase 4: Production (⏳ Planned)
- [ ] Multi-tenant deployment
- [ ] Advanced analytics
- [ ] Mobile responsiveness
- [ ] Performance optimization

---

## 🛡️ What IntegrateWise Is NOT

❌ Not a CRM replacement  
❌ Not a BI dashboard  
❌ Not an ETL or migration product  
❌ Not a generic AI copilot  
❌ Not a chatbot layered on partial context  

**IntegrateWise is a Knowledge Workspace** where AI operates on connected truth.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Design System:** shadcn/ui
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS v4
- **Animation:** Motion (Framer Motion)
- **Icons:** Lucide React
- **Database:** Supabase (planned)

---

## 📞 Support

- **Documentation:** See `/imports/` directory
- **Issues:** [GitHub Issues](https://github.com/NirmalPrinceJ/integratewise-live/issues)
- **Discussions:** [GitHub Discussions](https://github.com/NirmalPrinceJ/integratewise-live/discussions)

---

## 🌟 Star This Repo

If you find IntegrateWise useful, please give it a ⭐️ on GitHub!

---

**IntegrateWise** — Where AI Thinks in Context and Waits for Approval

*Last Updated: March 21, 2026 | Version: 3.7*
