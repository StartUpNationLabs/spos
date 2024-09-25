
import { Container } from "inversify";
import { TableService } from "./table/table.service";
import { DiningApiService } from "./apis/diningApiService";
import { TYPES } from "./types";
import { MenuApiService } from "./apis/menuApiService";
import { OfferService } from "./offer/offer.service";
import { GroupServiceWorkflow } from "./group/groupServiceWorkflow";
import { GroupService } from "./group/groupService";

const container = new Container();
container.bind<GroupService>(TYPES.GroupService).to(GroupServiceWorkflow).inSingletonScope();
container.bind<TableService>(TYPES.TableService).to(TableService).inSingletonScope();
container.bind<DiningApiService>(TYPES.DiningApiService).to(DiningApiService).inSingletonScope();
container.bind<MenuApiService>(TYPES.MenuApiService).to(MenuApiService).inSingletonScope();
container.bind<OfferService>(TYPES.OfferService).to(OfferService).inSingletonScope();

export { container };
