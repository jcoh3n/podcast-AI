// src/screens/LibraryScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PodcastList from '../components/PodcastList';
import { Button } from '../components/ui/Button';
import { usePodcastStore } from '../store/podcast';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import { typography } from '../theme/typography';
import { accessibility } from '../utils/accessibility';

export const LibraryScreen = () => {
  const { 
    podcasts,
    likedPodcasts,
    recentPodcasts,
    isLoading,
    error,
    initializeStore 
  } = usePodcastStore();

  useEffect(() => {
    initializeStore();
  }, []);

  const likedPodcastsList = podcasts.filter(podcast => 
    likedPodcasts.has(podcast.id)
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Your Library</Text>
          <Button 
            variant="ghost" 
            size="sm"
            style={styles.filterButton}
          >
            <View style={styles.filterButtonContent}>
              <MaterialCommunityIcons 
                name="filter-variant" 
                size={accessibility.scaleFontSize(20)} 
                color={colors.primary} 
              />
              <Text style={styles.filterButtonText}>Filter</Text>
            </View>
          </Button>
        </View>

        {likedPodcastsList.length > 0 || recentPodcasts.length > 0 ? (
          <View style={styles.content}>
            {recentPodcasts.length > 0 && (
              <PodcastList
                title="Recently Played"
                podcasts={recentPodcasts}
              />
            )}
            
            {likedPodcastsList.length > 0 && (
              <PodcastList
                title="Your Favorites"
                podcasts={likedPodcastsList}
              />
            )}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons 
              name="playlist-music" 
              size={accessibility.scaleFontSize(64)} 
              color={colors.gray[600]} 
            />
            <Text style={styles.emptyTitle}>Your library is empty</Text>
            <Text style={styles.emptyText}>
              Start exploring and like some podcasts to add them to your library
            </Text>
            <Button
              variant="primary"
              size="md"
              style={styles.exploreButton}
              onPress={() => {
                // Navigate to explore section
                console.log('Navigate to explore section');
              }}
            >
              Explore Podcasts
            </Button>
          </View>
        )}
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
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: layout.spacing.md,
    paddingTop: layout.spacing.lg,
    paddingBottom: layout.spacing.md,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.bold,
    color: colors.foreground,
  },
  filterButton: {
    minWidth: accessibility.touchableSize.min,
    minHeight: accessibility.touchableSize.min,
  },
  filterButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButtonText: {
    color: colors.primary,
    marginLeft: layout.spacing.xs,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.medium,
  },
  content: {
    paddingVertical: layout.spacing.md,
  },
  section: {
    marginBottom: layout.spacing.xl,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.medium,
    textAlign: 'center',
    padding: layout.spacing.lg,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: layout.spacing.xl,
    paddingVertical: layout.spacing.xxl,
    minHeight: 400,
  },
  emptyTitle: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    color: colors.foreground,
    marginTop: layout.spacing.lg,
    marginBottom: layout.spacing.sm,
  },
  emptyText: {
    color: colors.gray[400],
    textAlign: 'center',
    fontSize: typography.sizes.md,
    marginBottom: layout.spacing.xl,
  },
  exploreButton: {
    minWidth: 200,
  },
});