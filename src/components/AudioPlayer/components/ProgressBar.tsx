import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { usePlaybackStore } from '../../../store/slices/playbackStore';
import { colors } from '../../../theme/colors';

export const ProgressBar = () => {
  const { progress, duration, seekTo } = usePlaybackStore();

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
      <TouchableOpacity style={styles.progressBar} onPress={handleSeek}>
        <View style={styles.background}>
          <View style={[styles.progress, { width: `${progressPercentage}%` }]} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  progressBar: {
    height: 16,
    justifyContent: 'center',
  },
  background: {
    height: 4,
    backgroundColor: colors.gray[700],
    borderRadius: 2,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: colors.primary,
  },
});
