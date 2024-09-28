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
