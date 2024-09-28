import { inject } from 'inversify';
import { GroupService } from '../group/groupService';
import { TYPES } from '../types';
import { KitchenApiService } from '../apis/kitchenApiService';
import { KitchenService, MonsieurAxelMenvoie } from './kitchenService';
import { DiningApiService } from '../apis/diningApiService';

export interface PreparationStatus {
  status: string;
  preparationId: string;
}

export interface OrderSummary {
  summary: {
    [category: string]: {
      [table: number]: PreparationStatus[];
    };
  };
}

export class KitchenServiceWorkflow implements KitchenService {
  constructor(
    @inject(TYPES.KitchenApiService)
    private kitchenApiService: KitchenApiService,
    @inject(TYPES.DiningApiService)
    private diningApiService: DiningApiService,
    @inject(TYPES.GroupService)
    private groupService: GroupService
  ) {}

  async sendToKitchen(order: MonsieurAxelMenvoie): Promise<void> {
    const group = await this.groupService.getGroup(order.groupId);
    const tableOrdersApi = this.diningApiService.getTableOrdersApi();
    for (const item of order.cart) {
      await tableOrdersApi.tableOrdersControllerAddMenuItemToTableOrder({
        tableOrderId: group.tables[order.tableNumber].id,
        addMenuItemDto: {
          menuItemId: item.itemId,
          howMany: item.quantity,
          menuItemShortName: item.shortName,
        },
      });
    }

    await tableOrdersApi.tableOrdersControllerPrepareTableOrder({
      tableOrderId: group.tables[order.tableNumber].id,
    });
  }

  async getOrdersByGroupId(groupId: string): Promise<OrderSummary> {
    const group = await this.groupService.getGroup(groupId);
    const orderSummary: OrderSummary = {} as OrderSummary;
    for (const table of group.tables) {
      const tableOrder = await this.diningApiService
        .getTableOrdersApi()
        .tableOrdersControllerGetTableOrderById({
          tableOrderId: table.id,
        });

      const preparationStatuses: PreparationStatus[] = [];

      for (const preparationFromTableOrder of tableOrder.data.preparations) {
        const preparationDetails = (
          await this.kitchenApiService
            .getPreparationApi()
            .preparationsControllerRetrievePreparation({
              preparationId: preparationFromTableOrder._id,
            })
        ).data;

        preparationStatuses.push({
          status: preparationDetails.completedAt
            ? 'readyToBeServed'
            : 'preparationStarted',
          preparationId: preparationFromTableOrder._id,
        });
      }
      orderSummary.summary = {
        ...orderSummary.summary,
        [table.number]: [...preparationStatuses],
      };
    }
    return orderSummary;
  }

  async removeFromKitchen(order: MonsieurAxelMenvoie): Promise<boolean> {
    try {
      const preparationApi = this.kitchenApiService.getPreparationApi();

      const preparationsNotServed = (
        await preparationApi.preparationsControllerGetAllPreparationsByStateAndTableNumber(
            {state: 'preparationStarted', 
            tableNumber: order.tableNumber,
        })
      ).data;

      for (const preparation of preparationsNotServed) {
        const preparedItems= preparation.preparedItems
        for (const pi of preparedItems){
            await this.kitchenApiService.getPreparedItemsApi().preparedItemsControllerStartToPrepareItemOnPost({
                preparedItemId : pi._id
            })
            await this.kitchenApiService.getPreparedItemsApi().preparedItemsControllerFinishToPrepareItemOnPost({
                preparedItemId : pi._id
            })
    
        }
        
        
      }    

      const preparations = (
        await preparationApi.preparationsControllerGetAllPreparationsByStateAndTableNumber(
            {state: 'readyToBeServed', 
            tableNumber: order.tableNumber,
        })
      ).data;

      const preparationsToRemove = preparations.filter(preparation =>
        order.cart.some(item => item.itemId === preparation._id)
      );

      for (const preparation of preparationsToRemove) {
        await preparationApi.preparationsControllerPreparationIsServed({
          preparationId: preparation._id,
        });
      }
     
    
      return true; 
    } catch (error) {
      console.error("Erreur lors de la suppression des commandes de la cuisine :", error);
      return false; 
    }
  }
}
