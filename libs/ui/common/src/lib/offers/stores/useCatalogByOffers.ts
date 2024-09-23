import { useOffers } from "./offers";
import { CatalogState, useCatalog } from "./catalog";

export const useCatalogByOffers = (offersLabel : string): CatalogState => {
  const catalog = useCatalog();
  const offers = useOffers();

  const selectedOffer = offers.offers.find(element => element.name.toLowerCase() === offersLabel.toLowerCase());

  if(selectedOffer === undefined) {
    return {
      catalogs: {
        drinks: [],
        starters: [],
        mainCourses: [],
        desserts: []
      }
    }
  }

  return {
    catalogs: {
      drinks: catalog.catalogs.drinks.filter(drink => selectedOffer.availableDishesIds.includes(drink.id)),
      starters: catalog.catalogs.starters.filter(starters => selectedOffer.availableDishesIds.includes(starters.id)),
      mainCourses: catalog.catalogs.mainCourses.filter(mainCourse => selectedOffer.availableDishesIds.includes(mainCourse.id)),
      desserts: catalog.catalogs.desserts.filter(desserts => selectedOffer.availableDishesIds.includes(desserts.id))
    }
  }
}
