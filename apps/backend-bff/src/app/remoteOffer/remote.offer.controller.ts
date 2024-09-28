import { Controller, Get } from "@nestjs/common";
import { container, Offer, OfferService, TYPES } from "@spos/services/common";
import { ApiProperty, ApiTags } from "@nestjs/swagger";


class AnnotatedOffer implements Offer {
  @ApiProperty()
  availableItems: string[];
  @ApiProperty()
  name: string;
}

@Controller('remoteOffer')
@ApiTags('remoteOffer')
export class RemoteOfferController {
  @Get()
  async getOffers(): Promise<AnnotatedOffer[]> {
    return container.get<OfferService>(TYPES.OfferService).getOffers();
  }
}
