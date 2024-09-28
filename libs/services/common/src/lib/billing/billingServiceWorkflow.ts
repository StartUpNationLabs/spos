import { Inject } from "@nestjs/common";
import { DiningApiService } from '../apis/diningApiService';
import { GroupService } from '../group/groupService';
import { TYPES } from '../types';
import { MenuApiService } from "../apis/menuApiService";
import { BillingService, TableItem, TableSummary } from "./billingService";

export class BillingServiceWorkflow implements BillingService {
  constructor(
    @Inject(TYPES.GroupService) private groupService: GroupService,
    @Inject(TYPES.DiningApiService) private diningApiService: DiningApiService,
    @Inject(TYPES.MenuApiService) private menuApiService: MenuApiService
  ) {
  }

  async getBillingSummary(groupId: string): Promise<TableSummary[]> {
    const group = await this.groupService.getGroup(groupId);
    const menuItems = (
      await this.menuApiService.getMenuApi().menusControllerGetFullMenu()
    ).data;
    const tableSummary: TableSummary[] = [];
    for (const table of group.tables) {
      const tableOrder = await this.diningApiService
        .getTableOrdersApi()
        .tableOrdersControllerGetTableOrderById({
          tableOrderId: table.id
        });
      const tableItems: { [key: string]: TableItem } = {};

      for (const item of tableOrder.data.preparations) {
        for (const menuItem of item.preparedItems) {
          const menuItemDetails = menuItems.find(
            (menuDetails) => menuDetails._id === menuItem._id
          );
          if (!menuItemDetails) {
            console.error(
              `Menu item with id ${menuItem._id} not found in menu`
            );
            return [];
          }
          const tableItem: TableItem = {
            item: {
              name: menuItemDetails.shortName,
              price: menuItemDetails.price,
              id: menuItemDetails._id
            },
            remaining: 0
          };
          if (tableItems[menuItemDetails._id]) {
            tableItems[menuItemDetails._id].remaining++;
          } else {
            tableItems[menuItemDetails._id] = tableItem;
          }
        }
      }
      tableSummary.push({
        number: table.number,
        elements: Object.values(tableItems)
      });
    }
    return tableSummary;
  }
}