import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { Configuration, DefaultApi } from "@spos/clients-ordering";

@injectable()
export class OrderingApiService {
  private orderingApi = new DefaultApi(this.configuration);

  constructor(
    @inject(TYPES.OrderingApiConfiguration) private configuration: Configuration
  ) {}

  getOrderingApi() {
    return this.orderingApi;
  }
}
