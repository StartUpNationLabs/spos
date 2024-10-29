import React from 'react';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

interface BackButtonProps {
  onClick: () => void;
  color?: string;
  top?: number | string;
  left?: number | string;
  rotation?: number;
  fontSize?: string;
  scaleX?: number;
  scaleY?: number;
}

const BackButton = ({
  onClick,
  color = 'black',
  top = 20,
  left = 20,
  rotation = 0,
  fontSize = '70px',
  scaleX = 1,
  scaleY = 1,
}: BackButtonProps) => {
  return (
    <Button
      onClick={onClick}
      style={{
        position: 'absolute',
        top: top,
        left: left,
        color: color,
      }}
    >
      <ArrowBack
        style={{
          fontSize: fontSize,
          transform: `rotate(${rotation}deg) scale(${scaleX}, ${scaleY})`,
        }}
      />
    </Button>
  );
};

export default BackButton;
