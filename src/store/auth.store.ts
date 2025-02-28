import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const clearStores = () => {
  localStorage.removeItem("properties");
  localStorage.removeItem("filters");
};

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      isAuthenticated: false,
      username: null,
      login: (username, password) => {
        if (username !== "" && password !== "") {
          set({ isAuthenticated: true, username });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ isAuthenticated: false, username: null });
        clearStores();
      },
    }),
    { name: "auth" }
  )
);
