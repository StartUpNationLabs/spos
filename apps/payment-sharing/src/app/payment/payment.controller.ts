import { Controller, Post, Body, Get, Param, Sse } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse } from "@nestjs/swagger";
import { PaymentService } from './payment.service';
import { filter, fromEvent, Observable, switchMap } from "rxjs";

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('take-item')
  @ApiOperation({ summary: 'Take an item from the center table' })
  @ApiBody({ schema: { properties: { order_id: { type: 'string' }, owner_id: { type: 'string' }, item_short_name: { type: 'string' }  , amount: { type: 'number' } } } })
  @ApiResponse({ status: 200, description: 'Item taken successfully' })
  async takeItemFromCenterTable(
    @Body('order_id') order_id: string,
    @Body('owner_id') owner_id: string,
    @Body('item_short_name') item_short_name: string,
    @Body('amount') amount: number
  ) {
    await this.paymentService.takeItemFromCenterTable(order_id, owner_id, item_short_name, amount);
  }

  @Post('return-item')
  @ApiOperation({ summary: 'Return an item to the center table' })
  @ApiBody({ schema: { properties: { order_id: { type: 'string' }, owner_id: { type: 'string' }, item_short_name: { type: 'string' } , amount: { type: 'number' } } } })
  @ApiResponse({ status: 200, description: 'Item returned successfully' })
  async returnItemToCenterTable(
    @Body('order_id') order_id: string,
    @Body('owner_id') owner_id: string,
    @Body('item_short_name') item_short_name: string,
    @Body('amount') amount: number
  ) {
    await this.paymentService.returnItemToCenterTable(order_id, owner_id, item_short_name, amount);
  }

  @Get('customer-items/:order_id/:owner_id')
  @ApiOperation({ summary: 'Get items of a customer' })
  async getCustomerItems(
    @Param('order_id') order_id: string,
    @Param('owner_id') owner_id: string
  ) {
    return await this.paymentService.getCustomerItems(order_id, owner_id);
  }

  @Get('table-items/:order_id')
  @ApiOperation({ summary: 'Get items of the table' })
  async getTableItems(@Param('order_id') order_id: string) {
    return await this.paymentService.getTableItems(order_id);
  }

  @Sse('sse/customer-items/:order_id/:owner_id')
  @ApiOperation({ summary: 'Get items of a customer in real-time' })
  sseCustomerItems(
    @Param('order_id') order_id: string,
    @Param('owner_id') owner_id: string
  ) {
    return fromEvent(this.paymentService.eventEmitter, 'update-payment').pipe(
      filter((data: {
        order_id: string;
        owner_id: string;
      }) => data.order_id === order_id && data.owner_id === owner_id),
      switchMap(async () => {
        const items = await this.paymentService.getCustomerItems(order_id, owner_id);
        return { data: items };
      })
    );
  }

  @Sse('sse/table-items/:order_id')
  @ApiOperation({ summary: 'Get items of the table in real-time' })
  sseTableItems(@Param('order_id') order_id: string) {
    return fromEvent(this.paymentService.eventEmitter, 'update-payment').pipe(
      filter((data: {
        order_id: string;
      }) => data.order_id === order_id),
      switchMap(async () => {
        const items = await this.paymentService.getTableItems(order_id);
        return { data: items };
      })
    );
  }
}
