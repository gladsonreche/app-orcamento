import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../theme';

type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps {
  name: string;
  size?: AvatarSize;
}

const sizes: Record<AvatarSize, number> = {
  sm: 32,
  md: 40,
  lg: 48,
};

function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors.avatarColors[Math.abs(hash) % colors.avatarColors.length];
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return (parts[0]?.[0] || '?').toUpperCase();
}

export default function Avatar({ name, size = 'md' }: AvatarProps) {
  const dim = sizes[size];
  const color = getColorFromName(name);
  const initials = getInitials(name);
  const fontSize = dim * 0.38;

  return (
    <View
      style={[
        styles.container,
        {
          width: dim,
          height: dim,
          borderRadius: dim / 2,
          backgroundColor: color + '20',
        },
      ]}
    >
      <Text
        style={[
          styles.initials,
          {
            fontSize,
            color,
          },
        ]}
      >
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontWeight: typography.weights.bold,
    letterSpacing: 0.5,
  },
});
