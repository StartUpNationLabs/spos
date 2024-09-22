import {create} from "zustand/index";
import {useCurrentSelectedGroup} from "./currentSelectedGroup";

interface GroupsState {
  groups: { tables: { [tableId: number]: number }, offer: string }[];
  addGroup: (offer: string) => void;
  resetGroups: () => void;
}

export const useGroups = create<GroupsState>((set) => ({
  groups: [],
  addGroup: (offer) => set((state) => {
    const tables = useCurrentSelectedGroup.getState().tables;
    console.log('add group', tables, offer);
    useCurrentSelectedGroup.getState().resetTables();
    return ({
      groups: [...state.groups, {
        tables,
        offer
      }]
    });
  }),
  resetGroups: () => set({groups: []}),
}));
