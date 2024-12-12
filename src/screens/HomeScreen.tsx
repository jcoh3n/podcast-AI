// src/screens/HomeScreen.tsx
import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import PodcastList from '../components/PodcastList';
import { usePodcastStore } from '../store/podcast';
import { colors } from '../theme/colors';

export const HomeScreen = () => {
  const { 
    podcasts,
    recentPodcasts,
    initializeStore 
  } = usePodcastStore();

  useEffect(() => {
    initializeStore();
  }, []);

  const featuredPodcasts = podcasts.filter(podcast => 
    podcast.category === 'featured'
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <PodcastList
          title="Featured Podcasts"
          podcasts={featuredPodcasts}
        />
        
        {recentPodcasts.length > 0 && (
          <PodcastList
            title="Recently Played"
            podcasts={recentPodcasts}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingVertical: 16,
  },
});