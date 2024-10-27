import { Controller, Post, Body, Get, Param, Sse } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse, ApiTags
} from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { filter, fromEvent, Observable, switchMap } from 'rxjs';
import { ItemRequestDto } from './Item.dto';
import { PaymentResponseTableDTO } from './payment-response.dto';
import { SelectedByCustomerDTO } from './selected-by-customer.dto';

@Controller('payments')
@ApiTags('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('take-item')
  //@ApiOperation({ summary: 'Take an item from the center table' })
  @ApiResponse({ status: 200, description: 'Item taken successfully' })
  async takeItemFromCenterTable(@Body() takeItemDto: ItemRequestDto) {
    await this.paymentService.takeItemFromCenterTable(takeItemDto);
  }

  @Post('return-item')
  @ApiOperation({ summary: 'Return an item to the center table' })
  @ApiResponse({ status: 200, description: 'Item returned successfully' })
  async returnItemToCenterTable(@Body() takeItemDto: ItemRequestDto) {
    await this.paymentService.returnItemToCenterTable(takeItemDto);
  }

  @Get('customer-items/:group_id/:owner_id')
  @ApiOperation({ summary: 'Get items of a customer' })
  @ApiResponse({ status: 200, description: 'Items of the customer', type: SelectedByCustomerDTO, isArray: true })
  async getCustomerItems(
    @Param('group_id') group_id: string,
    @Param('owner_id') owner_id: string
  ): Promise<SelectedByCustomerDTO[]> {
    return await this.paymentService.getCustomerItems(group_id, owner_id);
  }

  @Get('table-items/:group_id')
  @ApiOperation({ summary: 'Get items of the group' })
  @ApiResponse({ status: 200, description: 'Items of the group', type: PaymentResponseTableDTO, isArray: true })
  async getTableItems(@Param('group_id') group_id: string) {
    return await this.paymentService.getGroupItems(group_id);
  }

  @Sse('sse/customer-items/:group_id/:owner_id')
  @ApiOperation({ summary: 'Get items of a customer in real-time' })
  @ApiResponse({ status: 200, description: 'Items of the customer', type: SelectedByCustomerDTO, isArray: true })
  sseCustomerItems(
    @Param('group_id') group_id: string,
    @Param('owner_id') owner_id: string
  ) {
    return fromEvent(this.paymentService.eventEmitter, 'update-payment').pipe(
      filter(
        (data: { group_id: string; owner_id: string }) =>
          data.group_id === group_id && data.owner_id === owner_id
      ),
      switchMap(async () => {
        const items = await this.paymentService.getCustomerItems(
          group_id,
          owner_id
        );
        return { data: items };
      })
    );
  }

  @Sse('sse/table-items/:group_id')
  @ApiOperation({ summary: 'Get items of the table in real-time' })
  @ApiResponse({ status: 200, description: 'items of the table in real-time', type: PaymentResponseTableDTO, isArray: true })
  sseTableItems(
    @Param('group_id') group_id: string
  ): Observable<{ data: PaymentResponseTableDTO[] }> {
    return fromEvent(this.paymentService.eventEmitter, 'update-payment').pipe(
      filter((data: { group_id: string }) => data.group_id === group_id),
      switchMap(async () => {
        const items = await this.paymentService.getGroupItems(group_id);
        return { data: items };
      })
    );
  }
}
