import { Button } from "@mui/material";
import { useState } from 'react';

const CommandNumber = ({ number, status, isServed, isSelected, onClick }) => {
    const backgroundColor = isSelected ? 'blue' : (status === 'completed' ? 'green' : 'orange'); // Mettre en surbrillance si sélectionné
    return (
        <Button 
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
            onClick={onClick}
        >
            {number}
        </Button>
    );
};

export default CommandNumber;
