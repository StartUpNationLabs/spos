import { create, useStore as zustandUseStore } from 'zustand/index';
import { createContext, useContext, useRef } from 'react';

interface CommandsState {
  groupId: string;
  tableNumber: number;
  offerType: string;
  setGroupId: (groupId: string) => void;
  setTableNumber: (tableNumber: number) => void;
  setOfferType: (offerType: string) => void;
}

const createStore = () =>
  create<CommandsState>((set) => ({
    groupId: '',
    tableNumber: -1,
    offerType: '',
    setGroupId: (groupId: string) => set({ groupId }),
    setTableNumber: (tableNumber: number) => set({ tableNumber }),
    setOfferType: (offerType: string) => set({ offerType }),
  }));

const StoreContext = createContext(null);

export const CommandsParameterStoreProvider = ({ children }) => {
  const storeRef = useRef<any>();
  if (!storeRef.current) {
    storeRef.current = createStore();
  }
  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};
const useCommandsParameter = (selector) => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('Missing StoreProvider');
  }
  return zustandUseStore(store, selector);
};

export default useCommandsParameter;
