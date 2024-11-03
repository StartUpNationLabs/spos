import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';

export function PayementAsignee() {
  const navigate = useNavigate();
  // propriétés communes des BackButton
  const buttonProps = {
    color: 'black',
    fontSize: '150px',
    //scaleX: 0.5,
    scaleY: 0.5,
  };

  // propriétés spécifiques des BackButton
  const buttonPositions = [
    {
      onClick: () => alert('Top Left'),
      top: '-150px',
      left: '-150px',
      rotation: 45,
    },
    {
      onClick: () => alert('Top Right'),
      top: '-155px',
      left: '150px',
      rotation: 135,
    },
    {
      onClick: () => alert('Bottom Left'),
      top: '140px',
      left: '-150px',
      rotation: -45,
    },
    {
      onClick: () => alert('Bottom Right'),
      top: '140px',
      left: '180px',
      rotation: -135,
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        aspectRatio: '1/1',
        gap: '0px',
      }}
    >
      <div
        style={{
          aspectRatio: '1/1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton>
          <ArrowOutwardIcon
            style={{
              fontSize: '150px',
              transform: `rotate(-90deg)`,
            }}
          />
        </IconButton>
      </div>
      <div
        style={{
          aspectRatio: '1/1',
          display: 'flex',
          alignItems: 'center',
        }}
      />
      <div
        style={{
          aspectRatio: '1/1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton>
          <ArrowOutwardIcon
            style={{
              fontSize: '150px',
              transform: `rotate(0deg)`,
            }}
          />
        </IconButton>
      </div>
      <div
        style={{
          aspectRatio: '1/1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
      <div
        style={{
          aspectRatio: '1/1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton
          onClick={() => navigate(-1
          )}
        >
          <CancelIcon
            style={{
              fontSize: '150px',
              transform: `rotate(180deg)`,
            }}
          />
        </IconButton>
      </div>
      <div
        style={{
          aspectRatio: '1/1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
      <div
        style={{
          aspectRatio: '1/1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton>
          <ArrowOutwardIcon
            style={{
              fontSize: '150px',
              transform: `rotate(180deg)`,
            }}
          />
        </IconButton>
      </div>
      <div
        style={{
          aspectRatio: '1/1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
      <div
        style={{
          aspectRatio: '1/1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton>
          <ArrowOutwardIcon
            style={{
              fontSize: '150px',
              transform: `rotate(90deg)`,
            }}
          />
        </IconButton>
      </div>
    </div>
  );
}

export default PayementAsignee;
