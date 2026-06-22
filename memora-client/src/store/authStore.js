import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist((set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      // hyderate and dehyderate: prevent flicker redirect and auth glitches
      hydrated: false,

      isAuthenticated: () => !!get().accessToken, //get: gives the current store state

      login: ({ accessToken, refreshToken, user }) => {
        set({ accessToken, refreshToken, user });
      },

      logout: () => {
        set({ accessToken: null, refreshToken: null, user: null });
      },

      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "auth-storage", // key in localStorage

      // Only persist required data
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
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