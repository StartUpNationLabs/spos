import { DiningApiService } from '../apis/diningApiService';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';

@injectable()
export class TableService {
  constructor(
    @inject(TYPES.DiningApiService) private diningApiService: DiningApiService
  ) {}

  async getFreeTables() {
    console.log(
      'Getting free tables',
      this.diningApiService.getTablesApi(),
      this.diningApiService.getTableOrdersApi(),
      this.diningApiService.getTablesApi().tablesControllerListAllTables()
    );
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
