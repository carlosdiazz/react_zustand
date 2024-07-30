import { create, StateCreator } from "zustand";
import type { AuthStatus, User } from "../../interfaces";
import { AuthService } from "../../services";
import { devtools, persist } from "zustand/middleware";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  loginUser: (email: string, password: string) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  logoutUser: () => void;
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: "pending",
  token: undefined,
  user: undefined,

  loginUser: async (email, password) => {
    try {
      const { token, ...user } = await AuthService.login(email, password);
      set({ status: "authorized", token, user });
    } catch (error) {
      set({ status: "unauthorized", token: undefined, user: undefined });
      throw "Unauthorized";
    }
  },

  checkAuthStatus: async () => {
    try {
      const { token, ...user } = await AuthService.checkStatus();
      set({ token, user, status: "authorized" });
    } catch (e) {
      set({ status: "unauthorized", token: undefined, user: undefined });
    }
  },

  logoutUser: () => {
    set({ token: undefined, user: undefined, status: "unauthorized" });
  },
});

export const useAuthStore = create<AuthState>()(
  devtools(persist(storeApi, { name: "auth" }))
);
