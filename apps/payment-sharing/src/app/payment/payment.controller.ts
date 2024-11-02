import { Body, Controller, Get, Param, Post, Sse } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { Observable } from 'rxjs';
import { ItemRequestDto } from './Item.dto';
import { PaymentResponseTableDTO } from './payment-response.dto';
import { SelectedByCustomerDTO } from './selected-by-customer.dto';
import { trace } from '@opentelemetry/api';
import { SseService } from './sse.service';

@Controller('payments')
@ApiTags('payments')
export class PaymentController {
  private readonly sse = trace.getTracer('SSE');

  constructor(
    private readonly paymentService: PaymentService,
    private readonly sseService: SseService
  ) {}

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
  @ApiResponse({
    status: 200,
    description: 'Items of the customer',
    type: SelectedByCustomerDTO,
    isArray: true,
  })
  async getCustomerItems(
    @Param('group_id') group_id: string,
    @Param('owner_id') owner_id: string
  ): Promise<SelectedByCustomerDTO[]> {
    return await this.paymentService.getCustomerItems(group_id, owner_id);
  }

  @Get('table-items/:group_id')
  @ApiOperation({ summary: 'Get items of the group' })
  @ApiResponse({
    status: 200,
    description: 'Items of the group',
    type: PaymentResponseTableDTO,
    isArray: true,
  })
  async getTableItems(@Param('group_id') group_id: string) {
    return await this.paymentService.getGroupItems(group_id);
  }

  @Sse('sse/customer-items/:group_id/:owner_id')
  @ApiOperation({ summary: 'Get items of a customer in real-time' })
  @ApiResponse({
    status: 200,
    description: 'Items of the customer',
    type: SelectedByCustomerDTO,
    isArray: true,
  })
  async sseCustomerItems(
    @Param('group_id') group_id: string,
    @Param('owner_id') owner_id: string
  ) {
    return this.sseService.getCustomerItemsSee(group_id, owner_id);
  }

  @Sse('sse/table-items/:group_id')
  @ApiOperation({ summary: 'Get items of the table in real-time' })
  @ApiResponse({
    status: 200,
    description: 'items of the table in real-time',
    type: PaymentResponseTableDTO,
    isArray: true,
  })
  async sseTableItems(
    @Param('group_id') group_id: string
  ) {
    return this.sseService.getTableItemsSee(group_id);
  }

  @Post('pay/:groupId/:ownerId')
  @ApiResponse({
    status: 201,
    description: 'Payment made successfully',
    type: Boolean,
  })
  async makePayment(
    @Param('groupId') groupId: string,
    @Param('ownerId') ownerId: string
  ): Promise<boolean> {
    return await this.paymentService.makePayment(groupId, ownerId);
  }
}
