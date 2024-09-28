import { GroupCreateDto } from './groupCreate.dto';

export interface Table {
  id: string;
  number: number;
  customerCount: number;
}

export interface Group {
  id: string;
  tables: Table[];
  offer: string;
}

export interface GroupService {
  addGroup(groupCreateDto: GroupCreateDto): Promise<Group>;

  getGroup(id: string): Promise<Group>;

  getGroups(): Promise<Group[]>;

  removeGroup(id : string) : Promise<boolean>;

  removeAllGroups() : Promise<void>;
}
