import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { usePlaybackStore } from '../../../store/slices/playbackStore';
import { colors } from '../../../theme/colors'; // Ajout de l'import manquant

interface Props {
  sound: Audio.Sound | null;
}

export const ProgressBar: React.FC<Props> = ({ sound }) => {
  const { progress, duration } = usePlaybackStore();
  
  const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;
  
  const handleSeek = async (evt: any) => {
    if (!sound) return;
    
    const { locationX, measure } = evt.nativeEvent;
    const progressBarWidth = measure?.width || 300;
    const percentage = locationX / progressBarWidth;
    const newPosition = percentage * duration;
    
    try {
      await sound.setPositionAsync(newPosition * 1000);
    } catch (error) {
      console.error('Error seeking:', error);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
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
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    justifyContent: 'center',
    paddingHorizontal: 12,
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
});
