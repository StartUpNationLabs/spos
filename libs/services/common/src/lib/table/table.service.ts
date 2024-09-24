import { Service } from '@freshgum/typedi';
import { DiningApiService } from '../apis/diningApiService';

@Service([DiningApiService])
export class TableService {
  constructor(private diningApiService: DiningApiService) {}
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
            tableOrderId: table.tableOrderId,
          });
      }
    }
  }
}
