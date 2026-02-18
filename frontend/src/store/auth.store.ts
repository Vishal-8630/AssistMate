import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserRole = "client" | "assistant";

interface AuthState {
  isAuthenticated: boolean;
  phone: string | null;
  role: UserRole | null;
  hasHydrated: boolean;
  setHasHydrated: (hydrated: boolean) => void;
  login: (phone: string, role: UserRole) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      phone: null,
      role: null,
      hasHydrated: false,

      setHasHydrated: (state) => set({ hasHydrated: state }),

      login: (phone, role) =>
        set({
          isAuthenticated: true,
          phone,
          role,
        }),

      logout: () =>
        set({
          isAuthenticated: false,
          phone: null,
          role: null,
        }),
    }),
    {
      name: "assistmate-auth",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
