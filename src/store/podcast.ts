import { usePlaybackStore } from './slices/playbackStore';
import { useLibraryStore } from './slices/libraryStore';
import { useUserStore } from './slices/userStore';
import { Podcast } from '../types/podcast';

// Store combiné pour la rétrocompatibilité
export const usePodcastStore = () => {
  const playback = usePlaybackStore();
  const library = useLibraryStore();
  const user = useUserStore();

  return {
    // Playback
    currentPodcast: playback.currentPodcast,
    isPlaying: playback.isPlaying,
    togglePlayback: playback.togglePlayback,
    setCurrentPodcast: (podcast: Podcast) => {
      playback.setCurrentPodcast(podcast);
      library.addToRecent(podcast);
    },

    // Library
    podcasts: library.podcasts,
    likedPodcasts: library.likedPodcasts,
    recentPodcasts: library.recentPodcasts,
    isLoading: library.isLoading,
    error: library.error,
    initializeStore: library.initializeLibrary,
    toggleLike: library.toggleLike,

    // User
    userId: user.userId,
    isLoggedIn: user.isLoggedIn,
    preferences: user.preferences,
  };
};

export type { Podcast };
