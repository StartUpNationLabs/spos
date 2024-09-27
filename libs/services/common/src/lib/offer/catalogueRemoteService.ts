import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { MenuApiService } from '../apis/menuApiService';
import { OfferService } from './offer.service';
import { CategorizedCatalog, CatalogueService } from './catalogue.service';
import { MenuItem } from "@spos/clients-menu";

@injectable()
export class CatalogueServiceWorkflow implements CatalogueService {
  
  private catalogCache: { [offerName: string]: CategorizedCatalog } = {};

  constructor(
    @inject(TYPES.MenuApiService) private menuApiService: MenuApiService,
    @inject(TYPES.OfferService) private offerService: OfferService
  ) {}

  async getFilteredCatalog(offerName: string): Promise<CategorizedCatalog> {
    if (this.catalogCache[offerName]) {
      return this.catalogCache[offerName];
    }

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

    this.catalogCache[offerName] = categorizedCatalog;

    return categorizedCatalog;
  }

  async getFullItemFromItemIdsArray(idList: string[]): Promise<MenuItem[]> {
    return (await this.menuApiService.getMenuApi().menusControllerGetFullMenu()).data.filter(
      item => idList.includes(item._id)
    );
  }
}
