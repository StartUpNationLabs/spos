import { inject, injectable } from 'inversify';
import {
  Group,
  GroupService,
} from './groupService';
import { BackendBffApiService } from '../apis/backendBffApiService';
import { TYPES } from "../types";
import { GroupCreateDto } from "./groupCreate.dto";
import { logger } from "../logger";

@injectable()
export class GroupRemoteService implements GroupService {

  constructor( @inject(TYPES.BackendBffApiService) private backendBffApiService: BackendBffApiService) {

  }
 
  @logger
  async addGroup(groupCreateDto: GroupCreateDto): Promise<Group> {
    return (await this.backendBffApiService.getRemoteGroupApi().remoteGroupControllerAddGroup({
     annotatedGroupCreateDto: groupCreateDto,
   })).data;
  }
  @logger
  async getGroup(id: string): Promise<Group> {
    return (await (this.backendBffApiService.getRemoteGroupApi().remoteGroupControllerGetGroup({
      id,
    }))).data;

  }
  @logger
  async getGroups(): Promise<Group[]> {
    return (await this.backendBffApiService.getRemoteGroupApi().remoteGroupControllerGetGroups()).data;
  }
  async removeGroup(id: string): Promise<boolean> {
    return (await this.backendBffApiService.getRemoteGroupApi().remoteGroupControllerRemoveGroup({id})).data.success;

    throw new Error('Method not implemented.');


  }
  async removeAllGroups(): Promise<boolean> {

    return (await this.backendBffApiService.getRemoteGroupApi().remoteGroupControllerRemoveAllGroups()).data.success;
  }

}
