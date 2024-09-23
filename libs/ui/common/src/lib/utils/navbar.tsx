import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useGroupById } from '../tables/stores/useGroupById';

interface NavBarProps {
  groupId: string;
  setSelectedTable: any
  setSelectedTableParentFunction: any
};


export function NavBar({ groupId, setSelectedTable, setSelectedTableParentFunction }: Readonly<NavBarProps>) {

  const [tables,] = [(useGroupById(groupId)?.tables ?? [1,2,3,4,5])];
  const [tableSelected, setTableSelected] = useState(tables[0]);
  const handleTableSelection = (tableId: number) => {
      setTableSelected(tableId);
      setSelectedTable(tables, tableId, setSelectedTableParentFunction);
  };

  console.log(useGroupById(groupId)?.tables);

  return (
      <Box sx={{
          display: 'flex',
          height: '100vh',
          alignItems: 'flex-start',
          backgroundColor: 'lightgray',
          }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {tables.map((table: number) => (
                  <Button
                      key={table}
                      variant="contained"
                      onClick={() => handleTableSelection(table)}
                      sx={{
                          width: tableSelected === table ? '120px' : '100px',
                          height: '100px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: tableSelected === table ? '8px 0 0 8px' : '8px',
                          backgroundColor: tableSelected === table ? '#003367' : 'green',
                          color: 'white',
                          marginRight: tableSelected === table ? '0' : '0px',
                      }}
                  >
                      <Typography variant="h6">{table}</Typography>
                  </Button>
              ))}
          </Box>
          <Box
              sx={{
                  width: '14px',
                  height: '100vh',
                  backgroundColor: '#003366',
                  marginLeft: 0,
              }}
          />
      </Box>
  );
}

export default NavBar;
