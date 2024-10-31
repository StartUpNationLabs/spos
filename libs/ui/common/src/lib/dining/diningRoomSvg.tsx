import React, { useEffect, useRef, useState } from 'react';
import { TablePaths } from '../utils/SvgTablePath';

interface DiningRoomSVGProps {
  onSelectionChange: (hasSelection: boolean) => void;
}

const DiningRoomSVG = ({ onSelectionChange }: DiningRoomSVGProps) => {
  
  
  const [userTable] = useState(0);
  const [selectedTables, setSelectedTables] = useState(new Set<number>());

  useEffect(() => {
    onSelectionChange(selectedTables.size > 0);
  }, [selectedTables, onSelectionChange]);

  
  const groups = {
    1: [0,1,2,3,4,5,6,7,8],
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
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="300.000000pt"
      height="309.000000pt"
      viewBox="0 0 300.000000 309.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <metadata>
        Created by potrace 1.10, written by Peter Selinger 2001-2011
      </metadata>
      <g
        transform="translate(0.000000,309.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <TablePaths
          handleTableClick={handleTableClick}
          getTableColor={getTableColor}
          >        
          </TablePaths>
       
      </g>
     
    </svg>
  );
};

export default DiningRoomSVG;
