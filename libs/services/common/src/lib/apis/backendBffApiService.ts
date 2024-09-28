import { injectable } from "inversify";
import { Configuration, RemoteGroupApi } from "@spos/clients-bff";

@injectable()
export class BackendBffApiService {
  private configuration = new Configuration({
    basePath: "http://localhost:3000",
  });
  private remoteGroupApi = new RemoteGroupApi(this.configuration);

  getRemoteGroupApi() {
    return this.remoteGroupApi;
  }

}
