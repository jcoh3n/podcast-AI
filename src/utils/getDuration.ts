// src/utils/getDuration.ts
import { Audio } from 'expo-av';

export const getAudioDuration = async (uri: string): Promise<number> => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: false }
    );
    const status = await sound.getStatusAsync();
    await sound.unloadAsync();
    return Math.floor((status as any).durationMillis / 1000); // Convert to seconds
  } catch (error) {
    console.error('Error getting duration:', error);
    return 0;
  }
};