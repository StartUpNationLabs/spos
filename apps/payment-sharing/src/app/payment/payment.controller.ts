import { Body, Controller, Get, Param, Post, Sse } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import {
  BehaviorSubject,
  filter,
  fromEvent,
  merge,
  Observable,
  switchMap,
} from 'rxjs';
import { ItemRequestDto } from './Item.dto';
import { PaymentResponseTableDTO } from './payment-response.dto';
import { SelectedByCustomerDTO } from './selected-by-customer.dto';
import { context, propagation, trace } from '@opentelemetry/api';

@Controller('payments')
@ApiTags('payments')
export class PaymentController {
  private readonly sse = trace.getTracer('SSE');

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
    const obs = fromEvent(
      this.paymentService.eventEmitter,
      'update-payment'
    ).pipe(
      filter(
        (data: { group_id: string; owner_id: string; traceContext: any }) =>
          data.group_id === group_id && data.owner_id === owner_id
      ),
      switchMap(async (data) => {
        const extractedContext = propagation.extract(
          context.active(),
          data.traceContext
        ); // Extract the OpenTelemetry context
        return await context.with(extractedContext, async () => {
          return await this.sse.startActiveSpan(
            'sseCustomerItems',
            async (span) => {
              span.addEvent('sseCustomerItems');
              span.setAttribute('group_id', group_id);
              span.setAttribute('owner_id', owner_id);
              return {
                data: await this.paymentService.getCustomerItems(
                  group_id,
                  owner_id
                ),
              };
            }
          );
        });
      })
    );
    // make a separate observable to send the initial data
    const initialData = await this.paymentService.getCustomerItems(
      group_id,
      owner_id
    );
    const sub = new BehaviorSubject<{
      data: SelectedByCustomerDTO[];
    }>({
      data: initialData,
    });
    return merge(obs, sub).pipe();
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
  ): Promise<Observable<{ data: PaymentResponseTableDTO[] }>> {
    const observalbe = fromEvent(
      this.paymentService.eventEmitter,
      'update-payment'
    ).pipe(
      filter(
        (data: { group_id: string; traceContext: any }) =>
          data.group_id === group_id
      ),
      switchMap(async (data) => {
        const extractedContext = propagation.extract(
          context.active(),
          data.traceContext
        ); // Extract the OpenTelemetry context
        return await context.with(extractedContext, async () => {
          return await this.sse.startActiveSpan(
            'sseTableItems',
            async (span) => {
              span.addEvent('sseTableItems');
              span.setAttribute('group_id', group_id);
              const items = await this.paymentService.getGroupItems(group_id);
              return { data: items };
            }
          );
        });
      })
    );
    // make a separate observable to send the initial data
    const initialData = await this.paymentService.getGroupItems(group_id);
    const sub = new BehaviorSubject<{
      data: PaymentResponseTableDTO[];
    }>({
      data: initialData,
    });
    return merge(observalbe, sub).pipe();
  }

  @Post('pay/:groupId/:ownerId')
  @ApiResponse({
    status: 201,
    description: 'Payment made successfully',
    type: Boolean
  })
  async makePayment(
    @Param('groupId') groupId: string,
    @Param('ownerId') ownerId: string
  ): Promise<boolean> {
    return await this.paymentService.makePayment(groupId, ownerId);
  }
}
