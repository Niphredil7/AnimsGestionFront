import { create } from "zustand";
import type { User } from "../types/user.type";
import { persist } from "zustand/middleware";

interface StoreUser {
  user: User | null;
  access_token: string | null;
  refresh_token: string | null;

  setUser: (user: User) => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  clearUser:() => void;
}

export const userStore = create<StoreUser>()(
  persist(
    (set) => ({
      user: null,
      access_token: null,
      refresh_token: null,
      setUser: (user: User) => set({ user }),
      setAccessToken: (access_token) => set({ access_token }),
      setRefreshToken: (refresh_token) => set({ refresh_token }),
      clearUser: () => set({
        user: null,
        access_token: null,
        refresh_token: null,
      }),
    }),
    {
      name: "user-store",
    }
  )
);
