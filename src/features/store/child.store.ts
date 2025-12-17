import { create } from "zustand";
import type { Child } from "../types/child.type";
import { persist } from "zustand/middleware";

interface StoreChild {
  child: Child | null;

  setChild: (child: Child) => void;
  clearChild:() => void
}

export const childStore = create<StoreChild>()(
persist(
    (set) => ({
      child: null,
      setChild: (child: Child) => set(() => ({ child })),
      clearChild: () => set({
        child: null,
      }),
    }),
    {
      name: "child-store",
    }
  )
);
