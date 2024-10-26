import { Injectable } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { Repository } from 'redis-om';
import { PaymentSchema } from './payment.schema';
import { TableOrdersApi } from '@spos/clients-dining';

@Injectable()
export class PaymentService {
  private readonly client: RedisClientType;
  private repository: Repository;
  private tableOrderApi = new TableOrdersApi();

  constructor() {
    this.client = createClient();
    await this.client.connect();
    this.repository = new Repository(PaymentSchema, this.client);
  }

  async takeItemFromCenterTable(
    order_id: string,
    owner_id: string,
    item_short_name: string
  ) {
    const selected = await this.repository
      .search()
      .where('order_id')
      .equals(order_id)
      .and('owner_id')
      .equals(owner_id)
      .and('item_short_name')
      .equals(item_short_name)
      .return.all();
    if (selected.length > 0) {
      // increment amount
      const payment = selected[0];
      payment.amount++;
      await this.repository.save(payment);
      return;
    }
    const payment = {
      order_id,
      owner_id,
      item_short_name,
      amount: 0,
    };
    await this.repository.save(payment);
  }

  async returnItemToCenterTable(
    order_id: string,
    owner_id: string,
    item_short_name: string
  ) {
    const ids = await this.repository
      .search()
      .where('order_id')
      .equals(order_id)
      .and('owner_id')
      .equals(owner_id)
      .and('item_short_name')
      .equals(item_short_name)
      .return.allIds();
    await this.client.del(ids as any);
  }

  async getCustomerItems(order_id: string, owner_id: string) {
    const tableOrder = (
      await this.tableOrderApi.tableOrdersControllerGetTableOrderById({
        tableOrderId: order_id,
      })
    ).data;
    const selected = await this.repository
      .search()
      .where('order_id')
      .equals(order_id)
      .and('owner_id')
      .equals(owner_id)
      .return.all();

    return selected.filter((selectedItem) => {
      return tableOrder.preparations.some((preparation) => {
        return preparation.preparedItems.some((item) => {
          return item.shortName === selectedItem.item_short_name;
        });
      });
    });
  }

  async getTableItems(order_id: string) {
    const tableOrder = (
      await this.tableOrderApi.tableOrdersControllerGetTableOrderById({
        tableOrderId: order_id,
      })
    ).data;
    const selectedByCustomers = await this.repository
      .search()
      .where('order_id')
      .equals(order_id)
      .return.all();

    const selected = selectedByCustomers.filter((selectedItem) => {
      return tableOrder.preparations.some((preparation) => {
        return preparation.preparedItems.some((item) => {
          return item.shortName === selectedItem.item_short_name;
        });
      });
    });

    const selectedByItems = {};
    selected.forEach((item) => {
      if (!selectedByItems[item.item_short_name]) {
        selectedByItems[item.item_short_name] = 0;
      }
      selectedByItems[item.item_short_name] += item.amount;
    });

    return selectedByItems;
  }
}
