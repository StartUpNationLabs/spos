import { TableWithOrderDto } from "@spos/clients-dining";

export interface TableService {
  getFreeTables(): Promise<TableWithOrderDto[]>;
  closeAllTables(): Promise<void>;
}
