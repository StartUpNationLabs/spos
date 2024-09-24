import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { MenuApiService } from "../apis/menuApiService";
import { OfferService } from "./offer.service";
import { MenuItem } from "@spos/clients-menu";


type CategorizedCatalog = {
  [category: string]: MenuItem[]
};

@injectable()
export class CatalogService {
    constructor(
      @inject(TYPES.MenuApiService) private menuApiService: MenuApiService,
      @inject(TYPES.OfferService) private offerService: OfferService
    ) {}

    async getFilteredCatalog(offerName: string) {
      const offer = await this.offerService.getOffers().then(response =>
        response.find(element => element.name.toLowerCase() === offerName.toLowerCase())
      );

      if (!offer) return {};

      const availableCatalog = (await this.menuApiService.getMenuApi().menusControllerGetFullMenu()).data.filter(
        item => offer.availableItems.includes(item._id)
      );

      const categorizedCatalog : CategorizedCatalog = {};

      availableCatalog.forEach(element => {
        if (element.category in categorizedCatalog) {
          categorizedCatalog[element.category] = [element];
        }
        else {
          categorizedCatalog[element.category].push(element);
        }
      });

      return categorizedCatalog;
    }
}
