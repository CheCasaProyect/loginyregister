import { create } from "zustand";
import { IUser, IAuthState } from "../interfaces/interfaces";

export const useAuthStore = create<IAuthState>((set) => ({
  token: null,
  user: null,
  error: "",
  successMessage: "",
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  setError: (error) => set({ error }),
  setSuccessMessage: (message) => set({ successMessage: message }),
}));
