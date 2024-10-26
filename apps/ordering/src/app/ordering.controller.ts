import { Controller, Post } from '@nestjs/common';

import { OrderingService } from './ordering.service';
import { MonsieurAxelMenvoie } from '@spos/services/common';

@Controller("/ordering")
export class OrderingController {
  constructor(private readonly orderingService: OrderingService) {}

  @Post()
  async sendToKitchen(order: MonsieurAxelMenvoie): Promise<void> {
    return this.orderingService.sendToKitchen(order);
  }
}
