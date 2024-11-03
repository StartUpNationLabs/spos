import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  DiningApiService,
  Group,
  MenuApiService,
  Table,
} from '@spos/services/common';
import { MenuItem } from '@spos/clients-menu';
import { RedisClientType } from 'redis';
import { OrderingRequestDTO } from './ordering.controller';
import { RemoteGroupApi } from '@spos/clients-bff';

@Injectable()
export class OrderingService {
  private readonly logger = new Logger(OrderingService.name, {
    timestamp: true,
  });

  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
    @Inject('GROUP_API') private readonly groupService: RemoteGroupApi,
    @Inject('DINING_API') private readonly diningApiService: DiningApiService,
    @Inject('MENU_API') private readonly menuApiService: MenuApiService
  ) {}

  async sendToKitchen(order: OrderingRequestDTO): Promise<void> {
    this.logger.log('Sending order to kitchen', order);
    const group = (
      await this.groupService.remoteGroupControllerGetGroup({
        id: order.groupId,
      })
    ).data;
    const tableOrderId = this.findTableOrderId(group, order.tableNumber);
    if (!tableOrderId) {
      throw new Error(`Table not found: ${order.tableNumber}`);
    }

    const menuItems = await this.getMenuItems();
    const cartItemsByCategory = this.splitCartItemsByCategory(order, menuItems);

    await this.processCartItems(cartItemsByCategory, tableOrderId);
    this.logger.log('Sending event to invalidate billing summary');
    await this.redisClient.publish(
      'order',
      JSON.stringify({
        group_id: order.groupId,
        action: 'order',
      })
    );
  }

  private findTableOrderId(
    group: Group,
    tableNumber: number
  ): Table | undefined {
    return group.tables.find((table) => table.number === tableNumber);
  }

  private async getMenuItems(): Promise<MenuItem[]> {
    return (await this.menuApiService.getMenuApi().menusControllerGetFullMenu())
      .data;
  }

  private splitCartItemsByCategory(
    order: OrderingRequestDTO,
    menuItems: MenuItem[]
  ): {
    [category: string]: OrderingRequestDTO;
  } {
    const cartItemsByCategory: { [category: string]: OrderingRequestDTO } = {};
    for (const item of order.cart) {
      const menuItem = menuItems.find(
        (menuItem) => menuItem.shortName === item.shortName
      );
      if (!menuItem) {
        throw new Error(`Menu item not found: ${item.itemId}`);
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
    return cartItemsByCategory;
  }

  private async processCartItems(
    cartItemsByCategory: {
      [category: string]: OrderingRequestDTO;
    },
    tableOrderId: Table
  ): Promise<void> {
    const tableOrdersApi = this.diningApiService.getTableOrdersApi();
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
}
