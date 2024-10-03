import { inject, injectable } from 'inversify';
import {
  Group,
  GroupService,
} from './groupService';
import { BackendBffApiService } from '../apis/backendBffApiService';
import { TYPES } from "../types";
import { GroupCreateDto } from "./groupCreate.dto";
import { logger } from "../logger";
import { perf } from '../perf';

@injectable()
export class GroupRemoteService implements GroupService {

  constructor( @inject(TYPES.BackendBffApiService) private backendBffApiService: BackendBffApiService) {

  }
  @perf()
  @logger
  async addGroup(groupCreateDto: GroupCreateDto): Promise<Group> {
    return (await this.backendBffApiService.getRemoteGroupApi().remoteGroupControllerAddGroup({
     annotatedGroupCreateDto: groupCreateDto,
   })).data;
  }
  @perf()
  @logger
  async getGroup(id: string): Promise<Group> {
    return (await (this.backendBffApiService.getRemoteGroupApi().remoteGroupControllerGetGroup({
      id,
    }))).data;

  }
  @perf()
  @logger
  async getGroups(): Promise<Group[]> {
    return (await this.backendBffApiService.getRemoteGroupApi().remoteGroupControllerGetGroups()).data;
  }
  @perf()
  @logger
  async removeGroup(id: string): Promise<boolean> {
    return (await this.backendBffApiService.getRemoteGroupApi().remoteGroupControllerRemoveGroup({id})).data.success;

  }
  @perf()
  @logger
  async removeAllGroups(): Promise<boolean> {

    return (await this.backendBffApiService.getRemoteGroupApi().remoteGroupControllerRemoveAllGroups()).data.success;
  }

}
