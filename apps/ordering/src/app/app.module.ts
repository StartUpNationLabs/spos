import { Module } from '@nestjs/common';

import { OrderingController } from './ordering.controller';
import { OrderingService } from './ordering.service';

@Module({
  imports: [],
  controllers: [OrderingController],
  providers: [OrderingService],
})
export class AppModule {}
