import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { MenuApiService } from "../apis/menuApiService";
import { OfferService } from "./offer.service";
import { MenuItem } from "@spos/clients-menu";


export type CategorizedCatalog = {
  [category: string]: MenuItem[]
};

export interface CatalogueService {
  getFilteredCatalog(offerName: string): Promise<CategorizedCatalog>;
  getFullItemFromItemIdsArray(idList: string[]): Promise<MenuItem[]>;
}

@injectable()
export class CatalogService  implements CatalogueService{
    constructor(
      @inject(TYPES.MenuApiService) private menuApiService: MenuApiService,
      @inject(TYPES.OfferService) private offerService: OfferService
    ) {}

    async getFilteredCatalog(offerName: string) {
      const offer = await this.offerService.getOffers().then(response =>
        response.find(element => element.name?.toLowerCase() === offerName?.toLowerCase())
      );

      if (!offer) return {};

      const availableCatalog = (await this.menuApiService.getMenuApi().menusControllerGetFullMenu()).data.filter(
        item => offer.availableItems.includes(item._id)
      );

      const categorizedCatalog: CategorizedCatalog = {};

      availableCatalog.forEach(element => {
        if (!categorizedCatalog[element.category]) {
          categorizedCatalog[element.category] = [];
        }
        categorizedCatalog[element.category].push(element);
      });

      return categorizedCatalog;
    }


    async getFullItemFromItemIdsArray(idList: string[]) {
      return (await this.menuApiService.getMenuApi().menusControllerGetFullMenu()).data.filter(
        item => idList.includes(item._id)
      );
    }
}
