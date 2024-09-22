import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import NavBar from '../utils/navbar';
import Orders from '../orders/orders';
import BackButton from '../utils/backButton';
import OrderingChoices from './orederingChoices';
import { setSelectedTableById } from '../utils/tableUtils';

const tables = [
    {
        id: 1,
        orders: {
            Drinks: ['Coke', 'Pepsi'],
            Starter: ['Salad'],
            MainCourse: ['Steak'],
            Dessert: ['Ice Cream'],
        },
    },
    {
        id: 2,
        orders: {
            Drinks: ['Water'],
            Starter: ['Soup'],
            MainCourse: ['Fish'],
            Dessert: ['Cake'],
        },
    },
    {
        id: 3,
        orders: {
            Drinks: ['Juice'],
            Starter: ['Salad', 'Soup'],
            MainCourse: ['Pasta'],
            Dessert: [],
        },
    },
    {
        id: 4,
        orders: {
            Drinks: ['Coke'],
            Starter: [],
            MainCourse: ['Steak', 'Fish'],
            Dessert: ['Ice Cream'],
        },
    },
];



export function Commands() {

    const [selectedTable, setSelectedTable] = useState(tables[1]); 

    return (
        <div>
            <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ boxSizing: 'border-box', width: 'fit-content', borderRight: '2px solid #000' }}>
                    <NavBar
                        tables={tables}
                        setSelectedTable={(tableId) =>
                            setSelectedTableById(tables, tableId, setSelectedTable)
                        }
                    />
                </Box>
                <BackButton color={'black'} top={20} left={150}></BackButton>
                {selectedTable && <OrderingChoices selectedTable={selectedTable} />}
                <Orders></Orders>
            </Box>
        </div>
    );
}
export default Commands;
