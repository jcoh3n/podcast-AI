import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usePodcastStore } from '../../store/podcast';
import { colors } from '../../theme/colors';
import { ProgressBar } from './components/ProgressBar';
import { usePlaybackStore } from '../../store/slices/playbackStore';
import { AudioErrorBoundary } from './ErrorBoundary';

export const AudioPlayer = () => {
  const { currentPodcast } = usePodcastStore();
  const { isLoading, isPlaying, togglePlayback, setCurrentPodcast } = usePlaybackStore();

  const handleRetry = () => {
    if (currentPodcast) {
      setCurrentPodcast(currentPodcast);
    }
  };

  if (!currentPodcast) return null;

  return (
    <AudioErrorBoundary onRetry={handleRetry}>
      <View style={styles.container}>
        {/* Progress Bar */}
        <ProgressBar style={styles.progressBar} />

        <View style={styles.controlsContainer}>
          {/* Left Side: Podcast Info */}
          <View style={styles.leftSide}>
            <Image
              source={{ uri: currentPodcast.coverUrl }}
              style={styles.cover}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={1}>{currentPodcast.title}</Text>
              <Text style={styles.author} numberOfLines={1}>{currentPodcast.author}</Text>
            </View>
          </View>

          {/* Right Side: Play/Pause Button */}
          <View style={styles.rightSide}>
            {isLoading ? (
              <ActivityIndicator color={colors.foreground} size={18} />
            ) : (
              <TouchableOpacity 
                style={styles.playButton} 
                onPress={togglePlayback}
                accessible={true} 
                accessibilityLabel={isPlaying ? "Pause" : "Play"}
                accessibilityRole="button"
              >
                <MaterialCommunityIcons 
                  name={isPlaying ? "pause" : "play"} 
                  size={24} 
                  color={colors.foreground} 
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </AudioErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 100 : 80,
    backgroundColor: colors.card,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexDirection: 'column',
    alignItems: 'center',
    opacity: 0.95,
    height: 70,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  progressBar: {
  width: '90%',
  height: 2,
  backgroundColor: colors.gray[600],
  borderRadius: 1,
  marginTop: 4, // Adding a small margin to the top to push the progress bar down slightly
  marginBottom: 0, // Removing margin at the bottom to bring it closer to the top
},
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSide: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  cover: {
    width: 36,
    height: 36,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 2,
    borderColor: colors.foreground,
  },
  textContainer: {
    flexDirection: 'column',
    maxWidth: 160,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.foreground,
  },
  author: {
    fontSize: 10,
    color: colors.gray[400],
  },
  playButton: {
    padding: 6,
    backgroundColor: 'transparent',
    opacity: 0.8,
  },
});
