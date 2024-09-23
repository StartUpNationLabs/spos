import {GroupTable, useGroups} from "./groups";

export const useGroupById = (groupId: string) : GroupTable | undefined => {
  const groups = useGroups(state => state.groups);
  const result = groups.find(group => group.groupId === groupId);

  if (result === undefined) {
    return undefined;
  }
  return {
    groupId: result.groupId,
    tables: Object.keys(result.tables).map(element => parseInt(element))
  }
}
