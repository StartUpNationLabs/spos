import React from 'react';
import { Button, IconButton } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Group';
import CloseButton from './closeButton';

interface FooterProps {
    onClose: () => void;
    onSelectWhoPays: () => void;
    onGroupClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onClose, onSelectWhoPays, onGroupClick }) => {
    const handleButtonTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
        e.currentTarget.style.backgroundColor = '#150a3e';  
    };

    const handleButtonTouchEnd = (e: React.TouchEvent<HTMLButtonElement>) => {
        e.currentTarget.style.backgroundColor = '#1f0154'; 
    };

    const handleIconTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
        e.currentTarget.style.color = '#1f0154'; 
        e.currentTarget.style.transform = 'scale(2.8)'; 
    };

    const handleIconTouchEnd = (e: React.TouchEvent<HTMLButtonElement>) => {
        e.currentTarget.style.color = '#0A1E3F'; 
        e.currentTarget.style.transform = 'scale(2.5)'; 
        //Navigate group id et table id
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px 25px', 
            backgroundColor: '#f8f8f8',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
        }}>
            <Button
                onClick={onSelectWhoPays}
                variant="contained"
                style={{
                    backgroundColor: '#1f0154',
                    color: 'white',
                    borderRadius: '35px',
                    fontSize: '25px', 
                    padding: '20px 40px',
                    transition: 'background-color 0.3s',
                }}
                onTouchStart={handleButtonTouchStart}
                onTouchEnd={handleButtonTouchEnd}
                onMouseDown={handleButtonTouchStart} 
                onMouseUp={handleButtonTouchEnd} 
            >
                Select who pays
            </Button>

            <IconButton 
                onClick={onGroupClick} 
                style={{ 
                    color: '#0A1E3F', 
                    transform: 'scale(2.5)', 
                    transition: 'transform 0.2s, color 0.2s',
                }} 
                onTouchStart={handleIconTouchStart}
                onTouchEnd={handleIconTouchEnd}
                onMouseDown={handleIconTouchStart} 
                onMouseUp={handleIconTouchEnd} 
            >
                <GroupsIcon fontSize="large" />
            </IconButton>

            <CloseButton onClick={onClose} width="80px" height="80px" iconSize="50px" />
        </div>
    );
};

export default Footer;