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
        playThroughEarpieceAndroid: false,
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
        this.sound = null;
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { 
          shouldPlay: false,
          progressUpdateIntervalMillis: 500,
          positionMillis: 0,
        },
        this.onPlaybackStatusUpdate,
      );

      this.sound = sound;
    } catch (error) {
      console.error('Error loading audio:', error);
      throw error;
    }
  }

  async playPause(isPlaying: boolean) {
    if (!this.sound) return;
    
    try {
      if (isPlaying) {
        const status = await this.sound.getStatusAsync();
        if (status.isLoaded) {
          await this.sound.playAsync();
        }
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
      const status = await this.sound.getStatusAsync();
      if (status.isLoaded) {
        await this.sound.setPositionAsync(position * 1000);
      }
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
      try {
        await this.sound.unloadAsync();
        this.sound = null;
      } catch (error) {
        console.error('Error cleaning up audio:', error);
      }
    }
  }
}

export default AudioService.getInstance();
