import { Module } from '@nestjs/common';

import { AppController } from './test/app.controller';
import { AppService } from './test/app.service';
import { RemoteGroupController } from "./remoteGroup/remote.group.controller";
import { RemoteTableController } from "./remoteTable/remote.table.controller";
import { RemoteCatalogueController } from './remoteCatalogue/remote.catalogue.controller';

@Module({
  imports: [],
  controllers: [AppController, RemoteGroupController, RemoteTableController,RemoteCatalogueController],
  providers: [AppService],
})
export class AppModule {}
