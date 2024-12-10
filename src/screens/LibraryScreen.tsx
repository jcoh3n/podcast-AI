import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { PodcastCard } from '../components/PodcastCard';
import { usePodcastStore } from '../store/podcast';

const allPodcasts = [
  {
    id: 1,
    title: "The Future of AI",
    author: "Tech Insights",
    coverUrl: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74",
    duration: "45 min"
  },
  {
    id: 2,
    title: "Science Weekly",
    author: "Nature Podcast",
    coverUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d",
    duration: "30 min"
  },
  {
    id: 3,
    title: "Business Insights",
    author: "Market Watch",
    coverUrl: "https://images.unsplash.com/photo-1661956601030-fdfb9c7e9e2f",
    duration: "60 min"
  }
];

export const LibraryScreen = () => {
  const { likedPodcasts } = usePodcastStore();
  const likedPodcastsList = allPodcasts.filter((podcast) => 
    likedPodcasts.has(podcast.id)
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Your Library</Text>
        {likedPodcastsList.length > 0 ? (
          <View style={styles.grid}>
            {likedPodcastsList.map((podcast) => (
              <PodcastCard
                key={podcast.id}
                {...podcast}
                onPlay={() => console.log(`Playing ${podcast.title}`)}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              No liked podcasts yet. Start exploring and like some podcasts!
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  grid: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    color: '#9CA3AF',
    textAlign: 'center',
    fontSize: 16,
  },
});
