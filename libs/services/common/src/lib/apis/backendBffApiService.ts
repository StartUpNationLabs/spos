import { inject, injectable } from 'inversify';
import {
  Configuration,
  RemoteCatalogueApi,
  RemoteGroupApi, RemoteKitchenApi,
  RemoteOfferApi,
  RemoteTableApi
} from "@spos/clients-bff";
import { TYPES } from '../types';

@injectable()
export class BackendBffApiService {
  private readonly remoteGroupApi: RemoteGroupApi;
  private readonly remoteTableApi: RemoteTableApi;
  private readonly remoteCatalogueApi: RemoteCatalogueApi;
  private readonly remoteOfferApi: RemoteOfferApi;
  private readonly remoteKitchenApi: RemoteKitchenApi;

  constructor(
    @inject(TYPES.BackendBffConfiguration)
    private configuration: Configuration
  ) {
    this.remoteGroupApi = new RemoteGroupApi(this.configuration);
    this.remoteTableApi = new RemoteTableApi(this.configuration);
    this.remoteCatalogueApi = new RemoteCatalogueApi(this.configuration);
    this.remoteOfferApi = new RemoteOfferApi(this.configuration);
    this.remoteKitchenApi = new RemoteKitchenApi(this.configuration);
  }

  getRemoteGroupApi() {
    return this.remoteGroupApi;
  }

  getRemoteTableApi() {
    return this.remoteTableApi;
  }

  getRemoteCatalogueApi() {
    return this.remoteCatalogueApi;
  }

  getRemoteOfferApi() {
    return this.remoteOfferApi;
  }

  getRemoteKitchenApi() {
    return this.remoteKitchenApi;
  }
}
