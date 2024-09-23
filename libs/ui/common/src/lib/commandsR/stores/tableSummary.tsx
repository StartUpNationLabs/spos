import { TableView } from "@mui/icons-material";
import { create } from "zustand";


// Represents an order for a specific item
interface Order {
  category: string;
  name: string;
  quantity: number;
  price: number;
}

// Represents a table with its orders
interface Table {
  id: number; // This is the table number
  orders: Order[];
}

export interface TableState {
  tables: Table[];
  addOrUpdateOrder: (tableId: number, newOrder: Order) => void;
  decreaseOrderQuantity: (tableId: number, newOrder: Order) => void;
}

export const useTableSummary = create<TableState>((set) => ({
  tables: [],
  addOrUpdateOrder: (tableId, newOrder) =>
    set((state) => ({
        tables: updateTable(state, tableId, newOrder)
    })),
  decreaseOrderQuantity: (tableId, newOrder) =>
      set((state) => ({
        tables: decreaseItem(state, tableId, newOrder)
      }))
}));

const updateTable = (state: TableState, tableId: number, newOrder: Order) => {
  let tableFound = false;
  for(const tableKey in state.tables){
    const table = state.tables[tableKey]
    if(table.id === tableId){
      console.log(tableId)
      tableFound = true;
      const existingOrder = table.orders.find(
        (order) =>
          order.name === newOrder.name &&
          order.category === newOrder.category
      );
      if (existingOrder) {
        
        return mergeTables(state.tables, {
          ...table,
          orders: table.orders.map((order) =>
            order === existingOrder
              ? { ...order, quantity: order.quantity + newOrder.quantity }
              : order
          )
        });
      } else {
        // Add new order if not found
        return mergeTables(state.tables, {
          ...table,
          orders: [...table.orders, newOrder]
        });
      }
    }
  }
  if(tableFound==false){
    return mergeTables(state.tables, {
      "id": tableId,
      "orders":[
        newOrder
      ]
    })
  }

}

const decreaseItem = (state: TableState, tableId: number, newOrder: Order) => {
  for(const tableKey in state.tables){
    const table = state.tables[tableKey]
    if (table.id === tableId) {
       let newTable = {
        ...table,
        orders: table.orders
          .map((order) => {
            if (order.name === newOrder.name && order.category === newOrder.category) {
              // Decrease the quantity or remove the order if the quantity is zero or below
              const updatedQuantity = order.quantity - newOrder.quantity;
              if (updatedQuantity > 0) {
                return { ...order, quantity: updatedQuantity };
              }
              return null; // Remove order if quantity becomes zero or less
            }
            return order;
          })
          .filter(Boolean) as Order[] // Remove null values (orders with quantity 0)
      };
      return mergeTables(state.tables, newTable);
    }
  }
}



function mergeTables(tables: Table[], table: Table): any {
  // Check if the table with the same id exists
  const tableIndex = tables.findIndex(t => t.id === table.id);
  if (table.orders.length <1){
    return [
      ...tables.slice(0, tableIndex),
      ...tables.slice(tableIndex + 1)
    ];
  }
  if (tableIndex !== -1) {
    // Replace the existing table with the new one
    return [
      ...tables.slice(0, tableIndex),
      table,
      ...tables.slice(tableIndex + 1)
    ];
  } else {
    // Append the new table to the list
    return [...tables, table];
  }
}
