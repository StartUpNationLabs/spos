import { Inject, Injectable, Logger } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { RemoteBillingApi } from '@spos/clients-bff';

@Injectable()
export class BillingCacheService {
  private readonly logger = new Logger(BillingCacheService.name, {
    timestamp: true,
  });

  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
    public readonly eventEmitter: EventEmitter2,
    @Inject('BILLING_API') private readonly billingsApi: RemoteBillingApi
  ) {}

  public async getBillingSummary(params: { groupId: string }) {
    if (
      await this.redisClient.exists(
        ('GetBillingSummary' + params.groupId) as any
      )
    ) {
      this.logger.log('GetBillingSummary from cache');
      return JSON.parse(
        await this.redisClient.get(
          ('GetBillingSummary' + params.groupId) as any
        )
      );
    }
    this.logger.log('GetBillingSummary from api');
    const request = (
      await this.billingsApi.remoteBillingControllerGetBillingSummary(params)
    ).data;
    await this.redisClient.set(
      ('GetBillingSummary' + params.groupId) as any,
      JSON.stringify(request) as any,
      {
        EX: 60,
      } as any
    );
    return request;
  }

  @OnEvent('update-payment')
  public async invalidateBillingSummary(payload: {
    group_id: string;
    action: string;
  }) {
    if (payload.action === 'order') {
      this.logger.log('invalidateBillingSummary' + payload.group_id);
      await this.redisClient.del(
        ('GetBillingSummary' + payload.group_id) as any
      );
    }
  }
}
