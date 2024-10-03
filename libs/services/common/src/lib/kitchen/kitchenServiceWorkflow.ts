import { inject, injectable } from 'inversify';
import { GroupService, Table } from '../group/groupService';
import { TYPES } from '../types';
import { KitchenApiService } from '../apis/kitchenApiService';
import {
  KitchenService,
  MonsieurAxelMenvoie,
  OrderSummary,
  PreparationStatus,
  PreparedItemAggregate,
} from './kitchenService';
import { DiningApiService } from '../apis/diningApiService';
import { MenuApiService } from '../apis/menuApiService';
import { KitchenNotFoundException } from '../exceptions/kitchenExceptions';
import { logger } from '../logger';
import { MenuItem } from '@spos/clients-menu';
import { PreparationDto } from '@spos/clients-dining';
import { perf } from '../perf';

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

  @perf()
  @logger
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

  // Commence et fini une préparation
  @perf()
  @logger
  async startAndFinishPreparedItem(preparedItemId: string): Promise<boolean> {
    try {
      const preparedItemsApi = this.kitchenApiService.getPreparedItemsApi();
      const startResponse =
        await preparedItemsApi.preparedItemsControllerStartToPrepareItemOnPost({
          preparedItemId,
        });
      if (!startResponse || startResponse.status === 404) {
        throw new KitchenNotFoundException(
          `Préparation de l'article ${preparedItemId} introuvable.`
        );
      }
      const finishResponse =
        await preparedItemsApi.preparedItemsControllerFinishToPrepareItemOnPost(
          {
            preparedItemId,
          }
        );
      if (!finishResponse || finishResponse.status === 404) {
        throw new KitchenNotFoundException(
          `Impossible de terminer la préparation de l'article ${preparedItemId}.`
        );
      }

      return true;
    } catch (error) {
      if (error instanceof KitchenNotFoundException) {
        console.error(error.message);
      } else {
        console.error(
          `Erreur lors de la gestion de la préparation de l'article ${preparedItemId} :`,
          error
        );
      }
      throw error;
    }
  }

  // Commence et fini plusieurs preparations
  @perf()
  @logger
  async readyPreparations(preparationsIds: string[]): Promise<void> {
    for (const preparation of preparationsIds) {
      const preparedItemsApi = (
        await this.kitchenApiService
          .getPreparationApi()
          .preparationsControllerRetrievePreparation({
            preparationId: preparation,
          })
      ).data;
      if (!preparedItemsApi) {
        throw new KitchenNotFoundException(
          `Préparation de l'article ${preparation} introuvable.`
        );
      }
      for (const preparedItem of preparedItemsApi.preparedItems) {
        await this.startAndFinishPreparedItem(preparedItem._id);
      }
    }
  }

  @perf()
  @logger
  async getOrdersByGroupId(groupId: string): Promise<OrderSummary> {
    const group = await this.groupService.getGroup(groupId);
    const orderSummary: OrderSummary = {
      summary: {
        STARTER: {},
        MAIN: {},
        DESSERT: {},
        BEVERAGE: {}
      },
    };
    const menuItems = (
      await this.menuApiService.getMenuApi().menusControllerGetFullMenu()
    ).data;
    await Promise.all(
      group.tables.map(async (table) => {
        await this.calculateTable(table, menuItems, orderSummary);
      })
    );
    // delete empty keys
    for (const category in orderSummary.summary) {
      if (Object.keys(orderSummary.summary[category]).length === 0) {
        delete orderSummary.summary[category];
      }
    }
    return orderSummary;
  }

  @perf()
  private async calculateTable(
    table: Table,
    menuItems: Array<MenuItem>,
    orderSummary: OrderSummary
  ) {
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

    await Promise.all(
      tableOrder.data.preparations.map(async (preparationFromTableOrder) => {
        await this.countPreparationStatuses(
          preparationFromTableOrder,
          menuItems,
          preparationStatuses
        );
      })
    );

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

  @perf()
  private async countPreparationStatuses(
    preparationFromTableOrder: PreparationDto,
    menuItems: Array<MenuItem>,
    preparationStatuses: {
      status: string;
      preparationId: string;
      category: string;
    }[]
  ) {
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
      return;
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

  @perf()
  @logger
  async servePreparation(preparationIds: string[]): Promise<void> {
    const preparationApi = this.kitchenApiService.getPreparationApi();
    for (const preparationId of preparationIds) {
      await preparationApi.preparationsControllerPreparationIsServed({
        preparationId,
      });
    }
  }

  @perf()
  @logger
  async preparationDetails(
    preparationId: string
  ): Promise<PreparedItemAggregate[]> {
    const preparationApi = this.kitchenApiService.getPreparationApi();
    const preparation =
      await preparationApi.preparationsControllerRetrievePreparation({
        preparationId,
      });
    // count prepared items by shortName
    const preparedItemsByShortName: { [shortName: string]: number } = {};
    for (const preparedItem of preparation.data.preparedItems) {
      if (!preparedItemsByShortName[preparedItem.shortName]) {
        preparedItemsByShortName[preparedItem.shortName] = 0;
      }
      preparedItemsByShortName[preparedItem.shortName]++;
    }
    return Object.entries(preparedItemsByShortName).map(
      ([shortName, quantity]) => {
        return {
          shortName,
          quantity,
        };
      }
    );
  }
}
