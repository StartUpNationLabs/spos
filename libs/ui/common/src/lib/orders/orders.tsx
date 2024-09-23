import './orders.css';
import { Button, Typography, Box } from "@mui/material";
import { useState } from 'react';
import Section from './section';
import BackButton from '../utils/backButton';

const ordersData = {
    drink: {
        'Table 1': [
            { order: 33, status: 'completed' },
            { order: 32, status: 'pending' }
        ],
        'Table 2': [{ order: 41, status: 'completed' }]
    },
    starter: {
        'Table 3': [
            { order: 23, status: 'pending' },
            { order: 22, status: 'completed' }
        ],
        'Table 1': [{ order: 15, status: 'completed' }]
    },
    mainCourse: {
        'Table 2': [{ order: 39, status: 'pending' }],
        'Table 3': [{ order: 24, status: 'completed' }]
    }
};

export function Orders() {
    const [open, setOpen] = useState(false);
    const togglePopup = () => setOpen(prevOpen => !prevOpen);

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
