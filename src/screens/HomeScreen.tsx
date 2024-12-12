import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import PodcastList from '../components/PodcastList';
import { usePodcastStore } from '../store/podcast';

export const HomeScreen = () => {
  const featuredPodcasts = [
    {
      id: 1,
      title: "The Future of AI",
      author: "Tech Insights",
      coverUrl: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74",
      duration: "45 min",
    },
    {
      id: 2,
      title: "Science Weekly",
      author: "Nature Podcast",
      coverUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d",
      duration: "30 min",
    },
    {
      id: 3,
      title: "Business Insights",
      author: "Market Watch",
      coverUrl: "https://images.unsplash.com/photo-1661956601030-fdfb9c7e9e2f",
      duration: "60 min",
    }
  ];

  const recentPodcasts = [
    {
      id: 4,
      title: "Tech Today",
      author: "Daily Tech",
      coverUrl: "https://images.unsplash.com/photo-1535303311164-664fc9ec6532",
      duration: "25 min",
    },
    {
      id: 5,
      title: "History Hour",
      author: "History Channel",
      coverUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1",
      duration: "50 min",
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <PodcastList
          title="Featured Podcasts"
          podcasts={featuredPodcasts}
        />
        <PodcastList
          title="Recent Episodes"
          podcasts={recentPodcasts}
        />
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
    paddingVertical: 16,
  },
});