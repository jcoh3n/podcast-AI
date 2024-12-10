import { create } from 'zustand';

interface Podcast {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  duration: string;
  liked: boolean;
}

interface PodcastStore {
  likedPodcasts: Set<number>;
  toggleLike: (id: number) => void;
}

export const usePodcastStore = create<PodcastStore>((set) => ({
  likedPodcasts: new Set(),
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
}));
