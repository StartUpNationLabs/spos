import { create } from 'zustand/index';

interface CurrentSelectedGroupState {
  tables: {
    [tableId: number]: {
      customerCount: number;
      number: number;
    };
  };
  setTable: (tableId: number, numberOfPeople: number) => void;
  removeTable: (tableId: number) => void;
  resetTables: () => void;
}

export const useCurrentSelectedGroup = create<CurrentSelectedGroupState>(
  (set) => ({
    tables: {},
    setTable: (tableId, numberOfPeople) =>
      set((state) => {
        const tables = { ...state.tables };
        tables[tableId] = { number: tableId, customerCount: numberOfPeople };
        return { tables };
      }),
    removeTable: (tableId) =>
      set((state) => {
        const tables = { ...state.tables };
        delete tables[tableId];
        return { tables };
      }),
    resetTables: () => set({ tables: {} }),
  })
);
