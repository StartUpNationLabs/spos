import { PaymentResponseItemDetailsDTO } from './payment-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SelectedItemDTO {
  @ApiProperty({ type: () => PaymentResponseItemDetailsDTO })
  item: PaymentResponseItemDetailsDTO;
  @ApiProperty()
  selectedByCustomer: number;
  @ApiProperty()
  remaining: number;
}

export class SelectedByCustomerDTO {
  @ApiProperty()
  number: number;
  @ApiProperty({ type: () => [SelectedItemDTO] })
  elements: SelectedItemDTO[];
}
