import { inject, injectable } from 'inversify';
import { GroupService } from '../group/groupService';
import { TYPES } from '../types';
import { KitchenApiService } from '../apis/kitchenApiService';
import {
  KitchenService,
  MonsieurAxelMenvoie,
  OrderSummary,
  PreparationStatus
} from './kitchenService';
import { DiningApiService } from '../apis/diningApiService';
import { MenuApiService } from '../apis/menuApiService';

@injectable()
export class KitchenServiceWorkflow implements KitchenService {
  constructor(
    @inject(TYPES.KitchenApiService)
    private kitchenApiService: KitchenApiService,
    @inject(TYPES.DiningApiService)
    private diningApiService: DiningApiService,
    @inject(TYPES.GroupService)
    private groupService: GroupService,
    @inject(TYPES.MenuApiService)
    private menuApiService: MenuApiService
  ) {}

  async sendToKitchen(order: MonsieurAxelMenvoie): Promise<void> {
    const group = await this.groupService.getGroup(order.groupId);
    const tableOrdersApi = this.diningApiService.getTableOrdersApi();
    const tableOrderId = group.tables.find(
      (table) => table.number === order.tableNumber
    );
    if (!tableOrderId) {
      console.error(`Table not found ${order.tableNumber}`);
      return;
    }
    const menuItems = (
      await this.menuApiService.getMenuApi().menusControllerGetFullMenu()
    ).data;
    // split cart items by category
    const cartItemsByCategory: { [category: string]: MonsieurAxelMenvoie } = {};
    for (const item of order.cart) {
      const menuItem = menuItems.find(
        (menuItem) => menuItem.shortName === item.shortName
      );
      if (!menuItem) {
        console.error(`Menu item not found ${item.itemId}`);
        continue;
      }
      if (!cartItemsByCategory[menuItem.category]) {
        cartItemsByCategory[menuItem.category] = {
          cart: [],
          groupId: order.groupId,
          tableNumber: order.tableNumber,
        };
      }
      cartItemsByCategory[menuItem.category].cart.push(item);
    }
    for (const category of Object.values(cartItemsByCategory)) {
      const promises = category.cart.map((item) => {
        return tableOrdersApi.tableOrdersControllerAddMenuItemToTableOrder({
          tableOrderId: tableOrderId.id,
          addMenuItemDto: {
            menuItemId: item.itemId,
            howMany: item.quantity,
            menuItemShortName: item.shortName,
          },
        });
      });
      await Promise.all(promises);
      await tableOrdersApi.tableOrdersControllerPrepareTableOrder({
        tableOrderId: tableOrderId.id,
      });
    }
  }

  async getOrdersByGroupId(groupId: string): Promise<OrderSummary> {
    const group = await this.groupService.getGroup(groupId);
    const orderSummary: OrderSummary = {
      summary: {},
    };
    const menuItems = (
      await this.menuApiService.getMenuApi().menusControllerGetFullMenu()
    ).data;
    for (const table of group.tables) {
      const tableOrder = await this.diningApiService
        .getTableOrdersApi()
        .tableOrdersControllerGetTableOrderById({
          tableOrderId: table.id,
        });

      const preparationStatuses: {
        status: string;
        preparationId: string;
        category: string;
      }[] = [];

      for (const preparationFromTableOrder of tableOrder.data.preparations) {
        const preparationDetails = (
          await this.kitchenApiService
            .getPreparationApi()
            .preparationsControllerRetrievePreparation({
              preparationId: preparationFromTableOrder._id,
            })
        ).data;
        const firstPreparedItem = preparationDetails.preparedItems[0];
        const menuItem = menuItems.find(
          (menuItem) => menuItem.shortName === firstPreparedItem.shortName
        );
        if (!menuItem) {
          console.error(`Menu item not in menu ${menuItem}`);
          continue;
        }

        let preparationStatus = 'preparationStarted';
        if (preparationDetails.completedAt) {
          preparationStatus = 'readyToBeServed';
        }
        if (preparationDetails.takenForServiceAt) {
          preparationStatus = 'preparationServed';
        }

        preparationStatuses.push({
          status: preparationStatus,
          preparationId: preparationFromTableOrder._id,
          category: menuItem.category,
        });
      }
      for (const preparationStatus of preparationStatuses) {
        if (!orderSummary.summary[preparationStatus.category]) {
          orderSummary.summary[preparationStatus.category] = {};
        }
        if (!orderSummary.summary[preparationStatus.category][table.number]) {
          orderSummary.summary[preparationStatus.category][table.number] = [];
        }
        orderSummary.summary[preparationStatus.category][table.number].push(<
          PreparationStatus
        >{
          status: preparationStatus.status,
          preparationId: preparationStatus.preparationId,
        });
      }
    }
    return orderSummary;
  }

  async removeFromKitchen(order: MonsieurAxelMenvoie): Promise<boolean> {
    try {
      const preparationApi = this.kitchenApiService.getPreparationApi();

      const preparationsNotServed = (
        await preparationApi.preparationsControllerGetAllPreparationsByStateAndTableNumber(
          {
            state: 'preparationStarted',
            tableNumber: order.tableNumber,
          }
        )
      ).data;

      for (const preparation of preparationsNotServed) {
        const preparedItems = preparation.preparedItems;
        for (const pi of preparedItems) {
          await this.kitchenApiService
            .getPreparedItemsApi()
            .preparedItemsControllerStartToPrepareItemOnPost({
              preparedItemId: pi._id,
            });
          await this.kitchenApiService
            .getPreparedItemsApi()
            .preparedItemsControllerFinishToPrepareItemOnPost({
              preparedItemId: pi._id,
            });
        }
      }

      const preparations = (
        await preparationApi.preparationsControllerGetAllPreparationsByStateAndTableNumber(
          {
            state: 'readyToBeServed',
            tableNumber: order.tableNumber,
          }
        )
      ).data;

      const preparationsToRemove = preparations.filter((preparation) =>
        order.cart.some((item) => item.itemId === preparation._id)
      );

      for (const preparation of preparationsToRemove) {
        await preparationApi.preparationsControllerPreparationIsServed({
          preparationId: preparation._id,
        });
      }

      return true;
    } catch (error) {
      console.error(
        'Erreur lors de la suppression des commandes de la cuisine :',
        error
      );
      return false;
    }
  }

  async servePreparation(preparationIds: string[]): Promise<void> {
    const preparationApi = this.kitchenApiService.getPreparationApi();
    for (const preparationId of preparationIds) {
      await preparationApi.preparationsControllerPreparationIsServed({
        preparationId,
      });
    }
  }
}
