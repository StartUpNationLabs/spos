import { Body, Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { ApiExtraModels, ApiProperty, ApiTags } from "@nestjs/swagger";
import {
  CartItem,
  container,
  KitchenService,
  MonsieurAxelMenvoie,
  PreparationStatus,
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

class AnnotatedPreparationStatus  implements PreparationStatus {
  @ApiProperty(
    { enum: ["readyToBeServed", "preparationStarted", "preparationServed"] }
  )
  status: "readyToBeServed" | "preparationStarted" | "preparationServed";
  @ApiProperty()
  preparationId: string;
}

class OrderSummary {
  @ApiProperty(
    { type: 'object', additionalProperties: { type: 'object', additionalProperties: { type: 'array', items: { $ref: '#/components/schemas/AnnotatedPreparationStatus' } } } }
  )
  summary: {
    [category: string]: {
      [table: number]: AnnotatedPreparationStatus[];
    };
  };
}

@Controller('remoteKitchen')
@ApiTags('remoteKitchen')
@ApiExtraModels(AnnotatedCartItem, AnnotatedMonsieurAxelMenvoie, AnnotatedPreparationStatus)
export class RemoteKitchenController {
  @Get()
  async getOrdersByGroupId(
    @Query('groupId')
    groupId: string
  ): Promise<OrderSummary> {
    return (await container.get<KitchenService>(TYPES.KitchenService).getOrdersByGroupId(groupId))
  }

  @Delete()
  async removeFromKitchen(
    @Body()
    order: AnnotatedMonsieurAxelMenvoie
  ): Promise<boolean> {
    return (await container.get<KitchenService>(TYPES.KitchenService).removeFromKitchen(order))
  }

  @Post()
  async sendToKitchen(
    @Body()
    order: AnnotatedMonsieurAxelMenvoie): Promise<void> {
    return (await container.get<KitchenService>(TYPES.KitchenService).sendToKitchen(order))
  }
}
