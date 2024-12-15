import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, ActivityIndicator, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usePodcastStore } from '../../store/podcast';
import { colors } from '../../theme/colors';
import { ProgressBar } from './components/ProgressBar';
import { usePlaybackStore } from '../../store/slices/playbackStore';
import { AudioErrorBoundary } from './ErrorBoundary';

export const AudioPlayer = () => {
  const { currentPodcast } = usePodcastStore();
  const { isLoading, isPlaying, togglePlayback, setCurrentPodcast } = usePlaybackStore();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleRetry = () => {
    if (currentPodcast) {
      setCurrentPodcast(currentPodcast);
    }
  };

  if (!currentPodcast) return null;

  return (
    <AudioErrorBoundary onRetry={handleRetry}>
      <Animated.View style={[
        styles.container,
        {
          transform: [
            { translateY: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0]
            })},
            { scale: scaleAnim }
          ],
          opacity: slideAnim
        }
      ]}>
        <View style={styles.progressBarContainer}>
          <ProgressBar style={styles.progressBar} />
        </View>
        
        <View style={styles.controlsContainer}>
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

          <View style={styles.rightSide}>
            {isLoading ? (
              <ActivityIndicator color={colors.primary} size={24} />
            ) : (
              <TouchableOpacity 
                style={styles.playButton} 
                onPress={togglePlayback}
                accessible={true} 
                accessibilityLabel={isPlaying ? "Pause" : "Play"}
                accessibilityRole="button"
              >
                <View style={styles.playButtonInner}>
                  <MaterialCommunityIcons 
                    name={isPlaying ? "pause" : "play"} 
                    size={28} 
                    color={colors.foreground} 
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Animated.View>
    </AudioErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 80 : 60,
    left: 0,
    right: 0,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    height: 72,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 1000,
    // Glassmorphism effect
    backgroundColor: 'rgba(31, 41, 55, 0.85)',
    backdropFilter: 'blur(10px)',
  },
  progressBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  progressBar: {
    width: '100%',
    height: 3,
    backgroundColor: `${colors.primary}33`,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginTop: 8,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cover: {
    width: 42,
    height: 42,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: `${colors.primary}33`,
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.foreground,
    marginBottom: 2,
  },
  author: {
    fontSize: 12,
    color: colors.gray[400],
  },
  rightSide: {
    marginLeft: 16,
  },
  playButton: {
    padding: 8,
  },
  playButtonInner: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  }
});