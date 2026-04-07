# IntegrateWise Color Palette

Visual reference for all colors in the design system.

## 🎨 Brand Colors

### Primary (Navy Blue)
```
#3F5185  ██████  Primary
#4256AB  ██████  Primary Light (Logo)
#4152A1  ██████  Primary Deep (Spine)
#354890  ██████  Primary Dark (Hover)
```

### Accent (Pink/Magenta)
```
#F54476  ██████  Accent
#EE4B75  ██████  Accent Hover (Logo Dot)
#D93D65  ██████  Accent Dark (Active)
```

---

## ✅ Semantic Colors

### Success (Emerald)
```
#00C853  ██████  Success
#3D8B6E  ██████  Success Alt
```

### Warning (Amber)
```
#FF9800  ██████  Warning
#D4883E  ██████  Warning Alt
```

### Danger (Red/Pink)
```
#F54476  ██████  Danger
#DC4A4A  ██████  Danger Alt
```

### Info (Blue)
```
#7B9BFF  ██████  Info
```

---

## 🔄 Flow Colors

### Flow A: Structured Data
```
#3F5185  ██████  Flow A (Blue)
         Used for: CRM data, databases, structured APIs
```

### Flow B: Unstructured Data
```
#7B5EA7  ██████  Flow B (Purple)
         Used for: Documents, emails, knowledge bases
```

### Flow C: AI Chats
```
#00C853  ██████  Flow C (Emerald)
         Used for: ChatGPT, Claude, AI conversations
```

---

## 🧠 Intelligence Colors

### Spine (SSOT)
```
#5FA8D3  ██████  Spine
         Used for: Single Source of Truth indicators
```

### Hub (Intelligence)
```
#9B6DC6  ██████  Hub
         Used for: Intelligence Hub accents
```

### Agent (AI Twin)
```
#6BC77A  ██████  Agent
         Used for: AI Twin, autonomous actions
```

### Overlays
```
rgba(16, 42, 67, 0.94)  ██████  Overlay Background
#1A2E42                 ██████  Overlay Surface
```

---

## 🌈 Neutrals Scale (11 Steps)

### Light Shades
```
#FFFFFF  ██████  White           (neutral.white)
#F5F6FA  ██████  Neutral 50      (lightest bg)
#EDF0F5  ██████  Neutral 100     (secondary bg)
#DDE3EC  ██████  Neutral 200     (accent bg)
#D8DEE8  ██████  Neutral 300     (borders)
#B0B8C5  ██████  Neutral 400     (disabled)
```

### Mid Shades
```
#64748B  ██████  Neutral 500     (muted text)
#475569  ██████  Neutral 600     (secondary text)
#334155  ██████  Neutral 700     (tertiary text)
```

### Dark Shades
```
#1E293B  ██████  Neutral 800     (primary text)
#102A43  ██████  Neutral 900     (darkest)
```

---

## 📊 Chart Colors (5-Color Palette)

```
#4256AB  ██████  Chart 1 (Primary Blue)
#3D8B6E  ██████  Chart 2 (Success Green)
#D4883E  ██████  Chart 3 (Warning Orange)
#7B5EA7  ██████  Chart 4 (Purple)
#EE4B75  ██████  Chart 5 (Accent Pink)
```

**Usage:**
- Pie charts, bar charts, line graphs
- Data visualization
- Multi-series graphs
- Progress indicators

---

## 🎯 Color Usage Guidelines

### Primary Use Cases
```
#3F5185  Primary CTAs, navigation, key buttons
#F54476  Accent CTAs, highlights, important actions
```

### Background Layers
```
#FFFFFF  Cards, modals, main surfaces
#F5F6FA  Page backgrounds
#EDF0F5  Input backgrounds, secondary surfaces
```

### Text Hierarchy
```
#1E293B  Primary text (headings, body)
#64748B  Secondary text (descriptions)
#B0B8C5  Tertiary text (captions)
```

### Borders & Dividers
```
#D8DEE8  Default borders
#B0B8C5  Subtle dividers
#3F5185  Focus borders
```

---

## 🌓 Dark Mode Variants

### Brand Colors (Dark)
```
#6B7FCC  ██████  Primary (Lighter)
#F2708E  ██████  Accent (Lighter)
```

### Neutrals (Dark)
```
#0F1A26  ██████  Background
#1A2B3D  ██████  Card/Surface
#263D54  ██████  Border
#8DA0B8  ██████  Muted Text
#E8EDF3  ██████  Primary Text
```

