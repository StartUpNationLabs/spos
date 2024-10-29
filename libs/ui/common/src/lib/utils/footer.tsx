import React from 'react';
import { Button, IconButton } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import CloseButton from './closeButton';

const Footer = ({ onClose, onSelectWhoPays, onGroupClick }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 25px',
      backgroundColor: '#f8f8f8',
      position: 'fixed',
      bottom: 0,
      width: '100%',
    }}
  >
    <Button
      onClick={onSelectWhoPays}
      variant="contained"
      style={{
        backgroundColor: '#1f0154',
        color: 'white',
        borderRadius: '35px',
        fontSize: '25px',
        padding: '20px 40px',
      }}
    >
      Select who pays
    </Button>

    <IconButton
      onClick={onGroupClick}
      style={{ color: '#333', transform: 'scale(2.5)' }}
    >
      <GroupIcon fontSize="large" />
    </IconButton>

    <CloseButton onClick={onClose} width="80px" height="80px" iconSize="50px" />
  </div>
);

export default Footer;
