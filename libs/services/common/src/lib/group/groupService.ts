import { Service } from 'typedi';
import { v4 as uuidv4 } from 'uuid';
import { TableOrdersApi } from '@spos/clients-dining';

export interface Group {
  id: string;
  tables: {
    [tableNumber: string]: {
      id: string;
      number: number;
      customerCount: number;
    };
  };
  offer: string;
}

export interface GroupCreateDto {
  tables: {
    [tableNumber: string]: {
      number: number;
      customerCount: number;
    };
  };
  offer: string;
}


@Service()
export class GroupService{
  private group: {
    [key: string]: Group;
  } = {};
  private tableOrdersApi = new TableOrdersApi();


  async addGroup({ tables, offer }: GroupCreateDto) {
    const id = uuidv4();
    this.group[id] = {
      id,
      tables: {},
      offer,
    }
    console.debug('add group Service', tables, offer, id)
    for (const table of Object.values(tables)) {
      const orderId = await this.tableOrdersApi.tableOrdersControllerOpenTable({
        startOrderingDto: {
          customersCount: table.customerCount,
          tableNumber: table.number
        },
      });
      this.group[id].tables[table.number] = {
        id: orderId.data._id,
        number : table.number,
        customerCount: table.customerCount,
      };
    }
  }

  getGroup(id: string) {
    return this.group[id];
  }

  getGroups() {
    return Object.values(this.group);
  }
}
