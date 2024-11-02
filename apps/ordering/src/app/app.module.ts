import { Module } from '@nestjs/common';

import { OrderingController } from './ordering.controller';
import { OrderingService } from './ordering.service';
import { createClient } from 'redis';
import { Configuration, RemoteGroupApi } from '@spos/clients-bff';
import { DiningApiService, MenuApiService } from '@spos/services/common';

@Module({
  imports: [],
  controllers: [OrderingController],
  providers: [
    OrderingService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        let url = 'redis://localhost:6379';
        if(process.env['REDIS_URL']) {
          url = process.env['REDIS_URL'];
        }
        const client = createClient({
          url: url,
        });
        await client.connect();
        return client;
      },
    },
    {
      provide: 'GROUP_API',
      useFactory: async () => {
        let basePath = 'http://localhost:3000';
        if(process.env['GROUP_API_BASE_PATH']) {
          basePath = process.env['GROUP_API_BASE_PATH'];
        }
        console.log('Group API base path:', basePath);
        return new RemoteGroupApi(
          new Configuration({ basePath: basePath })
        );
      },
    },
    {
      provide: 'DINING_API',
      useFactory: async () => {
        let basePath = 'https://dining-backend.spos.polytech.apoorva64.com';
        if(process.env['DINING_API_BASE_PATH']) {
          basePath = process.env['DINING_API_BASE_PATH'];
        }
        return new DiningApiService(
          new Configuration({ basePath: basePath })
        );
      },
    },
    {
      provide: 'MENU_API',
      useFactory: async () => {
        let basePath = 'https://menu-backend.spos.polytech.apoorva64.com';
        if(process.env['MENU_API_BASE_PATH']) {
          basePath = process.env['MENU_API_BASE_PATH'];
        }
        return new MenuApiService(
          new Configuration({ basePath: basePath })
        );
      },
    }],
})
export class AppModule {}
