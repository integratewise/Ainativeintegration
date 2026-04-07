# Contributing to IntegrateWise

Thank you for your interest in contributing to IntegrateWise! This document provides guidelines and instructions for contributing.

---

## 🌟 Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please:
- Be respectful and considerate
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- A GitHub account
- Familiarity with React, TypeScript, and Tailwind CSS

### Development Setup

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub, then:
   git clone https://github.com/YOUR_USERNAME/integratewise-live.git
   cd integratewise-live
   ```

2. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/NirmalPrinceJ/integratewise-live.git
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open the app**
   - Navigate to `http://localhost:5173/#app`
   - Authentication is disabled for testing

---

## 📋 Development Guidelines

### Follow the Guidelines.md

All contributions must follow **IntegrateWise Guidelines v3.7** located at `/Guidelines.md`.

Key rules:
- ✅ Use design tokens from `/design-tokens/`
- ✅ Follow the 8-layer architecture
- ✅ Respect data flow boundaries (Flow A, B, C)
- ✅ No AI content writes directly to Spine
- ✅ HITL approval gates for all AI actions
- ❌ No Tailwind font classes unless specifically needed
- ❌ No hardcoded colors (use tokens)
- ❌ No bypassing the pipeline for data ingestion

### Code Standards

**TypeScript:**
```typescript
// ✅ DO: Use explicit types
interface UserData {
  name: string;
  role: string;
}

// ❌ DON'T: Use 'any'
const data: any = {...};
```

**React Components:**
```typescript
// ✅ DO: Use functional components with TypeScript
export function MyComponent({ title }: { title: string }) {
  return <div>{title}</div>;
}

// ❌ DON'T: Use class components
export class MyComponent extends React.Component {...}
```

**Naming Conventions:**
- Components: `PascalCase` (e.g., `OnboardingFlow.tsx`)
- Files: `kebab-case` (e.g., `schema-selector.tsx`)
- Functions: `camelCase` (e.g., `handleSubmit`)
- Constants: `SCREAMING_SNAKE_CASE` (e.g., `API_BASE_URL`)

**Styling:**
```jsx
// ✅ DO: Use design tokens
import { colors, spacing } from '@/design-tokens/tokens';

<div style={{ 
  backgroundColor: colors.brand.primary,
  padding: spacing[6]
}}>

// ❌ DON'T: Hardcode values
<div style={{ backgroundColor: '#3F5185', padding: '24px' }}>
```

### File Organization

Place files in the correct directory:

```
/components/
  /onboarding/        # Onboarding flow components
  /workspace/         # L1 workspace components
  /cognitive/         # L2 intelligence components
  /landing/           # Marketing site components
  /ui/                # Shared UI components (shadcn/ui)

/design-tokens/       # Design system tokens
/imports/             # Architecture documentation
/styles/              # Global styles
```

---

## 🔄 Contribution Workflow

### 1. Create a Branch

```bash
# Update your fork
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

**Branch naming:**
- `feature/` — New features
- `fix/` — Bug fixes
- `docs/` — Documentation updates
- `refactor/` — Code refactoring
- `test/` — Test additions/updates
- `chore/` — Build/tooling updates

### 2. Make Your Changes

**Before coding:**
- [ ] Read relevant documentation in `/imports/`
- [ ] Check existing components for patterns
- [ ] Review design tokens in `/design-tokens/`
- [ ] Understand the architecture layer you're working in

**While coding:**
- [ ] Follow TypeScript best practices
- [ ] Use design tokens (no hardcoded values)
- [ ] Add comments for complex logic
- [ ] Keep components small and focused
- [ ] Test in both light and dark modes
- [ ] Ensure responsive design (mobile + desktop)

**After coding:**
- [ ] Run type checking: `npm run type-check`
- [ ] Run linter: `npm run lint`
- [ ] Test the feature manually
- [ ] Verify no console errors
- [ ] Test edge cases

### 3. Commit Your Changes

Use conventional commit messages:

```bash
# Format: <type>(<scope>): <subject>

