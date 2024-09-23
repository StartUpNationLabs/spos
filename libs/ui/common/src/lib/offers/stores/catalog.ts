import { Item } from "../../tableBillingPage/tableBilling";
import { create } from 'zustand';

export interface CatalogState {
  catalogs: {
    drinks: Item[];
    starters: Item[];
    mainCourses: Item[];
    desserts: Item[];
  }
}

const catalog: CatalogState = {
  catalogs: {
    drinks: [
      { id: 1, name: 'Coca-Cola', price: 3.50 },
      { id: 2, name: 'Sprite', price: 3.50 },
      { id: 3, name: 'Orange Juice', price: 4.00 }
    ],
    starters: [
      { id: 4, name: 'Green Salad', price: 6.50 },
      { id: 5, name: 'Grilled Cherry Tomatoes', price: 8.00 },
      { id: 6, name: 'Beef Carpaccio', price: 12.00 }
    ],
    mainCourses: [
      { id: 7, name: 'Grilled Chicken Breast', price: 15.00 },
      { id: 8, name: 'Pan-Seared Salmon', price: 18.00 },
      { id: 9, name: 'Beef Tenderloin', price: 25.00 }
    ],
    desserts: [
      { id: 10, name: 'Crème Brûlée', price: 5.50 },
      { id: 11, name: 'Chocolate Mousse', price: 6.50 },
      { id: 12, name: 'Tarte Tatin', price: 7.00 }
    ]
  }
};

export const useCatalog = create<CatalogState>(() => catalog);

