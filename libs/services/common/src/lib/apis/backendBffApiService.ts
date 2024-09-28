import { injectable } from "inversify";
import { Configuration, RemoteGroupApi, RemoteTableApi } from "@spos/clients-bff";

@injectable()
export class BackendBffApiService {
  private configuration = new Configuration({
    basePath: "http://localhost:3000",
  });
  private remoteGroupApi = new RemoteGroupApi(this.configuration);
  private remoteTableApi = new RemoteTableApi(this.configuration);

  getRemoteGroupApi() {
    return this.remoteGroupApi;
  }

  getRemoteTableApi() {
    return this.remoteTableApi;
  }
}
