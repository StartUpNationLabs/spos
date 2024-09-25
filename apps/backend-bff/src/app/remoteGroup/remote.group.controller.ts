import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';

import {
  container,
  Group,
  GroupCreateDto,
  GroupServiceWorkflow,
  Table,
  TableCreateDto,
} from '@spos/services/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

export class TableDto implements Table {
  @ApiProperty()
  id: string;
  @ApiProperty()
  number: number;

  @ApiProperty()
  customerCount: number;
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
    return container.get(GroupServiceWorkflow).getGroups();
  }

  @Get(':id')
  async getGroup(
    @Param('id')
    id: string
  ): Promise<AnnotatedGroup> {
    return container.get(GroupServiceWorkflow).getGroup(id);
  }

  @Post()
  @HttpCode(201)
  async addGroup(
    @Body() body: AnnotatedGroupCreateDto
  ): Promise<AnnotatedGroup> {
    return container.get(GroupServiceWorkflow).addGroup(body);
  }
}
