import { OrderSummary } from './kitchenServiceWorkflow';

export interface CartItem {
  itemId: string;
  shortName: string;
  quantity: number;
}

export interface MonsieurAxelMenvoie {
  cart: CartItem[];
  groupId: string;
  tableNumber: number;
}

export interface KitchenService {
  sendToKitchen(order: MonsieurAxelMenvoie): Promise<void>;
  getOrdersByGroupId(groupId: string): Promise<OrderSummary>;
  removeFromKitchen(order: MonsieurAxelMenvoie): Promise<boolean>;

}
