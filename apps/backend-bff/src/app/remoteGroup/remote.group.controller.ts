import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';

import {
  container,
  Group,
  GroupCreateDto, GroupService,
  GroupServiceWorkflow,
  Table,
  TableCreateDto, TYPES
} from "@spos/services/common";
import { ApiProperty, ApiTags } from '@nestjs/swagger';

export class TableDto implements Table {
  @ApiProperty()
  id: string;
  @ApiProperty()
  number: number;

  @ApiProperty()
  customerCount: number;
}
export class Status{
  @ApiProperty()
  success : boolean;
}

export class AnnotatedGroup implements Group {
  @ApiProperty()
  id: string;
  @ApiProperty({ type: () => [TableDto] })
  tables: TableDto[];
  @ApiProperty()
  offer: string;
}

export class AnnotatedCreateTableDto implements TableCreateDto {
  @ApiProperty()
  number: number;
  @ApiProperty()
  customerCount: number;
}

export class AnnotatedGroupCreateDto implements GroupCreateDto {
  @ApiProperty()
  offer: string;
  @ApiProperty({ type: () => [AnnotatedCreateTableDto] })
  tables: AnnotatedCreateTableDto[];
}

@Controller('remoteGroup')
@ApiTags('remoteGroup')
export class RemoteGroupController {
  @Get()
  async getGroups(): Promise<AnnotatedGroup[]> {
    return container.get<GroupService>(TYPES.GroupService).getGroups();
  }

  @Get(':id')
  async getGroup(
    @Param('id')
    id: string
  ): Promise<AnnotatedGroup> {
    return container.get<GroupService>(TYPES.GroupService).getGroup(id);
  }

  @Post()
  @HttpCode(201)
  async addGroup(
    @Body() body: AnnotatedGroupCreateDto
  ): Promise<AnnotatedGroup> {
    return container.get<GroupService>(TYPES.GroupService).addGroup(body);
  }

  @Delete(':id')
  async removeGroup(
    @Param('id') id: string
  ): Promise<Status> {
    const success = await container.get<GroupService>(TYPES.GroupService).removeGroup(id);
    if (success) {
      return { success: true };
    } 
  }
  @Delete()
  async removeAllGroups(): Promise<Status> {
    await container.get<GroupService>(TYPES.GroupService).removeAllGroups();
    return { success: true }; 
  }


}
