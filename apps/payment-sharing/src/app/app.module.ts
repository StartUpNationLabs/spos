import { Module } from '@nestjs/common';

import { createClient } from 'redis';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PaymentController } from './payment/payment.controller';
import { PaymentService } from './payment/payment.service';
import { Configuration, RemoteBillingApi } from '@spos/clients-bff';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const client = createClient({
          url: 'redis://localhost:6379',
        });
        await client.connect();
        return client;
      },
    },
    {
      provide: 'BILLING_API',
      useFactory: async () => {
        return new RemoteBillingApi(
          new Configuration({ basePath: 'http://localhost:3000' })
        );
      },
    },
  ],
})
export class AppModule {}
