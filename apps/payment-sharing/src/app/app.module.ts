import { Module } from '@nestjs/common';

import { createClient } from 'redis';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PaymentController } from './payment/payment.controller';
import { PaymentService } from './payment/payment.service';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
  ],
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
  ],
})
export class AppModule {}
