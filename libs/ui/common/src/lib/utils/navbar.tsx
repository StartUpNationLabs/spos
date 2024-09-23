import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

export function NavBar({ tables, setSelectedTable }) {
    const [selectedTable, setSelectedTableLocal] = useState(tables[0]?.id || 1); 

    const handleTableSelection = (tableId) => {
        setSelectedTableLocal(tableId);
        setSelectedTable(tableId); 
    };

    return (
        <Box sx={{ 
            display: 'flex', 
            height: '100dvh', 
            alignItems: 'flex-start',
            backgroundColor: 'lightgray', 
            }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {tables.map((table) => (
                    <Button
                        key={table.id}
                        variant="contained"
                        onClick={() => handleTableSelection(table.id)} 
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
