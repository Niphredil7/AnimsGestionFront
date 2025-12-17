import { create } from "zustand";
import type { Child } from "../types/child.type";

interface ChildrenStore {
  children: Child[];           
  selectedChild: Child | null;

// définit la liste
  setChildren: (children: Child[]) => void;  
  selectChild: (id: string) => void;         
  clearSelected: () => void;                 
}

export const childrenStore = create<ChildrenStore>((set, get) => ({
  children: [],
  selectedChild: null,

  // liste des enfants
  setChildren: (children) => set({ children }),

  // choisir un enfant
  selectChild: (id) => {
    const child = get().children.find((c) => c.id === id) || null;
    set({ selectedChild: child });
  },

  // vider la sélection
  clearSelected: () => set({ selectedChild: null }),
}));
