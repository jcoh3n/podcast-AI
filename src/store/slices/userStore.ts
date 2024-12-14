import { create } from 'zustand';

interface UserState {
  userId: string | null;
  username: string | null;
  isLoggedIn: boolean;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
  
  setUser: (userId: string, username: string) => void;
  clearUser: () => void;
  updatePreferences: (preferences: Partial<UserState['preferences']>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  username: null,
  isLoggedIn: false,
  preferences: {
    theme: 'dark',
    notifications: true,
  },

  setUser: (userId, username) => {
    set({ userId, username, isLoggedIn: true });
  },

  clearUser: () => {
    set({ userId: null, username: null, isLoggedIn: false });
  },

  updatePreferences: (newPreferences) => {
    set((state) => ({
      preferences: { ...state.preferences, ...newPreferences },
    }));
  },
}));
