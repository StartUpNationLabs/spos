import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

const tables = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
];

export function NavBar() {
    const [selectedTable, setSelectedTable] = useState(1);

    return (
        <Box sx={{ display: 'flex', height: '100vh', alignItems: 'flex-start',backgroundColor: 'lightgray', }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {tables.map((table) => (
                    <Button
                        key={table.id}
                        variant="contained"
                        onClick={() => setSelectedTable(table.id)} 
                        sx={{
                            width: selectedTable === table.id ? '120px' : '100px', 
                            height: '100px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: selectedTable === table.id ? '8px 0 0 8px' : '8px', 
                            backgroundColor: selectedTable === table.id ? '#003367' : 'green', 
                            color: 'white',
                            marginRight: selectedTable === table.id ? '0' : '0px', 
                        }}
                    >
                        <Typography variant="h6">{table.id}</Typography>
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
