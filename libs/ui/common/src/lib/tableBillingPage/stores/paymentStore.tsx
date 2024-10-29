import { create, useStore as zustandUseStore } from 'zustand/index';
import { createContext, useContext, useRef } from 'react';

export interface PaymentStoreState {
  groupId: string;
  elementToBePaid: {
    [tableNumber: number]: {
      itemId: string;
      quantityPaid: number;
      price: number;
    }[];
  };
  updateItem: (
    tableNumber: number,
    itemId: string,
    quantityPaid: number,
    price: number
  ) => void;
  resetPaymentStore: (groupId: string) => void;
}

export const createStore = () =>
  create<PaymentStoreState>((set) => ({
    groupId: '',
    elementToBePaid: {},
    updateItem: (
      tableNumber: number,
      itemId: string,
      quantityPaid: number,
      price: number
    ) =>
      set((state) => {
        const currentCart = state.elementToBePaid[tableNumber] || [];

        const index = currentCart.findIndex(
          (element) => element.itemId === itemId
        );
        const item = {
          itemId: itemId,
          quantityPaid: quantityPaid,
          price: price,
        };

        const currentTableElement = currentCart
          .map((element) => {
            if (element.itemId !== itemId) {
              return element;
            }

            return item;
          })
          .filter((element) => element.quantityPaid > 0);

        if (index === -1 && quantityPaid > 0) {
          currentTableElement.push(item);
        }

        return {
          groupId: state.groupId,
          elementToBePaid: {
            ...state.elementToBePaid,
            [tableNumber]: currentTableElement,
          },
        };
      }),
    resetPaymentStore: (groupId: string) =>
      set((state) => {
        return {
          groupId: groupId,
          elementToBePaid: {},
        };
      }),
  }));

const StoreContext = createContext(null);

export const PaymentStoreProvider = ({ children }) => {
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
const useTableBillingStore = (selector) => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('Missing StoreProvider');
  }
  return zustandUseStore(store, selector);
};
export default useTableBillingStore;
