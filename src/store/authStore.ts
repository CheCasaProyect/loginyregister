import { create } from "zustand";
import IAuthState from "../interfaces/Auth"

export const useAuthStore = create<IAuthState>((set) => ({
  token: null,
  user: null,
  error: "",
  successMessage: "",
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  setError: (error) => set({ error }),
  setSuccessMessage: (message) => set({ successMessage: message }),
  clearMessages: () => set({ error: "", successMessage: "" }),
}));






