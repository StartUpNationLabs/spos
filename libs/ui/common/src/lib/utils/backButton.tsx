import React from 'react';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const BackButton = ({ onClick }) => {
    return (
        <Button
            onClick={onClick} 
            style={{
                position: 'absolute',
                top: 20,
                left: 20,
                color: 'white' 
            }}
        >
            <ArrowBack style={{ fontSize: '70px' }} />
        </Button>
    );
};

export default BackButton;
