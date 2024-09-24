import { Controller, Get } from '@nestjs/common';

import { container, GroupService } from '@spos/services/common';

@Controller('remoteGroup')
export class RemoteGroupController {
  @Get()
  getGroups() {
    return container.get(GroupService).getGroups();
  }
}
