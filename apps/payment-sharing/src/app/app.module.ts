import { Module } from '@nestjs/common';

import { createClient } from 'redis';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PaymentController } from './payment/payment.controller';
import { PaymentService } from './payment/payment.service';
import { Configuration, RemoteBillingApi } from '@spos/clients-bff';
import { BillingCacheService } from './payment/billing-cache.service';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    BillingCacheService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        // try to read from env
        let url = process.env['REDIS_URL'];
        if (!url) {
          url = 'redis://localhost:6379';
        }
        const client = createClient({
          url,
        });
        await client.connect();
        return client;
      },
    },
    {
      provide: 'BILLING_API',
      useFactory: async () => {
        // try to read from env
        let url = process.env['BILLING_API_URL'];
        if (!url) {
          url = 'http://localhost:3000';
        }
        return new RemoteBillingApi(new Configuration({ basePath: url }));
      },
    },
  ],
})
export class AppModule {}
