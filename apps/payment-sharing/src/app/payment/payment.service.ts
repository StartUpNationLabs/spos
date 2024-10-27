import { HttpException, Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { EntityId, Repository } from 'redis-om';
import { PaymentSchema } from './payment.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  AnnotatedTableItem,
  RemoteBillingApi,
} from '@spos/clients-bff';
import { ItemRequestDto } from './Item.dto';

@Injectable()
export class PaymentService {
  private repository: Repository;

  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
    public readonly eventEmitter: EventEmitter2,
    @Inject('BILLING_API') private readonly billingsApi: RemoteBillingApi
  ) {
    this.repository = new Repository(PaymentSchema, this.redisClient);
    this.repository.createIndex().then(() => {
      console.log('Index created');
    });
    this.handleUpdatePayment().then(() => {
      console.log('Subscribed to update-payment');
    });
  }

  async takeItemFromCenterTable(takeItemDto: ItemRequestDto) {
    const { group_id, owner_id, item_short_name, amount, table_id } =
      takeItemDto;
    const selected = await this.repository
      .search()
      .where('group_id')
      .equals(group_id)
      .and('owner_id')
      .equals(owner_id)
      .and('item_short_name')
      .equals(item_short_name)
      .and('table_id')
      .equals(table_id)
      .return.all();

    const tableItems = (await this.getGroupItems(group_id)).find(
      (table) => table.number.toString() === table_id
    )?.elements;
    const tableItem = tableItems.find(
      (item) => item.item.name === item_short_name
    ) as AnnotatedTableItem & {
      onTable: number;
    };
    if (!tableItem) {
      throw new HttpException(
        'item short name: ' + item_short_name + ' not found in the table',
        400
      );
    }
    if (tableItem.onTable - amount < 0) {
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
      group_id,
      table_id,
      owner_id,
      item_short_name,
      amount: amount,
    };
    await this.repository.save(payment);
    // notify payment service
    await this.redisClient.publish(
      'update-payment',
      JSON.stringify({
        group_id,
        owner_id,
        item_short_name,
        action: 'take',
        amount,
      })
    );
  }

  async returnItemToCenterTable(returnItemDto: ItemRequestDto) {
    const { group_id, owner_id, item_short_name, amount, table_id } =
      returnItemDto;
    const payment = await this.repository
      .search()
      .where('group_id')
      .equals(group_id)
      .and('owner_id')
      .equals(owner_id)
      .and('item_short_name')
      .equals(item_short_name)
      .and('table_id')
      .equals(table_id)
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
    await this.redisClient.publish(
      'update-payment',
      JSON.stringify({
        group_id,
        owner_id,
        table_id,
        item_short_name,
        action: 'return',
        amount,
      })
    );
  }

  async getCustomerItems(group_id: string, owner_id: string) {
    const billings = (
      await this.billingsApi.remoteBillingControllerGetBillingSummary({
        groupId: group_id,
      })
    ).data;
    const selected = await this.repository
      .search()
      .where('group_id')
      .equals(group_id)
      .and('owner_id')
      .equals(owner_id)
      .return.all();
    type annotatedBillings = AnnotatedTableItem & {
      selectedByCustomer: number;
    };

    return billings.map((billing) => {
      return {
        ...billing,
        elements: billing.elements
          .map((item: annotatedBillings) => {
            const selectedItem = selected.find(
              (selectedItem) =>
                selectedItem.item_short_name === item.item.name &&
                selectedItem.table_id == billing.number
            );

            if (selectedItem) {
              item.selectedByCustomer = selectedItem.amount as number;
            } else {
              item.selectedByCustomer = 0;
            }
            return item;
          })
          .filter((item) => {
            return item.selectedByCustomer != 0;
          }),
      };
    });
  }

  async getGroupItems(group_id: string) {
    const billings = (
      await this.billingsApi.remoteBillingControllerGetBillingSummary({
        groupId: group_id,
      })
    ).data;
    for (const billingsTable of billings) {
      const selectedByCustomers = await this.repository
        .search()
        .where('group_id')
        .equals(group_id)
        .and('table_id')
        .equals(billingsTable.number)
        .return.all();

      // add items by short name
      const items = {} as any;
      selectedByCustomers
        .filter((selectedItem) => {
          return selectedItem.table_id == billingsTable.number.toString();
        })
        .forEach((selectedItem) => {
          if (!items[selectedItem.item_short_name as string]) {
            items[selectedItem.item_short_name as string] = selectedItem;
          } else {
            (items[selectedItem.item_short_name as string].amount as number) +=
              <number>selectedItem.amount;
          }
        });
      for (const item of billingsTable.elements as (AnnotatedTableItem & {
        onTable: number;
      })[]) {
        if (items[item.item.name]) {
          item.onTable = item.remaining - items[item.item.name].amount;
        } else {
          item.onTable = item.remaining;
        }
      }
    }

    return billings;
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
