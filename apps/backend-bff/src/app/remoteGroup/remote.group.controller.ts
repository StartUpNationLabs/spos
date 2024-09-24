import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";

import { container, Group, GroupCreateDto, GroupService } from "@spos/services/common";

@Controller('remoteGroup')
export class RemoteGroupController {
  @Get()
  getGroups(): Group[] {
    return container.get(GroupService).getGroups();
  }

  @Get(':id')
  getGroup(id: string): Group {
    return container.get(GroupService).getGroup(id);
  }

  @Post()
  @HttpCode(201)
  addGroup(@Body() body: GroupCreateDto) {
    return container.get(GroupService).addGroup(body);
  }
}
