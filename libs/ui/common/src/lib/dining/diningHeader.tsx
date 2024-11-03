import React from 'react';
import './diningRoomTables.css';
import BackButton from '../utils/backButton';

interface DiningHeaderProps {
  title: string;
  hasSelection: boolean;
  onBackClick: () => void;
  onContinueClick: () => void;
  buttonText: string;
}

const DiningHeader = ({
  title,
  hasSelection,
  onBackClick,
  onContinueClick,
  buttonText,
}: DiningHeaderProps) => {
  return (
    <div className="header-container">
      <div className="header-left">
        <BackButton onClick={onBackClick} />
      </div>
      <div className="header-center">
        <h2 className="dining-room-title">{title}</h2>
      </div>
      <div className="header-right">
        {
          <button className="continue-button" onClick={onContinueClick}>
            {buttonText}
          </button>

        }
      </div>
    </div>
  );
};

export default DiningHeader;