git commit -m "feat(onboarding): add schema selector component"
git commit -m "fix(workspace): resolve navigation bug"
git commit -m "docs(readme): update installation instructions"
git commit -m "refactor(tokens): consolidate color definitions"
```

**Commit types:**
- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation
- `style:` — Formatting (no code change)
- `refactor:` — Code refactoring
- `test:` — Adding tests
- `chore:` — Build/tooling
- `perf:` — Performance improvement

**Commit message rules:**
- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- Limit first line to 72 characters
- Reference issues/PRs when relevant

### 4. Push Your Changes

```bash
git push origin feature/your-feature-name
```

### 5. Create a Pull Request

1. Go to your fork on GitHub
2. Click "Compare & pull request"
3. Fill out the PR template (see below)
4. Link related issues
5. Request review

---

## 📝 Pull Request Guidelines

### PR Title Format

```
[Type] Short description (#issue)

Examples:
[Feature] Add schema-driven onboarding flow (#123)
[Fix] Resolve workspace navigation bug (#456)
[Docs] Update architecture documentation
```

### PR Description Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Refactoring (no functional changes)

## Related Issues
Closes #123

## Changes Made
- Changed X to Y
- Added Z component
- Refactored A module

## Screenshots (if applicable)
[Add screenshots here]

## Testing
- [ ] Tested locally
- [ ] Tested in production build
- [ ] Tested responsive design
- [ ] Tested in both light/dark modes
- [ ] No console errors
- [ ] No TypeScript errors

## Checklist
- [ ] Code follows Guidelines.md (v3.7)
- [ ] Used design tokens (no hardcoded values)
- [ ] Added/updated documentation
- [ ] Self-reviewed code
- [ ] No new warnings
- [ ] Passes type checking
- [ ] Passes linting
```

### PR Review Process

1. **Automated checks** run (type checking, linting)
2. **Maintainer review** (usually within 48 hours)
3. **Address feedback** if requested
4. **Approval** from at least one maintainer
5. **Merge** into main branch

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Feature works as expected
- [ ] No console errors or warnings
- [ ] Responsive on mobile (375px+)
- [ ] Responsive on tablet (768px+)
- [ ] Responsive on desktop (1024px+)
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Light mode looks correct
- [ ] Dark mode looks correct (if implemented)
- [ ] Loading states display correctly
- [ ] Error states display correctly
- [ ] Empty states display correctly

### Testing the Onboarding Flow

See `/TESTING_GUIDE.md` for complete testing scenarios.

**Quick test:**
1. Navigate to `/#app`
2. Complete all 5 onboarding steps
3. Try different industry × department combinations
4. Verify schema changes based on selection
5. Check console for errors

---

## 🎨 Design System

### Using Design Tokens

**✅ CORRECT:**
```typescript
import { colors, spacing } from '@/design-tokens/tokens';

<button style={{
  backgroundColor: colors.brand.primary,
  padding: `${spacing[3]} ${spacing[6]}`,
}}>
```

**❌ INCORRECT:**
```typescript
<button style={{
  backgroundColor: '#3F5185',
  padding: '12px 24px',
}}>
```

### Color Usage

```typescript
// Brand
colors.brand.primary        // #3F5185
colors.brand.accent         // #F54476

// Semantic
colors.semantic.success     // #00C853
colors.semantic.warning     // #FF9800
colors.semantic.danger      // #F54476

// Flows
colors.flow.a              // #3F5185 (Blue - Structured)
colors.flow.b              // #7B5EA7 (Purple - Unstructured)
colors.flow.c              // #00C853 (Emerald - AI)
```

See `/design-tokens/README.md` for complete documentation.

---

## 📐 Architecture Guidelines

### Respect Layer Boundaries

**8 Layers (in order):**
1. Experience Layer
2. Gateway / Edge Layer
3. Workspace Runtime
4. External Connectivity
5. Data Plane
6. SSOT / Spine
7. Cognitive Layer
8. AI Providers

**Rules:**
- ✅ Higher layers can call lower layers
- ❌ Lower layers should NOT call higher layers
- ✅ Use the pipeline for all data ingestion
- ❌ Never write directly to Spine from AI (Flow C)

### Data Flow Boundaries

**Flow A (Structured Data):**
- CRM, databases, billing systems
- Goes through: Connector → Pipeline → Spine

**Flow B (Unstructured Data):**
- Documents, emails, PDFs
- Goes through: Connector → Pipeline → Spine + Knowledge

**Flow C (AI-Generated):**
- Chat, MCP, Slack AI
- Goes through: D1 → Triage → Approval → Compounding Space
- ❌ NEVER writes directly to Spine

See `/imports/FULL_DATA_FLOW_SPEC.md` for details.

---

## 🐛 Reporting Bugs

### Before Reporting

1. **Search existing issues** to avoid duplicates
2. **Test in latest version**
3. **Reproduce in a clean environment**
4. **Gather information** (browser, OS, screenshots)

### Bug Report Template

```markdown
## Bug Description
Clear description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What should happen.

## Actual Behavior
What actually happens.

## Screenshots
[Add screenshots if applicable]

## Environment
- OS: [e.g., macOS 13.0]
- Browser: [e.g., Chrome 120]
- Version: [e.g., v3.7]

## Additional Context
Any other relevant information.
```

---

## 💡 Suggesting Features

### Feature Request Template

```markdown
## Feature Description
Clear description of the feature.

## Problem It Solves
What problem does this solve?

## Proposed Solution
How should it work?

## Alternatives Considered
Other solutions you've considered.

## Additional Context
Mockups, examples, references, etc.
```

---

## 📚 Documentation

### Updating Documentation

When adding features, update:
- [ ] README.md (if user-facing)
- [ ] Component README (if in `/components/`)
- [ ] Guidelines.md (if changing standards)
- [ ] Code comments (for complex logic)
- [ ] Type definitions (for new interfaces)

### Documentation Standards

- Use clear, concise language
- Include code examples
- Add screenshots for UI changes
- Link to related documentation
- Keep formatting consistent

---

## 🎯 Priority Areas

We especially welcome contributions in:

1. **Connector Implementations**
   - OAuth flows for 50+ connectors
   - Webhook handlers
   - Error handling

2. **Intelligence Features**
   - Entity 360 views
   - Signal detection
   - HITL approval UI

3. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests

4. **Documentation**
   - API documentation
   - Architecture diagrams
   - Tutorial videos

5. **Performance**
   - Bundle size optimization
   - Load time improvements
   - Caching strategies

---

## ❓ Questions?

- **General questions:** [GitHub Discussions](https://github.com/NirmalPrinceJ/integratewise-live/discussions)
- **Bug reports:** [GitHub Issues](https://github.com/NirmalPrinceJ/integratewise-live/issues)
- **Security issues:** Email security@integratewise.com (do NOT use public issues)

---

## 🙏 Thank You!

Every contribution helps make IntegrateWise better. We appreciate your time and effort!

---

**Guidelines Version:** 3.7  
**Last Updated:** March 21, 2026
