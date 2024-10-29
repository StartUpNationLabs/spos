import React from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CloseButton = ({
    onClick,
    width = '120px', 
    height = '120px', 
    iconSize = '100px', 
    backgroundColor = '#333', 
    color = 'white' 
}) => {
    const handleTouchStart = (e) => {
        e.currentTarget.style.transform = 'scale(0.9)'; 
        e.currentTarget.style.backgroundColor = '#555'; 
    };

    const handleTouchEnd = (e) => {
        e.currentTarget.style.transform = 'scale(1)'; 
        e.currentTarget.style.backgroundColor = backgroundColor; 
    };

    return (
        <IconButton
            onClick={onClick}
            style={{
                width: width,
                height: height, 
                backgroundColor: backgroundColor, 
                color: color, 
                borderRadius: '50%', 
                transition: 'background-color 0.3s, transform 0.2s',
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart} 
            onMouseUp={handleTouchEnd} 
        >
            <CloseIcon style={{ fontSize: iconSize }} />
        </IconButton>
    );
};

export default CloseButton;