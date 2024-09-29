export interface TableSummary {
  number: number;
  elements: TableItem[];
}

export interface Item {
  id: string;
  name: string;
  price: number;
}

export interface TableItem {
  item: Item;
  remaining: number;
}

export interface BillingService {
  getBillingSummary(groupId: string): Promise<TableSummary[]>;
  partialPayment(payment: MonsieurAxelMenvoie2): Promise<void>;
}

export interface MonsieurAxelMenvoie2 {
  elementToBePaid: {
    [tableNumber: number]: { itemId: string; quantityPaid: number }[];
  };
  groupId: string;
}
