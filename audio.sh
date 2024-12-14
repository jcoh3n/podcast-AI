#!/bin/bash

echo "🔧 Fixing audio loading issues..."

# 1. First, update mock data with working audio files
echo "📝 Updating mock podcast data..."
cat > src/data/mockPodcasts.ts << 'EOL'
export const mockPodcasts = [
  {
    id: "1",
    title: "Introduction to AI",
    author: "Tech Insights",
    coverUrl: "https://picsum.photos/400/400?random=1",
    duration: "45:30",
    category: "featured",
    description: "A deep dive into artificial intelligence fundamentals",
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav",
    publishDate: "2024-03-14",
    totalDuration: 2730,
    episodeNumber: 1,
    fileSize: "24.5 MB"
  },
  {
    id: "2",
    title: "Nature Sounds",
    author: "Meditation Channel",
    coverUrl: "https://picsum.photos/400/400?random=2",
    duration: "05:00",
    category: "meditation",
    description: "Relaxing nature sounds for meditation",
    audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand60.wav",
    publishDate: "2024-03-14",
    totalDuration: 300,
    episodeNumber: 2,
    fileSize: "5.2 MB"
  }
];
EOL

# 2. Update AudioService with improved error handling
echo "🔄 Updating AudioService..."
cat > src/services/AudioService.ts << 'EOL'
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
EOL

# 3. Update PlaybackStore with better error handling
echo "🔄 Updating PlaybackStore..."
cat > src/store/slices/playbackStore.ts << 'EOL'
import { create } from 'zustand';
import { Podcast } from '../../types/podcast';
import AudioService from '../../services/AudioService';

interface PlaybackState {
  currentPodcast: Podcast | null;
  isLoading: boolean;
  isPlaying: boolean;
  duration: number;
  progress: number;
  error: string | null;

  setCurrentPodcast: (podcast: Podcast) => Promise<void>;
  togglePlayback: () => Promise<void>;
  seekTo: (position: number) => Promise<void>;
  updateProgress: (progress: number, duration: number) => void;
  cleanup: () => Promise<void>;
}

export const usePlaybackStore = create<PlaybackState>((set, get) => ({
  currentPodcast: null,
  isLoading: false,
  isPlaying: false,
  duration: 0,
  progress: 0,
  error: null,

  setCurrentPodcast: async (podcast) => {
    set({ isLoading: true, error: null });
    
    try {
      await AudioService.initialize();
      await AudioService.loadAudio(podcast.audioUrl);
      
      AudioService.setProgressCallback((progress, duration) => {
        get().updateProgress(progress, duration);
      });
      
      set({
        currentPodcast: podcast,
        isPlaying: true,
        progress: 0,
        duration: 0,
        isLoading: false
      });
      
      await AudioService.playPause(true);
    } catch (error) {
      set({ 
        error: 'Failed to load podcast',
        isLoading: false 
      });
      throw error;
    }
  },

  togglePlayback: async () => {
    const { isPlaying } = get();
    try {
      await AudioService.playPause(!isPlaying);
      set({ isPlaying: !isPlaying });
    } catch (error) {
      set({ error: 'Playback error occurred' });
      throw error;
    }
  },

  seekTo: async (position) => {
    try {
      await AudioService.seek(position);
      set({ progress: position });
    } catch (error) {
      set({ error: 'Seek error occurred' });
      throw error;
    }
  },

  updateProgress: (progress, duration) => {
    set({ progress, duration });
    const { currentPodcast } = get();
    if (currentPodcast) {
      AudioService.saveProgress(currentPodcast.id, progress);
    }
  },

  cleanup: async () => {
    try {
      await AudioService.cleanup();
      set({
        currentPodcast: null,
        isPlaying: false,
        progress: 0,
        duration: 0,
        error: null
      });
    } catch (error) {
      console.error('Error cleaning up playback:', error);
    }
  }
}));
EOL

echo "✅ Audio loading fixes have been applied!"
echo ""
echo "🧪 Testing Steps:"
echo "1. Verify audio loading with new configuration"
echo "2. Test play/pause functionality"
echo "3. Test seeking functionality"
echo "4. Verify error handling works properly"
echo "5. Check cleanup works when switching podcasts"