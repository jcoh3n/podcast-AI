import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { PodcastCard } from '../components/PodcastCard';

export const HomeScreen = () => {
  const featuredPodcasts = [
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

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>Featured Podcasts</Text>
          {featuredPodcasts.map((podcast) => (
            <PodcastCard
              key={podcast.id}
              {...podcast}
              onPlay={() => console.log(`Playing ${podcast.title}`)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
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
    color: '#FFFFFF',
    marginBottom: 16,
    fontWeight: '600',
  },
});