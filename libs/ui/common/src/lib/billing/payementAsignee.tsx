import React from 'react';
import './payementAsignee.css';
import BackButton from '../utils/backButton';
import CloseButton from '../utils/closeButton';

export function PayementAsignee() {
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
    <div className="payer-chooser">
      <div className="button-wrapper">
        <CloseButton
          onClick={() => alert('Close')}
          width="200px"
          height="200px"
        />
        {buttonPositions.map((position, index) => (
          <BackButton key={index} {...buttonProps} {...position} />
        ))}
      </div>
    </div>
  );
}

export default PayementAsignee;
