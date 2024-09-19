import './orders.css';
import { Button, Typography, Box } from "@mui/material";
import { useState } from 'react';
import Section from './section';


export function Orders() {
    const [open, setOpen] = useState(false);

    const togglePopup = () => setOpen(prevOpen => !prevOpen);

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

    return (
        <Box margin={10} marginTop="20vw">
            <Box className="bottom-button">
                <Button variant="contained" onClick={togglePopup} sx={{ width: 500 }}>
                    Orders
                </Button>
            </Box>

            {open && (
                <Box className="popup-fullscreen">
                    <Button variant="contained" onClick={togglePopup} className="close-button">
                        Close
                    </Button>
                    
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'flex-start',
                        mt: 15,
                        pl: 2,
                        maxHeight: '80vh',
                        overflowY: 'auto'
                    }}>
                        {Object.keys(ordersData).map((section) => (
                            <Section 
                                key={section} 
                                title={section.charAt(0).toUpperCase() + section.slice(1)} 
                                orders={ordersData[section]} 
                            />
                        ))}
                    </Box>
                    
                    <Box className="bottom-button">
                        <Button variant="contained" sx={{ width: 500 }}>
                            Serve
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default Orders;
