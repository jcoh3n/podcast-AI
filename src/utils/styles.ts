import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { layout } from '../theme/layout';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: layout.safe.top,
    paddingBottom: layout.safe.bottom,
  },
  content: {
    padding: layout.spacing.md,
  },
  screenTitle: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: colors.foreground,
    marginBottom: layout.spacing.md,
  },
  text: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.regular,
    color: colors.foreground,
    lineHeight: typography.sizes.md * typography.lineHeights.normal,
  },
  card: {
    backgroundColor: colors.gray[800],
    borderRadius: layout.borderRadius.lg,
    padding: layout.spacing.md,
    borderWidth: 1,
    borderColor: colors.gray[700],
  },
  shadow: {
    shadowColor: colors.background,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});