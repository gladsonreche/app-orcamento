import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme';

interface DividerProps {
  marginVertical?: number;
}

export default function Divider({ marginVertical = spacing.lg }: DividerProps) {
  return <View style={[styles.divider, { marginVertical }]} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 0.5,
    backgroundColor: colors.border,
  },
});
