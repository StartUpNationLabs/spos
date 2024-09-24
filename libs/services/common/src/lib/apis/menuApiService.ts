import { Configuration, MenusApi } from '@spos/clients-menu';
import { injectable } from "inversify";

@injectable()
export class MenuApiService {
  private configuration = new Configuration({
  });
  private menuAPi = new MenusApi(this.configuration);

  getMenuApi() {
    console.log('Getting menu api')
    return this.menuAPi;
  }
}
