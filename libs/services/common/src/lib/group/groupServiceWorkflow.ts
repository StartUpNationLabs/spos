import { injectable } from 'inversify';
import { TableOrdersApi } from '@spos/clients-dining';
import { GroupCreateDto } from './groupCreate.dto';
import { v4 as uuidv4 } from 'uuid';
import { Group, GroupService } from './groupService';
import { logger } from '../logger';
import { GroupNotFoundException } from '../exceptions/groupException';
import { perf } from '../perf';

@injectable()
export class GroupServiceWorkflow implements GroupService {
  private group: {
    [key: string]: Group;
  } = {};
  private tableOrdersApi = new TableOrdersApi();

  @perf()
  @logger
  async addGroup({ tables, offer }: GroupCreateDto) {
    const id = uuidv4();
    this.group[id] = {
      id,
      tables: [],
      offer,
    };
    await Promise.all(
      Object.values(tables).map(async (table) => {
        const orderId =
          await this.tableOrdersApi.tableOrdersControllerOpenTable({
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
      })
    );
    // sort tables by number
    this.group[id].tables.sort((a, b) => a.number - b.number);
    return this.group[id];
  }
  @perf()
  @logger
  async getGroup(id: string) {
    return this.group[id];
  }
  @perf()
  @logger
  async getGroups() {
    return Object.values(this.group);
  }
  @perf()
  @logger
  async removeGroup(id: string): Promise<boolean> {
    console.log(this.group);
    console.log(id);
    if (this.group[id]) {
      delete this.group[id];
      console.debug('Group removed:', id);
      return true;
    } else {
      throw new GroupNotFoundException(`Group with id ${id} not found.`);
    }
  }
  @perf()
  @logger
  async removeAllGroups(): Promise<boolean> {
    const groupIds = Object.keys(this.group);
    if (groupIds.length > 0) {
      for (const id of groupIds) {
        delete this.group[id];
        console.debug('Group removed:', id);
      }
      console.debug('All groups have been removed.');
    }
    return true;
  }
}
