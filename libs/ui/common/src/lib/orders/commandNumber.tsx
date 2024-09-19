import { Button, Typography, Box } from "@mui/material";
import { useState } from 'react';

const CommandNumber = ({ number, status }) => {
    const backgroundColor = status === 'completed' ? 'green' : 'orange';
    return (
        <Box 
            sx={{
                width: 50,
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor,
                color: 'white',
                fontSize: 20,
                borderRadius: 2,
                margin: 1,
                boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
            }}
        >
            {number}
        </Box>
    );
};
export default CommandNumber;
