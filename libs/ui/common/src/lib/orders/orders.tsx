import './orders.css';
import { Button, Typography, Box } from "@mui/material";
import { useState, useEffect } from 'react';
import Section from './section';
import BackButton from '../utils/backButton';
import useStore from './stores/serve';

interface OrdersProps {
  groupId: string
}

export function Orders(props: OrdersProps) {
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const { ordersData, setServed } = useStore();

    const togglePopup = () => setOpen(prevOpen => !prevOpen);

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
        <Box margin={10}>
            <Box className="bottom-button">
                <Button
                    onClick={togglePopup}
                    variant="contained"
                    color="primary"
                    style={{
                        padding: '20px 50px',
                        borderRadius: '50px',
                        fontSize: '4vw',
                        backgroundColor: '#003366'
                    }}
                >
                    Orders
                </Button>
            </Box>

            {open && (
                <Box className="popup-fullscreen">
                    <BackButton onClick={() => setOpen(false)} color={'white'} top={20} left={20}/>
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

                    <Box className="bottom-button">
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: '#003366',
                                padding: '20px 50px',
                                borderRadius: '50px',
                                fontSize: '4vw',
                            }}
                            onClick={handleServe}
                            disabled={!selectedOrder}
                        >
                            Serve
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default Orders;
