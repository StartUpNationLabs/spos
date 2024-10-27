import { ApiProperty } from '@nestjs/swagger';

export class ItemRequestDto {
  @ApiProperty({ type: 'string' })
  group_id: string;

  @ApiProperty({ type: 'string' })
  owner_id: string;

  @ApiProperty({ type: 'string' })
  item_short_name: string;

  @ApiProperty({ type: 'number' })
  amount: number;

  @ApiProperty({ type: 'string' })
  table_id: string;
}
