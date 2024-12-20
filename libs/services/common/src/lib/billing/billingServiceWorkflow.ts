import { injectable, inject } from 'inversify';
import { DiningApiService } from '../apis/diningApiService';
import { GroupService } from '../group/groupService';
import { TYPES } from '../types';
import { MenuApiService } from '../apis/menuApiService';
import {
  BillingService,
  MonsieurAxelMenvoie2,
  TableItem,
  TableSummary,
} from './billingService';
import { logger } from "../logger";
import { perf } from '../perf';

@injectable()
export class BillingServiceWorkflow implements BillingService {
  data: {
    [groupId: string]: {
      [tableNumber: number]: {
        [itemId: string]: number;
      };
    };
  } = {};

  constructor(
    @inject(TYPES.GroupService) private groupService: GroupService,
    @inject(TYPES.DiningApiService) private diningApiService: DiningApiService,
    @inject(TYPES.MenuApiService) private menuApiService: MenuApiService
  ) {}
  @perf()
  @logger
  async getBillingSummary(groupId: string): Promise<TableSummary[]> {
    const group = await this.groupService.getGroup(groupId);
    console.log(`Group ${groupId} has ${group.tables.length} tables`);
    const menuItems = (
      await this.menuApiService.getMenuApi().menusControllerGetFullMenu()
    ).data;
    const tableSummary: TableSummary[] = [];
    for (const table of group.tables) {
      const tableOrder = await this.diningApiService
        .getTableOrdersApi()
        .tableOrdersControllerGetTableOrderById({
          tableOrderId: table.id,
        });
      const tableItems: { [key: string]: TableItem } = {};

      for (const item of tableOrder.data.preparations) {
        for (const menuItem of item.preparedItems) {
          const menuItemDetails = menuItems.find(
            (menuDetails) => menuDetails.shortName === menuItem.shortName
          );
          if (!menuItemDetails) {
            console.error(
              `Menu item with id ${menuItem.shortName} not found in menu`
            );
            return [];
          }
          const tableItem: TableItem = {
            item: {
              name: menuItemDetails.shortName,
              price: menuItemDetails.price,
              id: menuItemDetails._id,
            },
            remaining: 1,
          };
          if (tableItems[menuItemDetails._id]) {
            tableItems[menuItemDetails._id].remaining++;
          } else {
            tableItems[menuItemDetails._id] = tableItem;
          }
        }
      }

      if (this.data[groupId] && this.data[groupId][table.number]) {
        for (const [itemId, quantity] of Object.entries(
          this.data[groupId][table.number]
        )) {
          if (tableItems[itemId]) {
            tableItems[itemId].remaining -= quantity;
          }
        }
      }
      const itemList = Object.values(tableItems).filter(
        (item) => item.remaining > 0
      )
      tableSummary.push({
        number: table.number,
        elements: itemList,
      });
    }
    return tableSummary;
  }
  @perf()
  @logger
  async isComplete(groupId: string): Promise<boolean> {
    const summary = await this.getBillingSummary(groupId);
    for (const table of summary) {
      for (const item of table.elements) {
        if (item.remaining > 0) {
          return false;
        }
      }
    }
    return true;
  }
  @perf()
  @logger
  async partialPayment(payment: MonsieurAxelMenvoie2) {
    if (!this.data[payment.groupId]) {
      this.data[payment.groupId] = {};
    }
    for (const [tableNumbera, items] of Object.entries(
      payment.elementToBePaid
    )) {
      const tableNumber = parseInt(tableNumbera);
      if (!this.data[payment.groupId][tableNumber]) {
        this.data[payment.groupId][tableNumber] = {};
      }
      for (const item of items) {
        if (!this.data[payment.groupId][tableNumber][item.itemId]) {
          this.data[payment.groupId][tableNumber][item.itemId] = 0;
        }
        this.data[payment.groupId][tableNumber][item.itemId] +=
          item.quantityPaid;
      }
    }

    if (await this.isComplete(payment.groupId)) {
      console.log(`Group ${payment.groupId} is complete`);
      const group = await this.groupService.getGroup(payment.groupId);
      for (const table of group.tables) {
        await this.diningApiService
          .getTableOrdersApi()
          .tableOrdersControllerBillTableOrder({
            tableOrderId: table.id,
          });
      }
      await this.groupService.removeGroup(payment.groupId);
      return true;
    }
    return false;
  }
}
