import { inject, injectable } from 'inversify';
import { Offer, OfferService } from './offer.service';
import { TYPES } from '../types';
import { BackendBffApiService } from '../apis/backendBffApiService';
import { logger } from "../logger";

@injectable()
export class OfferRemoteService implements OfferService {
  constructor(
    @inject(TYPES.BackendBffApiService)
    private backendBffApiService: BackendBffApiService
  ) {}
  @logger
  async getOffers(): Promise<Offer[]> {
    return (
      await this.backendBffApiService
        .getRemoteOfferApi()
        .remoteOfferControllerGetOffers()
    ).data;
  }
}
