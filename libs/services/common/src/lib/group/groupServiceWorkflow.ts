import { injectable } from 'inversify';
import { TableOrdersApi } from '@spos/clients-dining';
import { GroupCreateDto } from './groupCreate.dto';
import { v4 as uuidv4 } from 'uuid';
import { Group, GroupService } from './groupService';
import { logger } from "../logger";

@injectable()
export class GroupServiceWorkflow implements GroupService {
  private group: {
    [key: string]: Group;
  } = {};
  private tableOrdersApi = new TableOrdersApi();
  @logger
  async addGroup({ tables, offer }: GroupCreateDto) {
    const id = uuidv4();
    this.group[id] = {
      id,
      tables: [],
      offer,
    };
    console.debug('add group Service', tables, offer, id);
    for (const table of Object.values(tables)) {
      const orderId = await this.tableOrdersApi.tableOrdersControllerOpenTable({
        startOrderingDto: {
          customersCount: table.customerCount,
          tableNumber: table.number,
        },
      });
      this.group[id].tables.push({
        id: orderId.data._id,
        number: table.number,
        customerCount: table.customerCount,
      });
    }
    return this.group[id];
  }
  @logger
  async getGroup(id: string) {
    return this.group[id];
  }
  @logger
  async getGroups() {
    return Object.values(this.group);
  }

  @logger
  async removeGroup(id: string) : Promise<boolean>  {
    if (this.group[id]) {
      delete this.group[id]; 
      console.debug('Group removed:', id);
      return true; 
    } else {
      console.warn('Group not found:', id);
      return false; 
    }
  }
  @logger
  async removeAllGroups(): Promise<boolean> {
    const groupIds = Object.keys(this.group); 
    if (groupIds.length > 0) {
      for (const id of groupIds) {
        delete this.group[id]; 
        console.debug('Group removed:', id);
      }
      console.debug('All groups have been removed.');
      return true;

    } else {
      
      console.warn('No groups found to remove.');
      return false;
    }
  }

}
