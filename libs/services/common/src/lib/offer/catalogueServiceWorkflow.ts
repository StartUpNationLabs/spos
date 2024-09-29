import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { MenuApiService } from '../apis/menuApiService';
import { OfferService } from './offer.service';
import { CategorizedCatalog, CatalogueService } from './catalogue.service';
import { MenuItem } from "@spos/clients-menu";
import { logger } from '../logger';


@injectable()
export class CatalogueServiceWorkflow implements CatalogueService {


  constructor(
    @inject(TYPES.OfferService) private offerService: OfferService,
    @inject(TYPES.MenuApiService) private menuApiService: MenuApiService) {
  }
  @logger
  async getFilteredCatalog(offerName: string): Promise<CategorizedCatalog> {
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

  @logger
  async getFullItemFromItemIdsArray(idList: string[]): Promise<MenuItem[]> {
    return (await this.menuApiService.getMenuApi().menusControllerGetFullMenu()).data.filter(
      item => idList.includes(item._id)
    );
  }
}
