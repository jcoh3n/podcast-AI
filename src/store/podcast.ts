import { create } from 'zustand';

interface Podcast {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  duration: string;
}

interface PodcastStore {
  likedPodcasts: Set<number>;
  currentPodcast: Podcast | null;
  isPlaying: boolean;
  toggleLike: (id: number) => void;
  setCurrentPodcast: (podcast: Podcast) => void;
  togglePlayback: () => void;
}

export const usePodcastStore = create<PodcastStore>((set) => ({
  likedPodcasts: new Set(),
  currentPodcast: null,
  isPlaying: false,
  
  toggleLike: (id) =>
    set((state) => {
      const newLiked = new Set(state.likedPodcasts);
      if (newLiked.has(id)) {
        newLiked.delete(id);
      } else {
        newLiked.add(id);
      }
      return { likedPodcasts: newLiked };
    }),
    
  setCurrentPodcast: (podcast) =>
    set(() => ({
      currentPodcast: podcast,
      isPlaying: true,
    })),
    
  togglePlayback: () =>
    set((state) => ({
      isPlaying: !state.isPlaying,
    })),
}));