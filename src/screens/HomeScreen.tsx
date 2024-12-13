// src/screens/HomeScreen.tsx
import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import  PodcastList from '../components/PodcastList';
import { usePodcastStore } from '../store/podcast';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import { typography } from '../theme/typography';

export const HomeScreen: React.FC = () => {
  const { 
    podcasts,
    recentPodcasts,
    initializeStore,
    isLoading,
    error,
    setCurrentPodcast
  } = usePodcastStore();

  useEffect(() => {
    initializeStore();
  }, []);

  const featuredPodcasts = podcasts.filter(podcast => 
    podcast.category === 'featured'
  ).slice(0, 4);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>{error.message}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* App Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons 
            name="podcast" 
            size={24} 
            color={colors.primary} 
          />
          <Text style={styles.logoText}>PodcastAI</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Featured Grid */}
        {featuredPodcasts.length > 0 && (
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <View style={styles.featuredGrid}>
              {featuredPodcasts.map(podcast => (
                <TouchableOpacity 
                  key={podcast.id}
                  style={styles.featuredItem}
                  onPress={() => setCurrentPodcast(podcast)}
                  activeOpacity={0.7}
                >
                  <Image
                    source={{ uri: podcast.coverUrl }}
                    style={styles.featuredImage}
                    resizeMode="cover"
                  />
                  <View style={styles.featuredOverlay}>
                    <Text style={styles.featuredTitle} numberOfLines={2}>
                      {podcast.title}
                    </Text>
                    <Text style={styles.featuredAuthor} numberOfLines={1}>
                      {podcast.author}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Recent Podcasts */}
        {recentPodcasts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Continue Listening</Text>
            <PodcastList
              podcasts={recentPodcasts}
              horizontal={true}
            />
          </View>
        )}

        {/* All Podcasts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Podcasts</Text>
          <PodcastList
            podcasts={podcasts}
            horizontal={false}
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
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: layout.spacing.md,
    paddingVertical: layout.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[800],
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
    color: colors.foreground,
    marginLeft: layout.spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  featuredSection: {
    padding: layout.spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.semibold,
    color: colors.foreground,
    marginBottom: layout.spacing.md,
  },
  featuredGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: layout.spacing.sm,
  },
  featuredItem: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: layout.spacing.sm,
    borderRadius: layout.borderRadius.lg,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: layout.spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  featuredTitle: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.semibold,
    color: colors.foreground,
  },
  featuredAuthor: {
    fontSize: typography.sizes.sm,
    color: colors.gray[400],
    marginTop: 2,
  },
  section: {
    paddingHorizontal: layout.spacing.md,
    marginBottom: layout.spacing.xl,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.sizes.md,
    textAlign: 'center',
    padding: layout.spacing.lg,
  },
});