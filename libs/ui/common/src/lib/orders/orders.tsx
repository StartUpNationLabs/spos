import './orders.css';
import { Button, Typography, Box } from "@mui/material";
import { useState, useEffect } from 'react';
import Section from './section';
import BackButton from '../utils/backButton';
import useStore from './stores/serve';
import useCommandsParameter from '../commandsR/stores/useCommandsParameter';
import { useNavigate } from 'react-router-dom';

export function Orders() {
  const { groupId } = useCommandsParameter();
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { ordersData, setServed } = useStore();

  useEffect(() => {
    if (selectedOrder) {
      console.log("Selected Order changed:", selectedOrder);
    }
  }, [selectedOrder]);

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
          flexDirection: 'column',
          alignItems: 'flex-start',
          mt: 4,
          pl: 0,
        }}>
          <Box width='90%'
            marginLeft='5%'
            bgcolor='#FFFFFF'
            height="62vh"
            sx={{
              overflowY: 'auto',
              maxHeight: '62vh',
              padding: 2,
            }}>

            {Object.keys(ordersData).map((section) => (
              <Section
                key={section}
                title={section.charAt(0).toUpperCase() + section.slice(1)}
                orders={ordersData[section]}
                onSelectOrder={handleSelectOrder}
                selectedOrder={selectedOrder}
              />
            ))}
          </Box>
        </Box>

        <Button sx={{
          margin: "auto",
          position: 'absolute',
          bottom: 50,
          left: "40%"
        }} variant="contained">
          Serve
        </Button>
      </Box>
    </Box>
  );
}

export default Orders;
