import { OrderSummary } from './kitchenServiceWorkflow';

export interface MonsieurAxelMenvoie {
  cart: { itemId: string, shortName: string; quantity: number }[];
  groupId: string;
  tableNumber: number;
}

export interface KitchenService {
  sendToKitchen(order: MonsieurAxelMenvoie): Promise<void>;
  getOrdersByGroupId(groupId: string): Promise<OrderSummary>;
}
