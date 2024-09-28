
import { Container } from "inversify";
import { TableService } from "./table/table.service";
import { DiningApiService } from "./apis/diningApiService";
import { TYPES } from "./types";
import { MenuApiService } from "./apis/menuApiService";
import { OfferService } from "./offer/offer.service";
import { GroupServiceWorkflow } from "./group/groupServiceWorkflow";
import { CatalogueService } from "./offer/catalogue.service";
import { GroupService } from "./group/groupService";
import { TableServiceWorkflow } from "./table/tableServiceWorkflow";
import { CatalogueServiceWorkflow } from "./offer/catalogueServiceWorkflow";
import { OfferServiceWorkflow } from "./offer/offerServiceWorkflow";

const container = new Container();
container.bind<GroupService>(TYPES.GroupService).to(GroupServiceWorkflow).inSingletonScope();
container.bind<TableService>(TYPES.TableService).to(TableServiceWorkflow).inSingletonScope();
container.bind<DiningApiService>(TYPES.DiningApiService).to(DiningApiService).inSingletonScope();
container.bind<MenuApiService>(TYPES.MenuApiService).to(MenuApiService).inSingletonScope();
container.bind<OfferService>(TYPES.OfferService).to(OfferServiceWorkflow).inSingletonScope();
container.bind<CatalogueService>(TYPES.CatalogueService).to(CatalogueServiceWorkflow).inSingletonScope();

export { container };
