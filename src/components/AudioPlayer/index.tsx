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
    width: '100%',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 100 : 80, // Adjust bottom space for all platforms
    backgroundColor: colors.card, // Use consistent background color
    borderRadius: 24, // Rounded corners for a "bubble" look
    paddingHorizontal: 16,
    paddingBottom: 8, // Reduced bottom padding for a thinner look
    flexDirection: 'column',
    alignItems: 'center',
    opacity: 0.95, // Smooth opacity for subtle effect
    height: 70, // Reduced height to make it thinner
  },
  progressBar: {
    width: '90%', 
    height: 2, // Thinner progress bar
    backgroundColor: colors.gray[600],
    borderRadius: 1, // Rounded corners on the progress bar
    marginBottom: 8, // Less space between progress bar and controls
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
    marginLeft: 12, // Slightly reduced margin for button
  },
  cover: {
    width: 36, // Slightly smaller cover for a thinner look
    height: 36,
    borderRadius: 8, 
    marginRight: 12,
    borderWidth: 2,
    borderColor: colors.foreground,
  },
  textContainer: {
    flexDirection: 'column',
    maxWidth: 160, // Slightly reduced max width to fit in a thinner layout
  },
  title: {
    fontSize: 14, // Smaller title for a more compact look
    fontWeight: '600',
    color: colors.foreground,
  },
  author: {
    fontSize: 10, // Smaller author text
    color: colors.gray[400],
  },
  playButton: {
    padding: 6, // Reduced padding for a smaller button
    backgroundColor: 'transparent', // No background for simplicity
    opacity: 0.8, // Slight opacity effect when active
  },
});
