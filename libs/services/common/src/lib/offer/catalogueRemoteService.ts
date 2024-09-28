import { inject, injectable } from 'inversify';
import { BackendBffApiService } from '../apis/backendBffApiService';
import { TYPES } from "../types";
import { logger } from "../logger";
import { CatalogueService, CategorizedCatalog } from './catalogue.service';
import { MenuItem } from '@spos/clients-menu';


@injectable()
export class CatalogueRemoteService implements CatalogueService {
  constructor( @inject(TYPES.BackendBffApiService) private backendBffApiService: BackendBffApiService) {

  }
  @logger
  async getFilteredCatalog(offerName: string): Promise<CategorizedCatalog> {
    return (await this.backendBffApiService.getRemoteCatalogueApi().remoteCatalogueControllerGetFilteredCatalog({offerName})).data.categories;
  }
  @logger
  async getFullItemFromItemIdsArray(idList: string[]): Promise<MenuItem[]> {
    return (await this.backendBffApiService.getRemoteCatalogueApi().remoteCatalogueControllerGetFullItemFromItemIdsArray({ids : idList})).data;

  }

 

}