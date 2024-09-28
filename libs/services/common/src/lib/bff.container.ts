import { Container } from "inversify";
import { TableService } from "./table/table.service";
import { DiningApiService } from "./apis/diningApiService";
import { TYPES } from "./types";
import { MenuApiService } from "./apis/menuApiService";
import { OfferService } from "./offer/offer.service";
import { GroupService } from "./group/groupService";
import { BackendBffApiService } from "./apis/backendBffApiService";
import { GroupRemoteService } from "./group/groupRemoteService";
import { TableRemoteService } from "./table/tableRemoteService";
import { OfferRemoteService } from "./offer/offerRemoteService";
import { CatalogueService } from "./offer/catalogue.service";
import { CatalogueRemoteService } from "./offer/catalogueRemoteService";
import { KitchenService } from "./kitchen/kitchenService";
import { KitchenServiceWorkflow } from "./kitchen/kitchenServiceWorkflow";
import { container } from "./container";

const bffContainer = new Container();
bffContainer.bind<BackendBffApiService>(TYPES.BackendBffApiService).to(BackendBffApiService).inSingletonScope();
bffContainer.bind<GroupService>(TYPES.GroupService).to(GroupRemoteService).inSingletonScope();
bffContainer.bind<TableService>(TYPES.TableService).to(TableRemoteService).inSingletonScope();
bffContainer.bind<DiningApiService>(TYPES.DiningApiService).to(DiningApiService).inSingletonScope();
bffContainer.bind<MenuApiService>(TYPES.MenuApiService).to(MenuApiService).inSingletonScope();
bffContainer.bind<OfferService>(TYPES.OfferService).to(OfferRemoteService).inSingletonScope();
bffContainer.bind<CatalogueService>(TYPES.CatalogueService).to(CatalogueRemoteService).inSingletonScope();
container.bind<KitchenService>(TYPES.KitchenService).to(KitchenServiceWorkflow).inSingletonScope();
export { bffContainer };

