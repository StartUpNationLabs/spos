import { create } from 'zustand';

interface Order {
  orderId: number;
  order: number;
  status: string;
  isServed: boolean;
}

interface OrdersData {
  drink: { [key: string]: Order[] };
  starter: { [key: string]: Order[] };
  maincourse: { [key: string]: Order[] };
}

interface ServingState {
  ordersData: OrdersData;
  updateOrderStatus: (
    category: keyof OrdersData,
    table: string,
    orderId: number,
    status: string
  ) => void;
  setServed: (
    category: keyof OrdersData,
    table: string,
    orderId: number,
    isServed: boolean
  ) => void;
}

const useStore = create<ServingState>((set) => ({
  ordersData: {
    drink: {
      1: [
        { orderId: 1, order: 33, status: 'completed', isServed: false },
        { orderId: 2, order: 32, status: 'pending', isServed: false },
      ],
      2: [{ orderId: 3, order: 41, status: 'completed', isServed: false }],
    },
    starter: {
      3: [
        { orderId: 4, order: 23, status: 'pending', isServed: false },
        { orderId: 5, order: 22, status: 'completed', isServed: false },
      ],
      1: [{ orderId: 6, order: 15, status: 'completed', isServed: false }],
    },
    maincourse: {
      2: [{ orderId: 7, order: 39, status: 'pending', isServed: false }],
      3: [{ orderId: 8, order: 24, status: 'completed', isServed: false }],
    },
  },

  updateOrderStatus: (category, table, orderId, status) =>
    set((state) => {
      const updatedCategory = { ...state.ordersData[category] };
      const updatedOrders = updatedCategory[table].map((order) =>
        order.orderId === orderId ? { ...order, status } : order
      );
      updatedCategory[table] = updatedOrders;
      return {
        ordersData: { ...state.ordersData, [category]: updatedCategory },
      };
    }),

  setServed: (section, table, orderId, isServed) =>
    set((state) => {
      const updatedOrders = { ...state.ordersData };

      if (!updatedOrders[section] || !updatedOrders[section][table]) {
        console.error(
          `La table ${table} n'existe pas dans la section ${section}`
        );
        return state;
      }

      updatedOrders[section][table] = updatedOrders[section][table].map(
        (order) => {
          if (order.orderId === orderId) {
            return { ...order, isServed: isServed };
          }
          return order;
        }
      );

      return { ordersData: updatedOrders };
    }),
}));

export default useStore;
