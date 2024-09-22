import React from 'react';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const BackButton = ({ onClick, color, top, left }) => {
    return (
        <Button
            onClick={onClick} 
            style={{
                position: 'absolute',
                top: top,
                left: left,
                color: color 
            }}
        >
            <ArrowBack style={{ fontSize: '70px' }} />
        </Button>
    );
};

export default BackButton;
