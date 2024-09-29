import { ItemPaid } from "@spos/services/common";
import { create } from "zustand/index";

export interface PaymentStoreState {
    groupId: string,
    elementToBePaid: {
        [tableNumber: number]: { itemId: string, quantityPaid: number, price: number }[];
    },
    updateItem: (tableNumber: number, itemId: string, quantityPaid: number, price: number) => void,
    resetPaymentStore: (groupId: string) => void
}

export const useTableBillingStore = create<PaymentStoreState>((set) => ({
    groupId: '',
    elementToBePaid: {},
    updateItem: (tableNumber: number, itemId: string, quantityPaid: number, price: number) => set((state) => {
        const currentCart = state.elementToBePaid[tableNumber] || [];

        const index = currentCart.findIndex(element => element.itemId === itemId);
        const item = { itemId: itemId, quantityPaid: quantityPaid, price: price };

        const currentTableElement = currentCart.map(element => {
            if (element.itemId !== itemId) {
                return element;
            }

            return item;
        }).filter(element => element.quantityPaid > 0);

        if (index === -1 && quantityPaid > 0) {
            currentTableElement.push(item);
        }

        return {
            groupId: state.groupId,
            elementToBePaid: {
                ...state.elementToBePaid,
                [tableNumber]: currentTableElement
            }
        };
    }),
    resetPaymentStore: (groupId: string) => set((state) => {
        return {
            groupId: groupId,
            elementToBePaid: {}
        }
    })
}));

export default useTableBillingStore;

