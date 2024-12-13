// src/screens/ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import { typography } from '../theme/typography';
import { accessibility } from '../utils/accessibility';

interface MenuItemProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  onPress: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ 
  icon, 
  title, 
  onPress, 
  isFirst, 
  isLast 
}) => (
  <TouchableOpacity 
    style={[
      styles.menuItem,
      isFirst && styles.menuItemFirst,
      isLast && styles.menuItemLast
    ]}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={title}
  >
    <View style={styles.menuItemContent}>
      <MaterialCommunityIcons 
        name={icon} 
        size={accessibility.scaleFontSize(24)} 
        color={colors.primary} 
      />
      <Text style={styles.menuText}>{title}</Text>
    </View>
    <MaterialCommunityIcons 
      name="chevron-right" 
      size={accessibility.scaleFontSize(24)} 
      color={colors.gray[400]} 
    />
  </TouchableOpacity>
);

export const ProfileScreen: React.FC = () => {
  const handleMenuPress = (option: string) => {
    console.log(`Navigate to ${option}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.profileCard, styles.shadow]}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde' }}
              style={styles.avatar}
              accessibilityLabel="Profile picture"
            />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.membership}>Premium Member</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => handleMenuPress('EditProfile')}
            accessibilityLabel="Edit profile"
            accessibilityRole="button"
          >
            <MaterialCommunityIcons 
              name="account-edit" 
              size={accessibility.scaleFontSize(20)} 
              color={colors.foreground} 
            />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.shadow]}>
            <View style={styles.statHeader}>
              <MaterialCommunityIcons 
                name="clock-outline" 
                size={accessibility.scaleFontSize(20)} 
                color={colors.primary} 
              />
              <Text style={styles.statTitle}>Listening Time</Text>
            </View>
            <Text style={styles.statValue}>24h 35m</Text>
            <Text style={styles.statSubtext}>This month</Text>
          </View>

          <View style={[styles.statCard, styles.shadow]}>
            <View style={styles.statHeader}>
              <MaterialCommunityIcons 
                name="heart" 
                size={accessibility.scaleFontSize(20)} 
                color={colors.primary} 
              />
              <Text style={styles.statTitle}>Liked Podcasts</Text>
            </View>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statSubtext}>Total liked</Text>
          </View>
        </View>

        <View style={[styles.menuContainer, styles.shadow]}>
          <MenuItem
            icon="cog-outline"
            title="Settings"
            onPress={() => handleMenuPress('Settings')}
            isFirst
          />
          <MenuItem
            icon="help-circle-outline"
            title="Help & Support"
            onPress={() => handleMenuPress('Support')}
          />
          <MenuItem
            icon="information-outline"
            title="About"
            onPress={() => handleMenuPress('About')}
            isLast
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: layout.spacing.md,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileCard: {
    backgroundColor: colors.gray[800],
    borderRadius: layout.borderRadius.lg,
    padding: layout.spacing.lg,
    marginBottom: layout.spacing.md,
    borderWidth: 1,
    borderColor: colors.gray[700],
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: layout.spacing.lg,
  },
  avatar: {
    width: accessibility.touchableSize.large,
    height: accessibility.touchableSize.large,
    borderRadius: accessibility.touchableSize.large / 2,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  profileInfo: {
    marginLeft: layout.spacing.md,
    flex: 1,
  },
  name: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: colors.foreground,
  },
  membership: {
    fontSize: typography.sizes.md,
    color: colors.gray[400],
    marginTop: layout.spacing.xs,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray[700],
    padding: layout.spacing.md,
    borderRadius: layout.borderRadius.md,
    minHeight: accessibility.touchableSize.min,
  },
  editButtonText: {
    color: colors.foreground,
    marginLeft: layout.spacing.sm,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.medium,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: layout.spacing.md,
    marginBottom: layout.spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.gray[800],
    borderRadius: layout.borderRadius.lg,
    padding: layout.spacing.md,
    borderWidth: 1,
    borderColor: colors.gray[700],
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: layout.spacing.sm,
  },
  statTitle: {
    color: colors.foreground,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.semibold,
    marginLeft: layout.spacing.sm,
  },
  statValue: {
    color: colors.foreground,
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
  },
  statSubtext: {
    color: colors.gray[400],
    fontSize: typography.sizes.sm,
    marginTop: layout.spacing.xs,
  },
  menuContainer: {
    backgroundColor: colors.gray[800],
    borderRadius: layout.borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gray[700],
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: layout.spacing.md,
    minHeight: accessibility.touchableSize.default,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[700],
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemFirst: {
    borderTopLeftRadius: layout.borderRadius.lg,
    borderTopRightRadius: layout.borderRadius.lg,
  },
  menuItemLast: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: layout.borderRadius.lg,
    borderBottomRightRadius: layout.borderRadius.lg,
  },
  menuText: {
    color: colors.foreground,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.medium,
    marginLeft: layout.spacing.md,
    flex: 1,
  },
});