// src/theme/spacing.ts
import { Platform } from 'react-native';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  safe: {
    top: Platform.OS === 'ios' ? 50 : 30,
    bottom: Platform.OS === 'ios' ? 34 : 24,
  },
  touchable: 44, // Minimum touchable area
};