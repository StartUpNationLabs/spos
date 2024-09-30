import { Group } from '../../lib/group/groupService';
import { TABLE_MOCKS } from './table.mock';

const GROUP_MOCKS : Group[] = [
  {
    id : "1",
    offer : "test1",
    tables : TABLE_MOCKS.slice(undefined, 3),
  },
  {
    id : "2",
    offer : "test2",
    tables : TABLE_MOCKS.slice(4, 7),
  }
]

export { GROUP_MOCKS }
