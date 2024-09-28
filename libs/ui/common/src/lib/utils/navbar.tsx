import { Box, Button, Typography } from '@mui/material';
import { Table } from "@spos/services/common";

interface NavBarProps {
  tables: Table[];
  selectedTable: number;
  setSelectedTable: React.Dispatch<React.SetStateAction<number>>;
}


export function NavBar(props: Readonly<NavBarProps>) {
  const tables = props.tables.map((table) => table.number);

  const handleTableSelection = (table: number) => {
    props.setSelectedTable(table);
  };


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
              width: props.selectedTable === table ? '120px' : '100px',
              height: '100px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: props.selectedTable === table ? '8px 0 0 8px' : '8px',
              backgroundColor: props.selectedTable === table ? '#003367' : 'green',
              color: 'white',
              marginRight: props.selectedTable === table ? '0' : '0px',
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
