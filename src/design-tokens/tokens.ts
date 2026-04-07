/**
 * IntegrateWise Design Tokens
 * 
 * Complete design system tokens exported as TypeScript constants.
 * Use these for programmatic access in components.
 * 
 * @version 1.0.0
 * @updated 2026-03-21
 */

export const designTokens = {
  colors: {
    brand: {
      primary: '#3F5185',
      primaryLight: '#4256AB',
      primaryDeep: '#4152A1',
      primaryDark: '#354890',
      accent: '#F54476',
      accentHover: '#EE4B75',
      accentDark: '#D93D65',
    },
    semantic: {
      success: '#00C853',
      successAlt: '#3D8B6E',
      warning: '#FF9800',
      warningAlt: '#D4883E',
      danger: '#F54476',
      dangerAlt: '#DC4A4A',
      info: '#7B9BFF',
    },
    flow: {
      a: '#3F5185', // Structured Data (Blue)
      b: '#7B5EA7', // Unstructured Data (Purple)
      c: '#00C853', // AI Chats (Emerald)
    },
    intelligence: {
      spine: '#5FA8D3',
      hub: '#9B6DC6',
      agent: '#6BC77A',
      overlayBg: 'rgba(16, 42, 67, 0.94)',
      overlaySurface: '#1A2E42',
    },
    neutrals: {
      50: '#F5F6FA',
      100: '#EDF0F5',
      200: '#DDE3EC',
      300: '#D8DEE8',
      400: '#B0B8C5',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#102A43',
      white: '#FFFFFF',
    },
    charts: {
      1: '#4256AB',
      2: '#3D8B6E',
      3: '#D4883E',
      4: '#7B5EA7',
      5: '#EE4B75',
    },
  },
  
  typography: {
    fontFamilies: {
      sans: "'Inter', system-ui, sans-serif",
      mono: "'JetBrains Mono', monospace",
    },
    fontSizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 14px (root is 14px)
      lg: '1.125rem',   // ~16px
      xl: '1.25rem',    // ~18px
      '2xl': '1.5rem',  // ~21px
      '3xl': '1.875rem', // ~26px
      '4xl': '2.25rem',  // ~32px
    },
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeights: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },
  
  spacing: {
    0: '0rem',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
  },
  
  borderRadius: {
    none: '0rem',
    sm: '0.125rem',   // 2px
    md: '0.25rem',    // 4px
    base: '0.5rem',   // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    '3xl': '2rem',    // 32px
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  
  transitions: {
    duration: {
      fast: '150ms',
      base: '200ms',
      slow: '300ms',
      slower: '500ms',
    },
    easing: {
      linear: 'cubic-bezier(0, 0, 1, 1)',
      ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    overlay: 40,
    modal: 50,
    toast: 60,
  },
} as const;

// Type-safe token access
export type DesignTokens = typeof designTokens;

// Helper functions
export const getColor = (path: string): string => {
  const keys = path.split('.');
  let value: any = designTokens.colors;
  for (const key of keys) {
    value = value?.[key];
  }
  return value || '';
};

export const getSpacing = (size: keyof typeof designTokens.spacing): string => {
  return designTokens.spacing[size];
};

export const getBorderRadius = (size: keyof typeof designTokens.borderRadius): string => {
  return designTokens.borderRadius[size];
};

// Export individual token groups for convenience
export const colors = designTokens.colors;
export const typography = designTokens.typography;
export const spacing = designTokens.spacing;
export const borderRadius = designTokens.borderRadius;
export const shadows = designTokens.shadows;
export const transitions = designTokens.transitions;
export const breakpoints = designTokens.breakpoints;
export const zIndex = designTokens.zIndex;

// Component-specific token bundles
export const componentTokens = {
  button: {
    primary: {
      bg: colors.brand.primary,
      bgHover: colors.brand.primaryDark,
      text: colors.neutrals.white,
      borderRadius: borderRadius.lg,
      padding: `${spacing[3]} ${spacing[6]}`,
      fontSize: typography.fontSizes.base,
      fontWeight: typography.fontWeights.medium,
      transition: `all ${transitions.duration.base} ${transitions.easing.easeOut}`,
    },
    secondary: {
      bg: colors.neutrals[100],
      bgHover: colors.neutrals[200],
      text: colors.neutrals[800],
      borderRadius: borderRadius.lg,
      padding: `${spacing[3]} ${spacing[6]}`,
    },
    accent: {
      bg: colors.brand.accent,
      bgHover: colors.brand.accentDark,
      text: colors.neutrals.white,
      borderRadius: borderRadius.lg,
      padding: `${spacing[3]} ${spacing[6]}`,
    },
  },
  
  card: {
    bg: colors.neutrals.white,
    border: `1px solid ${colors.neutrals[300]}`,
    borderRadius: borderRadius['2xl'],
    padding: spacing[6],
    shadow: shadows.base,
    shadowHover: shadows.md,
  },
  
  input: {
    bg: colors.neutrals[100],
    border: `1px solid ${colors.neutrals[300]}`,
    borderFocus: `2px solid ${colors.brand.primary}`,
    borderRadius: borderRadius.lg,
    padding: `${spacing[3]} ${spacing[4]}`,
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.normal,
  },
  
  badge: {
    primary: {
      bg: `${colors.brand.primary}10`,
      text: colors.brand.primary,
      borderRadius: borderRadius.full,
      padding: `${spacing[1]} ${spacing[3]}`,
      fontSize: typography.fontSizes.xs,
      fontWeight: typography.fontWeights.medium,
    },
    success: {
      bg: `${colors.semantic.success}10`,
      text: colors.semantic.success,
      borderRadius: borderRadius.full,
      padding: `${spacing[1]} ${spacing[3]}`,
    },
    warning: {
      bg: `${colors.semantic.warning}10`,
      text: colors.semantic.warning,
      borderRadius: borderRadius.full,
      padding: `${spacing[1]} ${spacing[3]}`,
    },
  },
  
  modal: {
    overlay: 'rgba(0, 0, 0, 0.5)',
    bg: colors.neutrals.white,
    borderRadius: borderRadius['3xl'],
    padding: spacing[12],
    shadow: shadows['2xl'],
    maxWidth: '42rem',
  },
};

// Flow-specific color helpers
export const getFlowColor = (flow: 'A' | 'B' | 'C'): string => {
  const flowMap = {
    A: colors.flow.a,
    B: colors.flow.b,
    C: colors.flow.c,
  };
  return flowMap[flow];
};

// Responsive breakpoint helpers
export const mediaQueries = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
};

export default designTokens;
