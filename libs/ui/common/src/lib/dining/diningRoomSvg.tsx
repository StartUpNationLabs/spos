import React, { useEffect, useRef, useState } from 'react';
//import { TablePaths } from '../utils/SvgTablePath';

import { TablesSvgGrid } from '../utils/SvgTablePath';

interface DiningRoomSVGProps {
  onSelectionChange: (hasSelection: boolean) => void;
}

const DiningRoomSVG = ({ onSelectionChange }: DiningRoomSVGProps) => {
  
  
  const [userTable] = useState(5);
  const [selectedTables, setSelectedTables] = useState(new Set<number>());

  useEffect(() => {
    onSelectionChange(selectedTables.size > 0);
  }, [selectedTables, onSelectionChange]);

  
  const groups = {
    1: [1,2,3,4,5,6,7,8,9],
    2: [],
    3: [],
  };

  const getTableGroup = (tableIndex: number) => {
    //console.log("____________")
    //console.log(tableIndex)
    return Object.entries(groups).find(([_, tables]) =>
      tables.includes(tableIndex)
    )?.[0];
  };

  const isInUserGroup = (tableIndex: number) => {
    const userGroup = getTableGroup(userTable);
    const tableGroup = getTableGroup(tableIndex);
    return userGroup === tableGroup;
  };

  const handleTableClick = (index: number) => {
    console.log(index)
    if (isInUserGroup(index) && index !== userTable) {
      console.log("user table : ")
      console.log(userTable)
      console.log("-------------")
      console.log(index)

      setSelectedTables((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
        console.log(`Selected tables: ${Array.from(newSet)}`); // Log des tables sélectionnées

        setSelectedTables(newSet);
        

        //onSelectionChange(newSet.size > 0);

        return newSet;
      });
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
          >        
        </TablesSvgGrid>
       
    
  );
};

export default DiningRoomSVG;
