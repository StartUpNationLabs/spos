export interface Offer {
  name: string;
  availableItems: string[];
}

export interface OfferService {
  getOffers(): Promise<Offer[]>;
}
