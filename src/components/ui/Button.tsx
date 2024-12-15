// src/components/ui/Button.tsx
import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  TouchableOpacityProps,
  Animated,
  Easing,
  ViewStyle
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  style,
  onPress,
  disabled,
  ...props 
}) => {
  // Animation value for scale effect
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  
  // Enhanced press feedback
  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 150,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = (e: any) => {
    // Add haptic feedback here if desired
    if (onPress) {
      onPress(e);
    }
  };

  const getButtonStyles = () => {
    const styles = [baseStyles.base];
    
    // Add variant styles with enhanced visual hierarchy
    if (variant === 'primary') styles.push({ ...baseStyles.base, ...baseStyles.primary });
    if (variant === 'secondary') styles.push({ ...baseStyles.base, ...baseStyles.secondary });
    if (variant === 'ghost') styles.push({ ...baseStyles.base, ...baseStyles.ghost });
    
    // Enhanced size styles with better touch targets
    if (size === 'sm') styles.push({ ...baseStyles.base, ...baseStyles.small });
    if (size === 'md') styles.push({ ...baseStyles.base, ...baseStyles.medium });
    if (size === 'lg') styles.push({ ...baseStyles.base, ...baseStyles.large });
    
    if (disabled) styles.push({ ...baseStyles.base, ...baseStyles.disabled });
    if (style) styles.push(style);
    
    return styles;
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity 
        style={getButtonStyles()} 
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        {...props}
      >
        {typeof children === 'string' ? (
          <Text style={[
            baseStyles.text,
            size === 'sm' && baseStyles.smallText,
            size === 'lg' && baseStyles.largeText,
            variant === 'ghost' && baseStyles.ghostText,
            disabled && baseStyles.disabledText
          ]}>
            {children}
          </Text>
        ) : (
          children
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const baseStyles = StyleSheet.create({
  base: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  primary: {
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: `${colors.primary}66`,
  },
  secondary: {
    backgroundColor: colors.gray[800],
    borderWidth: 1,
    borderColor: colors.gray[700],
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.gray[700],
  },
  disabled: {
    opacity: 0.5,
  },
  small: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 36,
  },
  medium: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 44,
  },
  large: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    minHeight: 52,
  },
  text: {
    color: colors.foreground,
    fontSize: typography.sizes.md,
    fontWeight: '600',
    textAlign: 'center',
  },
  smallText: {
    fontSize: typography.sizes.sm,
  },
  largeText: {
    fontSize: typography.sizes.lg,
  },
  ghostText: {
    color: colors.primary,
  },
  disabledText: {
    opacity: 0.7,
  },
});