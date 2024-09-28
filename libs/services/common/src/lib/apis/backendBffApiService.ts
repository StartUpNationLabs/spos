import { injectable } from "inversify";
import { Configuration, RemoteGroupApi, RemoteTableApi , RemoteCatalogueApi} from "@spos/clients-bff";

@injectable()
export class BackendBffApiService {
  private configuration = new Configuration({
    basePath: "http://localhost:3000",
  });
  private remoteGroupApi = new RemoteGroupApi(this.configuration);
  private remoteTableApi = new RemoteTableApi(this.configuration);
  private remoteCatalogueApi = new RemoteCatalogueApi(this.configuration);

  getRemoteGroupApi() {
    return this.remoteGroupApi;
  }

  getRemoteTableApi() {
    return this.remoteTableApi;
  }
  getRemoteCatalogueApi() {
    return this.remoteGroupApi;
  }

}
