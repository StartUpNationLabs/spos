import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { EntityId, Repository } from 'redis-om';
import { Payment, PaymentSchema } from './payment.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AnnotatedTableItem, RemoteBillingApi } from '@spos/clients-bff';
import { ItemRequestDto } from './Item.dto';
import {
  PaymentResponseItemDTO,
  PaymentResponseTableDTO,
} from './payment-response.dto';
import { SelectedByCustomerDTO } from './selected-by-customer.dto';
import { BillingCacheService } from './billing-cache.service';
import { context, propagation, trace } from '@opentelemetry/api';
import { ItemPaid } from '@spos/services/common';

@Injectable()
export class PaymentService {
  private repository: Repository;
  private readonly logger = new Logger(PaymentService.name, {
    timestamp: true,
  });
  private readonly tracer = trace.getTracer('PaymentService');

  constructor(
    private readonly billingCacheService: BillingCacheService,
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
    public readonly eventEmitter: EventEmitter2,
    @Inject('BILLING_API') private readonly billingsApi: RemoteBillingApi
  ) {
    this.repository = new Repository(PaymentSchema, this.redisClient);
    this.repository.createIndex().then(() => {
      this.logger.log('Index created');
    });
    this.handleUpdatePayment().then(() => {
      this.logger.log('Subscribed to update-payment');
    });
  }

  async publishWithContext(channel: string, message: object) {
    await this.tracer.startActiveSpan('publishWithContext', async (span) => {
      try {
        const carrier = {};
        propagation.inject(context.active(), carrier);
        const enrichedMessage = { ...message, traceContext: carrier };
        await this.redisClient.publish(
          channel as any,
          JSON.stringify(enrichedMessage) as any
        );
        this.logger.log(
          `Published ${channel} event with OpenTelemetry context`
        );
      } finally {
        span.end();
      }
    });
  }

  async takeItemFromCenterTable(takeItemDto: ItemRequestDto) {
    await this.tracer.startActiveSpan(
      'takeItemFromCenterTable',
      async (span) => {
        try {
          const { group_id, owner_id, item_short_name, amount, table_id } =
            takeItemDto;
          this.logger.log(
            `Taking item from center table: ${JSON.stringify(takeItemDto)}`
          );

          const selected = await this.tracer.startActiveSpan(
            'repository.search',
            async (dbSpan) => {
              try {
                return await this.repository
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
              } finally {
                dbSpan.end();
              }
            }
          );

          const tableItems = (await this.getGroupItems(group_id)).find(
            (table) => table.number.toString() === table_id
          )?.elements;
          const tableItem = tableItems.find(
            (item) => item.item.name === item_short_name
          ) as AnnotatedTableItem & { onTable: number };

          if (!tableItem) {
            this.logger.error(
              `Item short name: ${item_short_name} not found in the table`
            );
            throw new HttpException(
              'item short name: ' + item_short_name + ' not found in the table',
              400
            );
          }

          if (tableItem.onTable - amount < 0) {
            this.logger.error(
              `Every item of short name: ${item_short_name} is already taken`
            );
            throw new HttpException(
              'Every item of short name: ' +
                item_short_name +
                ' is already taken',
              400
            );
          }

          if (selected.length > 0) {
            const payment = selected[0];
            payment.amount = (payment.amount as number) + amount;
            await this.repository.save(payment);
            this.logger.log(`Incremented amount for item: ${item_short_name}`);
          } else {
            const payment = {
              group_id,
              table_id,
              owner_id,
              item_short_name,
              amount: amount,
            };
            await this.repository.save(payment);
            this.logger.log(`Saved new payment for item: ${item_short_name}`);
          }

          await this.publishWithContext('update-payment', {
            group_id,
            owner_id,
            item_short_name,
            action: 'take',
            amount,
          });
        } finally {
          span.end();
        }
      }
    );
  }

  async returnItemToCenterTable(returnItemDto: ItemRequestDto) {
    await this.tracer.startActiveSpan(
      'returnItemToCenterTable',
      async (span) => {
        try {
          const { group_id, owner_id, item_short_name, amount, table_id } =
            returnItemDto;
          this.logger.log(
            `Returning item to center table: ${JSON.stringify(returnItemDto)}`
          );

          const payment = await this.tracer.startActiveSpan(
            'repository.search',
            async (dbSpan) => {
              try {
                return await this.repository
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
              } finally {
                dbSpan.end();
              }
            }
          );

          if (!payment) {
            this.logger.error(
              `Item short name: ${item_short_name} not found in the payment`
            );
            throw new HttpException(
              'item short name: ' +
                item_short_name +
                ' not found in the payment',
              400
            );
          }

          if ((payment.amount as number) < amount) {
            this.logger.error(
              `Not enough amount of item short name: ${item_short_name} to return`
            );
            throw new HttpException(
              'Not enough amount of item short name: ' +
                item_short_name +
                ' to return',
              400
            );
          }

          if ((payment.amount as number) - amount === 0) {
            await this.repository.remove(payment[EntityId]);
            this.logger.log(`Removed payment for item: ${item_short_name}`);
          } else {
            payment.amount = (payment.amount as number) - amount;
            await this.repository.save(payment);
            this.logger.log(`Decremented amount for item: ${item_short_name}`);
          }

          await this.publishWithContext('update-payment', {
            group_id,
            owner_id,
            table_id,
            item_short_name,
            action: 'return',
            amount,
          });
        } finally {
          span.end();
        }
      }
    );
  }

