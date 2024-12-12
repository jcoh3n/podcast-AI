import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usePodcastStore } from '../../store/podcast';

export const AudioPlayer = () => {
  const { currentPodcast, isPlaying, togglePlayback } = usePodcastStore();

  if (!currentPodcast) return null;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Image
            source={{ uri: currentPodcast.coverUrl }}
            style={styles.cover}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {currentPodcast.title}
            </Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              {currentPodcast.author}
            </Text>
          </View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity 
            style={styles.controlButton}
            accessibilityLabel="Previous track"
            accessibilityRole="button"
          >
            <MaterialCommunityIcons name="skip-previous" size={24} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.playButton} 
            onPress={togglePlayback}
            accessibilityLabel={isPlaying ? "Pause" : "Play"}
            accessibilityRole="button"
            accessibilityState={{ selected: isPlaying }}
          >
            <MaterialCommunityIcons 
              name={isPlaying ? "pause" : "play"} 
              size={28} 
              color="white"
              style={styles.playIcon}
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.controlButton}
            accessibilityLabel="Next track"
            accessibilityRole="button"
          >
            <MaterialCommunityIcons name="skip-next" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cover: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  titleContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  controlButton: {
    padding: 8,
  },
  playButton: {
    backgroundColor: '#8B5CF6',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  playIcon: {
    marginLeft: Platform.OS === 'ios' ? 2 : 0,
  },
});