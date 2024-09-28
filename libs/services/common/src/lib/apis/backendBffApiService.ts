import { injectable } from "inversify";
import { Configuration, RemoteGroupApi , RemoteCatalogueApi} from "@spos/clients-bff";

@injectable()
export class BackendBffApiService {
  private configuration = new Configuration({
    basePath: "http://localhost:3000",
  });
  private remoteGroupApi = new RemoteGroupApi(this.configuration);
  private remoteCatalogueApi = new RemoteCatalogueApi(this.configuration);

  getRemoteGroupApi() {
    return this.remoteGroupApi;
  }
  getRemoteCatalogueApi() {
    return this.remoteGroupApi;
  }

}
