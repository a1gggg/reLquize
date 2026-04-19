// store/listsStore.ts
//Zustand store
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export type Pair = { id: string; key: string; value: string };
export type KVList = { id: string; title: string; items: Pair[] };

type Store = {
  lists: KVList[];
  addList: (title: string) => void;
  addPair: (listId: string, key: string, value: string) => void;
  updatePair: (listId: string, pairId: string, key: string, value: string) => void;
  deletePair: (listId: string, pairId: string) => void;
  deleteList: (listId: string) => void;
};

export const useListsStore = create<Store>((set) => ({
  lists: [],

  addList: (title) =>
    set((s) => ({
      lists: [...s.lists, { id: uuidv4(), title, items: [] }],
    })),

  addPair: (listId, key, value) =>
    set((s) => ({
      lists: s.lists.map((l) =>
        l.id === listId ? { ...l, items: [...l.items, { id: uuidv4(), key, value }] } : l
      ),
    })),

  updatePair: (listId, pairId, key, value) =>
    set((s) => ({
      lists: s.lists.map((l) =>
        l.id === listId
          ? { ...l, items: l.items.map((p) => (p.id === pairId ? { ...p, key, value } : p)) }
          : l
      ),
    })),

  deletePair: (listId, pairId) =>
    set((s) => ({
      lists: s.lists.map((l) =>
        l.id === listId ? { ...l, items: l.items.filter((p) => p.id !== pairId) } : l
      ),
    })),

  deleteList: (listId) =>
    set((s) => ({
      lists: s.lists.filter((l) => l.id !== listId),
    })),
}));
