
import { Container } from "inversify";
import { TableService } from "./table/table.service";
import { DiningApiService } from "./apis/diningApiService";
import { TYPES } from "./types";
import { MenuApiService } from "./apis/menuApiService";
import { OfferService } from "./offer/offer.service";
import { GroupServiceWorkflow } from "./group/groupServiceWorkflow";
import { CatalogueService } from "./offer/catalogue.service";
import { GroupService } from "./group/groupService";
import { CatalogueServiceWorkflow } from "./offer/catalogueServiceWorkflow";

const container = new Container();
container.bind<GroupService>(TYPES.GroupService).to(GroupServiceWorkflow).inSingletonScope();
container.bind<TableService>(TYPES.TableService).to(TableService).inSingletonScope();
container.bind<DiningApiService>(TYPES.DiningApiService).to(DiningApiService).inSingletonScope();
container.bind<MenuApiService>(TYPES.MenuApiService).to(MenuApiService).inSingletonScope();
container.bind<OfferService>(TYPES.OfferService).to(OfferService).inSingletonScope();
//container.bind<CatalogService>(TYPES.CatalogService).to(CatalogService).inSingletonScope();
container.bind<CatalogueService>(TYPES.CatalogService).to(CatalogueServiceWorkflow).inSingletonScope();

export { container };
