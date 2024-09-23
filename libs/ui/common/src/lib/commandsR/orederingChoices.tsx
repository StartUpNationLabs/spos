import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import './orderingChoices.css';
import { useCurrentSelectedOrder } from './stores/currentSelectedOrder';
import { useTableSummary } from './stores/tableSummary';
import { classicMenu } from '../utils/tableUtils';

export const OrderingChoices = ({ selectedTable }) => {
    const { orders, id: tableId } = selectedTable;
    const { setOrder } = useCurrentSelectedOrder();

    const [selectedOrders, setSelectedOrders] = useState({});
    const addOrUpdateOrder = useTableSummary(state=>state.addOrUpdateOrder);
    const decreaseOrderQuantity = useTableSummary(state=>state.decreaseOrderQuantity);
    const tables = useTableSummary(state=>state.tables);
    console.log(tables);

    const handleSelectOrder = (category, index) => {

        setSelectedOrders(prev => {
            const isSelected = prev[tableId]?.[category]?.[index];

            if (isSelected) {
                const { [index]: removed, ...rest } = prev[tableId][category];
                return {
                    ...prev,
                    [tableId]: {
                        ...prev[tableId],
                        [category]: rest,
                    },
                };
            } else {
                return {
                    ...prev,
                    [tableId]: {
                        ...prev[tableId],
                        [category]: {
                            ...prev[tableId]?.[category],
                            [index]: { count: 0 }
                        }
                    }
                };
            }
        });
    };

    const handleIncrease = (category, index) => {
        setSelectedOrders(prev => {
            const currentCount = prev[tableId]?.[category]?.[index]?.count || 0;
            const newCount = currentCount + 1;

            setOrder(category, index, newCount);
            const order = {
                category: category,
                name: classicMenu?.[category]?.[index],
                quantity: 1,
                price: 2.5,
            }
            addOrUpdateOrder(tableId, order);

            //const [tableSummaryContent, arrayId] = getTableIfExist(summaryContent);
            //Add to orders 

            //summaryContent[arrayId] = tableSummaryContent;
            //setSummaryContent(summaryContent);



            return {
                ...prev,
                [tableId]: {
                    ...prev[tableId],
                    [category]: {
                        ...prev[tableId]?.[category],
                        [index]: { count: newCount }
                    }
                }
            };
        });
    };

    const handleDecrease = (category, index) => {
        setSelectedOrders(prev => {
            const currentCount = prev[tableId]?.[category]?.[index]?.count || 0;
            const newCount = Math.max(0, currentCount - 1);

            setOrder(category, index, newCount);
            const order = {
                category: category,
                name: classicMenu?.[category]?.[index],
                quantity: 1,
                price: 2.5,
            }
            decreaseOrderQuantity(tableId, order)

            return {
                ...prev,
                [tableId]: {
                    ...prev[tableId],
                    [category]: {
                        ...prev[tableId]?.[category],
                        [index]: { count: newCount }
                    }
                }
            };
        });
    };

    return (
        <Box
            className="custom-scrollbar"
            sx={{
                padding: '16px',
                marginTop: '110px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                height: '80vh',
                overflowY: 'auto',
                border: '1px solid #ccc',
                width: 'calc(100% - 32px)',
                position: 'relative',
                left: '0',
            }}
        >
            {Object.keys(orders).map((category) => (
                <Box key={category} sx={{ marginBottom: '24px' }}>
                    <Typography variant="h6">{category}</Typography>
                    <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {orders[category].length > 0 ? (
                            orders[category].map((order, index) => {
                                const count = selectedOrders[tableId]?.[category]?.[index]?.count || 0;
                                const isSelected = Boolean(selectedOrders[tableId]?.[category]?.[index]);

                                return (
                                    <Box key={index} sx={{ display: 'inline', flexDirection: 'column', alignItems: 'center' }}>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleSelectOrder(category, index)}
                                            sx={{
                                                width: '100px',
                                                height: '100px',
                                                borderRadius: '0px',
                                                backgroundColor: isSelected ? 'green' : '#ff6f61',
                                                color: 'white',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                fontSize: '1.2rem',
                                                '&:hover': {
                                                    backgroundColor: isSelected ? 'darkgreen' : '#ff4d94',
                                                },
                                            }}
                                        >
                                            {order}
                                        </Button>
                                        {isSelected && (
                                            <Box sx={{ display: 'inline-flex', justifyContent: 'center', marginTop: '8px' }}>
                                                <Button sx={{ minWidth: '4vh' }} onClick={() => handleDecrease(category, index)}>-</Button>
                                                <Typography>{count}</Typography>
                                                <Button sx={{ minWidth: '4vh'}} onClick={() => handleIncrease(category, index)}>+</Button>
                                            </Box>
                                        )}
                                    </Box>
                                );
                            })
                        ) : (
                            <Typography>No Choices</Typography>
                        )}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default OrderingChoices;



function getTableIfExist(summaryContent): [any, any] {
    throw new Error('Function not implemented.');
}

