import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { DiningApiService } from "../apis/diningApiService";
import { TableService } from "./table.service";

@injectable()
export class TableServiceWorkflow implements TableService {
  constructor(
    @inject(TYPES.DiningApiService) private diningApiService: DiningApiService
  ) {
  }

  async getFreeTables() {
    const tables = (
      await this.diningApiService.getTablesApi().tablesControllerListAllTables()
    ).data;
    return tables.filter((table) => !table.taken);
  }

  async closeAllTables() {
    const tables = (
      await this.diningApiService.getTablesApi().tablesControllerListAllTables()
    ).data;
    for (const table of tables) {
      if (table.taken) {
        await this.diningApiService
          .getTableOrdersApi()
          .tableOrdersControllerBillTableOrder({
            tableOrderId: table.tableOrderId
          });
      }
    }
  }
}
