# IntegrateWise Design Tokens

Complete design system tokens for the IntegrateWise platform. These tokens ensure visual consistency across all components and surfaces.

## 📁 Files

```
/design-tokens/
├── tokens.json          # W3C Design Tokens format (interoperable)
├── tokens.ts            # TypeScript constants (programmatic access)
├── tokens.css           # CSS Custom Properties (standalone usage)
├── figma-tokens.json    # Figma Tokens plugin format
└── README.md            # This file
```

## 🎨 Token Categories

### 1. **Colors**

#### Brand Colors
```css
Primary:       #3F5185  (Navy Blue - from Guidelines)
Primary Light: #4256AB  (Logo connectors)
Primary Deep:  #4152A1  (Logo spine path)
Accent:        #F54476  (Pink/Magenta - from Guidelines)
Accent Hover:  #EE4B75  (Logo dot - CTAs)
```

#### Semantic Colors
```css
Success:  #00C853  (Emerald)
Warning:  #FF9800  (Amber)
Danger:   #F54476  (Pink)
Info:     #7B9BFF  (Blue)
```

#### Flow Colors (Data Flow Visualization)
```css
Flow A:  #3F5185  (Structured Data - Blue)
Flow B:  #7B5EA7  (Unstructured Data - Purple)
Flow C:  #00C853  (AI Chats - Emerald)
```

#### Intelligence Colors
```css
Spine:   #5FA8D3  (SSOT indicator)
Hub:     #9B6DC6  (Intelligence Hub)
Agent:   #6BC77A  (AI Twin)
```

#### Neutrals Scale
```css
50:  #F5F6FA  (Lightest background)
100: #EDF0F5  (Secondary backgrounds)
200: #DDE3EC  (Accent backgrounds)
300: #D8DEE8  (Borders)
400: #B0B8C5  (Disabled states)
500: #64748B  (Muted text)
600: #475569  (Secondary text)
700: #334155  (Tertiary text)
800: #1E293B  (Primary text)
900: #102A43  (Darkest)
```

---

### 2. **Typography**

#### Font Families
```css
Sans:  'Inter', system-ui, sans-serif
Mono:  'JetBrains Mono', monospace
```

#### Font Sizes (Root: 14px)
```css
xs:   0.75rem   (12px)
sm:   0.875rem  (14px)
base: 1rem      (14px)
lg:   1.125rem  (~16px)
xl:   1.25rem   (~18px)
2xl:  1.5rem    (~21px)
3xl:  1.875rem  (~26px)
4xl:  2.25rem   (~32px)
```

#### Font Weights
```css
Light:     300
Normal:    400
Medium:    500  (Default for headings/buttons)
Semibold:  600
Bold:      700
Extrabold: 800
```

#### Line Heights
```css
Tight:    1.25
Normal:   1.5   (Default)
Relaxed:  1.75
Loose:    2
```

---

### 3. **Spacing (4px Grid)**

```css
0:   0rem       (0px)
1:   0.25rem    (4px)
2:   0.5rem     (8px)
3:   0.75rem    (12px)
4:   1rem       (16px)  ← Standard spacing
5:   1.25rem    (20px)
6:   1.5rem     (24px)
8:   2rem       (32px)
10:  2.5rem     (40px)
12:  3rem       (48px)
16:  4rem       (64px)
20:  5rem       (80px)
24:  6rem       (96px)
```

---

### 4. **Border Radius**

```css
none: 0rem
sm:   0.125rem  (2px)
md:   0.25rem   (4px)
base: 0.5rem    (8px)   ← Default
lg:   0.75rem   (12px)
xl:   1rem      (16px)
2xl:  1.5rem    (24px)  ← Cards
3xl:  2rem      (32px)  ← Onboarding
full: 9999px            ← Pills, badges
```

---

### 5. **Shadows**

```css
sm:   0 1px 2px 0 rgba(0, 0, 0, 0.05)
base: 0 1px 3px 0 rgba(0, 0, 0, 0.1)
md:   0 4px 6px -1px rgba(0, 0, 0, 0.1)
lg:   0 10px 15px -3px rgba(0, 0, 0, 0.1)
xl:   0 20px 25px -5px rgba(0, 0, 0, 0.1)
2xl:  0 25px 50px -12px rgba(0, 0, 0, 0.25)  ← Modals
```

---

### 6. **Transitions**

#### Durations
```css
fast:   150ms
base:   200ms  ← Default
slow:   300ms
slower: 500ms
```

#### Easing
```css
linear:    cubic-bezier(0, 0, 1, 1)
ease:      cubic-bezier(0.25, 0.1, 0.25, 1)
easeIn:    cubic-bezier(0.4, 0, 1, 1)
easeOut:   cubic-bezier(0, 0, 0.2, 1)      ← Recommended
easeInOut: cubic-bezier(0.4, 0, 0.2, 1)
```

---

### 7. **Breakpoints**

```css
sm:  640px   (Mobile landscape)
md:  768px   (Tablets)
lg:  1024px  (Laptops)
xl:  1280px  (Desktops)
2xl: 1536px  (Large desktops)
```

---

### 8. **Z-Index Layers**

```css
base:     0
dropdown: 10
sticky:   20
fixed:    30
overlay:  40
modal:    50
toast:    60
```

---

## 🔧 Usage

### TypeScript/React
```typescript
import { designTokens, colors, spacing } from '@/design-tokens/tokens';

// Direct access
const primaryColor = colors.brand.primary; // "#3F5185"

// Helper functions
import { getColor, getSpacing } from '@/design-tokens/tokens';

const bgColor = getColor('brand.primary');
const padding = getSpacing(4); // "1rem"

// Component tokens
import { componentTokens } from '@/design-tokens/tokens';

const buttonStyle = {
  ...componentTokens.button.primary,
};
```

