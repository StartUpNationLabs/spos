import './orders.css';
import { Button, Typography, Box } from "@mui/material";
import { useState } from 'react';

const Section = ({ title, content }) => (
    <Box sx={{ marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'black', fontSize: '24px' }}>
            {title}
        </Typography>
        <Typography variant="body1" sx={{ color: 'black', fontSize: '18px' }}>
            {content}
        </Typography>
    </Box>
);

export function Orders() {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <Box margin='170px' marginTop='20vw'>
            <Box className="bottom-button">
                <Button variant="contained" onClick={handleToggle}>
                    Orders
                </Button>
            </Box>

            {open && (
                <Box className="popup-fullscreen">
                    <Button variant="contained" onClick={handleToggle} className="close-button">
                        Orders
                    </Button>
                    
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'flex-start',
                            mt: 15,
                            paddingLeft: '20px'
                        }}
                    >
                        <Section title="Drink" content="Tables" />
                        <Section title="Starter" content="Tables" />
                        <Section title="Main Course" content="Tables" />
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default Orders;
