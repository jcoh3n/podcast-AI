import { create } from 'zustand';
import { askQuestionAboutPodcast } from '../../services/ai';
import { usePlaybackStore } from './playbackStore';

interface AIState {
  asking: boolean;
  response: string | null;
  error: string | null;
  askQuestion: (question: string) => Promise<void>;
  clearResponse: () => void;
}

export const useAIStore = create<AIState>((set, get) => ({
  asking: false,
  response: null,
  error: null,

  askQuestion: async (question: string) => {
    const { currentPodcast } = usePlaybackStore.getState();
    if (!currentPodcast) return;

    set({ asking: true, error: null });
    try {
      const answer = await askQuestionAboutPodcast(
        currentPodcast.id,
        question
      );
      set({ response: answer, asking: false });
    } catch (error) {
      set({ 
        error: 'Failed to get answer',
        asking: false
      });
    }
  },

  clearResponse: () => {
    set({ response: null, error: null });
  },
}));