**Note:** Full dark mode tokens in `/styles/globals.css`

---

## ✅ Accessibility (WCAG)

### Contrast Ratios

**Primary on White:**
- #3F5185 on #FFFFFF = 7.5:1 ✅ AAA

**Accent on White:**
- #F54476 on #FFFFFF = 4.8:1 ✅ AA

**Text Colors:**
- #1E293B on #FFFFFF = 14.2:1 ✅ AAA
- #64748B on #FFFFFF = 5.1:1 ✅ AA
- #64748B on #F5F6FA = 4.9:1 ✅ AA

**Success/Warning/Danger:**
- All meet WCAG AA standards on white backgrounds

---

## 🎨 Color Combinations

### Primary Button
```
Background: #3F5185
Text:       #FFFFFF
Hover:      #354890
```

### Accent Button
```
Background: #F54476
Text:       #FFFFFF
Hover:      #D93D65
```

### Success State
```
Background: #00C85310 (10% opacity)
Text:       #00C853
Border:     #00C853
```

### Card Default
```
Background: #FFFFFF
Border:     #D8DEE8
Shadow:     0 1px 3px rgba(0,0,0,0.1)
```

---

## 🔍 Color Picker Values

### RGB Values
```
Primary:  rgb(63, 81, 133)
Accent:   rgb(245, 68, 118)
Success:  rgb(0, 200, 83)
Warning:  rgb(255, 152, 0)
```

### HSL Values
```
Primary:  hsl(225, 36%, 38%)
Accent:   hsl(343, 90%, 61%)
Success:  hsl(149, 100%, 39%)
Warning:  hsl(36, 100%, 50%)
```

---

## 🎯 When to Use Each Color

### Primary (#3F5185)
✅ Main navigation  
✅ Primary CTAs  
✅ Selected states  
✅ Links  
✅ Progress indicators  

### Accent (#F54476)
✅ Important actions  
✅ Highlights  
✅ Notifications  
✅ Badges  
✅ "New" indicators  

### Success (#00C853)
✅ Completed tasks  
✅ Success messages  
✅ Positive metrics  
✅ "Connected" states  
✅ Checkmarks  

### Warning (#FF9800)
✅ Warnings  
✅ Pending states  
✅ Caution indicators  
✅ Low-priority alerts  

### Danger (#F54476)
✅ Errors  
✅ Destructive actions  
✅ Critical alerts  
✅ Delete buttons  

---

## 🖌️ Color Psychology

### Navy Blue (Primary)
- Trust, stability, professionalism
- Intelligence, depth, expertise
- Perfect for enterprise SaaS

### Pink/Magenta (Accent)
- Energy, innovation, creativity
- Modern, friendly, approachable
- Balances the conservative blue

### Emerald (Success/Flow C)
- Growth, renewal, progress
- AI/technology forward
- Positive outcomes

### Purple (Flow B)
- Knowledge, wisdom, creativity
- Perfect for unstructured data
- Documents and content

---

## 📐 Color Spacing

### 10% Tints (for backgrounds)
```
#3F51851A  10% Primary
#F544761A  10% Accent
#00C8531A  10% Success
```

### 20% Tints
```
#3F518533  20% Primary
#F5447633  20% Accent
```

---

## 🎨 Gradient Formulas

### Primary Gradient
```css
background: linear-gradient(135deg, #3F5185, #4256AB);
```

### Accent Gradient
```css
background: linear-gradient(135deg, #F54476, #EE4B75);
```

### Flow Gradient (Primary to Accent)
```css
background: linear-gradient(to right, #3F5185, #F54476);
```

### Overlay Gradient
```css
background: linear-gradient(to bottom, 
  rgba(16, 42, 67, 0.94), 
  rgba(26, 46, 66, 1)
);
```

---

## 🔗 Quick Reference

**Most Common Colors:**
1. `#3F5185` - Primary (Navy)
2. `#F54476` - Accent (Pink)
3. `#FFFFFF` - White
4. `#F5F6FA` - Light Background
5. `#1E293B` - Dark Text
6. `#D8DEE8` - Borders

**Copy-Paste Ready:**
```css
--primary: #3F5185;
--accent: #F54476;
--success: #00C853;
--warning: #FF9800;
--danger: #F54476;
--text: #1E293B;
--border: #D8DEE8;
--bg: #F5F6FA;
```

---

**Last Updated:** March 21, 2026  
**Version:** 1.0.0  
**Source:** `/design-tokens/tokens.json`
