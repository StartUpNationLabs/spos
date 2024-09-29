
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

export interface PreparationStatus {
  status:  "readyToBeServed" | "preparationStarted" | "preparationServed";
  preparationId: string;
}

export interface OrderSummary {
  summary: {
    [category: string]: {
      [table: number]: PreparationStatus[];
    };
  };
}
export interface KitchenService {
  sendToKitchen(order: MonsieurAxelMenvoie): Promise<void>;
  getOrdersByGroupId(groupId: string): Promise<OrderSummary>;
  removeOrdersOfTableFromKitchen(order: MonsieurAxelMenvoie): Promise<boolean>;
  servePreparation(preparationIds: string[]): Promise<void>;
  startAndFinishPreparation(preparedItemId: string): Promise<boolean>;
  handleNotServedPreparations(preparations: any[]): Promise<boolean>;
  getPreparationsByStateAndTableNumber(state: 'readyToBeServed' | 'preparationStarted',tableNumber: number):Promise<any>
  servePreparations(preparationsToRemove: any[]) : Promise<void> 



}
