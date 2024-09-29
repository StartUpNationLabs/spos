import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  CartItem,
  container,
  KitchenService,
  MonsieurAxelMenvoie,
  PreparationStatus, PreparedItemAggregate,
  TYPES
} from "@spos/services/common";

class AnnotatedCartItem implements CartItem {
  @ApiProperty()
  itemId: string;
  @ApiProperty()
  shortName: string;
  @ApiProperty()
  quantity: number;
}

class AnnotatedMonsieurAxelMenvoie implements MonsieurAxelMenvoie {
  @ApiProperty({ type: () => [AnnotatedCartItem] })
  cart: CartItem[];
  @ApiProperty()
  groupId: string;
  @ApiProperty()
  tableNumber: number;
}

class AnnotatedPreparationStatus implements PreparationStatus {
  @ApiProperty({
    enum: ['readyToBeServed', 'preparationStarted', 'preparationServed'],
  })
  status: 'readyToBeServed' | 'preparationStarted' | 'preparationServed';
  @ApiProperty()
  preparationId: string;
}

class OrderSummary {
  @ApiProperty({
    type: 'object',
    additionalProperties: {
      type: 'object',
      additionalProperties: {
        type: 'array',
        items: { $ref: '#/components/schemas/AnnotatedPreparationStatus' },
      },
    },
  })
  summary: {
    [category: string]: {
      [table: number]: AnnotatedPreparationStatus[];
    };
  };
}


class AnnotatedPreparedItemAggregate implements PreparedItemAggregate {
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  shortName: string;
}

@Controller('remoteKitchen')
@ApiTags('remoteKitchen')
@ApiExtraModels(
  AnnotatedCartItem,
  AnnotatedMonsieurAxelMenvoie,
  AnnotatedPreparationStatus
)
export class RemoteKitchenController {
  @Get('getOrdersByGroupId')
  async getOrdersByGroupId(
    @Query('groupId')
    groupId: string
  ): Promise<OrderSummary> {
    return await container
      .get<KitchenService>(TYPES.KitchenService)
      .getOrdersByGroupId(groupId);
  }

  @Post('sendToKitchen')
  async sendToKitchen(
    @Body()
    order: AnnotatedMonsieurAxelMenvoie
  ): Promise<void> {
    return await container
      .get<KitchenService>(TYPES.KitchenService)
      .sendToKitchen(order);
  }

  @Post('serve')
  async servePreparation(
    @Body()
    preparationIds: string[]
  ): Promise<void> {
    return await container
      .get<KitchenService>(TYPES.KitchenService)
      .servePreparation(preparationIds);
  }

  @Post('startAndFinishPreparation')
  async startAndFinishPreparation(
    @Body()
    preparedItemId: string
  ): Promise<boolean> {
    return await container
      .get<KitchenService>(TYPES.KitchenService)
      .startAndFinishPreparedItem(preparedItemId);
  }

  @Post('handleNotServedPreparations')
  async handleNotServedPreparations(
    @Body()
    preparationsIds: string[]
  ): Promise<void> {
    return await container
      .get<KitchenService>(TYPES.KitchenApiService)
      .readyPreparations(preparationsIds);
  }

  @Post('readyPreparations')
  async readyPreparations(@Body() preparationsIds: string[]): Promise<void> {
    return await container
      .get<KitchenService>(TYPES.KitchenService)
      .readyPreparations(preparationsIds);
  }

  @Get('preparationDetails')
  async preparationDetails(
    @Query('preparationId') preparationId: string): Promise<AnnotatedPreparedItemAggregate[]> {
    return container.get<KitchenService>(TYPES.KitchenService).preparationDetails(preparationId);
  }
}
