import { inject } from 'inversify';
import { GroupService } from '../group/groupService';
import { TYPES } from '../types';
import { KitchenApiService } from '../apis/kitchenApiService';
import { KitchenService, MonsieurAxelMenvoie } from './kitchenService';
import { DiningApiService } from '@spos/services/common';

export interface PreparationStatus {
  status: string;
  preparationId: string;
}

export interface OrderSummary {
  summary: {
    [category: string]: {
      [table: number]: PreparationStatus[];
    };
  };
}

export class KitchenServiceWorkflow implements KitchenService {
  constructor(
    @inject(TYPES.KitchenApiService)
    private kitchenApiService: KitchenApiService,
    @inject(TYPES.DiningApiService)
    private diningApiService: DiningApiService,
    @inject(TYPES.GroupService)
    private groupService: GroupService
  ) {}

  async sendToKitchen(order: MonsieurAxelMenvoie): Promise<void> {
    const group = await this.groupService.getGroup(order.groupId);
    const tableOrdersApi = this.diningApiService.getTableOrdersApi();
    for (const item of order.cart) {
      await tableOrdersApi.tableOrdersControllerAddMenuItemToTableOrder({
        tableOrderId: group.tables[order.tableNumber].id,
        addMenuItemDto: {
          menuItemId: item.itemId,
          howMany: item.quantity,
          menuItemShortName: item.shortName,
        },
      });
    }

    await tableOrdersApi.tableOrdersControllerPrepareTableOrder({
      tableOrderId: group.tables[order.tableNumber].id,
    });
  }

  async getOrdersByGroupId(groupId: string): Promise<OrderSummary> {
    const group = await this.groupService.getGroup(groupId);
    const orderSummary: OrderSummary = {} as OrderSummary;
    for (const table of group.tables) {
      const tableOrder = await this.diningApiService
        .getTableOrdersApi()
        .tableOrdersControllerGetTableOrderById({
          tableOrderId: table.id,
        });

      const preparationStatuses: PreparationStatus[] = [];

      for (const preparationFromTableOrder of tableOrder.data.preparations) {
        const preparationDetails = (
          await this.kitchenApiService
            .getPreparationApi()
            .preparationsControllerRetrievePreparation({
              preparationId: preparationFromTableOrder._id,
            })
        ).data;

        preparationStatuses.push({
          status: preparationDetails.completedAt
            ? 'readyToBeServed'
            : 'preparationStarted',
          preparationId: preparationFromTableOrder._id,
        });
      }
      orderSummary.summary = {
        ...orderSummary.summary,
        [table.number]: [...preparationStatuses],
      };
    }
    return orderSummary;
  }
}
