import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio/Sound';

let sound: Sound | null = null;

export const initializeAudio = async () => {
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
  } catch (error) {
    console.error('Failed to initialize audio:', error);
  }
};

export const loadAudio = async (uri: string): Promise<Sound> => {
  try {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: false }
    );
    sound = newSound;
    return newSound;
  } catch (error) {
    console.error('Failed to load audio:', error);
    throw error;
  }
};

export const playAudio = async (uri: string) => {
  try {
    const audioSound = await loadAudio(uri);
    await audioSound.playAsync();
  } catch (error) {
    console.error('Failed to play audio:', error);
  }
};

export const pauseAudio = async () => {
  try {
    if (sound) {
      await sound.pauseAsync();
    }
  } catch (error) {
    console.error('Failed to pause audio:', error);
  }
};

export const seekAudio = async (position: number) => {
  try {
    if (sound) {
      await sound.setPositionAsync(position * 1000); // Convert to milliseconds
    }
  } catch (error) {
    console.error('Failed to seek audio:', error);
  }
};
