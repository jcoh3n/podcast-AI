// src/components/PodcastList/index.tsx
import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usePodcastStore } from '../../store/podcast';
import { Podcast } from '../../types/podcast';

interface PodcastItemProps extends Podcast {}

const PodcastItem: React.FC<PodcastItemProps> = (props) => {
  const { likedPodcasts, toggleLike, setCurrentPodcast } = usePodcastStore();
  const isLiked = likedPodcasts.has(props.id);

  const handlePlay = () => {
    setCurrentPodcast(props);
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity 
        onPress={handlePlay} 
        style={styles.imageContainer}
        accessibilityLabel={`Play ${props.title} by ${props.author}`}
        accessibilityRole="button"
      >
        <Image source={{ uri: props.coverUrl }} style={styles.image} />
        <View style={styles.playButton}>
          <MaterialCommunityIcons name="play" size={16} color="white" />
        </View>
      </TouchableOpacity>
      
      <View style={styles.textContent}>
        <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
        <Text style={styles.author} numberOfLines={1}>{props.author}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.duration}>{props.duration}</Text>
          <TouchableOpacity 
            onPress={() => toggleLike(props.id)}
            style={styles.likeButton}
            accessibilityLabel={isLiked ? "Unlike podcast" : "Like podcast"}
            accessibilityRole="button"
            accessibilityState={{ selected: isLiked }}
          >
            <MaterialCommunityIcons
              name={isLiked ? "heart" : "heart-outline"}
              size={16}
              color={isLiked ? '#8B5CF6' : '#9CA3AF'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

interface PodcastListProps {
  title: string;
  podcasts: Podcast[];
}

const PodcastList: React.FC<PodcastListProps> = ({
  title,
  podcasts,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {podcasts.map((podcast) => (
          <PodcastItem key={podcast.id} {...podcast} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 12,
  },
  itemContainer: {
    width: 160,
    marginHorizontal: 4,
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.5)',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#8B5CF6',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    padding: 8,
  },
  title: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  author: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duration: {
    color: '#6B7280',
    fontSize: 12,
  },
  likeButton: {
    padding: 4,
  },
});

export default PodcastList;