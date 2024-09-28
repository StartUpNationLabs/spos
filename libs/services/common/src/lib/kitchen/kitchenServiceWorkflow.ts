import { inject } from "inversify";
import { TYPES } from "@spos/services/common";
import { KitchenApiService } from "../apis/kitchenApiService";
import { KitchenService, MonsieurAxelMenvoie } from "./kitchenService";

export class KitchenServiceWorkflow implements KitchenService {
  constructor(
    @inject(TYPES.KitchenApiService)
    private kitchenApiService: KitchenApiService
  ) {
  }

  async sendToKitchen(order: MonsieurAxelMenvoie): Promise<void> {
    const preparationApi = this.kitchenApiService.getPreparationApi();
    await preparationApi.preparationsControllerRequestNewPreparation({
      preparationRequestDto: {
        itemsToBeCooked: order.cart.map((item) => ({
          menuItemShortName: item.shortName,
          howMany: item.quantity
        })),
        tableNumber: order.tableNumber
      }
    });
  }
}
