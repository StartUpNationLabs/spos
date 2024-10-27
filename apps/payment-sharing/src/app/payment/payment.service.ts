import { HttpException, Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { EntityId, Repository } from 'redis-om';
import { PaymentSchema } from './payment.schema';
import { TableOrdersApi } from '@spos/clients-dining';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PaymentService {
  private repository: Repository;
  private tableOrderApi = new TableOrdersApi();

  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
    public readonly eventEmitter: EventEmitter2
  ) {
    this.repository = new Repository(PaymentSchema, this.redisClient);
    this.repository.createIndex().then(() => {
      console.log('Index created');
    });
    this.handleUpdatePayment().then(() => {
      console.log('Subscribed to update-payment');
    });
  }

  async takeItemFromCenterTable(
    order_id: string,
    owner_id: string,
    item_short_name: string,
    amount: number
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

    const tableItems = await this.getTableItems(order_id);
    const tableItem = tableItems.find(
      (item) => item.item_short_name === item_short_name
    );
    if (!tableItem) {
      throw new HttpException(
        'item short name: ' + item_short_name + ' not found in the table',
        400
      );
    }
    if (tableItem.amount - amount < 0) {
      throw new HttpException(
        'Every item of short name: ' + item_short_name + ' is already taken',
        400
      );
    }
    if (selected.length > 0) {
      // increment amount
      const payment = selected[0];
      payment.amount = (payment.amount as number) + amount;
      await this.repository.save(payment);
      return;
    }
    const payment = {
      order_id,
      owner_id,
      item_short_name,
      amount: amount,
    };
    await this.repository.save(payment);
    // notify payment service
    // @ts-ignore
    await this.redisClient.publish(
      'update-payment',
      JSON.stringify({
        order_id,
        owner_id,
        item_short_name,
        action: 'take',
        amount,
      })
    );
  }

  async returnItemToCenterTable(
    order_id: string,
    owner_id: string,
    item_short_name: string,
    amount: number
  ) {
    const payment = await this.repository
      .search()
      .where('order_id')
      .equals(order_id)
      .and('owner_id')
      .equals(owner_id)
      .and('item_short_name')
      .equals(item_short_name)
      .return.first();

    if (!payment) {
      throw new HttpException(
        'item short name: ' + item_short_name + ' not found in the payment',
        400
      );
    }
    if ((payment.amount as number) < amount) {
      throw new HttpException(
        'Not enough amount of item short name: ' +
          item_short_name +
          ' to return',
        400
      );
    }
    if ((payment.amount as number) - amount === 0) {
      await this.repository.remove(payment[EntityId]);
    } else {
      payment.amount = (payment.amount as number) - amount;
      await this.repository.save(payment);
    }

    // notify payment service
    // @ts-ignore
    await this.redisClient.publish(
      'update-payment',
      JSON.stringify({
        order_id,
        owner_id,
        item_short_name,
        action: 'return',
        amount,
      })
    );
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
    }) as {
      order_id: string;
      owner_id: string;
      item_short_name: string;
      amount: number;
    }[];
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

    // add items by short name
    const items = {} as any;
    selectedByCustomers.forEach((selectedItem) => {
      if (!items[selectedItem.item_short_name as string]) {
        items[selectedItem.item_short_name as string] = selectedItem;
      } else {
        (items[selectedItem.item_short_name as string].amount as number) += <
          number
        >selectedItem.amount;
      }
    });

    // get the items from the table order
    const itemsFromTableOrder = tableOrder.preparations.reduce(
      (acc, preparation) => {
        preparation.preparedItems.forEach((item) => {
          if (!acc[item.shortName]) {
            acc[item.shortName] = {
              order_id,
              owner_id: 'table',
              item_short_name: item.shortName,
              amount: 0,
            };
          }
          acc[item.shortName].amount += 1;
        });
        return acc;
      },
      {} as {
        order_id: string;
        owner_id: string;
        item_short_name: string;
        amount: number;
      }[]
    );

    // subtract the items from the table order with the items from the customers
    Object.keys(items).forEach((key) => {
      if (itemsFromTableOrder[key]) {
        itemsFromTableOrder[key].amount -= items[key].amount;
      }
    });

    return Object.values(itemsFromTableOrder).filter((item) => item.amount > 0);
  }

  async handleUpdatePayment() {
    const subscription = this.redisClient.duplicate();
    await subscription.connect();
    await subscription.subscribe('update-payment', async (message) => {
      const data = JSON.parse(message);
      this.eventEmitter.emit('update-payment', data);
    });
  }
}
