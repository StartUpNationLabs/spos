import React, { useContext, useState } from "react";
import { Box, Button, Card, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import BackButton from "../utils/backButton";
import { ContainerContext } from '../containerHook/containerContext';
import { KitchenService, TYPES } from '@spos/services/common';
import { useQuery } from '@tanstack/react-query';

export function OrderDetails({orderToDetailed, setOrderToDetailed}) {
    
    const handleExpand = () => {
        setOrderToDetailed("");    
    };
    const container = useContext(ContainerContext);

    const {
        data: preparationDetails,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['orders', orderToDetailed],
        queryFn: async () => {
        const KitchenService: KitchenService = container.get<KitchenService>(TYPES.KitchenService);
        return KitchenService.preparationDetails(orderToDetailed);
        },
        enabled: orderToDetailed !== undefined && orderToDetailed !== "",
        refetchOnWindowFocus: 'always',
    });
    if (isLoading) {
        return (
        <Typography variant="h6" component="h2" fontWeight="bold">
            Loading...
        </Typography>
        );
    }
    if (!preparationDetails || isError) {
        //console.error(error);
        return "";
    }

                

    

    return (
        <Box>
        {/* Bottom tab container */}
        <Box
            sx={{
                position: "fixed",
                bottom: 0,
                left: "140px",
                right: 0,
                height: orderToDetailed!="" ? "auto" : "50px", // detailed or collapsed height
                backgroundColor: "#f5f5f5",
                borderRadius: "20px 20px 0 0", // Rounded corners at the top
                transition: "height 0.3s ease", // Smooth expansion/collapse animation
                boxShadow: "0 -2px 10px rgba(0,0,0,0.3)", // Shadow effect
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {/* Content inside the detailed tab */}
            {orderToDetailed!="" && (
            <Box
                sx={{
                marginTop: "40px", // Push the content down below the button
                textAlign: "center",
                }}
            >
                <BackButton onClick={() => {setOrderToDetailed("")}} color={'black'} top={20} left={20} />
                {preparationDetails.length > 0 ? (
                    <List>
                        {preparationDetails.map((detail, index) => (
                            <Card key={index} style={{ marginBottom: '15px' }}>
                                <ListItem>
                                    <ListItemText
                                        primary={`Name: ${detail.shortName}`}
                                        secondary={`Quantity: ${detail.quantity}`}
                                    />
                                </ListItem>
                                {index < preparationDetails.length - 1 && <Divider />}
                            </Card>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body1" color="textSecondary">
                        No preparation details available.
                    </Typography>
                )}
            </Box>
            )}
        </Box>
        </Box>
    );
};

const listItemStyle: React.CSSProperties = {
    backgroundColor: '#f9f9f9',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'space-between',
};

const nameStyle: React.CSSProperties = {
    fontWeight: 'bold',
};

const quantityStyle: React.CSSProperties = {
    marginLeft: '20px',
};