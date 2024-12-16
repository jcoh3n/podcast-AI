import { Animated } from 'react-native';

export const slideUpAnimation = (
  value: Animated.Value,
  toValue: number,
  duration: number = 300
) => {
  return Animated.spring(value, {
    toValue,
    useNativeDriver: true,
    friction: 8,
    tension: 40,
  });
};

export const fadeAnimation = (
  value: Animated.Value,
  toValue: number,
  duration: number = 200
) => {
  return Animated.timing(value, {
    toValue,
    duration,
    useNativeDriver: true,
  });
};
