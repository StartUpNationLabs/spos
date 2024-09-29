import { Configuration, TableOrdersApi, TablesApi } from '@spos/clients-dining';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';

@injectable()
export class DiningApiService {
  private readonly tablesApi: TablesApi;
  private readonly tableOrdersApi: TableOrdersApi;

  constructor(
    @inject(TYPES.DiningApiConfiguration) private configuration2: Configuration
  ) {
    this.tablesApi = new TablesApi(this.configuration2);
    this.tableOrdersApi = new TableOrdersApi(this.configuration2);
  }

  getTablesApi() {
    return this.tablesApi;
  }

  getTableOrdersApi() {
    return this.tableOrdersApi;
  }
}
