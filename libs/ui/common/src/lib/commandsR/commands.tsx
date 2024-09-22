import React, { useState } from 'react';
import { Box } from '@mui/material';
import NavBar from '../utils/navbar';
import Orders from '../orders/orders';
import BackButton from '../utils/backButton';
import OrderingChoices from './orederingChoices';
import { setSelectedTableById, tablesData } from '../utils/tableUtils';


export function Commands() {
    const [selectedTable, setSelectedTable] = useState(tablesData[1]);

    return (
        <div>
            <Box sx={{ minHeight: '100dvh', 
                display: 'flex', 
                flexDirection: 'row', 
                width: '100%' }}>
                <Box sx={{ boxSizing: 'border-box', 
                            width: 'fit-content', 
                            borderRight: '2px solid #000' }}>
                    <NavBar
                        tables={tablesData}
                        setSelectedTable={(tableId) =>
                            setSelectedTableById(tablesData, tableId, setSelectedTable)
                        }
                    />
                </Box>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}> 
                    <BackButton color={'black'} top={20} left={150}></BackButton>
                    {selectedTable && <OrderingChoices selectedTable={selectedTable} />}
                    <Orders></Orders>
                </Box>
            </Box>
        </div>
    );
}

export default Commands;
