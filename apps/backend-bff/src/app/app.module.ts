import { Module } from '@nestjs/common';

import { AppController } from './test/app.controller';
import { AppService } from './test/app.service';
import { RemoteGroupController } from "./remoteGroup/remote.group.controller";

@Module({
  imports: [],
  controllers: [AppController, RemoteGroupController],
  providers: [AppService],
})
export class AppModule {}
