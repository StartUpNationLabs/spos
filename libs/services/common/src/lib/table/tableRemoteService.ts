import { TableWithOrderDto } from '@spos/clients-dining';
import { inject, injectable } from "inversify";
import { BackendBffApiService } from '../apis/backendBffApiService';
import { logger } from "../logger";
import { perf } from '../perf';
import { TableService } from "./table.service";
import { TYPES } from "../types";

@injectable()
export class TableRemoteService implements TableService {
  constructor(
    @inject(TYPES.BackendBffApiService)
    private backendBffApiService: BackendBffApiService
  ) {}
  @perf()
  @logger
  async getFreeTables(): Promise<TableWithOrderDto[]> {
    return (
      await this.backendBffApiService
        .getRemoteTableApi()
        .remoteTableControllerGetFreeTables()
    ).data;
  }
  @perf()
  @logger
  async closeAllTables(): Promise<void> {
    return (
      await this.backendBffApiService
        .getRemoteTableApi()
        .remoteTableControllerCloseAllTables()
    ).data;
  }
}
