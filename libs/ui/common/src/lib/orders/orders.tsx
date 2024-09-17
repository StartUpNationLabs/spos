import './orders.css';
import { Button, Typography, Box } from "@mui/material";
import { useState } from 'react';

export function Orders() {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <Box margin='170px' marginTop='20vw'>
            

            <Box className="bottom-button">
                <Button variant="contained" onClick={handleToggle}>
                    {open ? 'Orders' : 'Orders'}
                </Button>
            </Box>

            {open && (
                <Box className="popup-fullscreen">
                    
                    <Button variant="contained" onClick={handleToggle} className="close-button">
                        Orders
                    </Button>
                </Box>
            )}
        </Box>
    );
}

export default Orders;
