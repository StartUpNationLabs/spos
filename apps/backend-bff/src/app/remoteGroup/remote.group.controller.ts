import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';

import {
  container,
  Group,
  GroupCreateDto,
  GroupService,
} from '@spos/services/common';
import { ApiProperty } from '@nestjs/swagger';

export class TableDto {
  @ApiProperty()
  number: number;

  @ApiProperty()
  customerCount: number;
}

export class AnnotatedGroupCreateDto implements GroupCreateDto {
  @ApiProperty({ type: () => [TableDto] })
  tables: {
    [tableNumber: string]: TableDto;
  };

  @ApiProperty()
  offer: string;
}

export class GroupTableDto extends TableDto {
  @ApiProperty()
  id: string;
}

export class AnnotatedGroup implements Group {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: () => [GroupTableDto] })
  tables: {
    [tableNumber: string]: GroupTableDto;
  };

  @ApiProperty()
  offer: string;
}

@Controller('remoteGroup')
export class RemoteGroupController {
  @Get()
  getGroups(): AnnotatedGroup[] {
    return container.get(GroupService).getGroups();
  }

  @Get(':id')
  getGroup(id: string): AnnotatedGroup {
    return container.get(GroupService).getGroup(id);
  }

  @Post()
  @HttpCode(201)
  async addGroup(
    @Body() body: AnnotatedGroupCreateDto
  ): Promise<AnnotatedGroup> {
    return container.get(GroupService).addGroup(body);
  }
}
