import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import {
  KitchenService,
  MonsieurAxelMenvoie,
  OrderSummary,
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

  async servePreparation(preparationIds: string[]): Promise<void> {
    return (
      await this.backendBffApiService
        .getRemoteKitchenApi()
        .remoteKitchenControllerServePreparation({
          requestBody: preparationIds,
        })
    ).data;
  }

  removeOrdersOfTableFromKitchen(order: MonsieurAxelMenvoie): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  startAndFinishPreparation(preparedItemId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  handleNotServedPreparations(preparations: any[]): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  getPreparationsByStateAndTableNumber(state: 'readyToBeServed' | 'preparationStarted', tableNumber: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  servePreparations(preparationsToRemove: any[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
