import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { colors, typography, spacing } from '../../theme';
import IconButton from './IconButton';

interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
  rightActions?: React.ReactNode;
}

export default function ScreenHeader({ title, onBack, rightActions }: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.sm }]}>
      <View style={styles.left}>
        {onBack && (
          <IconButton
            icon={<ChevronLeft size={24} color={colors.textPrimary} />}
            onPress={onBack}
          />
        )}
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.right}>{rightActions}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: colors.bgPrimary,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  left: {
    width: 44,
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
  },
  right: {
    width: 44,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.xs,
  },
});
