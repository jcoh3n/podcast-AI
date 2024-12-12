// src/store/podcast.ts
import { create } from 'zustand';
import { mockPodcasts } from '../data/mockPodcasts';

export interface Podcast {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  duration: string;
  category?: string;
  description?: string;
}

interface PodcastStore {
  // State
  podcasts: Podcast[];
  likedPodcasts: Set<string>;
  recentPodcasts: Podcast[];
  currentPodcast: Podcast | null;
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  initializeStore: () => void;
  toggleLike: (podcastId: string) => void;
  setCurrentPodcast: (podcast: Podcast) => void;
  togglePlayback: () => void;
}

export const usePodcastStore = create<PodcastStore>((set, get) => ({
  podcasts: [],
  likedPodcasts: new Set(),
  recentPodcasts: [],
  currentPodcast: null,
  isPlaying: false,
  isLoading: false,
  error: null,

  initializeStore: () => {
    set({
      podcasts: mockPodcasts,
      isLoading: false,
      error: null
    });
  },

  toggleLike: (podcastId: string) => {
    const { likedPodcasts } = get();
    const newLiked = new Set(likedPodcasts);
    
    if (newLiked.has(podcastId)) {
      newLiked.delete(podcastId);
    } else {
      newLiked.add(podcastId);
    }
    
    set({ likedPodcasts: newLiked });
  },

  setCurrentPodcast: (podcast: Podcast) => {
    const { recentPodcasts } = get();
    const newRecentPodcasts = [
      podcast,
      ...recentPodcasts.filter(p => p.id !== podcast.id)
    ].slice(0, 5); // Keep only last 5

    set({ 
      currentPodcast: podcast, 
      isPlaying: true,
      recentPodcasts: newRecentPodcasts
    });
  },

  togglePlayback: () => {
    set(state => ({ isPlaying: !state.isPlaying }));
  },
}));