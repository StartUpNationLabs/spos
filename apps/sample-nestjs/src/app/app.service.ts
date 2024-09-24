import { Injectable } from '@nestjs/common';
import {TablesApi, TableWithOrderDto} from "@spos/clients-dining";
import axios from "axios";

@Injectable()
export class AppService {
  tableApi = new TablesApi();
  async getData() {
    return (await this.tableApi.tablesControllerListAllTables()).data;
  }
}
