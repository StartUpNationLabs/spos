import { inject } from 'inversify';
import { GroupService } from '../group/groupService';
import { TYPES } from '../types';
import { KitchenApiService } from '../apis/kitchenApiService';
import { KitchenService, MonsieurAxelMenvoie } from './kitchenService';

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
    @inject(TYPES.GroupService)
    private groupService: GroupService
  ) {}

  async sendToKitchen(order: MonsieurAxelMenvoie): Promise<void> {
    const preparationApi = this.kitchenApiService.getPreparationApi();
    await preparationApi.preparationsControllerRequestNewPreparation({
      preparationRequestDto: {
        itemsToBeCooked: order.cart.map((item) => ({
          menuItemShortName: item.shortName,
          howMany: item.quantity,
        })),
        tableNumber: order.tableNumber,
      },
    });
  }

  async getOrdersByGroupId(groupId: string): Promise<OrderSummary> {
    const group = await this.groupService.getGroup(groupId);
    const orderSummary: OrderSummary = {} as OrderSummary;
    for (const table of group.tables) {
      const ready = (
        await this.kitchenApiService
          .getPreparationApi()
          .preparationsControllerGetAllPreparationsByStateAndTableNumber({
            state: 'readyToBeServed',
            tableNumber: table.number,
          })
      ).data.map((preparation) => ({
        status: 'readyToBeServed',
        preparationId: preparation._id,
      }));
      const inProgress = (
        await this.kitchenApiService
          .getPreparationApi()
          .preparationsControllerGetAllPreparationsByStateAndTableNumber({
            state: 'preparationStarted',
            tableNumber: table.number,
          })
      ).data.map((preparation) => ({
        status: 'preparationStarted',
        preparationId: preparation._id,
      }));

      orderSummary.summary = {
        ...orderSummary.summary,
        [table.number]: [...ready, ...inProgress],
      };
    }
    return orderSummary;
  }
}
