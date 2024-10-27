import { Body, Controller, Post } from '@nestjs/common';

import { OrderingService } from './ordering.service';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';

class CartItem {
  @ApiProperty()
  itemId: string;
  @ApiProperty()
  shortName: string;
  @ApiProperty()
  quantity: number;
}

export class OrderingRequestDTO {
  @ApiProperty({ type: [CartItem] })
  cart: CartItem[];
  @ApiProperty()
  groupId: string;
  @ApiProperty()
  tableNumber: number;
}

@Controller("/ordering")
export class OrderingController {
  constructor(private readonly orderingService: OrderingService) {}

  @Post()
  @ApiOperation({ summary: 'Send a batch of element in the kitchen based on their category' })
  async sendToKitchen(@Body() order: OrderingRequestDTO): Promise<void> {
    return this.orderingService.sendToKitchen(order);
  }
}
