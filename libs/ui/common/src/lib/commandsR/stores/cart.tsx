import { create, useStore as zustandUseStore } from 'zustand/index';
import { createContext, useContext, useRef } from 'react';

export interface CartsState {
  carts: {
    [tableNumber: number]: {
      itemId: string;
      shortName: string;
      quantity: number;
    }[];
  };
  updateItem: (
    tableNumber: number,
    itemId: string,
    shortName: string,
    quantity: number
  ) => void;
  resetCart: (tableNumber: number) => void;
}

export const createStore = () =>
  create<CartsState>((set) => ({
    carts: {},
    updateItem: (tableNumber, itemId, shortName, quantity) =>
      set((state) => {
        console.log(`Updating item: ${shortName} (ID: ${itemId}) in table ${tableNumber} with quantity: ${quantity}`);

        const currentCart = state.carts[tableNumber] || [];

        const itemIndex = currentCart.findIndex(
          (element) => element.itemId === itemId
        );

        return {
          carts: {
            ...state.carts,
            // Use square brackets to use the variable `tableNumber` as a key
            [tableNumber]:
              itemIndex === -1
                ? [...currentCart, { itemId, shortName, quantity }].filter(
                    (element) => element.quantity > 0
                  )
                : currentCart
                    .map((element) => {
                      if (element.itemId === itemId) {
                        element.quantity = quantity;
                      }
                      return element;
                    })
                    .filter((element) => element.quantity > 0),
          },
        };
      }),
    resetCart: (tableNumber) =>
      set((state) => ({
        carts: {
          ...state.carts,
          [tableNumber]: [],
        },
      })),
  }));

const StoreContext = createContext(null);

export const CartStoreProvider = ({ children }) => {
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

export const useCarts = <T,>(selector: (state: CartsState) => T): T => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('Missing StoreProvider');
  }
  return zustandUseStore(store, selector);
};

export default useCarts;
