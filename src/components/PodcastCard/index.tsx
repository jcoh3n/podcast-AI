import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usePodcastStore } from '../../store/podcast';
import { Podcast } from '../../types/podcast';

interface PodcastCardProps extends Podcast {}

export const PodcastCard: React.FC<PodcastCardProps> = (props) => {
  const { likedPodcasts, toggleLike, setCurrentPodcast } = usePodcastStore();
  const isLiked = likedPodcasts.has(props.id);

  const handlePlay = () => {
    setCurrentPodcast(props);
  };
  
  return (
    <View style={styles.card}>
      <TouchableOpacity 
        onPress={handlePlay} 
        style={styles.imageContainer}
        accessibilityLabel={`Play ${props.title} by ${props.author}`}
        accessibilityRole="button"
      >
        <Image source={{ uri: props.coverUrl }} style={styles.image} />
        <View style={styles.playButton}>
          <MaterialCommunityIcons name="play" size={24} color="white" />
        </View>
      </TouchableOpacity>
      
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
            <Text style={styles.author}>{props.author}</Text>
          </View>
          <TouchableOpacity 
            onPress={() => toggleLike(props.id)}
            accessibilityLabel={isLiked ? "Unlike podcast" : "Like podcast"}
            accessibilityRole="button"
            accessibilityState={{ selected: isLiked }}
          >
            <MaterialCommunityIcons
              name={isLiked ? "heart" : "heart-outline"}
              size={24}
              color={isLiked ? '#8B5CF6' : '#9CA3AF'}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.duration}>{props.duration}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.5)',
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -22 }, { translateY: -22 }],
    backgroundColor: '#8B5CF6',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  author: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  duration: {
    color: '#6B7280',
    fontSize: 12,
  },
});