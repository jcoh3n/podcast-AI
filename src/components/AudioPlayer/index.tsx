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
        <View style={styles.content}>
          <View style={styles.leftSection}>
            <Image
              source={{ uri: currentPodcast.coverUrl }}
              style={styles.cover}
              accessibilityLabel={`Cover image for ${currentPodcast.title}`}
            />
            <View style={styles.titleContainer}>
              <Text 
                style={styles.title} 
                numberOfLines={1}
                accessibilityLabel={`Now playing: ${currentPodcast.title}`}
              >
                {currentPodcast.title}
              </Text>
              <Text 
                style={styles.subtitle} 
                numberOfLines={1}
                accessibilityLabel={`By ${currentPodcast.author}`}
              >
                {currentPodcast.author}
              </Text>
            </View>
          </View>

          <View style={styles.rightSection}>
            <ProgressBar />
            <View style={styles.controls}>
              <TouchableOpacity 
                style={styles.controlButton}
                onPress={() => console.log('Previous track')}
                accessibilityLabel="Previous track"
                accessibilityRole="button"
                accessibilityHint="Play previous episode"
              >
                <MaterialCommunityIcons 
                  name="skip-previous" 
                  size={24} 
                  color={colors.foreground} 
                />
              </TouchableOpacity>
              
              {isLoading ? (
                <View style={styles.playButton}>
                  <ActivityIndicator color={colors.foreground} />
                </View>
              ) : (
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
                    color={colors.foreground}
                  />
                </TouchableOpacity>
              )}
              
              <TouchableOpacity 
                style={styles.controlButton}
                onPress={() => console.log('Next track')}
                accessibilityLabel="Next track"
                accessibilityRole="button"
                accessibilityHint="Play next episode"
              >
                <MaterialCommunityIcons 
                  name="skip-next" 
                  size={24} 
                  color={colors.foreground} 
                />
              </TouchableOpacity>
            </View>
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
    bottom: Platform.OS === 'ios' ? 88 : 60,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.gray[700],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    marginRight: 12,
  },
  cover: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.gray[800],
  },
  titleContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    color: colors.foreground,
    fontSize: 16,
    fontWeight: '500',
  },
  subtitle: {
    color: colors.gray[400],
    fontSize: 14,
  },
  rightSection: {
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  controlButton: {
    padding: 8,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: colors.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  }
});