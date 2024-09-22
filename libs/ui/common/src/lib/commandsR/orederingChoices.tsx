import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import './orderingChoices.css'

export const OrderingChoices = ({ selectedTable }) => {
    const { orders } = selectedTable;

    return (
        <Box
            className="custom-scrollbar"
            sx={{
                padding: '16px', 
                marginTop: '90px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                height: '460px', 
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
                            <Typography>No Choices</Typography>
                        )}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default OrderingChoices;
