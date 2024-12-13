import { Platform } from 'react-native';
import { accessibility } from '../utils/accessibility';

// Define system fonts based on platform
const systemFonts = {
  regular: Platform.select({ ios: 'System', android: 'Roboto' }),
  medium: Platform.select({ ios: 'System', android: 'Roboto-Medium' }),
  semibold: Platform.select({ ios: 'System', android: 'Roboto-Medium' }),
  bold: Platform.select({ ios: 'System', android: 'Roboto-Bold' }),
};

const createScaledSize = (size: number) => accessibility.scaleFontSize(size);

export const typography = {
  sizes: {
    xs: createScaledSize(12),
    sm: createScaledSize(14),
    md: createScaledSize(16),
    lg: createScaledSize(20),
    xl: createScaledSize(24),
    xxl: createScaledSize(32),
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
  fonts: systemFonts,
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};