### CSS Custom Properties
```css
/* Import tokens */
@import '/design-tokens/tokens.css';

/* Use tokens */
.my-component {
  color: var(--iw-color-brand-primary);
  padding: var(--iw-spacing-4);
  border-radius: var(--iw-radius-lg);
  transition: all var(--iw-transition-duration-base) var(--iw-transition-easing-ease-out);
}
```

### Tailwind (Already configured in globals.css)
```jsx
<div className="bg-[#3F5185] text-white rounded-lg p-4">
  Styled with tokens
</div>

// Or using custom classes
<div className="iw-button-primary">
  Click me
</div>
```

### Inline Styles (Motion/Framer)
```jsx
import { colors, spacing } from '@/design-tokens/tokens';

<motion.div
  style={{
    backgroundColor: colors.brand.primary,
    padding: spacing[6],
    borderRadius: '1.5rem',
  }}
  whileHover={{ backgroundColor: colors.brand.primaryDark }}
/>
```

---

## 🎯 Component Token Bundles

Pre-configured token bundles for common components:

### Button
```typescript
import { componentTokens } from '@/design-tokens/tokens';

// Primary button
componentTokens.button.primary
// {
//   bg: '#3F5185',
//   bgHover: '#354890',
//   text: '#FFFFFF',
//   borderRadius: '0.75rem',
//   padding: '0.75rem 1.5rem',
//   ...
// }

// Accent button
componentTokens.button.accent
```

### Card
```typescript
componentTokens.card
// {
//   bg: '#FFFFFF',
//   border: '1px solid #D8DEE8',
//   borderRadius: '1.5rem',
//   padding: '1.5rem',
//   shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
//   ...
// }
```

### Input
```typescript
componentTokens.input
```

### Badge
```typescript
componentTokens.badge.primary
componentTokens.badge.success
componentTokens.badge.warning
```

### Modal
```typescript
componentTokens.modal
```

---

## 🎨 Flow-Specific Colors

Use these helpers for data flow visualization:

```typescript
import { getFlowColor } from '@/design-tokens/tokens';

const flowAColor = getFlowColor('A'); // "#3F5185" (Blue)
const flowBColor = getFlowColor('B'); // "#7B5EA7" (Purple)
const flowCColor = getFlowColor('C'); // "#00C853" (Emerald)
```

**Usage in components:**
```jsx
<Badge className="bg-[var(--iw-color-flow-a)]">Flow A</Badge>
<Badge className="bg-[var(--iw-color-flow-b)]">Flow B</Badge>
<Badge className="bg-[var(--iw-color-flow-c)]">Flow C</Badge>
```

---

## 📱 Responsive Design

### Media Queries (TypeScript)
```typescript
import { mediaQueries } from '@/design-tokens/tokens';

const styles = {
  base: { fontSize: '14px' },
  [mediaQueries.md]: { fontSize: '16px' },
  [mediaQueries.lg]: { fontSize: '18px' },
};
```

### CSS Media Queries
```css
.responsive {
  font-size: 14px;
}

@media (min-width: 768px) {
  .responsive {
    font-size: 16px;
  }
}

@media (min-width: 1024px) {
  .responsive {
    font-size: 18px;
  }
}
```

---

## 🌓 Dark Mode

Dark mode tokens are defined in `/styles/globals.css`:

```css
.dark {
  --iw-color-brand-primary: #6B7FCC;
  --iw-color-brand-accent: #F2708E;
  /* ... more dark mode overrides ... */
}
```

---

## ✅ Guidelines Compliance

These tokens follow **IntegrateWise Guidelines v3.7**:

- ✅ Primary: `#3F5185` (Navy Blue)
- ✅ Accent: `#F54476` (Pink/Magenta)
- ✅ Success: `#00C853` (Emerald)
- ✅ Warning: `#FF9800` (Amber)
- ✅ No Tailwind font-size/weight classes unless requested
- ✅ Follows globals.css base styles
- ✅ 4px spacing grid
- ✅ Consistent border radius system

---

## 🔄 Updating Tokens

To update design tokens:

1. **Edit source:** Modify `/design-tokens/tokens.json` (source of truth)
2. **Regenerate:** Update `/design-tokens/tokens.ts` to match
3. **Update CSS:** Update `/design-tokens/tokens.css` if needed
4. **Update globals:** Update `/styles/globals.css` for Tailwind integration
5. **Test:** Verify changes across all components

---

## 📦 Export Formats

### W3C Design Tokens (tokens.json)
Standard format for interoperability with design tools (Figma, Sketch, Adobe XD).

### TypeScript (tokens.ts)
Type-safe programmatic access in React components.

### CSS Custom Properties (tokens.css)
Standalone CSS variables for any CSS usage.

### Figma Tokens (figma-tokens.json)
Compatible with Figma Tokens plugin for design-to-code sync.

---

## 🎯 Best Practices

### ✅ DO:
- Use token variables instead of hardcoded values
- Use component token bundles for consistency
- Follow the 4px spacing grid
- Use semantic color names (success, warning, danger)
- Test in both light and dark modes

### ❌ DON'T:
- Hardcode hex colors directly in components
- Use arbitrary spacing values (stick to the scale)
- Mix different shadow styles
- Override brand colors without consultation
- Use Tailwind font classes unless specifically needed

---

## 📚 Related Documentation

- **Guidelines:** `/Guidelines.md` (v3.7)
- **Brand System:** `/imports/BRAND_MESSAGING_SYSTEM-1.md`
- **Architecture:** `/imports/FINAL_ARCHITECTURE_SUMMARY.md`
- **Design System:** `/styles/globals.css`

---

**Version:** 1.0.0  
**Last Updated:** March 21, 2026  
**Maintainer:** IntegrateWise Design System Team
