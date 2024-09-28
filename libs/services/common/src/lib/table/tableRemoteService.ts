import { TableWithOrderDto } from '@spos/clients-dining';
import { inject, injectable } from "inversify";
import { BackendBffApiService } from '../apis/backendBffApiService';
import { logger } from "../logger";
import { TableService } from "./table.service";
import { TYPES } from "../types";

@injectable()
export class TableRemoteService implements TableService {
  constructor(
    @inject(TYPES.BackendBffApiService)
    private backendBffApiService: BackendBffApiService
  ) {}
  @logger
  async getFreeTables(): Promise<TableWithOrderDto[]> {
    return (
      await this.backendBffApiService
        .getRemoteTableApi()
        .remoteTableControllerGetFreeTables()
    ).data;
  }
  @logger
  async closeAllTables(): Promise<void> {
    return (
      await this.backendBffApiService
        .getRemoteTableApi()
        .remoteTableControllerCloseAllTables()
    ).data;
  }
}
