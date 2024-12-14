import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AudioService {
  private static instance: AudioService;
  private sound: Audio.Sound | null = null;
  private isInitialized = false;
  private onProgressUpdate: ((progress: number, duration: number) => void) | null = null;

  private constructor() {}

  static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  setProgressCallback(callback: (progress: number, duration: number) => void) {
    this.onProgressUpdate = callback;
  }

  async initialize() {
    if (this.isInitialized) return;
    
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
      });

      this.isInitialized = true;
    } catch (error) {
      console.error('Error initializing audio:', error);
      throw error;
    }
  }

  private onPlaybackStatusUpdate = (status: any) => {
    if (!status.isLoaded || !this.onProgressUpdate) return;
    
    const progress = status.positionMillis / 1000;
    const duration = status.durationMillis / 1000;
    this.onProgressUpdate(progress, duration);
  };

  async loadAudio(uri: string): Promise<void> {
    try {
      if (this.sound) {
        await this.sound.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: false },
        this.onPlaybackStatusUpdate
      );

      this.sound = sound;
      await sound.setProgressUpdateIntervalAsync(500); // Update every 500ms
    } catch (error) {
      console.error('Error loading audio:', error);
      throw error;
    }
  }

  async playPause(isPlaying: boolean) {
    if (!this.sound) return;
    
    try {
      if (isPlaying) {
        await this.sound.playAsync();
      } else {
        await this.sound.pauseAsync();
      }
    } catch (error) {
      console.error('Error playing/pausing:', error);
      throw error;
    }
  }

  async seek(position: number) {
    if (!this.sound) return;
    try {
      await this.sound.setPositionAsync(position * 1000);
    } catch (error) {
      console.error('Error seeking:', error);
      throw error;
    }
  }

  async saveProgress(podcastId: string, position: number) {
    try {
      await AsyncStorage.setItem(
        `@podcast_progress_${podcastId}`,
        position.toString()
      );
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  async cleanup() {
    if (this.sound) {
      await this.sound.unloadAsync();
      this.sound = null;
    }
  }
}

export default AudioService.getInstance();
