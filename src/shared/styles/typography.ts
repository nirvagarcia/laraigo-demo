export const typography = {
  fontFamily: {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
  letterSpacing: {
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
  },
} as const;

export const typographyVariants = {
  h1: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize["4xl"],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.tight,
  },
  h2: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize["3xl"],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
  },
  h3: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize["2xl"],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.normal,
  },
  h4: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.normal,
  },
  h5: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal,
  },
  h6: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal,
  },
  body1: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal,
  },
  body2: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal,
  },
  caption: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal,
  },
  button: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    textTransform: "none" as const,
    letterSpacing: typography.letterSpacing.wide,
  },
} as const;
