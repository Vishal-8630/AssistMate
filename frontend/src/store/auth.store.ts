import { clearAccessToken, setAccessToken } from "@/lib/token-manager";
import { User } from "@/types/user";
import { create } from "zustand";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthState {
  user: User | null;
  status: AuthStatus;

  setAuthenticated: (user: User) => void;
  setUnauthenticated: () => void;
  setLoading: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: "loading",

  setAuthenticated: (user: User) => {
    set({
      user,
      status: "authenticated"
    });
  },

  setUnauthenticated: () => {
    clearAccessToken();
    set({
      user: null,
      status: "unauthenticated"
    });
  },

  setLoading: () => {
    set({
      status: "loading"
    })
  }
}));