import { create } from 'zustand';
import { Podcast } from '../../types/podcast';

interface PlaybackState {
  currentPodcast: Podcast | null;
  isPlaying: boolean;
  duration: number;
  progress: number;
  playbackRate: number;
  setCurrentPodcast: (podcast: Podcast) => void;
  togglePlayback: () => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  setPlaybackRate: (rate: number) => void;
}

export const usePlaybackStore = create<PlaybackState>((set) => ({
  currentPodcast: null,
  isPlaying: false,
  duration: 0,
  progress: 0,
  playbackRate: 1,

  setCurrentPodcast: (podcast) => {
    set({
      currentPodcast: podcast,
      isPlaying: true,
      progress: 0,
      duration: 0,
    });
  },

  togglePlayback: () => {
    set((state) => ({ isPlaying: !state.isPlaying }));
  },

  setProgress: (progress) => {
    set({ progress });
  },

  setDuration: (duration) => {
    set({ duration });
  },

  setPlaybackRate: (playbackRate) => {
    set({ playbackRate });
  },
}));
