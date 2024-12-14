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
    }
  },

  togglePlayback: async () => {
    const { isPlaying } = get();
    try {
      await AudioService.playPause(!isPlaying);
      set({ isPlaying: !isPlaying });
    } catch (error) {
      set({ error: 'Playback error occurred' });
    }
  },

  seekTo: async (position) => {
    try {
      await AudioService.seek(position);
      set({ progress: position });
    } catch (error) {
      set({ error: 'Seek error occurred' });
    }
  },

  updateProgress: (progress, duration) => {
    set({ progress, duration });
    const { currentPodcast } = get();
    if (currentPodcast) {
      AudioService.saveProgress(currentPodcast.id, progress);
    }
  }
}));
