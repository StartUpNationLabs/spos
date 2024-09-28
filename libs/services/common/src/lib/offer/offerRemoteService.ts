import { injectable } from "inversify";
import { container, Offer, OfferService, TYPES } from "@spos/services/common";

@injectable()
export class OfferRemoteService implements OfferService {
  getOffers(): Promise<Offer[]> {
    return container.get<OfferService>(TYPES.OfferService).getOffers();
  }
}
