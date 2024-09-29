import { Configuration, MenusApi } from '@spos/clients-menu';
import { inject, injectable } from "inversify";
import { TYPES } from "../types";

@injectable()
export class MenuApiService {
  private menuAPi = new MenusApi(this.configuration);
  constructor(
    @inject(TYPES.MenuApiConfiguration) private configuration: Configuration
  ) {
  }
  getMenuApi() {
    return this.menuAPi;
  }
}
