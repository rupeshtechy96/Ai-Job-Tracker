import { create } from "zustand";
import type { User } from "../types";

type AuthState = {
  token: string | null;
  user: User | null;
  setAuth: (payload: { token: string; user: User }) => void;
  clearAuth: () => void;
};

const savedToken = localStorage.getItem("token");
const savedUser = localStorage.getItem("user");

export const useAuthStore = create<AuthState>((set) => ({
  token: savedToken ?? null,
  user: savedUser ? (JSON.parse(savedUser) as User) : null,

  setAuth: ({ token, user }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ token, user });
  },

  clearAuth: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    set({ token: null, user: null });
    window.location.href = "/login";
  }
}));