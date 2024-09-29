import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import {
  KitchenService,
  MonsieurAxelMenvoie,
  OrderSummary,
  PreparedItemAggregate,
} from './kitchenService';
import { BackendBffApiService } from '../apis/backendBffApiService';

@injectable()
export class KitchenRemoteService implements KitchenService {
  constructor(
    @inject(TYPES.BackendBffApiService)
    private backendBffApiService: BackendBffApiService
  ) {}

  async getOrdersByGroupId(groupId: string): Promise<OrderSummary> {
    return (
      await this.backendBffApiService
        .getRemoteKitchenApi()
        .remoteKitchenControllerGetOrdersByGroupId({
          groupId,
        })
    ).data;
  }

  async sendToKitchen(order: MonsieurAxelMenvoie): Promise<void> {
    return (
      await this.backendBffApiService
        .getRemoteKitchenApi()
        .remoteKitchenControllerSendToKitchen({
          annotatedMonsieurAxelMenvoie: order,
        })
    ).data;
  }

  async servePreparation(preparationIds: string[]): Promise<void> {
    return (
      await this.backendBffApiService
        .getRemoteKitchenApi()
        .remoteKitchenControllerServePreparation({
          requestBody: preparationIds,
        })
    ).data;
  }

  async startAndFinishPreparedItem(preparedItemId: string): Promise<boolean> {
    return (
      await this.backendBffApiService
        .getRemoteKitchenApi()
        .remoteKitchenControllerStartAndFinishPreparation({
          body: preparedItemId,
        })
    ).data;
  }

  async readyPreparations(preparationsIds: string[]): Promise<void> {
    return (
      await this.backendBffApiService
        .getRemoteKitchenApi()
        .remoteKitchenControllerReadyPreparations({
          requestBody: preparationsIds,
        })
    ).data;
  }

  async preparationDetails(
    preparationId: string
  ): Promise<PreparedItemAggregate[]> {
    return (
      await this.backendBffApiService
        .getRemoteKitchenApi()
        .remoteKitchenControllerPreparationDetails({
          preparationId,
        })
    ).data;
  }
}
