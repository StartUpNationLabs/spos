import React, { useEffect, useRef, useState } from 'react';
//import { TablePaths } from '../utils/SvgTablePath';
import { useTableStore } from './stores/tableSelectionStore';
import { TablesSvgGrid } from '../utils/SvgTablePath';
import { useNavigate, useParams } from 'react-router-dom';
import { ContainerContext } from '../containerHook/containerContext';
import { useQuery } from '@tanstack/react-query';
import { GroupService, Table, TYPES } from '@spos/services/common';
import { Typography } from '@mui/material';

interface DiningRoomSVGProps {
  onSelectionChange: (hasSelection: boolean) => void;
}

const DiningRoomSVG = ({ onSelectionChange }: DiningRoomSVGProps) => {
  const navigate = useNavigate();
  const { groupId, tableNumber } = useParams<{ 
    groupId: string; 
    tableNumber: string;
  }>();
  const stringTableNumber = tableNumber;
  const userTable = tableNumber ? parseInt(tableNumber, 10) : undefined;
  const [tablesInGroup, setTablesInGroup] = useState<number[]>([]); 
  const addTable = useTableStore((state) => state.addTable);
  const removeTable = useTableStore((state) => state.removeTable);
  const selectedTables = useTableStore((state) => state.selectedTables);


  
  const container = React.useContext(ContainerContext);
  const isValidTableNumber = (tableNumber: string | undefined): boolean => {
    const isString = typeof tableNumber === 'string';
    console.log('Type de stringTableNumber:', typeof tableNumber); 
    return isString && tableNumber.trim() !== '';
  };
  const {
    data: group,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['groupWithTable', groupId],
    queryFn: async () => {
      const groupService: GroupService = container.get<GroupService>(TYPES.GroupService);
      if (isValidTableNumber(groupId)) {
        return groupService.getGroup(groupId);
      }
      throw new Error('groupId is undefined');
    },
    refetchOnWindowFocus: 'always',
    enabled: !!groupId && groupId !== '',
  });
  useEffect(() => {
    if (group) {
      setTablesInGroup(group.tables.map((table) => table.number)); 
    }
  }, [group]);

  useEffect(() => {
    onSelectionChange(selectedTables.size > 0);
  }, [selectedTables, onSelectionChange]);

  if (isLoading) {
    return <Typography variant="h6" component="h2" fontWeight="bold">Loading...</Typography>;
  }

  if (!group || isError) {
    console.error(error);
    return <Typography variant="h6" component="h2" fontWeight="bold">Error</Typography>;
  }


  const isInUserGroup = (tableIndex: number) => {
    return tablesInGroup.includes(tableIndex)
  };

  const handleTableClick = (index: number) => {
    if (isInUserGroup(index) && index !== userTable) {
      selectedTables.has(index) ? removeTable(index) : addTable(index);
    }

  };

  const getTableColor = (index: number) => {
    if (index === userTable) return '#00BFFF'; // Bleu
    if (selectedTables.has(index)) return '#4CAF50'; // Vert
    if (isInUserGroup(index)) return '#000000'; // Noir
    return '#CCCCCC'; // Gris
  };

  return (
    <TablesSvgGrid
      handleTableClick={handleTableClick}
      getTableColor={getTableColor}
      userTableIndex={userTable ?? -1}
    />
  );
};
export default DiningRoomSVG;

