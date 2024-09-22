import {useGroups} from "./groups";
import {useTables} from "./tables";

export const useFreeTables = () => {
  const tables = useTables(state => state.tables);
  const groups = useGroups(state => state.groups);
  return tables.filter(table => !groups.find(group => table.id in group.tables));
}
