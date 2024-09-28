import {create} from "zustand/index";

export interface CartsState {
  carts: {[tableNumber: number]: {itemId: string, shortName: string, quantity: number}[]};
  updateItem: (tableNumber: number ,itemId: string, shortName: string, quantity: number) => void;
  resetCart: (tableNumber: number) => void;
}

export const useCarts = create<CartsState>((set) => ({
  carts: {},
  updateItem: (tableNumber, itemId, shortName, quantity) => set((state) => {
    const currentCart =  state.carts[tableNumber] || [];

    const itemIndex = currentCart.findIndex(element => element.itemId === itemId);

    return {
      carts: {
        ...state.carts,
        [tableNumber]:  // Use square brackets to use the variable `tableNumber` as a key
        (itemIndex === -1) ? [...currentCart, {itemId, shortName, quantity}].filter(element => element.quantity > 0)
        : currentCart.map(element => {
          if (element.itemId === itemId) {
            element.quantity = quantity;
          }
          return element;
        }).filter(element => element.quantity > 0)
      }
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