  async getCustomerItems(
    group_id: string,
    owner_id: string
  ): Promise<SelectedByCustomerDTO[]> {
    return await this.tracer.startActiveSpan(
      'getCustomerItems',
      async (span) => {
        try {
          this.logger.log(
            `Getting customer items for group_id: ${group_id}, owner_id: ${owner_id}`
          );
          const billings = (await this.billingCacheService.getBillingSummary({
            groupId: group_id,
          })) as SelectedByCustomerDTO[];

          const selected = await this.repository
            .search()
            .where('group_id')
            .equals(group_id)
            .and('owner_id')
            .equals(owner_id)
            .return.all();

          return billings.map((billing) => {
            return {
              ...billing,
              elements: billing.elements
                .map(
                  (
                    item: AnnotatedTableItem & { selectedByCustomer: number }
                  ) => {
                    const selectedItem = selected.find(
                      (selectedItem) =>
                        selectedItem.item_short_name === item.item.name &&
                        selectedItem.table_id == billing.number
                    );

                    item.selectedByCustomer = selectedItem
                      ? (selectedItem.amount as number)
                      : 0;
                    return item;
                  }
                )
                .filter((item) => item.selectedByCustomer != 0),
            };
          }) as SelectedByCustomerDTO[];
        } finally {
          span.end();
        }
      }
    );
  }

  async getGroupItems(group_id: string): Promise<PaymentResponseTableDTO[]> {
    return await this.tracer.startActiveSpan('getGroupItems', async (span) => {
      try {
        this.logger.log(`Getting group items for group_id: ${group_id}`);
        const billings = (await this.billingCacheService.getBillingSummary({
          groupId: group_id,
        })) as PaymentResponseTableDTO[];

        for (const billingsTable of billings) {
          const selectedByCustomers = await this.repository
            .search()
            .where('group_id')
            .equals(group_id)
            .and('table_id')
            .equals(billingsTable.number)
            .return.all();

          const items = {} as { [key: string]: Payment };
          selectedByCustomers
            .filter((selectedItem) => {
              return selectedItem.table_id == billingsTable.number.toString();
            })
            .forEach((selectedItem) => {
              if (!items[selectedItem.item_short_name as string]) {
                items[selectedItem.item_short_name as string] = <Payment>(
                  selectedItem
                );
              } else {
                (items[selectedItem.item_short_name as string]
                  .amount as number) += <number>selectedItem.amount;
              }
            });
          for (const item of billingsTable.elements as PaymentResponseItemDTO[]) {
            if (items[item.item.name]) {
              item.onTable = item.remaining - items[item.item.name].amount;
            } else {
              item.onTable = item.remaining;
            }
          }
        }

        return billings;
      } finally {
        span.end();
      }
    });
  }

  async makePayment(group_id: string, owner_id: string): Promise<boolean> {
    return  await this.tracer.startActiveSpan('makePayment', async (span) => {
      try {
        this.logger.log(
          `Making payment for group_id: ${group_id}, owner_id: ${owner_id}`
        );
        const selected = await this.getCustomerItems(group_id, owner_id);

        // convert to [tableNumber: number]: ItemPaid[]

        const tableItems = {} as { [tableNumber: number]: ItemPaid[] };
        selected.forEach((selectedItem) => {
          selectedItem.elements.forEach((element) => {
            if (element.selectedByCustomer > 0) {
              if (!tableItems[selectedItem.number]) {
                tableItems[selectedItem.number] = [];
              }
              tableItems[selectedItem.number].push({
                itemId: element.item.id,
                quantityPaid: element.selectedByCustomer,
              });
            }
          });
        });

        const isFinished =(
          await this.billingsApi.remoteBillingControllerPartialPayment({
            annotatedMonsieurAxelMenvoie2: {
              groupId: group_id,
              elementToBePaid: tableItems,
            },
          })).data;

        // remove all selected items
        const selectedItems = await this.repository
          .search()
          .where('group_id')
          .equals(group_id)
          .and('owner_id')
          .equals(owner_id)
          .return.all();
        await this.repository.remove(selectedItems.map((item) => item[EntityId]));

        await this.publishWithContext('update-payment', {
          group_id,
          owner_id,
          action: 'pay',
        });
        return isFinished;
      } finally {
        span.end();
      }
    });
  }

  async handleUpdatePayment() {
    await this.tracer.startActiveSpan('handleUpdatePayment', async (span) => {
      try {
        this.logger.log('Handling update payment');
        const subscription = this.redisClient.duplicate();
        await subscription.connect();
        await subscription.subscribe('update-payment', async (message) => {
          const data = JSON.parse(message);
          this.logger.log(`Received update-payment event: ${message}`);
          this.eventEmitter.emit('update-payment', data);
        });
      } finally {
        span.end();
      }
    });
  }
}
