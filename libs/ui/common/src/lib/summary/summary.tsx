import './summary.css';
import { Button, Typography, Box } from "@mui/material";
import * as React from 'react';
import BackButton from '../utils/backButton';
import { useCarts } from '../commandsR/stores/cart';
import { ContainerContext } from '../containerHook/containerContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CatalogueService, CategorizedCatalog, KitchenService, MonsieurAxelMenvoie, TYPES } from '@spos/services/common';
import { useNavigate } from 'react-router-dom';
import useCommandsParameter from '../commandsR/stores/useCommandsParameter';
import SummaryTable from './summaryTable';

export function Summary() {
  const { groupId, tableNumber, offerType } = useCommandsParameter();

  const cart = useCarts();
  const resetCart = useCarts(state => state.resetCart);
  const navigate = useNavigate();
  const currentTableCart = cart.carts[tableNumber] || [];

  const container = React.useContext(ContainerContext);

  const mutation = useMutation({
    mutationFn: (order: MonsieurAxelMenvoie) => {
      console.log(order);
      return container.get<KitchenService>(TYPES.KitchenService).sendToKitchen(order);
    },
    onSuccess: (data) => {
      navigate('/');
    },
    onError: (error) => {
      console.log(error);
    }
  });


  const {
    data: catalog,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['catalog'],
    queryFn: async () => {
      const catalogService: CatalogueService = container.get<CatalogueService>(TYPES.CatalogueService);
      return catalogService.getFilteredCatalog(offerType);
    },
    refetchOnWindowFocus: 'always',
  });

  if (isLoading) {
    return (
      <Typography variant="h6" component="h2" fontWeight="bold">
        Loading...
      </Typography>
    );
  }
  if (!catalog || isError) {
    console.error(error);
    return (
      <Typography variant="h6" component="h2" fontWeight="bold">
        Error
      </Typography>
    );
  }
  let totalPrice = 0;

  currentTableCart.forEach(element => {
    Object.keys(catalog).forEach(category => {
      catalog[category].forEach(item => {
        if (item._id === element.itemId) {
          totalPrice += element.quantity * item.price;
        }
      })
    })
  });

  const cartByCategory = () => {
    const result: { [category: string]: { itemId: string, shortName: string, quantity: number, price: number }[] } = {};

    for (const item of currentTableCart) {
      for (const category of Object.keys(catalog ?? {} as CategorizedCatalog)) {
        for (const element of (catalog ?? {} as CategorizedCatalog)[category]) {
          if (item.itemId === element._id) {
            if (!result[category]) {
              result[category] = [];
            }
            result[category].push({
              itemId: item.itemId,
              quantity: item.quantity,
              shortName: item.shortName,
              price: element.price
            });
          }
        }
      }
    }

    return result;
  }

  function sendToKitchen() {
    mutation.mutate({
      groupId: groupId,
      tableNumber: tableNumber,
      cart: currentTableCart
    });

    resetCart(tableNumber);
  }

  return (
    <Box
      sx={{
        padding: '16px',
        paddingTop: '110px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '14px',
        height: '100vh',
        width: 'calc(100% - 32px)',
        position: 'relative',
        left: '0',
      }}
    >
      < Box>
        <BackButton onClick={() => navigate(`/commands/${groupId}/`)} color={'black'} top={20} left={20} />
        <Typography align='center'
          variant="h1"
          component="h2"
          fontSize="7.5vw"
          fontWeight="bold"
          style={{ color: 'black' }}>
          Summary
        </Typography>

        <Box width='90%' marginLeft='5%' marginTop="7%" paddingRight="10px" bgcolor='#FFFFFF' sx={{ display: "flex", flexDirection: "column", alignItem: "center", justifyContent: "center" }}>
          <Box className="custom-scrollbar" height="70vh" overflow="auto">
            {Object.keys(catalog).map((category) => {
              return (
                (cartByCategory()[category] ?? []).length > 0 ?
                  <Box>
                    <Typography fontSize="4.5vw"
                      fontWeight="bold"
                      style={{ color: 'black' }}
                      variant='h3'>{category}</Typography>

                    <SummaryTable cart={cartByCategory()[category]} />
                  </Box> : ''
              )
            })}
          </Box>
          <Box display='flex' justifyContent="right">
            <Typography variant="h4" component="h4" fontSize="4vw" fontWeight="bold">
              Total : ${totalPrice}
            </Typography>
          </Box>

          <Button sx={{
            margin: "auto",
            alignItem: 'center',
          }} variant="contained"
            onClick={() => sendToKitchen()}>
            Kitchen
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Summary;
