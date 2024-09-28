import { TableService, TYPES } from '@spos/services/common';
import { TableWithOrderDto } from '@spos/clients-dining';
import { inject, injectable } from "inversify";
import { BackendBffApiService } from '../apis/backendBffApiService';

@injectable()
export class TableRemoteService implements TableService {
  constructor(
    @inject(TYPES.BackendBffApiService)
    private backendBffApiService: BackendBffApiService
  ) {}

  async getFreeTables(): Promise<TableWithOrderDto[]> {
    return (
      await this.backendBffApiService
        .getRemoteTableApi()
        .remoteTableControllerGetFreeTables()
    ).data;
  }

  async closeAllTables(): Promise<void> {
    return (
      await this.backendBffApiService
        .getRemoteTableApi()
        .remoteTableControllerCloseAllTables()
    ).data;
  }
}
