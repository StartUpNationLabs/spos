import { inject, injectable } from 'inversify';
import { KitchenService, TYPES } from '../types';
import { MonsieurAxelMenvoie } from './kitchenService';
import { BackendBffApiService } from '../apis/backendBffApiService';
import { OrderSummary } from '@spos/clients-bff';

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

  async removeFromKitchen(order: MonsieurAxelMenvoie): Promise<boolean> {
    return (
      await this.backendBffApiService
        .getRemoteKitchenApi()
        .remoteKitchenControllerRemoveFromKitchen({
          annotatedMonsieurAxelMenvoie: order,
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
}
