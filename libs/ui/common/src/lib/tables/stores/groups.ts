import {create} from "zustand/index";
import {useCurrentSelectedGroup} from "./currentSelectedGroup";
import uuid from 'react-uuid';

export interface GroupTable {
  groupId: string
  tables: number[]
}

export interface GroupsState {
  groups: { tables: { [tableId: number]: number }, offer: string, groupId: string}[];
  addGroup: (offer: string) => void;
  resetGroups: () => void;
}

export const useGroups = create<GroupsState>((set) => ({
  groups: [],
  addGroup: (offer) => set((state) => {
    const tables = useCurrentSelectedGroup.getState().tables;
    const groupId = uuid();
    console.log('add group', tables, offer, groupId);
    useCurrentSelectedGroup.getState().resetTables();
    return ({
      groups: [...state.groups, {
        tables,
        offer,
        groupId
      }]
    });
  }),
  resetGroups: () => set({groups: []}),
}));
