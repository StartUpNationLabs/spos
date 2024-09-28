import { injectable } from 'inversify';
import {
  Configuration,
  PreparationsApi,
  PreparedItemsApi,
} from '@spos/clients-kitchen';

@injectable()
export class KitchenApiService {
  private configuration = new Configuration({});
  private preparationApi = new PreparationsApi(this.configuration);
  private preparedItemsApi = new PreparedItemsApi(this.configuration);

  getPreparationApi() {
    return this.preparationApi;
  }

  getPreparedItemsApi() {
    return this.preparedItemsApi;
  }
}
