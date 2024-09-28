import './summary.css';
import { Button, Typography, Box } from "@mui/material";
import * as React from 'react';
import BackButton from '../utils/backButton';
import { useCarts } from '../commandsR/stores/cart';
import { ContainerContext } from '../containerHook/containerContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CatalogueService, KitchenService, MonsieurAxelMenvoie, TYPES } from '@spos/services/common';
import { useNavigate } from 'react-router-dom';
import useCommandsParameter from '../commandsR/stores/useCommandsParameter';

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
      className="custom-scrollbar"
      sx={{
        padding: '16px',
        paddingTop: '110px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        height: '100vh',
        overflowY: 'auto',
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

        <Box width='90%' marginLeft='5%' marginTop="7%" bgcolor='#FFFFFF' height="62vh">
          {Object.keys(catalog).map((category) => (
            (catalog[category].filter(element => currentTableCart.map(element => element.itemId).includes(element._id)) ?
              <Box key={category}>
                <Typography fontSize="4.5vw"
                  fontWeight="bold"
                  style={{ color: 'black' }}
                  variant='h3'>{category}</Typography>
                {catalog[category].map((item) => (
                  (currentTableCart.map(element => element.itemId).includes(item._id)) ?
                    <Typography key={item._id} marginLeft={'30px'} style={{ color: 'black' }} fontSize="3vw">
                      {item.shortName}: {currentTableCart.find(element => element.itemId === item._id)?.quantity ?? 0}
                    </Typography> : ""
                ))}
              </Box> : '')
          ))}
          <Box width="90%" position='fixed' display='flex' justifyContent="right" bottom="14vh" right="8vw">
            <Typography variant="h4" component="h4" fontSize="4vw" fontWeight="bold">
              Total : ${totalPrice}
            </Typography>
          </Box>
        </Box>

        <Button sx={{
          margin: "auto",
          position: 'absolute',
          bottom: 50,
          left: "40%"
        }} variant="contained"
          onClick={() => sendToKitchen()}>
          Kitchen
        </Button>
      </Box>
    </Box>
  );
}

export default Summary;
