import { Module } from '@nestjs/common';

import { OrderingController } from './ordering.controller';
import { OrderingService } from './ordering.service';
import { createClient } from 'redis';
import { Configuration, RemoteBillingApi, RemoteGroupApi } from '@spos/clients-bff';
import { DiningApiService, MenuApiService } from '@spos/services/common';

@Module({
  imports: [],
  controllers: [OrderingController],
  providers: [
    OrderingService,
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
      provide: 'GROUP_API',
      useFactory: async () => {
        return new RemoteGroupApi(
          new Configuration({ basePath: 'http://localhost:3000' })
        );
      },
    },
    {
      provide: 'DINING_API',
      useFactory: async () => {
        return new DiningApiService(
          new Configuration({ basePath: 'https://dining-backend.spos.polytech.apoorva64.com' })
        );
      },
    },
    {
      provide: 'MENU_API',
      useFactory: async () => {
        return new MenuApiService(
          new Configuration({ basePath: 'https://menu-backend.spos.polytech.apoorva64.com' })
        );
      },
    }],
})
export class AppModule {}
