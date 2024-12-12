// src/screens/LibraryScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import PodcastList from '../components/PodcastList';
import { Button } from '../components/ui/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usePodcastStore } from '../store/podcast';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

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

  // Get liked podcasts from the full podcasts list using the likedPodcasts Set
  const likedPodcastsList = podcasts.filter(podcast => 
    likedPodcasts.has(podcast.id)
  );

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
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
              size={20} 
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
          
          {/* Optional: Show downloaded episodes if you implement that feature */}
          {/* <PodcastList
            title="Downloaded Episodes"
            podcasts={downloadedPodcasts}
          /> */}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons 
            name="playlist-music" 
            size={64} 
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
              // Navigate to explore section or handle exploration
              console.log('Navigate to explore section');
            }}
          >
            Explore Podcasts
          </Button>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: '700',
    color: colors.foreground,
  },
  filterButton: {
    paddingHorizontal: spacing.md,
  },
  filterButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButtonText: {
    color: colors.primary,
    marginLeft: spacing.xs,
    fontSize: typography.sizes.md,
    fontWeight: '500',
  },
  content: {
    paddingVertical: spacing.md,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    minHeight: 400, // Ensure spinner is vertically centered
  },
  errorText: {
    color: colors.foreground,
    fontSize: typography.sizes.md,
    textAlign: 'center',
    padding: spacing.lg,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
    minHeight: 400, // Ensure empty state is vertically centered
  },
  emptyTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: '700',
    color: colors.foreground,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptyText: {
    color: colors.gray[400],
    textAlign: 'center',
    fontSize: typography.sizes.md,
    marginBottom: spacing.xl,
  },
  exploreButton: {
    minWidth: 200,
  },
});