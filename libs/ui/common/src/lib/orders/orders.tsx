import './orders.css';
import { Button, Typography, Box } from "@mui/material";
import { useState, useEffect, useContext } from 'react';
import Section from './section';
import BackButton from '../utils/backButton';
import useStore from './stores/serve';
import useCommandsParameter from '../commandsR/stores/useCommandsParameter';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { KitchenService, TYPES } from '@spos/services/common';
import { ContainerContext } from '../containerHook/containerContext';

export function Orders() {
  const { groupId } = useCommandsParameter();
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);
  useEffect(() => {
    if (selectedOrder) {
      console.log("Selected Order changed:", selectedOrder);
    }
  }, [selectedOrder]);

  const { ordersData, setServed } = useStore();

  const container = useContext(ContainerContext);

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

  const handleSelectOrder = (section, table, orderId) => {
    console.log("Selecting an order...");
    setSelectedOrder({ section, table, orderId });
  };

  const handleServe = () => {
    console.log("Serve Button clicked");
    if (selectedOrder) {
      console.log("Selected order:", selectedOrder);
      const { section, table, orderId } = selectedOrder;
      setServed(section, table, orderId, true);
      console.log("After serving:", ordersData);

      setSelectedOrder(null);
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
            height={"75vh"}
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
                  selectedOrder={selectedOrder}
                />
              ))}
            </Box>
          </Box>
          <Button sx={{
            margin: "auto",
            alignItems: "center"
          }} variant="contained">
            Serve
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Orders;
