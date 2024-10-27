import { Controller, Post, Body, Get, Param, Sse } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse } from "@nestjs/swagger";
import { PaymentService } from './payment.service';
import { filter, fromEvent, Observable, switchMap } from "rxjs";

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('take-item')
  @ApiOperation({ summary: 'Take an item from the center table' })
  @ApiBody({ schema: { properties: { group_id: { type: 'string' }, owner_id: { type: 'string' }, item_short_name: { type: 'string' }  , amount: { type: 'number' } , table_id: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Item taken successfully' })
  async takeItemFromCenterTable(
    @Body('group_id') group_id: string,
    @Body('owner_id') owner_id: string,
    @Body('item_short_name') item_short_name: string,
    @Body('amount') amount: number,
    @Body('table_id') table_id: string
  ) {
    await this.paymentService.takeItemFromCenterTable(group_id, owner_id, item_short_name, amount, table_id);
  }

  @Post('return-item')
  @ApiOperation({ summary: 'Return an item to the center table' })
  @ApiBody({ schema: { properties: { group_id: { type: 'string' }, owner_id: { type: 'string' }, item_short_name: { type: 'string' } , amount: { type: 'number' } , table_id: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Item returned successfully' })
  async returnItemToCenterTable(
    @Body('group_id') group_id: string,
    @Body('owner_id') owner_id: string,
    @Body('item_short_name') item_short_name: string,
    @Body('amount') amount: number,
    @Body('table_id') table_id: string
  ) {
    await this.paymentService.returnItemToCenterTable(group_id, owner_id, item_short_name, amount, table_id);
  }

  @Get('customer-items/:group_id/:owner_id')
  @ApiOperation({ summary: 'Get items of a customer' })
  async getCustomerItems(
    @Param('group_id') group_id: string,
    @Param('owner_id') owner_id: string
  ) {
    return await this.paymentService.getCustomerItems(group_id, owner_id);
  }

  @Get('table-items/:group_id')
  @ApiOperation({ summary: 'Get items of the table' })
  async getTableItems(@Param('group_id') group_id: string) {
    return await this.paymentService.getGroupItems(group_id);
  }

  @Sse('sse/customer-items/:group_id/:owner_id')
  @ApiOperation({ summary: 'Get items of a customer in real-time' })
  sseCustomerItems(
    @Param('group_id') group_id: string,
    @Param('owner_id') owner_id: string
  ) {
    return fromEvent(this.paymentService.eventEmitter, 'update-payment').pipe(
      filter((data: {
        group_id: string;
        owner_id: string;
      }) => data.group_id === group_id && data.owner_id === owner_id),
      switchMap(async () => {
        const items = await this.paymentService.getCustomerItems(group_id, owner_id);
        return { data: items };
      })
    );
  }

  @Sse('sse/table-items/:group_id')
  @ApiOperation({ summary: 'Get items of the table in real-time' })
  sseTableItems(@Param('group_id') group_id: string): Observable<any> {
    return fromEvent(this.paymentService.eventEmitter, 'update-payment').pipe(
      filter((data: {
        group_id: string;
      }) => data.group_id === group_id),
      switchMap(async () => {
        const items = await this.paymentService.getGroupItems(group_id);
        return { data: items };
      })
    );
  }
}
