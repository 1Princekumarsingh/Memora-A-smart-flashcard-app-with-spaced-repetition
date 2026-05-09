import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist((set, get) => ({
      token: null,
      user: null,
      // hyderate and dehyderate: prevent flicker redirect and auth glitches
      hydrated: false,

      isAuthenticated: () => !!get().token, //get: gives the current store state

      login: ({ token, user }) => {
        set({ token, user });
      },

      logout: () => {
        set({ token: null, user: null });
      },

      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "auth-storage", // key in localStorage

      // Only persist required data
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (!error && state) {
          state.setHydrated();
        }
      },
    }
  )
);

export default useAuthStore;