import { TYPES } from '@spos/services/common';
import { inject } from 'inversify';
import { KitchenApiService } from '../apis/kitchenApiService';

interface MonsieurAxelMenvoie {
  cart: { shortName: string; quantity: number }[];
  groupId: string;
  tableNumber: number;
}

export interface KitchenService {
  sendToKitchen(order: MonsieurAxelMenvoie): Promise<void>;
}

export class KitchenServiceWorkflow implements KitchenService {
  constructor(
    @inject(TYPES.KitchenApiService)
    private kitchenApiService: KitchenApiService
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
}
