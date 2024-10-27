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
}) => (
    <IconButton
        onClick={onClick}
        style={{
            width: width,
            height: height, 
            backgroundColor:backgroundColor, 
            color: color, 
            borderRadius: '50%', 
        }}
    >
        <CloseIcon style={{ fontSize: iconSize }} />
    </IconButton>
);

export default CloseButton;
