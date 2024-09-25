import { inject, injectable } from 'inversify';
import {
  Group,
  GroupService,
} from './groupService';
import { BackendBffApiService } from '../apis/backendBffApiService';
import { TYPES } from "../types";
import { GroupCreateDto } from "./groupCreate.dto";

@injectable()
export class GroupRemoteService implements GroupService {

  constructor( @inject(TYPES.BackendBffApiService) private backendBffApiService: BackendBffApiService) {

  }
  async addGroup(groupCreateDto: GroupCreateDto): Promise<Group> {
    console.log('addGroupRemoteService', groupCreateDto, 'groupCreateDto');
    return (await this.backendBffApiService.getRemoteGroupApi().remoteGroupControllerAddGroup({
     annotatedGroupCreateDto: groupCreateDto,
   })).data;
  }

  async getGroup(id: string): Promise<Group> {
    console.log('getGroupRemoteService', id, 'id');
    return (await (this.backendBffApiService.getRemoteGroupApi().remoteGroupControllerGetGroup({
      id,
    }))).data;

  }

  async getGroups(): Promise<Group[]> {
    console.log('getGroupsRemoteService');
    return (await this.backendBffApiService.getRemoteGroupApi().remoteGroupControllerGetGroups()).data;
  }

}
