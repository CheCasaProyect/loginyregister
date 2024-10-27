import { create } from "zustand";
<<<<<<< Updated upstream:src/store/authStore.ts
import IAuthState from "../interfaces/Auth"
=======
import { persist} from "zustand/middleware";
import IAuthState from "../../interfaces/Auth"
>>>>>>> Stashed changes:src/app/store/authStore.ts

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






