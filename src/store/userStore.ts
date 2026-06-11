import { create } from 'zustand';

interface UserState {
  favorites: string[];
  learned: string[];
  toggleFavorite: (tacticId: string) => void;
  markAsLearned: (tacticId: string) => void;
}

const STORAGE_KEY_FAVORITES = 'cs2-tactic-favorites';
const STORAGE_KEY_LEARNED = 'cs2-tactic-learned';

const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error('Failed to save to localStorage');
  }
};

export const useUserStore = create<UserState>((set) => ({
  favorites: loadFromStorage<string[]>(STORAGE_KEY_FAVORITES, []),
  learned: loadFromStorage<string[]>(STORAGE_KEY_LEARNED, []),

  toggleFavorite: (tacticId) => set((state) => {
    const newFavorites = state.favorites.includes(tacticId)
      ? state.favorites.filter(id => id !== tacticId)
      : [...state.favorites, tacticId];
    saveToStorage(STORAGE_KEY_FAVORITES, newFavorites);
    return { favorites: newFavorites };
  }),

  markAsLearned: (tacticId) => set((state) => {
    const newLearned = state.learned.includes(tacticId)
      ? state.learned.filter(id => id !== tacticId)
      : [...state.learned, tacticId];
    saveToStorage(STORAGE_KEY_LEARNED, newLearned);
    return { learned: newLearned };
  }),
}));
