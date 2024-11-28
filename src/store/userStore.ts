import { create } from 'zustand';

interface UserState {
  userId: string | null;
  isLoggedIn: boolean;
  login: (userId: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  isLoggedIn: false,
  login: (userId: string) => set({ userId, isLoggedIn: true }),
  logout: () => set({ userId: null, isLoggedIn: false }),
}));
