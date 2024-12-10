import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

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
  ...props 
}) => {
  const getButtonStyles = () => {
    const styles = [baseStyles.base];
    
    // Add variant styles
    if (variant === 'primary') styles.push(baseStyles.primary);
    if (variant === 'secondary') styles.push(baseStyles.secondary);
    if (variant === 'ghost') styles.push(baseStyles.ghost);
    
    // Add size styles
    if (size === 'sm') styles.push(baseStyles.small);
    if (size === 'md') styles.push(baseStyles.medium);
    if (size === 'lg') styles.push(baseStyles.large);
    
    if (style) styles.push(style);
    
    return styles;
  };

  const getTextStyles = () => {
    const styles = [baseStyles.text];
    
    // Add variant text styles
    if (variant === 'primary') styles.push(baseStyles.primaryText);
    if (variant === 'secondary') styles.push(baseStyles.secondaryText);
    if (variant === 'ghost') styles.push(baseStyles.ghostText);
    
    // Add size text styles
    if (size === 'sm') styles.push(baseStyles.smallText);
    if (size === 'md') styles.push(baseStyles.mediumText);
    if (size === 'lg') styles.push(baseStyles.largeText);
    
    return styles;
  };

  return (
    <TouchableOpacity style={getButtonStyles()} {...props}>
      {typeof children === 'string' ? (
        <Text style={getTextStyles()}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const baseStyles = StyleSheet.create({
  base: {
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#8B5CF6',
  },
  secondary: {
    backgroundColor: '#374151',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  small: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  medium: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  large: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  text: {
    fontWeight: '500',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  ghostText: {
    color: '#FFFFFF',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
});