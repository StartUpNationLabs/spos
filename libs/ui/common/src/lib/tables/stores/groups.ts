import {create} from "zustand/index";

interface GroupsState {
  groups: { tables: { [tableId: number]: number }, offer: string }[];
  addGroup: (tables: { [tableId: number]: number }, offer: string) => void;
  resetGroups: () => void;
}

export const useGroups = create<GroupsState>((set) => ({
  groups: [],
  addGroup: (tables, offer) => set((state) => ({
    groups: [...state.groups, {
      tables,
      offer
    }]
  })),
  resetGroups: () => set({groups: []}),
}));
