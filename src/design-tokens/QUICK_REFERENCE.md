# Design Tokens Quick Reference

## 🎨 Most Used Colors

```typescript
// Brand
#3F5185  // Primary (Navy Blue)
#F54476  // Accent (Pink)

// Semantic
#00C853  // Success (Emerald)
#FF9800  // Warning (Amber)
#F54476  // Danger (Pink)

// Flows
#3F5185  // Flow A (Blue)
#7B5EA7  // Flow B (Purple)
#00C853  // Flow C (Emerald)

// Neutrals
#FFFFFF  // White
#F5F6FA  // Light Background
#EDF0F5  // Secondary Background
#D8DEE8  // Borders
#64748B  // Muted Text
#1E293B  // Primary Text
```

---

## 📏 Common Spacing

```typescript
spacing[3]  // 12px - Button padding
spacing[4]  // 16px - Standard gap
spacing[6]  // 24px - Card padding
spacing[8]  // 32px - Section spacing
spacing[12] // 48px - Large sections
```

---

## 🔘 Border Radius

```typescript
borderRadius.lg    // 12px - Buttons, inputs
borderRadius.xl    // 16px - Small cards
borderRadius['2xl'] // 24px - Cards
borderRadius['3xl'] // 32px - Onboarding
borderRadius.full  // Pills, badges
```

---

## 🎭 Shadows

```typescript
shadows.base  // Default cards
shadows.md    // Hover state
shadows.lg    // Elevated cards
shadows['2xl'] // Modals
```

---

## ⚡ Quick Component Styles

### Button (Primary)
```jsx
<button className="bg-[#3F5185] text-white rounded-lg px-6 py-3 font-medium hover:bg-[#354890] transition-all duration-200">
  Click Me
</button>
```

### Button (Accent)
```jsx
<button className="bg-[#F54476] text-white rounded-lg px-6 py-3 font-medium hover:bg-[#D93D65]">
  CTA Button
</button>
```

### Card
```jsx
<div className="bg-white border border-[#D8DEE8] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
  Card content
</div>
```

### Badge (Flow A)
```jsx
<span className="bg-blue-100 text-[#3F5185] text-xs font-medium px-3 py-1 rounded-full">
  Flow A
</span>
```

### Badge (Flow B)
```jsx
<span className="bg-purple-100 text-[#7B5EA7] text-xs font-medium px-3 py-1 rounded-full">
  Flow B
</span>
```

### Badge (Flow C)
```jsx
<span className="bg-emerald-100 text-[#00C853] text-xs font-medium px-3 py-1 rounded-full">
  Flow C
</span>
```

### Input
```jsx
<input className="bg-[#EDF0F5] border border-[#D8DEE8] rounded-lg px-4 py-3 focus:border-[#3F5185] focus:ring-2 focus:ring-[#3F5185]/20" />
```

---

## 🎯 CSS Variable Usage

```css
/* Colors */
var(--iw-color-brand-primary)
var(--iw-color-brand-accent)
var(--iw-color-success)
var(--iw-color-flow-a)
var(--iw-color-flow-b)
var(--iw-color-flow-c)

/* Spacing */
var(--iw-spacing-4)
var(--iw-spacing-6)

/* Border Radius */
var(--iw-radius-lg)
var(--iw-radius-2xl)

/* Shadows */
var(--iw-shadow-base)
var(--iw-shadow-md)
```

---

## 📦 TypeScript Import

```typescript
// Import everything
import { designTokens } from '@/design-tokens/tokens';

// Import specific categories
import { colors, spacing, borderRadius } from '@/design-tokens/tokens';

// Import helpers
import { getColor, getFlowColor } from '@/design-tokens/tokens';

// Use tokens
const primaryColor = colors.brand.primary;
const standardSpacing = spacing[4];
const flowAColor = getFlowColor('A');
```

---

## 🎨 Gradient Combos

```css
/* Primary Gradient */
background: linear-gradient(135deg, #3F5185, #4256AB);

/* Accent Gradient */
background: linear-gradient(135deg, #F54476, #EE4B75);

/* Flow Gradient (Primary to Accent) */
background: linear-gradient(to right, #3F5185, #F54476);
```

---

## 📐 Common Layouts

### Container
```jsx
<div className="max-w-4xl mx-auto px-6">
  {/* Content */}
</div>
```

### Grid (2 columns)
```jsx
<div className="grid grid-cols-2 gap-4">
  {/* Items */}
</div>
```

### Flex (centered)
```jsx
<div className="flex items-center justify-center gap-4">
  {/* Items */}
</div>
```

### Stack (vertical)
```jsx
<div className="space-y-6">
  {/* Items */}
</div>
```

---

## ⏱️ Animation Timing

```typescript
duration-[150ms]  // Fast
duration-[200ms]  // Base (default)
duration-[300ms]  // Slow
duration-[500ms]  // Slower

// Easing
ease-out  // Recommended for most transitions
```

---

## 📱 Responsive Breakpoints

```typescript
// Tailwind classes
sm:   // 640px+
md:   // 768px+
lg:   // 1024px+
xl:   // 1280px+
2xl:  // 1536px+

// Example
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

---

## 🔢 Z-Index Layers

```typescript
z-0   // Base
z-10  // Dropdowns
z-20  // Sticky headers
z-30  // Fixed elements
z-40  // Overlays
z-50  // Modals
z-60  // Toasts
```

---

## 🎯 Industry-Specific Overrides

None currently - all industries use the same token system.

---

## 📝 Typography Defaults

**DON'T use Tailwind font classes** unless specifically needed:
- ❌ `text-2xl`, `font-bold`, `leading-none`
- ✅ Let `globals.css` define typography
- ✅ Only override when user requests

---

## ⚡ Performance Tips

1. **Use CSS variables** for runtime theme switching
2. **Use TypeScript tokens** for compile-time optimization
3. **Avoid inline styles** - use classes when possible
4. **Leverage Tailwind JIT** for unused class removal

---

## 🔍 Finding Token Values

**In TypeScript:**
```typescript
console.log(designTokens.colors.brand.primary);
```

**In CSS:**
```css
background: var(--iw-color-brand-primary);
```

**In DevTools:**
```javascript
getComputedStyle(document.documentElement).getPropertyValue('--iw-color-brand-primary')
```

---

**Quick Links:**
- Full documentation: `/design-tokens/README.md`
- Token definitions: `/design-tokens/tokens.json`
- TypeScript usage: `/design-tokens/tokens.ts`
- CSS variables: `/design-tokens/tokens.css`
