import { Configuration, TableOrdersApi, TablesApi } from '@spos/clients-dining';
import { injectable } from "inversify";
@injectable()
export class DiningApiService {
  private configuration = new Configuration({
  });
  private tablesApi = new TablesApi(this.configuration);
  private tableOrdersApi = new TableOrdersApi(this.configuration);

  getTablesApi() {
    return this.tablesApi;
  }

  getTableOrdersApi() {
    return this.tableOrdersApi;
  }
}
