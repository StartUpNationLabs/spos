import React from 'react';
import './diningRoomTables.css';
import BackButton from '../utils/backButton';

const DiningHeader = ({ title, hasSelection, onBackClick, onContinueClick, buttonText }) => {
  return (
    <div className="header-container">
      <div className="header-left">
        <BackButton onClick={onBackClick} />
      </div>
      <div className="header-center">
        <h2 className="dining-room-title">{title}</h2>
      </div>
      <div className="header-right">
        {hasSelection && (
          <button 
            className="continue-button"
            onClick={onContinueClick}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default DiningHeader;