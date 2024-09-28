import { create } from 'zustand/index';

interface CommandsState {
  groupId: string;
  tableNumber: number;
  offerType: string;
  setGroupId: (groupId: string) => void;
  setTableNumber: (tableNumber: number) => void;
  setOfferType: (offerType: string) => void;
}

const useCommandsParameter = create<CommandsState>(set => ({
  groupId: '',
  tableNumber: -1,
  offerType: '',
  setGroupId: (groupId: string) => set({ groupId }),
  setTableNumber: (tableNumber: number) => set({ tableNumber }),
  setOfferType: (offerType: string) => set({ offerType }),
}));

export default useCommandsParameter;
