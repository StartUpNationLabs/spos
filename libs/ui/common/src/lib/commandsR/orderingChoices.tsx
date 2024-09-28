import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import './orderingChoices.css';
import { useCarts } from './stores/cart';
import { useQuery } from '@tanstack/react-query';
import { ContainerContext } from '../containerHook/containerContext';
import { CatalogService, TYPES } from '@spos/services/common';

interface OrderingChoicesProps {
  tableNumber: number,
  offerType: string
}

type Cart = {
  itemId: string;
  quantity: number;
}[]

export function OrderingChoices(props: Readonly<OrderingChoicesProps>) {
    const currentTableCart: Cart = (useCarts(state => state.carts)[props.tableNumber] || []);
    console.table(currentTableCart);
    const container = React.useContext(ContainerContext);

    const updateItem = useCarts(state => state.updateItem);

    const {
      data: catalog,
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: ['catalog'],
      queryFn: async () => {
        const catalogService : CatalogService = container.get<CatalogService>(TYPES.CatalogService);
        return catalogService.getFilteredCatalog(props.offerType);
      },
      refetchOnWindowFocus: 'always',
    });

    if(isError) {
      console.log(error);
      return (
        <Typography variant="h6" component="h2" fontWeight="bold">
          Help
        </Typography>
      );
    }

    if (isLoading) {
      return (
        <Typography variant="h6" component="h2" fontWeight="bold">
          Loading
        </Typography>
      );
    }

    if (!catalog) {
      return (
        <Typography variant="h6" component="h2" fontWeight="bold">
        Loading
      </Typography>
      );
    }

    function handleSelectItem(itemId: string) {
      if (currentTableCart.find(element => element.itemId === itemId) !== undefined) {
        updateItem(props.tableNumber, itemId, 0);
      }
      else {
        updateItem(props.tableNumber, itemId, 1);
      }
    }

    function handleDecrease(itemId: string) {
      const quantity = currentTableCart.find(element => element.itemId === itemId)?.quantity;
      if (quantity !== undefined && quantity > 0) {
        updateItem(props.tableNumber, itemId, quantity-1);
      }
    }

    function handleIncrease(itemId: string) {
      const quantity = currentTableCart.find(element => element.itemId === itemId)?.quantity;
      updateItem(props.tableNumber, itemId,(quantity !== undefined) ? quantity+1 : 1);
    }

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
            {Object.keys(catalog).map((category) => (
                <Box key={category} sx={{ marginBottom: '24px' }}>
                    <Typography variant="h6">{category}</Typography>
                    <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {catalog[category].length > 0 ? (
                            catalog[category].map((item) => {
                                const count = currentTableCart.find(element => element.itemId === item._id)?.quantity ?? 0;
                                const isSelected = Boolean(currentTableCart.find(element => element.itemId === item._id));

                                return (
                                    <Box key={item._id} sx={{ display: 'inline', flexDirection: 'column', alignItems: 'center' }}>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleSelectItem(item._id)}
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
                                            {item.shortName}
                                        </Button>
                                        {isSelected && (
                                            <Box sx={{ display: 'inline-flex', justifyContent: 'center', marginTop: '8px' }}>
                                                <Button sx={{ minWidth: '4vh' }} onClick={() => handleDecrease(item._id)}>-</Button>
                                                <Typography>{count}</Typography>
                                                <Button sx={{ minWidth: '4vh'}} onClick={() => handleIncrease(item._id)}>+</Button>
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

