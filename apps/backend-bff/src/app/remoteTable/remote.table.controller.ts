import { Controller, Get, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { TableWithOrderDto } from '@spos/clients-dining';
import { container, TableService, TYPES } from '@spos/services/common';

class AnnotatedTableWithOrderDto implements TableWithOrderDto {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  number: number;
  @ApiProperty()
  tableOrderId: string;
  @ApiProperty()
  taken: boolean;
}

@Controller('remoteTable')
@ApiTags('remoteTable')
export class RemoteTableController {
  @Get()
  async getFreeTables(): Promise<AnnotatedTableWithOrderDto[]> {
    return container.get<TableService>(TYPES.TableService).getFreeTables();
  }

  @Post()
  async closeAllTables() {
    return container.get<TableService>(TYPES.TableService).closeAllTables();
  }
}
