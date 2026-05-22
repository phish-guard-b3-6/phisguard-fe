// store/useAuthStore.ts
import { create } from "zustand";

// Struktur data ini persis dengan kembalian endpoint /login
interface UserProfile {
  userID: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "user" | "admin";
  is_verified: boolean;
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isHydrating: boolean; // true saat pertama kali fetch /me belum selesai
  setUser: (user: UserProfile | null) => void;
  fetchCurrentUser: () => Promise<UserProfile | null>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isHydrating: true, // mulai true, jadi false setelah fetch pertama selesai

  setUser: (user) =>
    set({
      user: user,
      isAuthenticated: !!user,
    }),

  // Dipanggil di layout untuk mengambil data user dari /me
  fetchCurrentUser: async () => {
    try {
      const res = await fetch("/api/me", { credentials: "include" });
      if (!res.ok) {
        set({ user: null, isAuthenticated: false, isHydrating: false });
        return null;
      }
      const data = await res.json();
      const user: UserProfile = data.users;
      set({ user, isAuthenticated: true, isHydrating: false });
      return user;
    } catch {
      set({ user: null, isAuthenticated: false, isHydrating: false });
      return null;
    }
  },
}));
