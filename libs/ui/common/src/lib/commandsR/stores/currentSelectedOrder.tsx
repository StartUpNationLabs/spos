import { create } from "zustand";

interface CurrentSelectedOrderState {
  orders: { [category: string]: { [orderId: number]: number } };
  setOrder: (category: string, orderId: number, count: number) => void;
  resetOrders: () => void;
}

export const useCurrentSelectedOrder = create<CurrentSelectedOrderState>((set) => ({
  orders: {},
  setOrder: (category, orderId, count) => set((state) => {
    const categoryOrders = { ...state.orders[category], [orderId]: count };
    return { orders: { ...state.orders, [category]: categoryOrders } };
  }),
  resetOrders: () => set({ orders: {} }),
}));
