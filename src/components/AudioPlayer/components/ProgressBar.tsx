import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { usePlaybackStore } from '../../../store/slices/playbackStore';
import { colors } from '../../../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ProgressBar = () => {
  const { progress, duration, seekTo } = usePlaybackStore();

  const handleSeek = (event: any) => {
    const { locationX } = event.nativeEvent;
    const progressBarWidth = SCREEN_WIDTH - 64; // Accounts for margins
    const percentage = locationX / progressBarWidth;
    const newPosition = percentage * duration;
    seekTo(newPosition);
  };

  const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.touchArea} 
        onPress={handleSeek}
        activeOpacity={0.6}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    top: 6,
    alignItems: 'center',
  },
  touchArea: {
    width: '100%',
    height: 20,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  background: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 1,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 1,
  },
});

export default ProgressBar;