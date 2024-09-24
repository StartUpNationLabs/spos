import { Service } from 'typedi';
import { TableOrdersApi, TablesApi } from '@spos/clients/dining';

@Service()
export class TableService {
  private tablesApi = new TablesApi();
  private tableOrdersApi = new TableOrdersApi();


  async getFreeTables() {
    const tables = (await this.tablesApi.tablesControllerListAllTables()).data;
    return tables.filter((table) => !table.taken);
  }

  async closeAllTables() {
    const tables = (await this.tablesApi.tablesControllerListAllTables()).data;
    for (const table of tables) {
      if (table.taken) {
        await this.tableOrdersApi.tableOrdersControllerBillTableOrder({
          tableOrderId: table.tableOrderId,
        });
      }
    }
  }
}
