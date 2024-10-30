import { PaymentResponseItemDetailsDTO } from './payment-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { AnnotatedItem, AnnotatedTableItem } from '@spos/clients-bff';

export class SelectedItemDTO implements AnnotatedTableItem {
  @ApiProperty({ type: () => PaymentResponseItemDetailsDTO })
  item: AnnotatedItem;
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
