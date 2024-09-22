import {create} from "zustand/index";

interface TablesState {
  tables: { id: number }[];
}

export const useTables = create<TablesState>((set, get) => ({
  tables: Array.from(Array(15)).map((_, i) => ({
      id: i + 1,
    }),
  ),
}));
