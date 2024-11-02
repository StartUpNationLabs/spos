import { Injectable, Logger } from '@nestjs/common';
import { BehaviorSubject, filter, fromEvent, merge, switchMap } from 'rxjs';
import { context, propagation, trace } from '@opentelemetry/api';
import { PaymentResponseTableDTO } from './payment-response.dto';
import { PaymentService } from './payment.service';
import { SelectedByCustomerDTO } from './selected-by-customer.dto';

export interface EventEmitterData {
  group_id: string;
  owner_id: string;
  table_id: string;
  item_short_name: string;
  action: 'take' | 'return' | 'pay' | 'order';
  amount: number;
  actionData?: {
    isFinished?: boolean;
  }
  traceContext: any;
}

@Injectable()
export class SseService {
  private readonly logger = new Logger(SseService.name, {
    timestamp: true,
  });
  private readonly sse = trace.getTracer('SSE');

  constructor(private readonly paymentService: PaymentService) {}

  async getTableItemsSee(group_id: string) {
    const observable = fromEvent(
      this.paymentService.eventEmitter,
      'update-payment'
    ).pipe(
      filter((data: EventEmitterData) => data.group_id === group_id),
      switchMap(async (data: EventEmitterData) => {
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
              if (data.action === 'pay' && data.actionData.isFinished) {
                span.addEvent('payFinished');
                return { data: { isFinished: true }, type: 'payFinished' };
              }
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
    return merge(observable, sub).pipe();
  }

  async getCustomerItemsSee(group_id: string, owner_id: string) {
    const obs = fromEvent(
      this.paymentService.eventEmitter,
      'update-payment'
    ).pipe(
      filter(
        (data: EventEmitterData) =>
          data.group_id === group_id && data.owner_id === owner_id
      ),
      switchMap(async (data:EventEmitterData) => {
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
              if (data.action === 'pay' && data.actionData.isFinished) {
                span.addEvent('payFinished');
                return { data: {isFinished: true}, type: 'payFinished' };
              }
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
}
