import { create } from 'zustand';

interface TableStore {
  selectedTables: Set<number>;
  addTable: (tableId: number) => void;
  removeTable: (tableId: number) => void;
  clearTables: () => void;
}

export const useTableStore = create<TableStore>((set) => ({
  selectedTables: new Set(),

  addTable: (tableId) =>
    set((state) => {
      const newSet = new Set(state.selectedTables);
      newSet.add(tableId);
      console.log(`Table ${tableId} added. Current selected tables:`, Array.from(newSet));
      return { selectedTables: newSet };
    }),

  removeTable: (tableId) =>
    set((state) => {
      const newSet = new Set(state.selectedTables);
      newSet.delete(tableId);
      console.log(`Table ${tableId} removed. Current selected tables:`, Array.from(newSet));
      return { selectedTables: newSet };
    }),

  clearTables: () =>
    set(() => {
      console.log('All tables cleared.');
      return { selectedTables: new Set() };
    }),
}));
