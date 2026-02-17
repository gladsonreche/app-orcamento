// PhotoQuote AI - Design Tokens
// Tema "Construction Pro" - Light Only

export const colors = {
  // Primary
  primary: '#1B5E20',
  primaryLight: '#E8F5E9',
  primaryHover: '#2E7D32',
  primaryDark: '#0D3B12',

  // Accent
  accent: '#FF6F00',
  accentLight: '#FFF3E0',
  accentHover: '#E65100',

  // Text
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textOnPrimary: '#FFFFFF',
  textOnAccent: '#FFFFFF',

  // Backgrounds
  bgPrimary: '#FFFFFF',
  bgSecondary: '#F9FAFB',
  bgTertiary: '#F3F4F6',

  // Status
  success: '#059669',
  successBg: '#D1FAE5',
  warning: '#D97706',
  warningBg: '#FEF3C7',
  error: '#DC2626',
  errorBg: '#FEE2E2',
  info: '#0284C7',
  infoBg: '#E0F2FE',

  // Utility
  border: '#E5E7EB',
  divider: '#F3F4F6',
  overlay: 'rgba(0,0,0,0.5)',

  // Stat card accent colors
  statGreen: '#059669',
  statBlue: '#0284C7',
  statOrange: '#FF6F00',
  statPurple: '#7C3AED',

  // Avatar colors
  avatarColors: [
    '#1B5E20', '#059669', '#D97706', '#DC2626', '#7C3AED',
    '#0891B2', '#DB2777', '#0284C7', '#EA580C', '#2E7D32',
  ],
} as const;

export const typography = {
  sizes: {
    xs: 12,
    sm: 13,
    base: 15,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 34,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeights: {
    xs: 16,
    sm: 18,
    base: 22,
    md: 24,
    lg: 26,
    xl: 28,
    '2xl': 32,
    '3xl': 36,
    '4xl': 42,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
};

export const radii = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  '2xl': 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
};

export const layout = {
  touchTarget: 44,
  bottomNavHeight: 60,
  screenPadding: spacing.lg,
  cardGap: spacing.sm,
  headerOverlap: 40,
};

export const statusColors = {
  // Estimate statuses
  draft: { fg: colors.info, bg: colors.infoBg },
  sent: { fg: colors.warning, bg: colors.warningBg },
  approved: { fg: colors.success, bg: colors.successBg },
  rejected: { fg: colors.error, bg: colors.errorBg },
  in_progress: { fg: colors.warning, bg: colors.warningBg },
  completed: { fg: colors.info, bg: colors.infoBg },
  // Invoice statuses
  unpaid: { fg: colors.warning, bg: colors.warningBg },
  paid: { fg: colors.success, bg: colors.successBg },
  overdue: { fg: colors.error, bg: colors.errorBg },
} as const;
