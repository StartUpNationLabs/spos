import {
  BillingService,
  container,
  Item,
  ItemPaid,
  MonsieurAxelMenvoie2,
  TableItem,
  TableSummary,
  TYPES,
} from '@spos/services/common';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiExtraModels, ApiProperty, ApiTags } from '@nestjs/swagger';
import { RedisClientType } from 'redis';

class AnnotatedItemPaid implements ItemPaid {
  @ApiProperty()
  itemId: string;
  @ApiProperty()
  quantityPaid: number;
}

class AnnotatedMonsieurAxelMenvoie2 implements MonsieurAxelMenvoie2 {
  @ApiProperty({
    type: 'object',
    additionalProperties: {
      type: 'array',
      items: { $ref: '#/components/schemas/AnnotatedItemPaid' },
    },
  })
  elementToBePaid: { [p: number]: AnnotatedItemPaid[] };

  @ApiProperty()
  groupId: string;
}

class AnnotatedItem implements Item {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
}

class AnnotatedTableItem implements TableItem {
  @ApiProperty()
  item: AnnotatedItem;
  @ApiProperty()
  remaining: number;
}

class AnnotationTableSummary implements TableSummary {
  @ApiProperty({ type: () => [AnnotatedTableItem] })
  elements: AnnotatedTableItem[];
  @ApiProperty()
  number: number;
}

@Controller('remoteBilling')
@ApiTags('remoteBilling')
@ApiExtraModels(
  AnnotatedItem,
  AnnotatedItemPaid,
  AnnotatedMonsieurAxelMenvoie2,
  AnnotatedTableItem,
  AnnotationTableSummary
)
export class RemoteBillingController {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType
  ) {}

  @Get(':groupId')
  async getBillingSummary(
    @Param('groupId')
    groupId: string
  ): Promise<AnnotationTableSummary[]> {
    return container
      .get<BillingService>(TYPES.BillingService)
      .getBillingSummary(groupId);
  }

  @Post()
  async partialPayment(
    @Body() payment: AnnotatedMonsieurAxelMenvoie2
  ): Promise<boolean> {
    const res = await container
      .get<BillingService>(TYPES.BillingService)
      .partialPayment(payment);
    if (res) {
      await this.redisClient.publish(
        'update-payment' as any,
        JSON.stringify({
          group_id: payment.groupId,
          action: 'pay',
          actionData: {
            isFinished: true,
          },
        }) as any
      );
    }
    return res;
  }
}
