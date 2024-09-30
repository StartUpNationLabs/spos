import { inject, injectable } from "inversify";
import { OfferService } from './offer.service';
import { TYPES } from "../types";
import { MenuApiService } from "../apis/menuApiService";
import { logger } from "../logger";

@injectable()
export class OfferServiceWorkflow implements OfferService {
  constructor(
    @inject(TYPES.MenuApiService) private menuApiService: MenuApiService,
  ) {
  }
  @logger
  async getOffers() {
    const menuItems = (await this.menuApiService.getMenuApi().menusControllerGetFullMenu()).data;
    return [
      {
        name: 'Classic',
        availableItems: [
          'coke',
          'ice tea',
          'bottled water',
          'sparkling water',
          'foie gras',
          'pizza',
          'lasagna',
          'brownie',
          'chocolate',
          'lemon',
        ].map((item) => {
          const menuItem = menuItems.find((menuItem) => menuItem.shortName === item);
          if (!menuItem) {
            console.error(`Item not found: ${item}`);
          }
          return menuItem?._id || '';
        }),
      },
      {
        name: 'Cousinhood',
        availableItems: [
          'spritz',
          'margarita',
          'tequila',
          'apple juice',
          'goat cheese',
          'salmon',
          'beef burger',
          'beef chuck',
          'rasp and peaches',
          'strawberries',
        ].map((item) => {
          const menuItem = menuItems.find((menuItem) => menuItem.shortName === item);
          if (!menuItem) {
            console.error(`Item not found: ${item}`);
          }
          return menuItem?._id || '';
        }),
      },
      {
        name: 'Company',
        availableItems: [
          'mojito',
          'martini',
          'lemonade',
          'café',
          'crab maki',
          'burrata',
          'salmon',
          'lasagna',
          'beef burger',
          'beef chuck',
          'brownie',
          'chocolate',
          'lemon',
        ].map((item) => {
          const menuItem = menuItems.find((menuItem) => menuItem.shortName === item);
          if (!menuItem) {
            console.error(`Item not found: ${item}`);
          }
          return menuItem?._id || '';
        }),
      },
      {
        name: 'All',
        availableItems: menuItems.map((menuItem) => menuItem._id)
      },
    ];
  }
}
