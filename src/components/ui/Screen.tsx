// src/components/ui/Screen.tsx
import React from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar,
  ViewStyle,
  ScrollViewProps,
} from 'react-native';
import { colors } from '../../theme/colors';
import { layout } from '../../theme/layout';

interface ScreenProps extends ScrollViewProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  scrollable = true,
  style,
  contentContainerStyle,
  ...props
}) => {
  const Wrapper = scrollable ? ScrollView : View;

  return (
    <SafeAreaView style={[styles.safeArea, style]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.background}
      />
      <Wrapper
        style={styles.screen}
        contentContainerStyle={[
          styles.content,
          !scrollable && { flex: 1 },
          contentContainerStyle,
        ]}
        showsVerticalScrollIndicator={false}
        {...props}
      >
        {children}
      </Wrapper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: layout.spacing.md,
    paddingTop: layout.spacing.md,
    paddingBottom: layout.spacing.xxl,
  },
});