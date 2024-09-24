
import { Container } from "inversify";
import { GroupService } from "./group/groupService";
import { TableService } from "./table/table.service";
import { DiningApiService } from "./apis/diningApiService";
import { TYPES } from "./types";
import { MenuApiService } from "./apis/menuApiService";
import { OfferService } from "./offer/offer.service";

const container = new Container();
container.bind<GroupService>(GroupService).toSelf().inSingletonScope();
container.bind<TableService>(TableService).toSelf().inSingletonScope();
container.bind<DiningApiService>(TYPES.DiningApiService).to(DiningApiService).inSingletonScope();
container.bind<MenuApiService>(TYPES.MenuApiService).to(MenuApiService).inSingletonScope();
container.bind<OfferService>(TYPES.OfferService).to(OfferService).inSingletonScope();

export { container };
