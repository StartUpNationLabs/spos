import { Configuration, TableOrdersApi, TablesApi } from '@spos/clients-dining';
import { Container, Service, Token } from "@freshgum/typedi";

export const DINING_API_PATH = new Token<string>('DINING_API_PATH');
@Service([DINING_API_PATH])
export class DiningApiService {
  private configuration = new Configuration({
    basePath: Container.get(DINING_API_PATH),
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
