import { create } from 'zustand';
import { Podcast } from '../../types/podcast';
import { mockPodcasts } from '../../data/mockPodcasts';

interface LibraryState {
  podcasts: Podcast[];
  likedPodcasts: Set<string>;
  recentPodcasts: Podcast[];
  isLoading: boolean;
  error: string | null;
  
  initializeLibrary: () => void;
  toggleLike: (podcastId: string) => void;
  addToRecent: (podcast: Podcast) => void;
}

export const useLibraryStore = create<LibraryState>((set, get) => ({
  podcasts: [],
  likedPodcasts: new Set(),
  recentPodcasts: [],
  isLoading: false,
  error: null,

  initializeLibrary: () => {
    set({
      podcasts: mockPodcasts,
      isLoading: false,
      error: null,
    });
  },

  toggleLike: (podcastId) => {
    set((state) => {
      const newLiked = new Set(state.likedPodcasts);
      if (newLiked.has(podcastId)) {
        newLiked.delete(podcastId);
      } else {
        newLiked.add(podcastId);
      }
      return { likedPodcasts: newLiked };
    });
  },

  addToRecent: (podcast) => {
    set((state) => ({
      recentPodcasts: [
        podcast,
        ...state.recentPodcasts.filter((p) => p.id !== podcast.id),
      ].slice(0, 5),
    }));
  },
}));
