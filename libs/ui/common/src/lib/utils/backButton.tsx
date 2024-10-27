import React from 'react';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const BackButton = ({ onClick, color, top, left, rotation = 0, fontSize = '70px', scaleX = 1, scaleY = 1 }) => {
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
            <ArrowBack 
                style={{ 
                    fontSize: fontSize, 
                    transform: `rotate(${rotation}deg) scale(${scaleX}, ${scaleY})`
                }} 
            />
        </Button>
    );
};

export default BackButton;
