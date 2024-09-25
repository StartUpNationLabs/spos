import {create} from "zustand/index";

export interface CartsState {
  carts: {[tableNumber: number]: {itemId: string, quantity: number}[]};
  addItem: (tableNumber: number, itemId: string, quantity: number) => void;
  removeItem: (itableNumber: number, itemId: string, quantity: number) => void;
  resetCart: (tableNumber: number) => void;
}

export const useCarts = create<CartsState>((set) => ({
  carts: {},
  addItem: (tableNumber, itemId, quantity) => set((state) => {
      const currentCart = state.carts[tableNumber] || [];

      // Check if item exists
      const itemIndex = currentCart.findIndex(
        (element) => element.itemId === itemId
      );

      return {
        carts: {
          ...state.carts,
          [tableNumber]:
            itemIndex !== -1
              ? currentCart.map((item, index) =>
                  index === itemIndex
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
                )
              : [...currentCart, { itemId, quantity }],
        },
      };
    }),
    removeItem: (tableNumber, itemId, quantity) =>
      set((state) => {
        const currentCart = state.carts[tableNumber] || [];

        const itemIndex = currentCart.findIndex(
          (element) => element.itemId === itemId
        );

        if (itemIndex === -1) return state;

        const updatedCart = currentCart
          .map((item, index) =>
            index === itemIndex
              ? { ...item, quantity: item.quantity - quantity }
              : item
          )
          .filter((item) => item.quantity > 0);

        return {
          carts: {
            ...state.carts,
            [tableNumber]: updatedCart,
          },
        };
      }),
      resetCart: (tableNumber) =>
        set((state) => ({
          carts: {
            ...state.carts,
            [tableNumber]: [],
          },
        })
      ),
  })
);
