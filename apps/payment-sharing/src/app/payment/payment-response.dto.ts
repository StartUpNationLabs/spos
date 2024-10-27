import { ApiProperty } from '@nestjs/swagger';

export class PaymentResponseItemDetailsDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  id: string;
}

export class PaymentResponseItemDTO {
  @ApiProperty({ type: () => PaymentResponseItemDetailsDTO })
  item: PaymentResponseItemDetailsDTO;
  @ApiProperty()
  onTable: number;
  @ApiProperty()
  remaining: number;
}

export class PaymentResponseTableDTO {
  @ApiProperty()
  number: number;
  @ApiProperty({ type: () => [PaymentResponseItemDTO] })
  elements: PaymentResponseItemDTO[];
}
