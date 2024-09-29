import { inject, injectable } from "inversify";
import {
  Configuration,
  PreparationsApi,
  PreparedItemsApi,
} from '@spos/clients-kitchen';
import { TYPES } from "../types";

@injectable()
export class KitchenApiService {
  private preparationApi = new PreparationsApi(this.configuration);
  private preparedItemsApi = new PreparedItemsApi(this.configuration);

  constructor(
    @inject(TYPES.KitchenApiConfiguration) private configuration: Configuration
  ) {
  }
  getPreparationApi() {
    return this.preparationApi;
  }

  getPreparedItemsApi() {
    return this.preparedItemsApi;
  }
}
