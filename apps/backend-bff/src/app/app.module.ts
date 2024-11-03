import { Module } from '@nestjs/common';

import { AppController } from './test/app.controller';
import { AppService } from './test/app.service';
import { RemoteGroupController } from './remoteGroup/remote.group.controller';
import { RemoteTableController } from './remoteTable/remote.table.controller';
import { RemoteOfferController } from './remoteOffer/remote.offer.controller';
import { RemoteCatalogueController } from './remoteCatalogue/remote.catalogue.controller';
import { RemoteKitchenController } from './remoteKitchen/remote.kitchen.controller';
import { RemoteBillingController } from './remoteBilling/remote.billing.controller';
import { createClient } from 'redis';

@Module({
  imports: [],
  controllers: [
    AppController,
    RemoteGroupController,
    RemoteTableController,
    RemoteOfferController,
    RemoteCatalogueController,
    RemoteKitchenController,
    RemoteBillingController,
  ],
  providers: [
    AppService,
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
  ],
})
export class AppModule {}
