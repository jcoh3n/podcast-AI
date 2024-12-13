import { Platform, StatusBar, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const layout = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  safe: {
    top: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight || 30,
    bottom: Platform.OS === 'ios' ? 34 : 24,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
};
