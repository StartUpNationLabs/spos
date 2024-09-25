import { Container } from "inversify";
import { TableService } from "./table/table.service";
import { DiningApiService } from "./apis/diningApiService";
import { TYPES } from "./types";
import { MenuApiService } from "./apis/menuApiService";
import { OfferService } from "./offer/offer.service";
import { GroupService } from "./group/groupService";
import { BackendBffApiService } from "./apis/backendBffApiService";
import { GroupRemoteService } from "./group/groupRemoteService";

const bffContainer = new Container();
bffContainer.bind<BackendBffApiService>(TYPES.BackendBffApiService).to(BackendBffApiService).inSingletonScope();
bffContainer.bind<GroupService>(TYPES.GroupService).to(GroupRemoteService).inSingletonScope();
bffContainer.bind<TableService>(TableService).toSelf().inSingletonScope();
bffContainer.bind<DiningApiService>(TYPES.DiningApiService).to(DiningApiService).inSingletonScope();
bffContainer.bind<MenuApiService>(TYPES.MenuApiService).to(MenuApiService).inSingletonScope();
bffContainer.bind<OfferService>(TYPES.OfferService).to(OfferService).inSingletonScope();

export { bffContainer };
