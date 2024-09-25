import { injectable } from "inversify";
import { Configuration, RemoteGroupApi } from "@spos/clients-bff";

@injectable()
export class BackendBffApiService {
  private configuration = new Configuration({
  });
  private remoteGroupApi = new RemoteGroupApi(this.configuration);

  getRemoteGroupApi() {
    return this.remoteGroupApi;
  }
}
