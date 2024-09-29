import './orders.css';
import { Button, Typography, Box } from "@mui/material";
import { useState, useEffect, useContext } from 'react';
import Section from './section';
import BackButton from '../utils/backButton';
import useStore from './stores/serve';
import useCommandsParameter from '../commandsR/stores/useCommandsParameter';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { KitchenService, TYPES } from '@spos/services/common';
import { ContainerContext } from '../containerHook/containerContext';
import { OrderDetails } from './orderDetails';

export function Orders() {
  const container = useContext(ContainerContext);
  const { groupId } = useCommandsParameter();
  const navigate = useNavigate();
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [orderToDetailed, setOrderToDetailed] = useState("");

  useEffect(() => {
    if (selectedOrders.length > 0) {
      console.log("Selected Orders changed:", selectedOrders);
    }
  }, [selectedOrders]);

  const mutation = useMutation({
    mutationFn: (preparationIds: string[]) => {
      console.log(preparationIds);
      return container.get<KitchenService>(TYPES.KitchenService).servePreparation(preparationIds);
    },
    onSuccess: (data) => {
      setSelectedOrders([]);
      navigate(`/commands/${groupId}/orders`);
    },
    onError: (error) => {
      console.log(error);
    }
  });


  const {
    data: summary,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['summary', groupId],
    queryFn: async () => {
      const KitchenService: KitchenService = container.get<KitchenService>(TYPES.KitchenService);
      return KitchenService.getOrdersByGroupId(groupId);
    },
    enabled: groupId !== undefined && groupId !== '',
    refetchOnWindowFocus: 'always',
  });

  if (isLoading) {
    return (
      <Typography variant="h6" component="h2" fontWeight="bold">
        Loading...
      </Typography>
    );
  }
  if (!summary || isError) {
    console.error(error);
    return (
      <Typography variant="h6" component="h2" fontWeight="bold">
        Error
      </Typography>
    );
  }

  const handleSelectOrder = (preparationId: string) => {
    console.log("Selecting an order...");
    setOrderToDetailed(preparationId);
    const index = selectedOrders.findIndex((element) => element === preparationId);
    console.log(selectedOrders)
    if (index !== -1) {
      // Remove the order from the list
      setSelectedOrders((prevOrders) => [...prevOrders.slice(0, index), ...prevOrders.slice(index + 1)]);
    } else {
      // Add the new order to the list
      setSelectedOrders((prevOrders) => [...prevOrders, preparationId]);
    }
  };

  const handleServe = () => {
    if (selectedOrders.length > 0) {
      console.log("Selected order to serve :", selectedOrders);
      mutation.mutate(selectedOrders);
    }
    else {
      console.log("Select at least one order to serve before serving.");
    }
  };


  return (
    <Box
      sx={{
        padding: '16px',
        paddingTop: '110px',
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: '14px',
        height: '100vh',
        position: 'relative',
        left: '0',
      }}
    >
      <Box >
        <BackButton onClick={() => navigate(`/commands/${groupId}/`)} color={'black'} top={20} left={20} />
        <Typography align='center'
          variant="h1"
          component="h2"
          fontSize="7.5vw"
          fontWeight="bold"
          style={{ color: 'black' }}>
          Orders
        </Typography>

        <Box sx={{
          display: 'flex',
          overflowY: 'auto',
          justifyContent: "space-between",
          flexDirection: 'column',
          alignItems: 'flex-start',
          mt: 4,
          pl: 0,
        }}>
          <Box
            className="custom-scrollbar"
            width='90%'
            height={"68vh"}
            marginLeft='5%'
            bgcolor='#FFFFFF'
            display="flex"
            flexDirection="column"
            sx={{
              overflowY: 'auto',
              padding: 2,
            }}>

            <Box>
              {Object.keys(summary.summary).map((category) => (
                <Section
                  key={category}
                  title={category.charAt(0).toUpperCase() + category.slice(1)}
                  orders={summary.summary[category]}
                  onSelectOrder={handleSelectOrder}
                  selectedOrders={selectedOrders}
                />
              ))}
            </Box>
          </Box>
          <OrderDetails orderToDetailed={orderToDetailed} setOrderToDetailed={setOrderToDetailed} ></OrderDetails>
        </Box>
      </Box>
    </Box>
  );
}

export default Orders;
