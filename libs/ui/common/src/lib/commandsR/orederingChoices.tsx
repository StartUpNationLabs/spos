import React from 'react';
import { Box, Button, Typography } from '@mui/material';

export const OrderingChoices = ({ selectedTable }) => {
    const { orders } = selectedTable;

    return (
        <Box
            sx={{
                padding: '16px',
                marginTop: '90px', 
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
            }}
        >
            {Object.keys(orders).map((category) => (
                <Box key={category} sx={{ marginBottom: '24px' }}>
                    <Typography variant="h6">{category}</Typography>
                    <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {orders[category].length > 0 ? (
                            orders[category].map((order, index) => (
                                <Button
                                    key={index}
                                    variant="contained"
                                    sx={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '0px',
                                        backgroundColor: '#ff6f61', 
                                        color: 'white',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontSize: '1.2rem', 
                                        '&:hover': {
                                            backgroundColor: '#ff4d94', 
                                        },
                                    }}
                                >
                                    {order}
                                </Button>
                            ))
                        ) : (
                            <Typography>No orders</Typography>
                        )}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default OrderingChoices;
