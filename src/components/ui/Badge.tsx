import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, radii } from '../../theme';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
}

const badgeColors: Record<BadgeVariant, { fg: string; bg: string }> = {
  success: { fg: colors.success, bg: colors.successBg },
  warning: { fg: colors.warning, bg: colors.warningBg },
  error: { fg: colors.error, bg: colors.errorBg },
  info: { fg: colors.info, bg: colors.infoBg },
  default: { fg: colors.textSecondary, bg: colors.bgTertiary },
};

export default function Badge({ label, variant = 'default', icon }: BadgeProps) {
  const c = badgeColors[variant];

  return (
    <View style={[styles.badge, { backgroundColor: c.bg }]}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={[styles.text, { color: c.fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.sm,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: spacing.xs,
  },
  text: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
  },
});
