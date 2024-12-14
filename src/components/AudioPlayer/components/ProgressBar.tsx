import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { usePlaybackStore } from '../../../store/slices/playbackStore';
import { colors } from '../../../theme/colors';

export const ProgressBar = () => {
  const { progress, duration, seekTo } = usePlaybackStore();
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (event: any) => {
    const { locationX, measure } = event.nativeEvent;
    const progressBarWidth = measure?.width || 300;
    const percentage = locationX / progressBarWidth;
    const newPosition = percentage * duration;
    seekTo(newPosition);
  };

  const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.progressBar} 
        onPress={handleSeek}
      >
        <View style={styles.background}>
          <View 
            style={[
              styles.progress, 
              { width: `${progressPercentage}%` }
            ]} 
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.timeText}>
        {formatTime(progress)} / {formatTime(duration)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
  },
  progressBar: {
    height: 20,
    justifyContent: 'center',
  },
  background: {
    height: 3,
    backgroundColor: colors.gray[700],
    borderRadius: 1.5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  timeText: {
    color: colors.gray[400],
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  }
});
