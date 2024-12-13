// src/utils/accessibility.ts
import { PixelRatio, Dimensions, Platform } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const accessibility = {
  // Dynamic font scaling
  scaleFontSize: (size: number) => {
    const scale = SCREEN_WIDTH / 375; // Base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  },
  
  // Minimum touch target sizes
  touchableSize: {
    min: 44,
    default: 48,
    large: 56,
  },

  // Safe area paddings
  safePadding: {
    horizontal: 16,
    vertical: Platform.OS === 'ios' ? 50 : 30,
  },
};